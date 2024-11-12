import { mont } from '@/app/layout'
import React from 'react'
import { historyData } from './historyData'
import HistoryItem from './HistoryItem'

const BottomHistorySection = () => {
    
  return (
    <div id='bottomHistorySection' className={` w-full flex-shrink-0 overflow-scroll h-full pb-4 rounded-3xl shadow-2xl bg-blackPry ${mont.className}`}>
      <div className=' min-w-[800px] w-full grid grid-cols-6 p-4 text-center rounded-t-3xl bg-[#191919] sticky top-0 left-0' style={{boxShadow:"0px 5px 10px rgba(0,0,0,0.4)"}}>
        <p className=' bg-gradient-to-b from-bluePry to-[#5E6EFF] bg-clip-text text-transparent font-extrabold'>ACCOUNT</p>
        <p className=' bg-gradient-to-b from-bluePry to-[#5E6EFF] bg-clip-text text-transparent font-extrabold'>TYPE</p>
        <p className=' bg-gradient-to-b from-bluePry to-[#5E6EFF] bg-clip-text text-transparent font-extrabold'>TRX</p>
        <p className=' bg-gradient-to-b from-bluePry to-[#5E6EFF] bg-clip-text text-transparent font-extrabold'>PROMOTION</p>
        <p className=' bg-gradient-to-b from-bluePry to-[#5E6EFF] bg-clip-text text-transparent font-extrabold'>DATE</p>
        <p className=' bg-gradient-to-b from-bluePry to-[#5E6EFF] bg-clip-text text-transparent font-extrabold'>TRANSACTION</p>
      </div>
      {historyData.map((data,i) => (
        <HistoryItem data={data} key={i}/>
      ))}
    </div>
  )
}

export default BottomHistorySection
