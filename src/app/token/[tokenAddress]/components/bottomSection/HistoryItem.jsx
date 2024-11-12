import React from 'react'

const HistoryItem = ({data}) => {

    const timeAgo = (timestamp) => {
        const now = Date.now();
        const diffInMiliSeconds = now - new Date(timestamp);
      
        const minutes = Math.floor(diffInMiliSeconds / 600);
        const hours = Math.floor(diffInMiliSeconds / 36000);
        
      
        if (minutes < 0) {
          const date = new Date(timestamp);
          return date.toLocaleDateString();
        } else if (minutes < 60) {
          return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
        } else if (hours < 24) {
          return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
        } else {
          const date = new Date(timestamp);
          return date.toLocaleDateString();
        }
      }

  return (
    <div className='w-full min-w-[800px] grid grid-cols-6 p-4 text-center'>
      <p className=' bg-gradient-to-r from-[#E309CE] to-[#FF4A6B] bg-clip-text text-transparent font-bold'>{data.account.slice(0,4) + "..." + data.account.slice(data.account.length-4, data.account.length)}</p>
      {data.type==='SELL'?
      <p className=' bg-gradient-to-r from-[#FF718B] to-[#FF2F61] bg-clip-text text-transparent font-extrabold'>{data.type}</p>
      :
      <p className=' bg-gradient-to-r from-[#FFB72A] to-[#FFD47E] bg-clip-text text-transparent font-extrabold'>{data.type}</p>
      }
      <p className=' font-bold text-white'>{data.trx}</p>
      <p className=' font-extrabold text-white'>{data.promotion}</p>
      <p className=' font-bold text-white'>{timeAgo(data.date)}</p>
      <p className=' bg-gradient-to-r from-[#E309CE] to-[#FF4A6B] bg-clip-text text-transparent font-bold'>{data.transaction.slice(0,7) + "..." + data.transaction.slice(data.transaction.length-4, data.transaction.length)}</p>
      
    </div>
  )
}

export default HistoryItem
