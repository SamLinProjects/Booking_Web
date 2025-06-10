"use client";
import { useState, ChangeEvent, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import useItineraries from "@/src/hooks/useItineraries";
import Input from "@/src/components/ui/Input";
import Loading from "@/src/components/ui/Loading";
import Item from "@/src/components/ui/Items";
import Button from "@/src/components/ui/Button"
import Dropdown from "@/src/components/ui/Dropdown"

export default function Page() {
    const searchParams = useSearchParams();
    const { searchItineraries } = useItineraries();
    const [ searchResults, setSearchResults ] = useState<any[]>([]);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const [ keyword, setKeyword ] = useState<string>("");
    const [ country, setCountry ] = useState<string>("");
    const [ city, setCity ] = useState<string>("");
    const [ startDate, setStartDate ] = useState<Date>(new Date());
    const [ endDate, setEndDate ] = useState<Date>(new Date());

    // Load parameters from URL on component mount
    useEffect(() => {
        if (searchParams) {
            const urlKeyword = searchParams.get('keyword');
            const urlCountry = searchParams.get('country');
            const urlCity = searchParams.get('city');
            const urlStartDate = searchParams.get('start_time');
            const urlEndDate = searchParams.get('end_time');

            if (urlKeyword) setKeyword(urlKeyword);
            if (urlCountry) setCountry(urlCountry);
            if (urlCity) setCity(urlCity);
            if (urlStartDate) setStartDate(new Date(urlStartDate));
            if (urlEndDate) setEndDate(new Date(urlEndDate));

            // Auto-search if all required parameters are present
            if (urlKeyword && urlCountry && urlCity) {
                handleAutoSearch(urlKeyword, urlCountry, urlCity, urlStartDate, urlEndDate);
            }

            console.log("Loaded search parameters from URL:", {
                keyword: urlKeyword,
                country: urlCountry,
                city: urlCity,
                startDate: urlStartDate,
                endDate: urlEndDate
            });
        }
    }, [searchParams]);

    const handleAutoSearch = async (keyword: string, country: string, city: string, startDate?: string | null, endDate?: string | null) => {
        const type = "kkday";
        setIsLoading(true);
        try {
            const searchStartDate = startDate ? new Date(startDate) : new Date();
            const searchEndDate = endDate ? new Date(endDate) : new Date();
            
            const data = await searchItineraries({
                type: type,
                keyword: keyword,
                country: country,
                city: city,
                start_time: searchStartDate.toISOString().split('T')[0].replace('-', ''), 
                end_time: searchEndDate.toISOString().split('T')[0].replace('-', '').replace('-', ''),
            });
            if (data) {
                setSearchResults(data.results || []);
                console.log("Auto search results:", data.results);
            }
        } catch (error) {
            console.error("Auto search error:", error);
        } finally {
            setIsLoading(false);
        }
    };

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
                country: country.toLocaleLowerCase(),
                city: city.toLocaleLowerCase(),
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
        { value: 'ch', label: '中國' },
      ];
      type CountryCode = typeof countries[number]["value"]; // "tw" | "jp" | "ch"

      type CityOption = {
        value: string;
        label: string;
      };
      
      // 讓 cities 的 key 只能是 CountryCode 中的值
      const cities: Record<CountryCode, CityOption[]> = {
        tw:[
        { value: 'taipei', label: '台北' },
        { value: 'taichung', label: '台中' },
        { value: 'kaoshiung', label: '高雄' },
        { value: 'tainan', label: '台南' },
        { value: "yilan County", label: '宜蘭'},
        { value: "taitung", label: '台東'}],
        jp:[
        { value: 'tokyo', label: '東京' },
        { value: 'okinawa', label: '沖繩' },
        { value: 'hokkaido', label: '北海道' },
        ],
        ch:[
        { value: 'shanhai', label: '上海' },
        { value: 'beijing', label: '北京' },
        { value: 'hongkong', label: '香港' },
        ],
    }

    const keywords = [{ value: 'day-tours', label: 'tour' },
                    { value: 'attraction-tickets', label: 'tickets' },];

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
        {!isLoading && searchResults.length === 0 && (
            <div className="text-center text-gray-500 mt-8">
                No results found.
            </div>
        )}
        </>
    );
}