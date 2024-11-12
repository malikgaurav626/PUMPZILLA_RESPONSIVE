import { bebas, mont } from '@/app/layout'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BasicDetails = ({tokenData}) => {
  return (
    <div className=" detailDiv col-span-2 lg890md:rounded-3xl rounded-2xl bg-darkPry p-4 relative xl:h-72 lg890md:h-60 h-52 overflow-hidden flex justify-center items-center gap-3">
        <Image src={`https://ipfs.io/ipfs/${tokenData.properties.meta.image}`} alt='token' width={100} height={120} className=' h-full w-1/2 min-w-32 object-cover object-center rounded-3xl relative z-10'/>
        <div className={`${mont.className} lg:flex-1 lg:w-auto w-[65%] h-full relative z-10`}>
            <h6 className=' font-extrabold text-white lg:text-xl lg890md:text-base text-sm lg:w-full w-3/4'>{tokenData.name}</h6>
            <p className=' text-transparent bg-gradient-to-r from-[#5E6EFF] to-bluePry bg-clip-text font-bold w-fit lg:text-base lg890md:text-sm text-xs'>$ PROMOTION</p>

            <p className=' text-white/30 truncate font-bold lg890md:text-base text-xs py-1 w-[90%]'>Created by: <span className={`${bebas.className} text-white`}>{tokenData.deployed_by}</span></p>
            <div className=' lg:w-full w-[90%] flex justify-start items-center gap-2'>
                <p className=' text-white/30 font-bold truncate lg890md:text-base text-xs'>Contract: <span className={`${bebas.className} text-white`}>{tokenData.token_address}</span></p>
                {/* COPY AND LINK BUTTON */}
                <button onClick={()=> navigator.clipboard.writeText(tokenData.token_address)} className=' bg-blackPry rounded-lg p-1 flex justify-center items-center shrink-0' style={{boxShadow:"4px 4px 5px rgba(0,0,0,0.4)"}}><Image src={'/copy.png'} alt='Copy' width={20} height={20} className=' shrink-0 size-4'/></button>
                <button className=' bg-blackPry rounded-lg p-1 flex justify-center items-center shrink-0' style={{boxShadow:"4px 4px 5px rgba(0,0,0,0.4)"}}><Image src={'/link.png'} alt='link' width={20} height={20} className=' shrink-0 size-4'/></button>
            </div>

            <p className=' font-bold text-white/30 xl:pt-4 pt-1 lg:text-xl lg890md:text-lg text-sm lg:w-full w-3/4'>Market Cap</p>
            <p className=' w-fit bg-gradient-to-r from-[#E309CE] to-[#A647E1] bg-clip-text text-transparent font-extrabold lg:text-2xl lg890md:text-xl text-base xl:pb-4 pb-1'>$ 16.9k</p>

            <div className=' flex justify-center items-center gap-3 xl:pt-2 pt-1'>
                <Link href={tokenData.properties.meta.external_url}>
                    <button className=' flex justify-center items-center gap-2 bg-gradient-to-r from-[#5E6EFF] to-bluePry md:rounded-xl rounded-md p-1 lg:px-4 px-2 lg:text-base lg890md:text-sm text-[10px]'>
                        <Image src={'/web.png'} alt='website' width={20} height={20} className=' lg:size-5 size-3 object-contain object-center'/>
                        <span className={`${bebas.className}`}>WEBSITE</span>
                    </button>
                </Link>
                <Link href={tokenData.properties.meta.social_media.twitter}>
                    <button className=' flex justify-center items-center gap-2 bg-gradient-to-r from-[#5E6EFF] to-bluePry md:rounded-xl rounded-md p-1 lg:px-4 px-2 lg:text-base lg890md:text-sm text-[10px]'>
                        <Image src={'/twitter.png'} alt='website' width={20} height={20} className=' lg:size-5 size-3 object-contain object-center'/>
                        <span className={`${bebas.className}`}>TWITTER</span>
                    </button>
                </Link>
                <Link href={tokenData.properties.meta.social_media.telegram}>
                    <button className=' flex justify-center items-center gap-2 bg-gradient-to-r from-[#5E6EFF] to-bluePry md:rounded-xl rounded-md p-1 lg:px-4 px-2 lg:text-base lg890md:text-sm text-[10px]'>
                        <Image src={'/telegram.png'} alt='website' width={20} height={20} className=' lg:size-5 size-3 object-contain object-center'/>
                        <span className={`${bebas.className}`}>TELEGRAM</span>
                    </button>
                </Link>
            </div>
        </div>


    <Image src={'/city.png'} alt="city" width={400} height={200} className="bgImgPart pointer-events-none max-w-none left-0 top-0 absolute z-0 object-cover object-top mix-blend-color-dodge"/>

</div>
  )
}

export default BasicDetails
