import React from 'react'

const Filemaneger = ({
  songs = [],
  currentIndex = 0,
  playSong,
  chooseMusicFolder,
  error,
}) => {
  return (
   <div className="ml-4 h-120 w-1/3 shrink-0 overflow-y-auto border border-amber-50">
      <div className="flex flex-col items-center gap-4 p-4">
        <h1 className="font-bold text-[#61e1d6]">File</h1>

        <button
          onClick={chooseMusicFolder}
          className="rounded-md border border-[#61e1d6] px-3 py-2 text-sm text-[#61e1d6] hover:bg-[#61e1d6] hover:text-black"
        >
          Choose Music Folder
        </button>

        {error && (
          <p className="break-words text-center text-sm text-red-400">
            {error}
          </p>
        )}

        <div className="w-full">
          {songs.map((song, index) => (
            <button
              key={song.id}
              onClick={() => playSong(index)}
              className={`mb-2 w-full truncate rounded-md p-2 text-left ${
                currentIndex === index
                  ? "bg-[#087e78] text-white"
                  : "text-gray-300 hover:bg-white/10"
              }`}
              title={song.name}
            >
              <span className="mr-2">♫</span>
              {song.name}
            </button>
          ))}
        </div>

        {songs.length === 0 && (
          <p className="text-center text-sm text-gray-400">
            No songs loaded yet.
          </p>
        )}
      </div>
    </div>
  )
}

export default Filemaneger