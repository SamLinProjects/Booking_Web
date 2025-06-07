'use client';
import { useState, useEffect, useRef } from "react";
import ChatDialog from "./ChatDialog";

export default function Footer(){
    const [showDialog, setShowDialog] = useState(false);

    return(
        <>
        <button onClick={() => setShowDialog(!showDialog)} 
        className={`flex max-w-[480px]cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 text-[#111811] text-base font-bold 
        leading-normal tracking-[0.015em] min-w-0 px-2 gap-4 pl-5 pr-5 fixed right-6 bottom-3 z-50 transition duration-800 ease-in-out ${showDialog? "bg-[#c422c9]":"bg-[#1ea61e]"}`}>
          <div className="relative w-8 h-8 overflow-hidden text-[#111811] ">
          <div
            className="transition-transform duration-300 flex ease-in-out w-[200%]"
            style={{
              transform: `translateX(${showDialog ? "-50%" : "0%"})`
            }}>
            <svg
              className="w-8 h-8 text-[#111811] transition-transform duration-300 ease-in-out hover:scale-120"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z" />
            </svg>
            <svg
              className="w-8 h-8 text-[#111811] transition-transform duration-300 ease-in-out hover:scale-120"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="10 10 42 42"
              fill="currentColor"
              preserveAspectRatio="xMidYMid meet"
            >
              <path d="M32 12C22.05 12 14 20.05 14 30s8.05 18 18 18 18-8.05 18-18S41.95 12 32 12zm0 2c8.82 0 16 7.18 16 16s-7.18 16-16 16S16 38.82 16 30 23.18 14 32 14zm0 4a12 12 0 0 0-12 12h4a8 8 0 0 1 8-8v-4zm0 24a12 12 0 0 0 12-12h-4a8 8 0 0 1-8 8v4zm-8-12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4h-4zm8 8a8 8 0 0 1-8-8h4a4 4 0 0 0 4 4v4z" />
            </svg>
          </div>
          </div>
        </button>
        {showDialog && <ChatDialog />}
        </>
    );
}