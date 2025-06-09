"use client";
import { useEffect, useState, useMemo, ChangeEvent } from "react";
import Input from "@/src/components/ui/Input";

export default function Page() {
    const [ country, setCountry ] = useState<string>("");
    const [ city, setCity ] = useState<string>("");
    const [ startDate, setStartDate ] = useState<Date>(new Date());
    const [ endDate, setEndDate ] = useState<Date>(new Date());
    const [ adult, setAdult ] = useState<number>(1);
    const [ child, setChild ] = useState<number>(0);
    const [ room, setRoom ] = useState<number>(1);

    const handleSearch = () => {
        if (!country || !city) {
            alert("Please enter both country and city.");
            return;
        } 
        if (startDate >= endDate) {
            alert("End date must be after start date.");
            return;
        }
        if (adult < 1 || room < 1) {

            return;
        }

        const type = "booking";
        console.log("Searching for stays in", {
            country,
            city,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            adult,
            child,
            room
        });
    }

    return(
        <div className="layout-container flex h-full grow flex-col pt-16">
        <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <Input label="Country" type="text" value={country} onChange={(e: ChangeEvent<HTMLInputElement>) => setCountry(e.target.value)} placeholder="Which country are you going to?" />
            <Input label="City" type="text" value={city} onChange={(e: ChangeEvent<HTMLInputElement>) => setCity(e.target.value)} placeholder="Which city are you going to?" />
            <div className="flex gap-4">
                <Input label="Start Date" type="date" value={startDate.toISOString().split('T')[0]} onChange={(e: ChangeEvent<HTMLInputElement>) => setStartDate(new Date(e.target.value))} />
                <Input label="End Date" type="date" value={endDate.toISOString().split('T')[0]} onChange={(e: ChangeEvent<HTMLInputElement>) => setEndDate(new Date(e.target.value))} />
            </div>
            <div className="flex gap-4">
                <Input label="Adults" type="number" value={adult} onChange={(e: ChangeEvent<HTMLInputElement>) => setAdult(parseInt(e.target.value))} />
                <Input label="Children" type="number" value={child} onChange={(e: ChangeEvent<HTMLInputElement>) => setChild(parseInt(e.target.value))} />
                <Input label="Rooms" type="number" value={room} onChange={(e: ChangeEvent<HTMLInputElement>) => setRoom(parseInt(e.target.value))} />
            </div>
            <button className="mt-4 w-40 bg-green-900 text-white px-4 py-2 rounded" onClick={() => handleSearch()}>
                Search Stays
            </button>
        </div>
        </div>
        </div>
    );
}