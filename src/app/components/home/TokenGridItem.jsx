import { bebas, mont } from '@/app/layout'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const TokenGridItem = ({data}) => {

  return (
    <div className=" bg-darkPry lg890md:rounded-3xl rounded-2xl relative overflow-hidden">
{/* MAIN IMAGE */}
<Link href={`/token/${data?.token_address}`}>
    <div className=" w-full sm570:px-4 px-2 sm570:pt-6 pt-4  relative z-10 overflow-hidden">
    <Image src={`https://ipfs.io/ipfs/${data.properties.meta.image}`} alt="token" width={200} height={300} className=" w-full lg890md:rounded-t-3xl rounded-t-2xl"/>
    </div>
</Link>

{/* PERCENTAGE BAR */}
    <div className=" w-full mt-4 mb-1 sm570:px-4 px-2 relative z-10">
      <div className=" flex justify-between items-center gap-3">
        <div className=" flex-shrink flex-1 sm570:h-2 h-1 rounded-full bg-white/25 relative">
          <div className=" w-[30%] h-full rounded-full absolute top-0 left-0 bg-gradient-to-r from-[#67FFDA] to-[#B872FF]"></div>
        </div>
        <span className={` flex-shrink-0 ${mont.className} sm570:text-xs text-[10px] font-extrabold text-white`}>30.0%</span>
      </div>
    </div>

{/* NAME */}
<Link href={`/token/${data?.token_address}`}>
<h3 className={`${mont.className} font-extrabold text-white relative z-10 sm570:px-4 px-2 lg:text-lg sm570:text-base text-xs truncate`}>{data.name}</h3>
</Link>
{/* TOKEN BY */}
<Link href={`/token/${data?.token_address}`}>
<p className={`${bebas.className} ${((data.current_price - data.yesterday_price)*100)/data.yesterday_price < 0?" text-[#FF4A6B]":" text-bluePry"} lg:text-base sm570:text-sm text-[10px] relative z-10 sm570:px-4 px-2`}>CREATED BY {data.deployed_by.slice(0,6)}...{data.deployed_by.slice(data.deployed_by.length-4, data.deployed_by.length)}</p>
</Link>
{/* DESCRIPTION */}
<Link href={`/token/${data?.token_address}`}>
<p className={`${mont.className} lg:text-[10px] text-[8px] text-white/20 relative z-10 sm570:px-4 px-2 font-bold my-2 md:mb-16 mb-10`}>{data.properties.meta.description}</p>
</Link>
{/* SOCIALS */}
<div className=" w-1/2 sm570:px-4 sm450:px-2 px-2 sm570:pl-4 sm450:pl-2 pl-4 sm570:py-3 py-2 flex justify-between items-center gap-1 absolute bottom-0 left-0 z-10">
  <a href={data.properties.meta.social_media.twitter} target="_blank" rel="noopener noreferrer">
    <Image src={'/twitter.png'} alt="twitter" width={50} height={50} className=" 1xl:size-6 lg:size-5 sm570:size-4 size-3 object-contain object-center"/>
  </a>
  <a href={data.properties.meta.external_url} target="_blank" rel="noopener noreferrer">
    <Image src={'/web.png'} alt="web" width={50} height={50} className=" 1xl:size-6 lg:size-5 sm570:size-4 size-3 object-contain object-center"/>
  </a>
  <a href={data.properties.meta.social_media.telegram} target="_blank" rel="noopener noreferrer">
    <Image src={'/telegram.png'} alt="telegram" width={50} height={50} className=" 1xl:size-6 lg:size-5 sm570:size-4 size-3 object-contain object-center"/>
  </a>
</div>

{/* MARKET CAP */}
<div className={` text-white absolute z-20 w-fit whitespace-nowrap bottom-0 right-0 bg-gradient-to-l from-bluePry to-[#5E6EFF] lg890md:rounded-tl-3xl rounded-tl-2xl 1xl:px-8 lg:px-5 sm450:px-3 px-2 lg:pt-3 pt-2 lg:pb-3 pb-[6px] xl:text-lg lg:text-base sm570:text-sm text-[9px] ${bebas.className}`}>
  MARKET CAP 19K
  <div style={{maskImage:"linear-gradient(90deg, transparent, black)"}} className=" border-2 border-[#A0D2FF] w-full h-full absolute top-0 left-0 z-0 lg890md:rounded-tl-3xl rounded-tl-2xl lg890md:rounded-br-3xl rounded-br-2xl bg-transparent"></div>
</div>

{/* TOP PERCENTAGE */}
<div className={` text-white absolute z-20 top-0 left-0 bg-gradient-to-l from-bluePry to-[#5E6EFF] lg890md:rounded-br-3xl rounded-br-2xl px-8 py-1 sm570:text-lg text-xs ${bebas.className}`} style={{boxShadow:'5px 5px 10px rgba(0,0,0,0.3)'}}>
  {
    isNaN(((data.current_price - data.yesterday_price)*100)/data.yesterday_price)? 0
    :
  (((data.current_price - data.yesterday_price)*100)/data.yesterday_price).toFixed(2)
  }%

</div>

      {/* BORDER */}
      <div className=" pointer-events-none absolute z-0 top-0 left-0 w-full h-full bg-gradient-to-bl from-[#CFE8FF66] from-15% to-[#ffffff00] to-30% sm450:p-[2px] p-[1px]">
        <div className=" w-full h-full bg-darkPry lg890md:rounded-[23px] rounded-[15px]"></div>
      </div>
    </div>
  )
}




export default TokenGridItem
