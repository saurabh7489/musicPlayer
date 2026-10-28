import React from 'react'

const Navbar = () => {
  return (
    <>
<div className="w-full h-[9vh] flex border border-zinc-200">


<h1 className="text-[#61e1d6] text-3xl font-bold m-2">Music</h1>



<div className='flex items-center '>

<button className='absolute right-0 mr-2'>
  <a
  href="https://github.com/saurabh7489/musicPlayer/releases/download/v1.0.0/MusicPlayer_v1.0.0.exe"
  className="px-4 py-2 rounded-lg border border-amber-50   font-semibold text-transparent bg-clip-text bg-[linear-gradient(90deg,#0D9490_5%,#ffff_50%,#ffff_5%,#0D9490_100%)]"
>
  Download
</a>
</button>

</div>

</div>

    </>
  )
}

export default Navbar