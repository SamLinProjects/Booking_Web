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

    const [ country, setCountry ] = useState<string>("");
    const [ city, setCity ] = useState<string>("");
    const [ startDate, setStartDate ] = useState<Date>(new Date());
    const [ endDate, setEndDate ] = useState<Date>(new Date());
    const [ adult, setAdult ] = useState<number>(1);
    const [ child, setChild ] = useState<number>(0);
    const [ room, setRoom ] = useState<number>(1);

    const handleSearch = async () => {
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
        setIsLoading(true);
        try {
            const data = await searchItineraries({
                type: type,
                country: country,
                city: city,
                start_time: startDate.toISOString(),
                end_time: endDate.toISOString(),
                adult: adult,
                child: child,
                room: room
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
            <Input label="Country" type="text" value={country} onChange={(e: ChangeEvent<HTMLInputElement>) => setCountry(e.target.value)} placeholder="Which country are you going to?" />
            <Input label="City" type="text" value={city} onChange={(e: ChangeEvent<HTMLInputElement>) => setCity(e.target.value)} placeholder="Which city are you going to?" />
            <div className="flex gap-4">
                <Input label="Start Date" type="date" value={startDate.toISOString().split('T')[0]} defaultValue={startDate.toISOString().split('T')[0]} onChange={(e: ChangeEvent<HTMLInputElement>) => setStartDate(new Date(e.target.value))} />
                <Input label="End Date" type="date" value={endDate.toISOString().split('T')[0]} defaultValue={endDate.toISOString().split('T')[0]} onChange={(e: ChangeEvent<HTMLInputElement>) => setEndDate(new Date(e.target.value))} />
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
        {isLoading && <Loading size="xl"/>}
        {!isLoading && searchResults.length > 0 && (
            searchResults.map((item, index) => (
                <Item type="stay" name={item.title} description={item.description} image={item.image} url={item.link} start_time={item.start_time} end_time={item.end_time} start_place={item.start_place} price={item.price} />
            ))
        )}
        </>
    );
}