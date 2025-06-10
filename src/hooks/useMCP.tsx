"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useItineraries from "./useItineraries";

export default function useMCP() {
    const router = useRouter();
    const { searchItineraries } = useItineraries();

    const interpret = async (command: string) => {
        console.log("Interpreting command:", command);
        const res = await fetch("/api/mcp/parse", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({ command })
        });
        if (!res.ok) {
            const errorData = await res.json();
            alert("Failed to interpret command: " + errorData.message);
            console.error("MCP parse error:", errorData);
            throw new Error("MCP parse failed");
        } else {
            const data = await res.json();
            console.log("MCP parse result:", data);
            return data;
        }
    }

    const search = async (type: string, data: any) => {
        console.log(type, data);
        
        // Convert data object to URL search params
        const params = new URLSearchParams();
        Object.keys(data).forEach(key => {
            if (data[key] !== undefined && data[key] !== null) {
                params.set(key, data[key].toString());
            }
            params.set("type", type);
        });
        console.log("Search parameters:", params.toString());
        
        const queryString = params.toString();
        
        switch (type) {
            case "kkday": 
                router.push(`/search/tour?${queryString}`);
                break;
            case "inline":
                router.push(`/search/food?${queryString}`);
                break;
            case "twr":
            case "thsr":
                router.push(`/search/train?${queryString}`);
                break;
            case "booking":
                router.push(`/search/stay?${queryString}`);
                break;
        }
    }

    return { interpret, search };
}