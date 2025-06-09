"use client";
import { useState, ChangeEvent } from "react";
import useItineraries from "@/src/hooks/useItineraries";
import Input from "@/src/components/ui/Input";
import Loading from "@/src/components/ui/Loading";
import Item from "@/src/components/ui/Items";
import Button from "@/src/components/ui/Button"
import Dropdown from "@/src/components/ui/Dropdown"
import { start } from "repl";

export default function Page() {
    const { searchItineraries } = useItineraries();
    const [ searchResults, setSearchResults ] = useState<any[]>([]);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const [ keyword, setKeyword ] = useState<string>("");
    const [ country, setCountry ] = useState<string>("");
    const [ city, setCity ] = useState<string>("");
    const [ startDate, setStartDate ] = useState<Date>(new Date());
    const [ endDate, setEndDate ] = useState<Date>(new Date());

    const handleSearch = async () => {
        if (!country || !city) {
            alert("Please enter both country and city.");
            return;
        } 
        if (startDate >= endDate) {
            alert("End date must be after start date.");
            return;
        }
        if (!keyword) {
            alert("Please enter a keyword to search.");
            return;
        }

        const type = "kkday";
        setIsLoading(true);
        try {
            const data = await searchItineraries({
                type: type,
                keyword: keyword,
                country: country,
                city: city,
                start_time: startDate.toISOString().split('T')[0].replace('-', ''), 
                end_time: endDate.toISOString().split('T')[0].replace('-', '').replace('-', ''),
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
            <Input label="Keyword" type="text" value={keyword} onChange={(e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)} placeholder="What are you looking for?" />
            <Input label="Country" type="text" value={country} onChange={(e: ChangeEvent<HTMLInputElement>) => setCountry(e.target.value)} placeholder="Which country are you going to?" />
            <Input label="City" type="text" value={city} onChange={(e: ChangeEvent<HTMLInputElement>) => setCity(e.target.value)} placeholder="Which city are you going to?" />
            <div className="flex gap-4">
                <Input label="Start Date" type="date" value={startDate.toISOString().split('T')[0]} defaultValue={startDate.toISOString().split('T')[0]} onChange={(e: ChangeEvent<HTMLInputElement>) => setStartDate(new Date(e.target.value))} />
                <Input label="End Date" type="date" value={endDate.toISOString().split('T')[0]} defaultValue={endDate.toISOString().split('T')[0]} onChange={(e: ChangeEvent<HTMLInputElement>) => setEndDate(new Date(e.target.value))} />
            </div>
            <Button onClick={() => handleSearch()} text="Search Stays"/>
        </div>
        {isLoading && <Loading size="xl"/>}
        {!isLoading && searchResults.length > 0 && (
            searchResults.map((item, index) => (
                <Item type={keyword === "attraction-tickets" ? "attraction" : "activity"} name={item.title} description={item.description} image={item.image} url={item.link} start_time={item.start_time} end_time={item.end_time} start_place={item.start_place} price={item.price} />
            ))
        )}
        </>
    );
}