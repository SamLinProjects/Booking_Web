"use client";
import { useState, ChangeEvent } from "react";
import useItineraries from "@/src/hooks/useItineraries";
import Input from "@/src/components/ui/Input";
import Loading from "@/src/components/ui/Loading";
import Item from "@/src/components/ui/Items";
import Dropdown from "@/src/components/ui/Dropdown";

export default function Page() {
    const { searchItineraries } = useItineraries();
    const [ searchResults, setSearchResults ] = useState<any[]>([]);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const [ trainType, setTrainType ] = useState<string>("");
    const [ startPlace, setStartPlace ] = useState<string>("");
    const [ endPlace, setEndPlace ] = useState<string>("");
    const [ startDate, setStartDate ] = useState<Date>(new Date());
    const [ endDate, setEndDate ] = useState<Date>(new Date());

    const formatDateTimeLocal = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const handleSearch = async () => {
        if (!trainType || !startPlace || !endPlace) {
            alert("Please fill in all fields.");
            return;
        }
        if (startDate >= endDate) {
            alert("End date must be after start date.");
            return;
        }

        const type = trainType;
        setIsLoading(true);
        try {
            const data = await searchItineraries({
                type: type,
                start_place: startPlace,
                end_place: endPlace,
                start_time: formatDateTimeLocal(startDate).replace('T', ','),
                end_time: formatDateTimeLocal(endDate).replace('T', ',')
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
            <Dropdown label="HSR/TWR" options={[{ value: "thsr", label: "高鐵" }, { value: "twr", label: "台鐵" }]} value={trainType} onChange={(e: string) => setTrainType(e)} searchable={true} />
            <Input label="Start From" type="text" value={startPlace} onChange={(e: ChangeEvent<HTMLInputElement>) => setStartPlace(e.target.value)} placeholder="Which are you starting from?" />
            <Input label="Arrive At" type="text" value={endPlace} onChange={(e: ChangeEvent<HTMLInputElement>) => setEndPlace(e.target.value)} placeholder="Where are you going to?" />
            <div className="flex gap-4">
                <Input label="Departure Time" type="datetime-local" value={formatDateTimeLocal(startDate)} defaultValue={formatDateTimeLocal(startDate)} onChange={(e: ChangeEvent<HTMLInputElement>) => setStartDate(new Date(e.target.value))} />
                <Input label="Arrival Time" type="datetime-local" value={formatDateTimeLocal(endDate)} defaultValue={formatDateTimeLocal(endDate)} onChange={(e: ChangeEvent<HTMLInputElement>) => setEndDate(new Date(e.target.value))} />
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