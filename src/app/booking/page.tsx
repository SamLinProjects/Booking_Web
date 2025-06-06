"use client";
import React from "react";
import Items from "@/src/components/Items"

export default function Page(){

    return(
        <div className="mt-20 layout-container flex h-full grow flex-col" style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
        <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72 text-center">
                Your Bookings
            </p>
            <div className="flex flex-wrap justify-between gap-3 p-4">
            </div>
            <div className="pb-3 flex border-b border-[#3b543b] px-4 gap-8">
                <a
                    className="flex flex-col items-center justify-center border-b-[3px] border-b-white text-white pb-[13px] pt-4"
                    href="#"
                >
                    <p className="text-white text-sm font-bold leading-normal tracking-[0.015em]">
                    Upcoming
                    </p>
                </a>
                
            </div>
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                This week
            </h2>
                <Items/>
                <Items/>
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                This yeeeeeear
            </h2>
        </div>
        </div>
        </div>
    );
}
