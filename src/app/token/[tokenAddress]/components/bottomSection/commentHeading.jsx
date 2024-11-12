import { mont } from '@/app/layout'
import React from 'react'

const CommentHeading = ({text}) => {
  if(text.length>10) {
    text = text.slice(0,4) + '...' + text.slice(text.length-4, text.length)
  }
  return (
    <div className={`${mont.className} whitespace-nowrap font-extrabold md:py-2 py-1 px-8 md:text-sm text-[9px] absolute z-20 top-0 left-0 rounded-ee-3xl bg-gradient-to-r from-[#5E6EFF] to-bluePry text-white`} style={{boxShadow:"7px 8px 10px rgba(0,0,0,0.4)"}}>
        {text}
    </div>
  )
}

export default CommentHeading
