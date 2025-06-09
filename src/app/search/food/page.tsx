"use client";
import { useState, ChangeEvent } from "react";
import useItineraries from "@/src/hooks/useItineraries";
import Input from "@/src/components/ui/Input";
import Loading from "@/src/components/ui/Loading";
import Item from "@/src/components/ui/Items";

export default function Page() {
    const { searchItineraries } = useItineraries();
    const [ searchResults, setSearchResults ] = useState<any[]>([]);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const [ city, setCity ] = useState<string>("");
    const [ startDate, setStartDate ] = useState<Date>(new Date());
    const [ adult, setAdult ] = useState<number>(1);
    const [ budget, setBudget ] = useState<number>(0);
    
    const formatDateTimeLocal = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };
    
    const handleSearch = async () => {
        if (!city) {
            alert("Please enter both country and city.");
            return;
        } 
        if (startDate <= new Date()) {
            alert("Date must be in the future.");
            return;
        }
        if (adult < 1) {
            alert("Please select at least one adult.");
            return;
        }
        if (budget < 0) {
            alert("Budget cannot be negative.");
            return;
        } else if (budget > 2000) {
            alert("Budget cannot exceed 2000.");
            return;
        } else {
            setBudget(Math.ceil(budget / 450));
        }

        const type = "inline";
        setIsLoading(true);
        try {
            const data = await searchItineraries({
                type: type,
                city: city,
                start_time: startDate.toISOString(),
                adult: adult,
                budget: budget
            });
            if (data) {
                setSearchResults(data.results || []);
                console.log("Search results:", data.results);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error during search:", error);
            alert("An error occurred while searching for stays. Please try again.");
            setIsLoading(false);
            setSearchResults([]);
        }
    }

    return(
        <>
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <Input label="City" type="text" value={city} onChange={(e: ChangeEvent<HTMLInputElement>) => setCity(e.target.value)} placeholder="Which city are you finding restaurants?" />
            <Input label="Time" type="datetime-local" value={formatDateTimeLocal(startDate)} defaultValue={formatDateTimeLocal(startDate)} onChange={(e: ChangeEvent<HTMLInputElement>) => setStartDate(new Date(e.target.value))} />
            <div className="flex gap-4">
                <Input label="Adults" type="number" value={adult} onChange={(e: ChangeEvent<HTMLInputElement>) => setAdult(parseInt(e.target.value))} />
                <Input label="Budget" type="number" value={budget} onChange={(e: ChangeEvent<HTMLInputElement>) => setBudget(parseInt(e.target.value))} />
            </div>
            <button className="mt-4 w-40 bg-green-900 text-white px-4 py-2 rounded" onClick={() => handleSearch()}>
                Search Foods
            </button>
        </div>
        {isLoading && <Loading size="xl"/>}
        {!isLoading && searchResults.length > 0 && (
            searchResults.map((item, index) => (
                <Item type="food" source="search" name={item.title} description={item.description} image={item.image} url={item.link} start_time={item.start_time} end_time={item.end_time} start_place={item.start_place} price={item.price} />
            ))
        )}
        </>
    );
}