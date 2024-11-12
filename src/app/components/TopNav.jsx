"use client"
import gsap from 'gsap'
import { CustomEase } from 'gsap/all'
import Image from 'next/image'
import React from 'react'
import { mont } from '../layout';
import { useAccount } from 'wagmi'

import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit';


const TopNav = () => {
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();


  const account = useAccount();

  const address = account.address;
  const isConnected = account.status === "connected";

  gsap.registerPlugin(CustomEase)

  const shortenAddress = (address) => {
    if (!address) return ""
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const springAni = (e) => {
    gsap.to(e.target, { scale: 0.6, duration: 0.1 });
    gsap.to(e.target, { scale: 1, duration: 0.5, delay: 0.1, ease: CustomEase.create("custom", "M0,0 C0.129,0.352 0.131,0.32 0.19,0.533 0.226,0.664 0.305,1.349 0.378,1.396 0.417,1.421 0.534,0.9 0.6,0.9 0.647,0.9 0.701,1.167 0.76,1.172 0.8,1.174 0.862,0.937 0.903,0.937 0.943,0.936 1,1 1,1 ") });
    if (isConnected) {
      openAccountModal();
    } else {
      openConnectModal();
    }
  }

  return (
    <header className=' fixed top-0 left-0 w-full z-50 flex justify-between items-center sm450:px-4 px-2 pl-5 py-3 bg-darkPry' style={{ boxShadow: "70px 6px 10px rgba(0,0,0,0.4)" }}>
      {/* LOGO */}
      <div className=" flex justify-center items-end">
        <Image src={'/Logo.png'} alt="Logo" className=" md:h-14 sm450:h-8 h-6 w-auto" width={100} height={100} />
        <p className='font-[family-name:var(--font-beat-word)] bg-gradient-to-b from-purplePry to-bluePry text-transparent bg-clip-text md:text-xl sm450:text-sm text-[10px]'>UMPZILLA</p>
      </div>
      {/* LOGO END */}

      {/* SEARCH */}
      <div className=" md:w-[30%] sm570:w-[50%] sm450:w-[30%] w-[35%] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
        <Image src={"/search.svg"} alt="search icon" width={40} height={40} className=" sm450:size-6 size-4 absolute z-10 cursor-pointer pointer-events-none top-1/2 sm450:left-3 left-2 -translate-y-1/2" />
        <input type="text" placeholder="Search for tokens" className={` w-full bg-blackPry rounded-xl text-white md:text-base sm:text-sm text-xs placeholder:text-white/25 outline-none focus:outline-bluePry sm450:px-12 px-6 sm450:pr-6 pr-2 py-2 font-bold ${mont.className}`} />
      </div>
      {/* SEARCH END */}

      {/* CONNECT BTN */}
      <button
        onClick={springAni}
        className={`${isConnected ? '' : 'font-cheese'} bg-gradient-to-r from-bluePry to-purplePry sm450:rounded-xl rounded-md md:text-lg text-xs sm450:px-4 px-2 sm450:py-2 py-1 text-white`}
      >
        {isConnected ? shortenAddress(address) : "CONNECT WALLET"}
      </button>

    </header>
  )
}

export default TopNav
