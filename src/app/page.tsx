"use client"
import Search from "./Search";
import { useState } from "react";

export default function Home() {
    return (
        <main className="relative flex size-full min-h-screen flex-col bg-[#111811] dark group/design-root overflow-x-hidden"
            style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
            <Search />
            <Search />
            <Search />
        </main>
    );
}
