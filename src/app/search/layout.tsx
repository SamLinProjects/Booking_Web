"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<string>("");
    const [searchResults, setSearchResults] = useState<any[]>([]);

    const handleOnClickTab = (e: string) => {
        setActiveTab(e);
        router.push(`/search/${e}`);
    }

    return(
        <div className="layout-container flex h-full grow flex-col pt-16">
        <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <h1 className="text-white tracking-light text-[32px] font-bold leading-tight px-4 text-center pb-3 pt-6">
                Where to?
            </h1>
            <div className="pb-3">
                <div className="flex border-b border-[#3b543b] px-4 gap-8">
                    <button
                        onClick={() => handleOnClickTab("stay")}
                        className={`flex flex-col items-center justify-center pb-[13px] pt-4 transition duration-200
                            ${activeTab === "stay"
                            ? "border-b-[3px] border-b-white text-white font-bold"
                            : "border-b-[3px] border-b-transparent hover:border-b-white text-[#9cba9c] hover:text-white"
                    }`}>
                        <p className="text-sm tracking-[0.015em] font-bold leading-normal">Stays</p>
                    </button>
                    <button
                        onClick={() => handleOnClickTab("train")}
                        className={`flex flex-col items-center justify-center pb-[13px] pt-4 transition duration-200
                            ${activeTab === "train"
                            ? "border-b-[3px] border-b-white text-white font-bold"
                            : "border-b-[3px] border-b-transparent hover:border-b-white text-[#9cba9c] hover:text-white"
                    }`}>
                        <p className="text-sm tracking-[0.015em] font-bold leading-normal">Trains</p>
                    </button>
                    <button
                        onClick={() => handleOnClickTab("food")}
                        className={`flex flex-col items-center justify-center pb-[13px] pt-4 transition duration-200
                            ${activeTab === "food"
                            ? "border-b-[3px] border-b-white text-white font-bold"
                            : "border-b-[3px] border-b-transparent hover:border-b-white text-[#9cba9c] hover:text-white"
                    }`}>
                        <p className="text-sm tracking-[0.015em] font-bold leading-normal">Foods</p>
                    </button>
                    <button
                        onClick={() => handleOnClickTab("tour")}
                        className={`flex flex-col items-center justify-center pb-[13px] pt-4 transition duration-200
                            ${activeTab === "tour"
                            ? "border-b-[3px] border-b-white text-white font-bold"
                            : "border-b-[3px] border-b-transparent hover:border-b-white text-[#9cba9c] hover:text-white"
                    }`}>
                        <p className="text-sm tracking-[0.015em] font-bold leading-normal">Tickets and Tours</p>
                    </button>
                </div>
            </div>
            {children}
        </div>
        </div>
        </div>
    );
}