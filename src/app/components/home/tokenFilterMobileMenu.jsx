'use client';

import gsap from 'gsap';
import React, { useEffect, useState } from 'react'

const TokenFilterMobileMenu = ({changeUniswapListed, tokenFilters, changeOrder}) => {
    const [openFilterMobile, setopenFilterMobile] = useState(false)
    useEffect(() => {
        if(openFilterMobile) {
            gsap.to('#filterMobileMenuBtnBar1', {rotate:'45deg', translateY:"8px"});
            gsap.to('#filterMobileMenuBtnBar2', {opacity:0});
            gsap.to('#filterMobileMenuBtnBar3', {rotate:'-45deg', translateY:"-8px"});
        }
        else {
            gsap.to('#filterMobileMenuBtnBar1', {rotate:'0deg', translateY:"0px"});
            gsap.to('#filterMobileMenuBtnBar2', {opacity:1});
            gsap.to('#filterMobileMenuBtnBar3', {rotate:'0deg', translateY:"0px"});
        }
    },[openFilterMobile])

  return (
    <div className=" lg890md:hidden block relative ">
      <div id='filterMobileMenuBtnBar1' onClick={() => setopenFilterMobile((prev) => !prev)} className=" w-6 h-1 rounded-full bg-gradient-to-r from-bluePry to-[#B872FF] my-1"></div>
      <div id='filterMobileMenuBtnBar2' onClick={() => setopenFilterMobile((prev) => !prev)} className=" w-6 h-1 rounded-full bg-gradient-to-r from-bluePry to-[#B872FF] my-1"></div>
      <div id='filterMobileMenuBtnBar3' onClick={() => setopenFilterMobile((prev) => !prev)} className=" w-6 h-1 rounded-full bg-gradient-to-r from-bluePry to-[#B872FF] my-1"></div>

      <div className={` ${openFilterMobile?" flex":" hidden"} absolute z-40 top-full right-0 bg-black p-2 rounded-lg justify-center items-center gap-2 font-beat`}>
            {/* LISTED ON UNISWAP BUTTON */}
      <button onClick={changeUniswapListed} className='bg-[#2C2D30] rounded-xl flex justify-center items-center gap-2 px-2 py-1'>
        <div className="  rounded-full flex justify-center items-center p-1 border border-white pointer-events-none">
          <div className={` size-2 rounded-full ${tokenFilters.UniswapListed?"bg-gradient-to-b from-bluePry to-[#5E6EFF]":" bg-transparent"}`}/>
        </div>
        <span className=" bg-gradient-to-r from-bluePry to-[#5E6EFF] bg-clip-text text-transparent whitespace-nowrap">LISTED ON UNISWAP</span>
      </button>
    {/* LISTED ON UNISWAP BUTTON END */}

    {/* ASC & DESC BUTTON */}
    <button onClick={() => changeOrder('asc')} className={` px-2 py-1 rounded-xl min-w-16  ${tokenFilters.order==="asc"?"bg-gradient-to-r from-bluePry to-[#5E6EFF] text-white":"bg-[#2C2D30] text-white/30"}`}>ASC</button>
    <button onClick={() => changeOrder('desc')} className={` px-2 py-1 rounded-xl min-w-16  ${tokenFilters.order==="desc"?"bg-gradient-to-r from-bluePry to-[#5E6EFF] text-white":"bg-[#2C2D30] text-white/30"}`}>DESC</button>
    
      </div>
    </div>
  )
}

export default TokenFilterMobileMenu
