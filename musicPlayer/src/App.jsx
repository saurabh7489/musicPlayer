
import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Filemaneger from "./components/Filemaneger";
import useMusicPlayer from "./useMusicPlayer";
import Player from "./components/Player";

const App = () => {
  const music = useMusicPlayer();
  <Filemaneger
  songs={music.songs}
  currentIndex={music.currentIndex}
  playSong={music.playSong}
  chooseMusicFolder={music.chooseMusicFolder}
  error={music.error}
/>

  return (
    <div>
      <Navbar />

      <div className="  flex">
        <Filemaneger
          songs={music.songs}
          currentIndex={music.currentIndex}
          playSong={music.playSong}
          chooseMusicFolder={music.chooseMusicFolder}
          error={music.error}
        />
          <div className="w-full ">
        <Player
          
        />

        </div>
      </div>
   <Footer
   
   audioRef={music.audioRef}
          songs={music.songs}
          currentIndex={music.currentIndex}
          isPlaying={music.isPlaying}
          setIsPlaying={music.setIsPlaying}
          currentTime={music.currentTime}
          setCurrentTime={music.setCurrentTime}
          duration={music.duration}
          setDuration={music.setDuration}
          volume={music.volume}
          setVolume={music.setVolume}
          togglePlay={music.togglePlay}
          nextSong={music.nextSong}
          previousSong={music.previousSong}
   />
       
    </div>
  );
};

export default App;

