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

    const countries = [
        { value: 'tw', label: '台灣' },
        { value: 'jp', label: '日本' },
        { value: 'ch', label: '中國大陸' },
      ];
      type CountryCode = typeof countries[number]["value"]; // "tw" | "jp" | "ch"

      type CityOption = {
        value: string;
        label: string;
      };
      
      // 讓 cities 的 key 只能是 CountryCode 中的值
      const cities: Record<CountryCode, CityOption[]> = {
        tw:[
        { value: 'Taipei', label: '台北' },
        { value: 'Taichung', label: '台中' },
        { value: 'Kaoshiung', label: '高雄' },
        { value: 'Tainan', label: '台南' },
        { value: "Yilan County", label: '宜蘭'},
        { value: "Taitung", label: '台東'}],
        jp:[
        { value: 'Tokyo', label: '東京' },
        { value: 'Okinawa', label: '沖繩' },
        { value: 'Hokkaido', label: '北海道' },
        ],
        ch:[
        { value: 'Shanhai', label: '上海' },
        { value: 'Beijing', label: '北京' },
        { value: 'Hongkong', label: '香港' },
        ],
    }

    const keywords = [{ value: 'tour', label: 'tour' },
                    { value: 'tickets', label: 'tickets' },];

    return(
        <>
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <Dropdown label="Keyword" value={keyword} onChange={(e:string) => setKeyword(e)} options={keywords} />
            <Dropdown label="Country" value={country} onChange={(e:string) => setCountry(e)} options={countries} />
            <Dropdown label="City" value={city} onChange={(e: string) => setCity(e)} options={cities[country]} />
            <div className="flex gap-4">
                <Input label="Start Date" type="date" value={startDate.toISOString().split('T')[0]} defaultValue={startDate.toISOString().split('T')[0]} onChange={(e: ChangeEvent<HTMLInputElement>) => setStartDate(new Date(e.target.value))} />
                <Input label="End Date" type="date" value={endDate.toISOString().split('T')[0]} defaultValue={endDate.toISOString().split('T')[0]} onChange={(e: ChangeEvent<HTMLInputElement>) => setEndDate(new Date(e.target.value))} />
            </div>
            <Button onClick={() => handleSearch()} text="Search Tour"/>
        </div>
        {isLoading && <Loading size="xl"/>}
        {!isLoading && searchResults.length > 0 && (
            searchResults.map((item, index) => (
                <Item type={keyword === "attraction-tickets" ? "attraction" : "activity"} source="search" name={item.title} description={item.description} image={item.image} url={item.link} start_time={item.start_time} end_time={item.end_time} start_place={item.start_place} price={item.price} />
            ))
        )}
        </>
    );
}