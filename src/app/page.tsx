"use client"
import Search from "./Search";
import { useState } from "react";
import useItineraries from "../hooks/useItineraries";

export default function Home() {
    const { searchItineraries } = useItineraries();

    const testSearch = async () => {
        const type = 'inline';
        const dateTime = "2025-01-01T12";
        const adult = 2;
        const city = 'Taipei';
        const budget = 2;

        const res = await searchItineraries({
            type: type,
            city: city,
            start_time: dateTime,
            adult: adult,
            budget: budget,
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
