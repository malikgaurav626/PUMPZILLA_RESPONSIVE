'use client';

import Image from "next/image";


const LeftBGImg = () => {


  return (
    <div className="absolute z-0 top-0 left-0 md:pt-24 pt-16 md:pl-20 pl-4 pb-4 md:pr-0 pr-4 w-full h-full rounded-3xl pointer-events-none">

      <div className="md:h-full h-[43%] xl:w-[50%] md:w-[40%] w-full relative  text-white rounded-3xl overflow-hidden">
        <div className=" h-full w-full md:-skew-x-12 md:skew-y-0 skew-y-6 absolute md:top-0 top-[-13%] xl:left-[-8%] lg:left-[-9%] lg890md:left-[-11%] md:left-[-13%] left-0 rounded-3xl overflow-hidden">
            <Image src={'/launchLeft.png'} alt=" cyberpunk city" width={600} height={600} className=" w-full md:h-full h-[120%] relative xl:left-[8%] lg:left-[9%] lg890md:left-[11%] md:left-[13%] left-0 md:top-0 top-[-2%] object-cover object-bottom md:skew-x-12 md:skew-y-0 -skew-y-6"/>
        </div>
      </div>
    </div>
  );
};

export default LeftBGImg;
