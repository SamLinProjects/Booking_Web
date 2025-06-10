"use client";
import React from "react";

interface BubbleProps {
    speaker?: String;
    message?: string;
}

export default function Bubble({
    speaker = "LM",
    message = ""
}: BubbleProps) {

    return(
        <div className={`flex flex-1 flex-col gap-1 item-start ${speaker === "User" ? "self-end" : "self-start"} bg:[9cba9c] rounded-xl px-4 py-3`}>
            <p className={`text-[#9cba9c] text-[13px] font-normal leading-normal max-w-[360px] ${speaker === "User" ? "self-end" : "self-start"}`}>
                {speaker === "User" ? "You" : "LM"}
            </p>
            <p className="text-base font-normal leading-normal flex max-w-[360px] rounded-xl px-4 py-3 bg-[#283928] text-white">
                {message.replace('無法解析 LLM 回傳內容，原始內容：', '')}
            </p>
        </div>
    );
}
