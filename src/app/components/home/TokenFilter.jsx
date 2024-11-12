import gsap from "gsap";
import TokenFilterMobileMenu from "./tokenFilterMobileMenu";
import { Bebas_Neue } from "next/font/google";



const bebas = Bebas_Neue({subsets:['latin'], weight:['400']})
const TokenFilter = ({tokenFilters, settokenFilters}) => {

  const changePrimaryFilters = (filter) => {
    let newFilter = {...tokenFilters};
    newFilter.primaryFilter = filter;
    let ValArr = Array.from(document.querySelectorAll('.homepageFilterBtn')).map((el) => {
      let vals = el.getBoundingClientRect();      
      return {left:vals.x, width:vals.width}
    })
    if(filter==="LaunchedT") {
      gsap.to('#FilterBottomBar', {left:`${ValArr[0].left-(window.innerWidth>570?70:4)}px`, width:`${ValArr[0].width+10}px`})
    }
    if(filter==="TradingV") {
      gsap.to('#FilterBottomBar', {left:`${ValArr[1].left-(window.innerWidth>570?70:4)}px`, width:`${ValArr[1].width+10}px`})
    }
    if(filter==="MarketC") {
      gsap.to('#FilterBottomBar', {left:`${ValArr[2].left-(window.innerWidth>570?70:4)}px`, width:`${ValArr[2].width+10}px`})
    }
    if(filter==="24HPI") {
      gsap.to('#FilterBottomBar', {left:`${ValArr[3].left-(window.innerWidth>570?70:4)}px`, width:`${ValArr[3].width+10}px`})
    }
    settokenFilters(newFilter);
  }
  const changeUniswapListed = () => {
    let newFilter = {...tokenFilters};
    newFilter.UniswapListed = !newFilter.UniswapListed;
    settokenFilters(newFilter);
  }
  const changeOrder = (filter) => {
    let newFilter = {...tokenFilters};
    newFilter.order = filter;
    settokenFilters(newFilter);
  }
  
  return (
    <div className="  w-full flex justify-between items-center sm450:p-4 p-2 border-b-2 border-[#242628] relative">
    <div className={` flex justify-center items-center sm570:gap-4 gap-2 sm570:text-base text-xs ${bebas.className}`}>
      <button onClick={() => changePrimaryFilters('LaunchedT')} className={` homepageFilterBtn rounded-[10px] bg-darkPry px-2 py-1 ${tokenFilters.primaryFilter==='LaunchedT'?" text-white":" text-white/25"}`}>LAUNCHED TIME</button>
      <button onClick={() => changePrimaryFilters('TradingV')} className={` homepageFilterBtn rounded-[10px] bg-darkPry px-2 py-1 ${tokenFilters.primaryFilter==='TradingV'?" text-white":" text-white/25"}`}>TRADING VOLUME</button>
      <button onClick={() => changePrimaryFilters('MarketC')} className={` homepageFilterBtn rounded-[10px] bg-darkPry px-2 py-1 ${tokenFilters.primaryFilter==='MarketC'?" text-white":" text-white/25"}`}>MARKET CAP</button>
      <button onClick={() => changePrimaryFilters('24HPI')} className={` homepageFilterBtn rounded-[10px] bg-darkPry px-2 py-1 ${tokenFilters.primaryFilter==='24HPI'?" text-white":" text-white/25"}`}>24H PRICE INCREASE</button>
      <div id="FilterBottomBar" className=" absolute top-full left-[0.25%] md:w-28 w-20 h-[2px] rounded-full bg-[#FFD47E]"/>
    </div>
    <div className=" lg890md:flex hidden justify-center items-center gap-4 font-beat">

    {/* LISTED ON UNISWAP BUTTON */}
      <button onClick={changeUniswapListed} className='bg-[#2C2D30] rounded-xl flex justify-center items-center gap-2 px-2 py-1'>
        <div className="  rounded-full flex justify-center items-center p-1 border border-white pointer-events-none">
          <div className={` size-2 rounded-full ${tokenFilters.UniswapListed?"bg-gradient-to-b from-bluePry to-[#5E6EFF]":" bg-transparent"}`}/>
        </div>
        <span className=" bg-gradient-to-r from-bluePry to-[#5E6EFF] bg-clip-text text-transparent">LISTED ON UNISWAP</span>
      </button>
    {/* LISTED ON UNISWAP BUTTON END */}

    {/* ASC & DESC BUTTON */}
    <button onClick={() => changeOrder('asc')} className={` px-2 py-1 rounded-xl min-w-16  ${tokenFilters.order==="asc"?"bg-gradient-to-r from-bluePry to-[#5E6EFF] text-white":"bg-[#2C2D30] text-white/30"}`}>ASC</button>
    <button onClick={() => changeOrder('desc')} className={` px-2 py-1 rounded-xl min-w-16  ${tokenFilters.order==="desc"?"bg-gradient-to-r from-bluePry to-[#5E6EFF] text-white":"bg-[#2C2D30] text-white/30"}`}>DESC</button>
    
    </div>

    <TokenFilterMobileMenu changeUniswapListed={changeUniswapListed} tokenFilters={tokenFilters} changeOrder={changeOrder}/>
</div> 
  )
}

export default TokenFilter
