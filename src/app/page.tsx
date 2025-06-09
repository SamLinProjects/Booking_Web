"use client"
import Search from "./Search";
import { useState } from "react";
import useItineraries from "../hooks/useItineraries";

export default function Home() {
    const { searchItineraries } = useItineraries();

    const testSearch = async () => {
        const type = 'TWR';
        const start_time = "2025-10-01,10:30";
        const end_time = "2025-10-01,12:30";
        const start_place = "臺北"
        const end_place = "高雄";


        const res = await searchItineraries({
            type: type,
            start_time: start_time,
            end_time: end_time,
            start_place: start_place,
            end_place: end_place,
        });
        console.log("Search results:");
    }

    return (
        <main className="mt-16 relative flex size-full min-h-screen flex-col bg-[#111811] dark group/design-root overflow-x-hidden"
            style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
            <button onClick={() => testSearch()} className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded">
                Test Search
            </button>
        </main>
    );
}
