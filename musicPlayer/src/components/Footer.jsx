import React from 'react'

const Footer = ({audioRef,
  songs=[],
  currentIndex=0,
  isPlaying,
  setIsPlaying,
  currentTime,
  setCurrentTime,
  duration,
  setDuration,
  volume,
  setVolume,
  togglePlay,
  nextSong,
  previousSong,}) => {
     const currentSong = songs[currentIndex];
     const myRef = {};
     
  return (
    <div className='h-[17vh'>
        
        
        <div className="border  
       border-amber-50   ">

         <div className="mt-1 text-center text-[#61e1d6]">
        <h2 className="truncate px-4 text-lg font-semibold">
          {currentSong?.name || "Select a song"}
        </h2>
      </div>

 <div className="text-center mt-1">
        <input type="range" min="0" max={duration||0} 
        value={Math.min(currentTime, duration || 0)}
        onChange={(e) => {
    const time = Number(e.target.value);

    setCurrentTime(time);

    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  }}
  disabled={!duration}
        className="accent-[#61e1d6] w-[80vw] cursor-pointer " />
        {}
      </div>

        


        

       <div className=" flex flex-wrap items-center justify-center gap-16 ">
        <button
          onClick={previousSong}
          disabled={!songs.length}
          className="rounded p-2 text-[#61e1d6] disabled:opacity-40"
          aria-label="Previous song"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
<path d="M20.2409 7.21957V16.7896C20.2409 18.7496 18.1109 19.9796 16.4109 18.9996L12.2609 16.6096L8.11094 14.2096C6.41094 13.2296 6.41094 10.7796 8.11094 9.79957L12.2609 7.39957L16.4109 5.00957C18.1109 4.02957 20.2409 5.24957 20.2409 7.21957Z" fill="#61e1d6"/>
<path d="M3.76172 18.9303C3.35172 18.9303 3.01172 18.5903 3.01172 18.1803V5.82031C3.01172 5.41031 3.35172 5.07031 3.76172 5.07031C4.17172 5.07031 4.51172 5.41031 4.51172 5.82031V18.1803C4.51172 18.5903 4.17172 18.9303 3.76172 18.9303Z" fill="#61e1d6"/>
</svg>
        </button>

        <button
          onClick={togglePlay}
          disabled={!songs.length}
          className="rounded p-2 text-[#61e1d6] disabled:opacity-40"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <svg xmlns="http://www.w3.org/2000/svg" fill="#61e1d6" width="20px" height="20px" viewBox="0 0 32 32" version="1.1">
<title>pause</title>
<path d="M5.92 24.096q0 0.832 0.576 1.408t1.44 0.608h4.032q0.832 0 1.44-0.608t0.576-1.408v-16.16q0-0.832-0.576-1.44t-1.44-0.576h-4.032q-0.832 0-1.44 0.576t-0.576 1.44v16.16zM18.016 24.096q0 0.832 0.608 1.408t1.408 0.608h4.032q0.832 0 1.44-0.608t0.576-1.408v-16.16q0-0.832-0.576-1.44t-1.44-0.576h-4.032q-0.832 0-1.408 0.576t-0.608 1.44v16.16z"/>
</svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
<path d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z" fill="#61e1d6"/>
</svg>}
        </button>

        <button
          onClick={nextSong}
          disabled={!songs.length}
          className="rounded p-2 text-[#61e1d6] disabled:opacity-40"
          aria-label="Next song"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
<path d="M3.76172 7.21957V16.7896C3.76172 18.7496 5.89172 19.9796 7.59172 18.9996L11.7417 16.6096L15.8917 14.2096C17.5917 13.2296 17.5917 10.7796 15.8917 9.79957L11.7417 7.39957L7.59172 5.00957C5.89172 4.02957 3.76172 5.24957 3.76172 7.21957Z" fill="#61e1d6"/>
<path d="M20.2383 18.9303C19.8283 18.9303 19.4883 18.5903 19.4883 18.1803V5.82031C19.4883 5.41031 19.8283 5.07031 20.2383 5.07031C20.6483 5.07031 20.9883 5.41031 20.9883 5.82031V18.1803C20.9883 18.5903 20.6583 18.9303 20.2383 18.9303Z" fill="#61e1d6"/>
</svg>
        </button> 
      </div>

      <div className="invisible h-1 w-0 mx-auto    px-3">
        <audio
          ref={audioRef}
          controls
          preload="metadata"
          className="max-w-full"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onEnded={nextSong}
        />
      </div>
      </div>
        
        </div>
  )
}

export default Footer