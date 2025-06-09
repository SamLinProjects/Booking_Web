import React, { useState } from 'react';

export default function Item_Detail({
    description="",
    url="",
    Booked = false,
    cancelDisplay=()=>{}
}) {
    const [booked,setBooked] = useState(Booked)
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 animate-in fade-in duration-300">
        <div className="layout-container flex flex-col max-w-[960px] w-full bg-[#111811] rounded-xl shadow-lg px-10 py-8">

            <div className="flex flex-wrap justify-between gap-3 p-4">
            <div className="flex min-w-72 flex-col gap-3">
                <p className="text-white tracking-light text-[32px] font-bold leading-tight">
                Booking Details
                </p>
                <p className="text-[#9cba9c] text-sm font-normal leading-normal">
                View the booking details
                </p>
            </div>
            </div>

            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            Item Information
            </h2>
            <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
            <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#3b543b] py-5">
                <p className="text-[#9cba9c] text-sm font-normal leading-normal">
                description
                </p>
                <p className="text-white text-sm font-normal leading-normal">
                {description}
                </p>
            </div>
            <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#3b543b] py-5">
                <p className="text-[#9cba9c] text-sm font-normal leading-normal">
                connection
                </p>
                <a className={`text-white text-sm font-normal leading-normal `} href={url}>
                {url}
                </a>
            </div>
            </div>
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            Booking Information
            </h2>
            <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
            <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#3b543b] py-5">
                <p className="text-[#9cba9c] text-sm font-normal leading-normal">
                Booked yet ?
                </p>
                <p className="text-white text-sm font-normal leading-normal">
                {booked?"Yes":"None"}
                </p>
            </div>
            </div>
            <div className="flex flex-row px-4 py-3 gap-4 justify-evenly">
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#283928] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#c5d4c5] hover:text-[#283928] transition-all" 
                onClick={cancelDisplay}
            >
                <span className="truncate">Back</span>
            </button>
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#283928] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#c5d4c5] hover:text-[#283928] transition-all" 
                onClick={()=>setBooked(true)}
            >
                <span className="truncate">Booked ?</span>
            </button>
            </div>

        </div>
        </div>
    )
}