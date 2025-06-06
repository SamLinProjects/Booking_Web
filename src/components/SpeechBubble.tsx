"use client";
import React from "react";

type Speaker = "LM" | "User";

interface BubbleProps {
    speaker?: Speaker;
    words?: string;
}

export default function Bubble({
    speaker = "LM",
    words = ""
}: BubbleProps) {

    const metrics: Record<Speaker, { bg: string; align: string; name: string }> = {
        LM: { bg: "bg:[#9cba9c]", align: "self-start", name: "Bookoo" },
        User: { bg: "bg:[#9cba9c]", align: "self-end", name: "You" }
    };

    const metric = metrics[speaker];
    return(
        <div className={`flex flex-1 flex-col gap-1 item-start ${metric.align} ${metric.bg}`}>
            <p className={`text-[#9cba9c] text-[13px] font-normal leading-normal max-w-[360px] ${metric.align}`}>
                {metric.name}
            </p>
            <p className="text-base font-normal leading-normal flex max-w-[360px] rounded-xl px-4 py-3 bg-[#283928] text-white">
                {words}
            </p>
        </div>
    );
}
