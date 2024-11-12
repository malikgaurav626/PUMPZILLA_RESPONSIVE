import React, { useEffect, useRef } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';
import TopHeading from './TopHeading';

const GraphicDetails = () => {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        backgroundColor: "#253248"
      },
      crosshair: {
        mode: CrosshairMode.Normal
      },
      priceScale: {
        borderColor: "#485c7b"
      },
      timeScale: {
        borderColor: "#485158"
      },
      watermark: {
        text: "PumpZilla",
        fontSize: 156,
        color: "black",
        visible: true
      },
      grid: {
        vertLines: { color: 'rgba(197, 203, 206, 0.5)' },
        horzLines: { color: 'rgba(197, 203, 206, 0.5)' },
      },
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: '#4CAF50',
      downColor: '#FF5252',
      borderUpColor: '#4CAF50',
      borderDownColor: '#FF5252',
      wickUpColor: '#4CAF50',
      wickDownColor: '#FF5252',
    });

    const { initialData, realtimeUpdates } = generateData(2500, 20, 1000);
    candleSeries.setData(initialData);

    function* getNextRealtimeUpdate(data) {
      for (const update of data) {
        yield update;
      }
      return null;
    }

    const streamingDataProvider = getNextRealtimeUpdate(realtimeUpdates);
    const intervalID = setInterval(() => {
      const update = streamingDataProvider.next();
      if (update.done) {
        clearInterval(intervalID);
        return;
      }
      candleSeries.update(update.value);
    }, 100);

    const handleResize = () => {
      chart.resize(chartContainerRef.current.clientWidth, chartContainerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
      clearInterval(intervalID);
    };
  }, []);

  return (
    <div
      className="detailDiv lg890md:rounded-3xl rounded-2xl bg-darkPry p-4 relative z-0 overflow-hidden sm:h-[80dvh] h-[50vh] bgImgPart"
      style={{
        backgroundImage: 'url(/city.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        backgroundBlendMode: 'color-dodge',
      }}
    >
      <TopHeading text="GRAPHICAL VIEW" />
      <div
        ref={chartContainerRef}
        className="absolute inset-0 z-10"
        style={{ height: '100%', width: '100%' }}
      ></div>
    </div>
  );
};

export default GraphicDetails;

// Additional functions for data generation
let randomFactor = 25 + Math.random() * 25;

const samplePoint = (i) =>
  i *
    (0.5 +
      Math.sin(i / 1) * 0.2 +
      Math.sin(i / 2) * 0.4 +
      Math.sin(i / randomFactor) * 0.8 +
      Math.sin(i / 50) * 0.5) +
  200 +
  i * 2;

function generateData(numberOfCandles = 500, updatesPerCandle = 5, startAt = 100) {
  const createCandle = (val, time) => ({
    time,
    open: val,
    high: val,
    low: val,
    close: val,
  });

  const updateCandle = (candle, val) => ({
    time: candle.time,
    close: val,
    open: candle.open,
    low: Math.min(candle.low, val),
    high: Math.max(candle.high, val),
  });

  randomFactor = 25 + Math.random() * 25;
  const date = new Date(Date.UTC(2018, 0, 1, 12, 0, 0, 0));
  const numberOfPoints = numberOfCandles * updatesPerCandle;
  const initialData = [];
  const realtimeUpdates = [];
  let lastCandle;
  let previousValue = samplePoint(-1);

  for (let i = 0; i < numberOfPoints; ++i) {
    if (i % updatesPerCandle === 0) {
      date.setUTCDate(date.getUTCDate() + 1);
    }
    const time = date.getTime() / 1000;
    let value = samplePoint(i);
    const diff = (value - previousValue) * Math.random();
    value = previousValue + diff;
    previousValue = value;

    if (i % updatesPerCandle === 0) {
      const candle = createCandle(value, time);
      lastCandle = candle;
      if (i >= startAt) {
        realtimeUpdates.push(candle);
      }
    } else {
      const newCandle = updateCandle(lastCandle, value);
      lastCandle = newCandle;
      if (i >= startAt) {
        realtimeUpdates.push(newCandle);
      } else if ((i + 1) % updatesPerCandle === 0) {
        initialData.push(newCandle);
      }
    }
  }

  return { initialData, realtimeUpdates };
}
