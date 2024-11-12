import React from 'react'
import CommentsInput from './CommentsInput'
import { commentData } from './commentsData'
import CommentItem from './commentItem'

const BottomCommentsSection = () => {
  return (
    <div id='bottomCommentSection' className=' w-full h-full overflow-scroll flex-shrink-0 relative z-10'>
      <CommentsInput/>
      <div className=' w-full space-y-3'>
        {commentData.map((data,i) => (
          <CommentItem data={data} key={i}/>
        ))}
      </div>
    </div>
  )
}

export default BottomCommentsSection
