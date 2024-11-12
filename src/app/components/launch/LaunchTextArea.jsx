import { bebas } from '@/app/layout'
import { useEffect, useState } from 'react'

const LaunchTextArea = ({name, font, bgClr, required, type, DebounceChange}) => {
    const [isFocus, setisFocus] = useState(false)
    const [Hsmall, setHsmall] = useState(false);
    useEffect(() => {
      if(window) {
        if(window.innerHeight<650) {
          setHsmall(true);
        }
        else {
          setHsmall(false);
        }
      }
    },[])

  return (
    <div data-name={`${name}`} className={` w-full ${Hsmall?" md:h-[13dvh] h-[10dvh]":"md:h-[20dvh] h-[10dvh]"} relative rounded-2xl md:my-3 my-0 md:mb-3 sm570:mb-2 mb-0 formInput ${isFocus? 'active':''}`} style={{backgroundColor:`${bgClr}`}}>
    {font==="beat"? 
    <> 
        <textarea cols="30" onFocus={() => setisFocus(true)} onBlur={() => setisFocus(false)} onChange={(e) => DebounceChange(name, e.target.value)} required={required} type={type} className=" h-full outline-none w-full relative z-10 rounded-[15px] md:text-xl text-base p-3 md:pt-8 pt-6 font-beat" style={{backgroundColor:`${bgClr}`}} />
        <span className={` absolute z-20 ${isFocus?"md:top-2 top-1 text-transparent bg-gradient-to-r":"md:top-2 top-1 text-white/30 bg-transparent"} from-[#FF4672] to-[#B872FF] bg-clip-text origin-top-left left-3 lg:text-xl md:text-lg text-base pointer-events-none transition-all duration-300 ease-in-out font-beat`}>{name}{required? <span className=" text-red-600">*</span>:""}</span>
    </>
        :
        <>
        <textarea cols="30" onFocus={() => setisFocus(true)} onBlur={() => setisFocus(false)} onChange={(e) => DebounceChange(name, e.target.value)} required={required} type={type} className={` h-full outline-none w-full relative z-10 rounded-[15px] md:text-xl text-base p-3 md:pt-8 pt-6 ${bebas.className}`} style={{backgroundColor:`${bgClr}`}} />
        <span className={` absolute z-20 ${isFocus?"md:top-2 top-1 text-transparent bg-gradient-to-r":"md:top-2 top-1 text-white/25 bg-transparent"} from-[#FF4672] to-[#B872FF] bg-clip-text origin-top-left left-3 lg:text-xl md:text-lg text-base pointer-events-none transition-all duration-300 ease-in-out ${bebas.className}`}>{name}{required? <span className=" text-red-600">*</span>:""}</span>
        </>
    }

    </div>
  )
}

export default LaunchTextArea
