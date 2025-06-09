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

    const Cities = [
        { value: '基隆', label: '基隆' },
        { value: '臺北', label: '臺北' },
        { value: '新北', label: '新北' },
        { value: '桃園', label: '桃園' },
        { value: '新竹市', label: '新竹市' },
        { value: '新竹縣', label: '新竹縣' },
        { value: '苗栗', label: '苗栗' },
        { value: '臺中', label: '臺中' },
        { value: '彰化', label: '彰化' },
        { value: '南投', label: '南投' },
        { value: '雲林', label: '雲林' },
        { value: '嘉義市', label: '嘉義市' },
        { value: '嘉義縣', label: '嘉義縣' },
        { value: '臺南', label: '臺南' },
        { value: '高雄', label: '高雄' },
        { value: '屏東', label: '屏東' },
        { value: '宜蘭', label: '宜蘭' },
        { value: '花蓮', label: '花蓮' },
        { value: '臺東', label: '臺東' },
        { value: '澎湖', label: '澎湖' },
        { value: '金門', label: '金門' },
        { value: '連江', label: '連江' }
      ];
      

    return(
        <>
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <Dropdown label="City" value={city} onChange={(e:string) => setCity(e)} options={Cities} />
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