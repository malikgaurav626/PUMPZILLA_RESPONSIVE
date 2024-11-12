'use client';

import React, { useEffect } from 'react'
import GraphicDetails from './components/graphicDetails'
import BottomDetails from './components/bottomSection/bottomDetails'

const BottomSectionWIthGraphicalSec = () => {

    useEffect(() => {
        const mainVals = document.getElementById('mobileBottomImg').getBoundingClientRect();
        let itemImg = document.querySelectorAll('#mobileBottomImg .detailDiv .bgImgPart');
        itemImg.forEach((el) => {
            el.style.width = `${mainVals.width}px`;
            el.style.height = `${mainVals.height}px`;
        })
        // DYNAMICALLY GET THE POSITION OF EACH DIV AND ADJUST THE IMAGE ACCORDING TO THE RELATION BETWEEN PARENT AND EACH DIV
        let itemDivsVals = Array.from(document.querySelectorAll('#mobileBottomImg .detailDiv')).map((el) => el.getBoundingClientRect());

        itemImg.forEach((el,i) => {
            el.style.top = `-${itemDivsVals[i].y-mainVals.y}px`
            el.style.left = `-${itemDivsVals[i].x-mainVals.x}px`
        })
    },[])

  return (
    <div id='mobileBottomImg' className=" w-full relative z-0">
    <div className=" md:hidden block w-full pt-4">
    <GraphicDetails/>
    </div>
    <BottomDetails/>
    </div>
  )
}

export default BottomSectionWIthGraphicalSec
