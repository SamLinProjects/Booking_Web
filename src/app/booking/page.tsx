"use client";
import React from "react";
import { useState } from "react";
import Items from "@/src/components/Items"

export default function Page(){

  const [activeTab, setActiveTab] = useState("Coming_Journeys");
  const tabs = [
    { id: "Coming_Journeys", label: "Coming Journeys" },
    { id: "Trip_Memories", label: "Trip Memories" },
    { id: "Booking_History", label: "Booking History" },
  ];
  const classes = {
    Coming_Journeys:[
      { id: "This week", description: "Upcoming bookings scheduled within this week" },
      { id: "This month", description: "Upcoming bookings scheduled within this month" },
      { id: "More . . .", description: "ALl the other upcoming bookings" }],
    Trip_Memories:[
      { id: "Just past", description: "Past bookings scheduled within 30 days" },
      { id: "More . . .", description: "ALl the other past bookings" }],
    Booking_History:[
      { id: "Reservation list ", description: "All the bookings reserved; arranged by the payment date" }],
  };

return(
  <div className="layout-container flex h-full grow flex-col">
  <div className="px-40 flex flex-1 justify-center py-5">
  <div className="layout-content-container flex flex-col max-w-[960px] flex-1">

    <h1 className="text-white tracking-light text-[32px] font-bold leading-tight px-4 text-center pb-3 pt-6">
      My Bookings
    </h1>
    <div className="pb-3">
    <div className="flex border-b border-[#3b543b] px-4 gap-8">
      {tabs.map((tab) => (
        <button
        key={tab.id}
        onClick={() => setActiveTab(tab.id)}
        className={`flex flex-col items-center justify-center pb-[13px] pt-4 transition duration-200
          ${activeTab === tab.id
            ? "border-b-[3px] border-b-white text-white font-bold"
            : "border-b-[3px] border-b-transparent hover:border-b-white text-[#9cba9c] hover:text-white"
          }`}>
          <p className="text-sm tracking-[0.015em] font-bold leading-normal">{tab.label}</p>
        </button>))}
    </div>
    </div>
    {classes[activeTab].map((c) => (
      <Class name={c.id} description={c.description} key={c.id}/>
    ))}
  </div>
  </div>
  </div>
)}

/*小元件，隨著按鈕點擊切換的頁面*/ 

function Class({
  name="",
  description="the bookings"   /*預計是用來找資料庫的資料，回傳然後一個一個包成Items*/ 
}){

  return(
<>
  <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
    {name}
  </h2>
  <Items/>
  <Items/>
</>
)}
