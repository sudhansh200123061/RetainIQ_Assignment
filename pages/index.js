
import { Inter } from "next/font/google";
import React from 'react';
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import Body from "../components/Body"

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
  
    <div className="flex h-screen">
      <Sidebar/>
      <div className= "flex-1 ml-[70px]">

        {/* header */}
        <Header/>
        {/* body */}
        <Body/>

      </div>
    </div>
  );
}
