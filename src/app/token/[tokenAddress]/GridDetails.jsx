'use client';

import React, { useEffect, useState } from 'react'
import BasicDetails from './components/basicDetails';
import MetricsDetails from './components/metricsDetails';
import GraphicDetails from './components/graphicDetails';
import BuySellDetails from './components/buysellDetails';
import HolderDetails from './components/holderDetails';



const GridDetails = ({tokenData}) => {


    useEffect(() => {
        // DYNAMICALLY UPDATE THE HEIGHT AND WIDTH OF THE IMAGES WITH THE PARENT MAIN DIV
        const mainVals = document.getElementById('ImgBg').getBoundingClientRect();
        const relativeHeightDiv = document.getElementById('relativeHeightDiv').getBoundingClientRect();
        document.querySelector('#rightDiv').style.height = `${relativeHeightDiv.height}px`
        let itemImg = document.querySelectorAll('#ImgBg .detailDiv .bgImgPart');
        itemImg.forEach((el) => {
            el.style.width = `${mainVals.width}px`;
            el.style.height = `${mainVals.height}px`;
        })
        // DYNAMICALLY GET THE POSITION OF EACH DIV AND ADJUST THE IMAGE ACCORDING TO THE RELATION BETWEEN PARENT AND EACH DIV
        let itemDivsVals = Array.from(document.querySelectorAll('#ImgBg .detailDiv')).map((el) => el.getBoundingClientRect());

        itemImg.forEach((el,i) => {
            el.style.top = `-${itemDivsVals[i].y-mainVals.y}px`
            el.style.left = `-${itemDivsVals[i].x-mainVals.x}px`
        })

        
    },[])



    return (
    <div id="ImgBg" className=" w-full relative z-10">
    <div className='flex md:flex-row flex-col justify-center items-center lg890md:gap-4 gap-2 '>
    <div id='relativeHeightDiv' className=" md:w-3/4 w-full grid md:grid-cols-3 grid-cols-2 lg890md:gap-4 gap-2 z-0">
        <BasicDetails tokenData={tokenData}/>
        <MetricsDetails tokenData={tokenData}/>
        <div className='col-span-3 md:block hidden'>
        <GraphicDetails/>
        </div>
        <div className=' md:hidden block'>
        <HolderDetails/>
        </div>
        <div className=' md:hidden block col-span-2'>
        <BuySellDetails tokenData={tokenData}/>
        </div>
    </div>
    <div id='rightDiv' className=" md:w-1/4 w-full md:flex hidden flex-col justify-center items-center lg890md:gap-4 gap-2 z-0">
        <BuySellDetails tokenData={tokenData}/>
        <div className=' w-full md:block hidden'>
        <HolderDetails/>
        </div>
    </div>
    </div>
    

</div>
  )
}

export default GridDetails
