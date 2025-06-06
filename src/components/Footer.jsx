'use client';
import { useState, useEffect, useRef } from "react";
import ChatDialog from "./ChatDialog";

export default function Footer(){
    const [showDialog, setShowDialog] = useState(false);

    return(
        <>
            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 bg-[#1ea61e] text-[#111811] text-base font-bold leading-normal tracking-[0.015em] min-w-0 px-2 gap-4 pl-4 pr-6 fixed right-6 bottom-3 z-50"
                onClick={() => setShowDialog(!showDialog)}
            >
                <div
                    className="text-[#111811]"
                    data-icon="ChatCircleDots"
                    data-size="24px"
                    data-weight="regular"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                    >
                        <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,
                            12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,
                            219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,
                            88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,
                            8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"
                        />
                    </svg>
                </div>
            </button>
            {showDialog && <ChatDialog />}
        </>
    );
}