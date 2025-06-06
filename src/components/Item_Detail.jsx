import React from 'react';

export default function Item_Detail({
    cancelDisplay=()=>{}
}) {
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 animate-in fade-in duration-300">
        <div className="layout-container flex flex-col max-w-[960px] w-full bg-[#111811] rounded-xl shadow-lg px-10 py-8">

            <div className="flex flex-wrap justify-between gap-3 p-4">
            <div className="flex min-w-72 flex-col gap-3">
                <p className="text-white tracking-light text-[32px] font-bold leading-tight">
                Booking Details
                </p>
                <p className="text-[#9cba9c] text-sm font-normal leading-normal">
                View and manage your booking details
                </p>
            </div>
            </div>

            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            Booking Information
            </h2>
            <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
            <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#3b543b] py-5">
                <p className="text-[#9cba9c] text-sm font-normal leading-normal">
                Booking ID
                </p>
                <p className="text-white text-sm font-normal leading-normal">
                #987654321
                </p>
            </div>
            <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#3b543b] py-5">
                <p className="text-[#9cba9c] text-sm font-normal leading-normal">
                Status
                </p>
                <p className="text-white text-sm font-normal leading-normal">
                Confirmed
                </p>
            </div>
            </div>
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            Additional Details
            </h2>
            <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
            <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#3b543b] py-5">
                <p className="text-[#9cba9c] text-sm font-normal leading-normal">
                Special Requests
                </p>
                <p className="text-white text-sm font-normal leading-normal">
                None
                </p>
            </div>
            <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#3b543b] py-5">
                <p className="text-[#9cba9c] text-sm font-normal leading-normal">
                Contact Information
                </p>
                <p className="text-white text-sm font-normal leading-normal">
                Email: olivia.brown@example.com, Phone: (555) 987-6543
                </p>
            </div>
            </div>
            <div className="flex px-4 py-3 justify-start">
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#283928] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#c5d4c5] hover:text-[#283928] transition-all" 
                onClick={cancelDisplay}
            >
                <span className="truncate">Back</span>
            </button>
            </div>

        </div>
        </div>
    )
}