"use client";

import { Bebas_Neue, Montserrat } from 'next/font/google';
import localFont from "next/font/local";
import { HomeNavWrapper } from "./components/HomeNav";
import TopNav from "./components/TopNav";
import { http } from 'wagmi';
import Script from 'next/script';  // Import the Script component

import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';

import {
  darkTheme,
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  holesky,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

export const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: '6c64394fa27e3bc47b22154fe429af48',
  chains: [holesky],
  transports: {
    [holesky.id]: http('https://holesky.gateway.tenderly.co'),
  },
  ssr: true,
});

const queryClient = new QueryClient();

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const beatWord = localFont({
  src: './fonts/Beat Word demo.ttf',
  variable: '--font-beat-word',
  weight: '100 900',
});
const cheese = localFont({
  src: './fonts/CHEESEBURGA demo.ttf',
  variable: '--font-cheese-burga',
  weight: '100 900',
});

export const mont = Montserrat({ subsets: ['cyrillic'], adjustFontFallback: false, display: 'swap' })
export const bebas = Bebas_Neue({ subsets: ['latin'], weight: ['400'], adjustFontFallback: false, display: 'swap' })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${beatWord.variable} ${cheese.variable} antialiased`}
      >
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider theme={darkTheme()}>
              <TopNav />
              <aside className=" fixed z-40 md:top-0 bottom-0 left-0 md:h-dvh h-12 md:w-16 w-screen md:pt-40 md:pb-4 pb-2 md:px-0 px-3 bg-darkPry flex justify-center items-center">
                <HomeNavWrapper />
              </aside>
              {children}
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
