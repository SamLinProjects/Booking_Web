"use client"
import Search from "./Search";
import { useState } from "react";
import useItineraries from "../hooks/useItineraries";
import SnakeGame from "./Game";

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

    <main className="pt-16 relative flex size-full min-h-screen flex-col dark group/design-root overflow-x-hidden"
        style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
        <SnakeGame bgcolor="#111811"/>
        <div 
    className="absolute inset-0 bg-cover bg-center bg-no-repeat saturate-50 pointer-events-none"
    style={{
      backgroundImage: 'linear-gradient(rgba(30, 43, 30, 0.3), rgba(30, 43, 30, 0.4)), url("/images/homepage.png")',
      zIndex: 10,
      opacity: 0.35
    }}/>
    </main>
    );
}
