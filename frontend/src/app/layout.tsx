'use client'

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { useState } from 'react';
import { Web3AuthProvider } from "@/clients/web3auth/web3auth";
import { WEB3AUTH_NETWORK_TYPE } from "@/clients/web3auth/config/web3AuthNetwork";
import { CHAIN_CONFIG_TYPE } from "@/clients/web3auth/config/chainConfig";
import { Web3Auth } from "@web3auth/modal";



const STORAGE_KEY = {
  WEB3AUTH_NETWORK: 'web3auth_network',
  BLOCKCHAIN: 'blockchain',
};

// function App() {
//   const savedNetwork = window.localStorage.getItem(STORAGE_KEY.WEB3AUTH_NETWORK) as WEB3AUTH_NETWORK_TYPE;
//   const savedChain = window.localStorage.getItem(STORAGE_KEY.BLOCKCHAIN) as CHAIN_CONFIG_TYPE;
//   const [web3AuthNetwork, setWeb3AuthNetwork] = useState<WEB3AUTH_NETWORK_TYPE>(savedNetwork || 'sapphire_mainnet');
//   const [chain, setChain] = useState<CHAIN_CONFIG_TYPE>(savedChain || 'calibration');
// }


const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const savedNetwork = window.localStorage.getItem(STORAGE_KEY.WEB3AUTH_NETWORK) as WEB3AUTH_NETWORK_TYPE;
  const savedChain = window.localStorage.getItem(STORAGE_KEY.BLOCKCHAIN) as CHAIN_CONFIG_TYPE;
  const [web3AuthNetwork, setWeb3AuthNetwork] = useState<WEB3AUTH_NETWORK_TYPE>(savedNetwork || 'sapphire_mainnet');
  const [chain, setChain] = useState<CHAIN_CONFIG_TYPE>(savedChain || 'calibration');

  // const networkChangeHandler = (network: WEB3AUTH_NETWORK_TYPE) => {
  //   window.localStorage.setItem(STORAGE_KEY.BLOCKCHAIN, network);
  //   setWeb3AuthNetwork(network);
  // }

  // const chainChangeHandler = (chain: CHAIN_CONFIG_TYPE) => {
  //   window.localStorage.setItem(STORAGE_KEY.BLOCKCHAIN, chain);
  //   setChain(chain);
  // }


  return (
    <html lang="en">
      <Web3AuthProvider chain={chain} web3AuthNetwork={web3AuthNetwork}>
        <body className={inter.className}>{children}</body>
      </Web3AuthProvider>
      
    </html>
  );
}
