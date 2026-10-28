
import { useEffect, useRef, useState } from "react";

const DB_NAME = "MusicPlayerDB";
const STORE_NAME = "folders";
const HANDLE_KEY = "musicFolder";

function openMusicDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = () => {
  if (!request.result.objectStoreNames.contains(STORE_NAME)) {
    request.result.createObjectStore(STORE_NAME);
  }
};

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveFolderHandle(handle) {
  const db = await openMusicDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    transaction.objectStore(STORE_NAME).put(handle, HANDLE_KEY);

    transaction.oncomplete = () => {
      db.close();
      resolve();
    };

    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
  });
}

async function getFolderHandle() {
  const db = await openMusicDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const request = transaction.objectStore(STORE_NAME).get(HANDLE_KEY);

    request.onsuccess = () => {
      db.close();
      resolve(request.result);
    };

    request.onerror = () => {
      db.close();
      reject(request.error);
    };
  });
}

function useMusicPlayer() {
  const audioRef = useRef(null);
  const songsRef = useRef([]);

  const [songs, setSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [error, setError] = useState("");
  const [shouldPlay, setShouldPlay] = useState(false);
  useEffect(() => {
  let cancelled = false;

  async function restoreMusicFolder() {
    try {
      const directory = await getFolderHandle();

      if (!directory || cancelled) return;

      const permission = await directory.queryPermission({
        mode: "read",
      });

      if (permission !== "granted") {
        setError("Click Choose Folder to restore music access.");
        return;
      }

      const foundSongs = [];

      async function scanFolder(folder) {
        for await (const entry of folder.values()) {
          if (entry.kind === "directory") {
            await scanFolder(entry);
          } else if (
            /\.(mp3|wav|ogg|m4a|aac|flac|opus|webm|mpeg)$/i.test(entry.name)
          ) {
            const file = await entry.getFile();

            foundSongs.push({
              id: crypto.randomUUID(),
              name: file.name.replace(/\.[^.]+$/, ""),
              url: URL.createObjectURL(file),
            });
          }
        }
      }

      await scanFolder(directory);

      if (cancelled) {
        foundSongs.forEach((song) => URL.revokeObjectURL(song.url));
        return;
      }

      foundSongs.sort((a, b) => a.name.localeCompare(b.name));

      songsRef.current.forEach((song) => URL.revokeObjectURL(song.url));
      songsRef.current = foundSongs;

      setSongs(foundSongs);
      setCurrentIndex(0);
      setIsPlaying(false);
      setShouldPlay(false);
    } catch (err) {
      console.error("Could not restore music folder:", err);
    }
  }

  restoreMusicFolder();

  return () => {
    cancelled = true;
  };
}, []);

  async function chooseMusicFolder() {
    setError("");

    if (!window.showDirectoryPicker) {
      setError("Your browser does not support folder access. Try Chrome or Edge.");
      return;
    }

    try {
      const directory = await window.showDirectoryPicker({
        mode: "read",
        startIn: "music",
        
      });
      await saveFolderHandle(directory);

      const foundSongs = [];

      async function scanFolder(folder) {
        for await (const entry of folder.values()) {
          if (entry.kind === "directory") {
            await scanFolder(entry);
         } else if (/\.(mp3|wav|ogg|m4a|aac|flac|opus|webm|mpeg)$/i.test(entry.name)) {
            const file = await entry.getFile();

            foundSongs.push({
              id: crypto.randomUUID(),
              name: file.name.replace(/\.[^.]+$/, ""),
              url: URL.createObjectURL(file),
            });
          }
        }
      }

      await scanFolder(directory);

      foundSongs.sort((a, b) => a.name.localeCompare(b.name));

      // Release the old playlist's temporary URLs.
      songsRef.current.forEach((song) => URL.revokeObjectURL(song.url));
      songsRef.current = foundSongs;

      setSongs(foundSongs);
      setCurrentIndex(0);
      setShouldPlay(false);
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);

      if (audioRef.current) {
        audioRef.current.pause();
      }

      if (!foundSongs.length) {
        setError("No supported audio files found in this folder.");
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        setError("Couldn't access the folder. Please try again.");
        console.error(err);
      }
    }
  }

  function playSong(index) {
    if (index < 0 || index >= songs.length) return;

    setCurrentIndex(index);
    setShouldPlay(true);
    setError("");
  }

  function togglePlay() {
    if (!songs.length) {
      setError("Choose a music folder first.");
      return;
    }

    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      if (audioRef.current?.src === "" || !audioRef.current?.src) {
        playSong(currentIndex);
      } else {
        audioRef.current?.play().catch(() => {
          setError("Unable to play this track.");
        });
      }
    }
  }

  function nextSong() {
    if (songs.length) {
      playSong((currentIndex + 1) % songs.length);
    }
  }

  function previousSong() {
    if (songs.length) {
      playSong((currentIndex - 1 + songs.length) % songs.length);
    }
  }
  

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
  }, [volume]);

  
  
  useEffect(() => {
    const audio = audioRef.current;
    const song = songs[currentIndex];

    if (!audio || !song) return;

    if (audio.src !== song.url) {
      audio.pause();
      audio.src = song.url;
      audio.load();
      setCurrentTime(0);
      setDuration(0);
    }

    if (shouldPlay) {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
          setError("Unable to play this track.");
        });

      setShouldPlay(false);
    }
  }, [currentIndex, songs, shouldPlay]);
  
  

  useEffect(() => {
    return () => {
      songsRef.current.forEach((song) => URL.revokeObjectURL(song.url));
    };
  }, []);

  return {
    audioRef,
    songs,
    currentIndex,
    isPlaying,
    setIsPlaying,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    volume,
    setVolume,
    error,
    chooseMusicFolder,
    playSong,
    togglePlay,
    nextSong,
    previousSong,
  };
}

export default useMusicPlayer;
