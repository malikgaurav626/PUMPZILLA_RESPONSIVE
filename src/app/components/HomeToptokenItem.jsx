'use client';

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { mont } from '../layout'
import { useRouter } from 'next/navigation'
import { Bebas_Neue } from 'next/font/google';

const bebas = Bebas_Neue({subsets:['latin'], weight:['400']})
const HomeToptokenItem = ({data}) => {
  const router = useRouter();
  return (
    <div className=" h-full bg-darkPry lg:rounded-2xl rounded-xl relative overflow-hidden">
{/* MAIN IMAGE */}
<Link className=' h-full' href={`/token/${data?.token_address}`}>
    <div className=" w-full px-2 sm570:pt-3 pt-2 relative z-10 overflow-hidden">
    <Image src={`https://ipfs.io/ipfs/${data?.properties.meta.image}`} alt="token" width={200} height={300} className=" w-full lg:rounded-t-2xl rounded-t-xl"/>
    </div>
</Link>

{/* PERCENTAGE BAR */}
    <div className=" w-full sm450:mt-1 mt-[2px] sm570:mb-1 px-2 relative z-10">
      <div className=" flex justify-between items-center gap-2">
        <div className=" flex-shrink flex-1 h-1 rounded-full bg-white/25 relative">
          <div className=" w-[30%] h-full rounded-full absolute top-0 left-0 bg-gradient-to-r from-[#67FFDA] to-[#B872FF]"></div>
        </div>
        <span className={` flex-shrink-0 ${mont.className} xl:text-[10px] text-[8px] font-extrabold text-white`}>30.0%</span>
      </div>
    </div>

{/* NAME */}
<Link className=' h-full' href={`/token/${data?.token_address}`}>
<h3 className={`${mont.className} font-extrabold text-white relative z-10 px-2 xl:text-sm lg:text-xs text-[7px] truncate`}>{data?.name}</h3>
</Link>
{/* TOKEN BY */}
<Link className=' h-full' href={`/token/${data?.token_address}`}>
<p className={`${bebas.className} ${((data?.current_price - data?.yesterday_price)*100)/data?.yesterday_price < 0?" text-[#FF4A6B]":" text-bluePry"} xl:text-xs lg:text-[10px] text-[6px] relative z-10 px-2`}>CREATED BY {data?.deployed_by.slice(0,6)}...{data?.deployed_by.slice(data?.deployed_by.length-4, data?.deployed_by.length)}</p>
</Link>

{/* SOCIALS */}
<div className=" w-1/2 xl:px-3 px-1 lg:pl-4 pl-2 xl:py-3 lg:py-2 sm570:py-[10px] sm450:py-2 py-[6px] flex justify-between items-center gap-1 absolute bottom-0 left-0 z-10">
  <p onClick={()=> router.push(data?.properties.meta.social_media.twitter)}>
    <Image src={'/twitter.png'} alt="twitter" width={50} height={50} className=" lg:size-3 size-2 object-contain object-center"/>
  </p>
  <p onClick={()=> router.push(data?.properties.meta.external_url)}>
    <Image src={'/web.png'} alt="web" width={50} height={50} className=" lg:size-3 size-2 object-contain object-center"/>
  </p>
  <p onClick={()=> router.push(data?.properties.meta.social_media.telegram)}>
    <Image src={'/telegram.png'} alt="telegram" width={50} height={50} className=" lg:size-3 size-2 object-contain object-center"/>
  </p>
</div>

{/* MARKET CAP */}
<div className={` text-white absolute z-20 w-fit whitespace-nowrap sm450:bottom-[2px] bottom-[1px] sm450:right-[2px] right-[1px] bg-gradient-to-l from-[#FF4A6B] to-[#E30958] lg:rounded-tl-2xl rounded-tl-xl lg:rounded-br-[15px] rounded-br-[11px] xl:px-3 px-2 sm570:py-2 py-1 xl:text-[12px] lg:text-[8px] text-[7px] ${bebas.className}`}>
  MARKET CAP 19K
  <div style={{maskImage:"linear-gradient(135deg, transparent 40%, black)"}} className=" border-2 border-[#FFA0B1] w-full h-full absolute top-0 left-0 z-0 lg:rounded-tl-2xl rounded-tl-xl lg:rounded-br-[15px] rounded-br-[11px] bg-transparent"></div>
</div>

{/* TOP PIN */}
<Image src={'/crown.png'} alt=' crown' width={20} height={20} className=' absolute top-2 left-2 size-7 z-20'/>



      {/* BORDER */}
      <div className=" pointer-events-none absolute z-0 top-0 left-0 w-full h-full bg-gradient-to-b from-[#FFB72A] from-5% via-[#FFB72A] via-50% to-[#FFB72A] to-95% sm450:p-[2px] p-[1px]">
        <div className=" w-full h-full bg-darkPry lg:rounded-[15px] rounded-[11px]"></div>
      </div>
    </div>

  )
}

export default HomeToptokenItem
