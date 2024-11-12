import { bebas, mont } from '@/app/layout'
import Image from 'next/image'
import React, { useState } from 'react'
import CommentHeading from './commentHeading'

const CommentsInput = () => {
    const [characters, setcharacters] = useState('')

    const commentSubmit = (e) => {
        e.preventDefault();
    }
  return (
    <form onSubmit={commentSubmit} className=' rounded-3xl overflow-hidden relative w-full bg-blackPry p-4 pt-12 mb-4'>
    <CommentHeading text={'Your ID'}/>
      <textarea cols={4} required type="text" onChange={(e) => setcharacters(e.target.value)} value={characters} placeholder='WRITE YOUR COMMENT' maxLength={256} className={` h-28 w-full outline-none bg-transparent text-white placeholder:text-white/30 ${bebas.className}`} />
      <div className=' flex justify-between items-center'>
        <p className={` text-white/30 ${bebas.className}`}>{characters.length}/256</p>
        <div className=' flex justify-center items-center gap-4'>
            <Image src={'/emoji.png'} alt='smile' width={20} height={20} className=' size-5'/>
            <button type='submit' className={` rounded-xl px-4 py-1 bg-gradient-to-r from-bluePry to-[#5E6EFF] text-white ${mont.className} font-extrabold`}>SUBMIT</button>
        </div>
      </div>
    </form>
  )
}

export default CommentsInput
