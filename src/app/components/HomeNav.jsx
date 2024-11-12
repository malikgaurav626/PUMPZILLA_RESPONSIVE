'use client';

import gsap from 'gsap';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { useState, useEffect } from 'react';
import { Suspense } from 'react';
import { mont } from '../layout';

const HomeNav = () => {
    const router = useRouter();
    const [currNav, setcurrNav] = useState(0);

    const searchParams = useSearchParams();
    const pathname = usePathname();

    // UPDATE THE NAV STATE NECCESSARY WHEN LINK IS SHARED
    useEffect(() => {
      if (searchParams.get('launch') === "true" && pathname==="/") {
        setcurrNav(1)
        gsap.to('#navMovingBar' ,{opacity:1});
      }
      else if (pathname==="/") {
        setcurrNav(0)
        gsap.to('#navMovingBar' ,{opacity:1});
      }
      else {
        gsap.to('#navMovingBar' ,{opacity:0});
        setcurrNav(2)
      }

    }, [searchParams, pathname])

    // MOVE THE BAR WHEN NAV IS CHANGED
    useEffect(() => {
      if(currNav!==2 && pathname==="/") {
        if(window) {
          if(window.innerWidth>768) {
            let topPercent = currNav===0?0:28;
            gsap.to('#navMovingBar', {top:`${topPercent}%`, opacity:1});
          }
          else {
            if(currNav===0) {
              let homeIcon = document.getElementById('homeIcon').getBoundingClientRect();
              let rightPercent = ((homeIcon.right/window.innerWidth)*100).toFixed(1)
              gsap.to('#navMovingBar', {right:`${100.1-rightPercent}%`, opacity:1});
            }
            else {
              let launchIcon = document.getElementById('launchIcon').getBoundingClientRect();
              let rightPercent = ((launchIcon.right/window.innerWidth)*100).toFixed(1)
              gsap.to('#navMovingBar', {right:`${98.6-rightPercent}%`, opacity:1});
            }
          }
        }
      }
    },[currNav, pathname])

    return (
    <nav className={` flex justify-center md:flex-col items-center gap-6 w-full md:h-auto h-full relative ${mont.className}`}>
    <div onClick={()=>{setcurrNav(0);router.push('/')}} className={` cursor-pointer h-8 w-full flex justify-center items-center relative group/nav`}>
        <Image id='homeIcon' src={'/Home.png'} width={30} height={30} className={` sm:size-5 size-4 ${currNav===1 || currNav===2?" opacity-100":" opacity-0"} transition-all duration-200 `} alt="Home"/>
        <Image src={'/home-active.png'} width={30} height={30} className={` sm:size-5 size-4 absolute z-10 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 ${currNav===0?" opacity-100":" opacity-0"} transition-all duration-200 `} alt="Home"/>

        {/* POPUP */}
        <div className=' md:block hidden absolute top-1/2 left-full px-2 py-1 rounded-md font-bold text-[10px] pointer-events-none bg-[#1B1C1E] text-white opacity-0 translate-x-0 -translate-y-1/2 group-hover/nav:opacity-100 group-hover/nav:translate-x-2 transition-all duration-300 ease-out'>Home</div>
        <div className=' md:hidden block absolute bottom-full left-1/2 px-2 py-1 rounded-md font-bold text-[10px] pointer-events-none bg-[#1B1C1E] text-white opacity-0 translate-y-0 -translate-x-1/2 group-hover/nav:opacity-100 group-hover/nav:-translate-y-2 transition-all duration-300 ease-out'>Home</div>
    </div>
    <div onClick={()=>{setcurrNav(1);router.push('/?launch=true')}} className={` cursor-pointer h-8 w-full flex justify-center items-center relative group/nav`}>
        <Image id='launchIcon' src={'/Launch.png'} width={30} height={30} className={` sm:size-5 size-4 ${currNav===0 || currNav===2?" opacity-100":" opacity-0"} transition-all duration-200  `} alt="Launch"/>
        <Image src={'/launch-active.png'} width={30} height={30} className={` sm:size-5 size-4 absolute z-10 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 ${currNav===1?" opacity-100":" opacity-0"} transition-all duration-200 `} alt="Launch"/>

        {/* POPUP */}
        <div className=' md:block hidden absolute top-1/2 left-full px-2 py-1 rounded-md font-bold text-[10px] pointer-events-none bg-[#1B1C1E] text-white opacity-0 translate-x-0 -translate-y-1/2 group-hover/nav:opacity-100 group-hover/nav:translate-x-2 transition-all duration-300 ease-out'>Launch</div>
        <div className=' md:hidden block absolute bottom-full left-1/2 px-2 py-1 rounded-md font-bold text-[10px] pointer-events-none bg-[#1B1C1E] text-white opacity-0 translate-y-0 -translate-x-1/2 group-hover/nav:opacity-100 group-hover/nav:-translate-y-2 transition-all duration-300 ease-out'>Launch</div>
    </div>
    <div className={` cursor-pointer h-8 w-full flex justify-center items-center group/nav relative`}>
        <Image src={'/twitter.png'} width={30} height={30} className=" sm:size-5 size-4" alt="Twitter"/>

        {/* POPUP */}
        <div className=' md:block hidden absolute top-1/2 left-full px-2 py-1 rounded-md font-bold text-[10px] pointer-events-none bg-[#1B1C1E] text-white opacity-0 translate-x-0 -translate-y-1/2 group-hover/nav:opacity-100 group-hover/nav:translate-x-2 transition-all duration-300 ease-out'>Twitter</div>
        <div className=' md:hidden block absolute bottom-full left-1/2 px-2 py-1 rounded-md font-bold text-[10px] pointer-events-none bg-[#1B1C1E] text-white opacity-0 translate-y-0 -translate-x-1/2 group-hover/nav:opacity-100 group-hover/nav:-translate-y-2 transition-all duration-300 ease-out'>Twitter</div>
    </div>
    <div className={` cursor-pointer h-8 w-full flex justify-center items-center group/nav relative`}>
        <Image src={'/telegram.png'} width={30} height={30} className=" sm:size-5 size-4" alt="Telegram"/>

        {/* POPUP */}
        <div className=' md:block hidden absolute top-1/2 left-full px-2 py-1 rounded-md font-bold text-[10px] pointer-events-none bg-[#1B1C1E] text-white opacity-0 translate-x-0 -translate-y-1/2 group-hover/nav:opacity-100 group-hover/nav:translate-x-2 transition-all duration-300 ease-out'>Telegram</div>
        <div className=' md:hidden block absolute bottom-full left-1/2 px-2 py-1 rounded-md font-bold text-[10px] pointer-events-none bg-[#1B1C1E] text-white opacity-0 translate-y-0 -translate-x-1/2 group-hover/nav:opacity-100 group-hover/nav:-translate-y-2 transition-all duration-300 ease-out'>Telegram</div>
    </div>


    {/* MOVING BAR */}
    <div id="navMovingBar" className=" absolute top-[0%] right-[0%] md:w-1 w-8 md:h-8 h-1 md:bg-gradient-to-b bg-gradient-to-r from-bluePry to-[#5E6EFF]"></div>
  </nav>
  )
}

export function HomeNavWrapper () {
    return (
        <Suspense>
            <HomeNav/>
        </Suspense>
    )
}