'use client';

import Image from "next/image";


const RightBGImg = () => {


  return (
    <div className="absolute z-0 md:top-0 md:bottom-auto bottom-0 left-0 md:pt-24 md:pb-4 pb-14 pr-4 md:pl-0 pl-4 w-full h-full rounded-3xl pointer-events-none flex md:flex-row flex-col justify-end items-center">

      <div className="md:h-full sm570:h-[58%] h-[69%] xl:w-[54%] md:w-[53%] w-full relative  text-white rounded-3xl overflow-hidden md:ml-auto">
        <div className=" h-full w-full md:-skew-x-12 md:skew-y-0 skew-y-6 absolute md:top-0 top-[23%] md:right-[-8%] right-1 rounded-3xl overflow-hidden bg-[#070707]">
            <Image src={'/launchRight.png'} alt=" cyberpunk city" width={600} height={600} className=" w-full h-full relative md:right-[8%] right-0 md:top-0 top-[-24%] object-cover object-bottom md:skew-x-12 md:skew-y-0 -skew-y-6"/>
        </div>
      </div>
    </div>
  );
};

export default RightBGImg;
