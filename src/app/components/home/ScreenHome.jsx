'use client';

// import { useState } from "react/cjs/react.development";
import { useEffect, useState } from "react"
import TokenFilter from "./TokenFilter"
import TokenGrid from "./TokenGrid"

const ScreenHome = ({tokens, prices}) => {

  const [tokenFilters, settokenFilters] = useState({
    primaryFilter:'LaunchedT',
    UniswapListed:true,
    order:'asc'
  })
  const [filteredTokens, setfilteredTokens] = useState([]);


  useEffect(() => {
    // Combine tokens and prices into a new array
    let newtokenArr = tokens?.map((tokenData) => {
      tokenData.current_price = 0;
      tokenData.yesterday_price = 0;
      let idx = prices?.map(obj => obj?.token_address).indexOf(tokenData?.token_address);
  
      if (idx !== -1) {
        tokenData.current_price = prices[idx].current_price;
        tokenData.yesterday_price = prices[idx].yesterday_price;
      }
  
      return tokenData;
    });
  
    // Apply sorting based on tokenFilters
    if (tokenFilters.primaryFilter === 'LaunchedT') {
      newtokenArr.sort((a, b) => {
        if (tokenFilters.order === 'asc') {
          return new Date(a.properties.meta.launchTime) - new Date(b.properties.meta.launchTime);
        } else {
          return new Date(b.properties.meta.launchTime) - new Date(a.properties.meta.launchTime);
        }
      });
    }
  
    if (tokenFilters.primaryFilter === '24HPI') {
      newtokenArr.sort((a, b) => {
        let changeA = a.current_price - a.yesterday_price;
        let changeB = b.current_price - b.yesterday_price;
        if (tokenFilters.order === 'asc') {
          return changeA - changeB;
        } else {
          return changeB - changeA;
        }
      });
    }
  
    // Update the filteredTokens state once all logic is applied
    setfilteredTokens(newtokenArr);
  
  }, [tokens, prices, tokenFilters]);
  
  
  return (
    <div className=" w-full">
      <TokenFilter tokenFilters={tokenFilters} settokenFilters={settokenFilters}/>
      <TokenGrid tokens={filteredTokens}/>
    </div>
  )
}

export default ScreenHome
