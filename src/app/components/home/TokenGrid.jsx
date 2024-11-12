import React from 'react'
import TokenGridItem from './TokenGridItem'

const TokenGrid = ({tokens}) => {  
  return (
    <div className=" grid lg890md:grid-cols-4 sm450:grid-cols-3 grid-cols-2 gap-4 sm570:p-8 p-4">
    {tokens && tokens.map((data, i) => (
    <TokenGridItem key={i} data={data}/>
    ))}

    </div>
  )
}

export default TokenGrid
