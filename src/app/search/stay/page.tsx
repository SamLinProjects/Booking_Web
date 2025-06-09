"use client";
import { useState, ChangeEvent } from "react";
import useItineraries from "@/src/hooks/useItineraries";
import Input from "@/src/components/ui/Input";
import Dropdown from "@/src/components/ui/Dropdown"
import Button from "@/src/components/ui/Button"

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
        console.log([country,city])
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

    return(
        <>
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <Dropdown label="Country" value={country} onChange={(e:string) => setCountry(e)} placeholder="Which country are you going to?" options={countries}/>
            <Dropdown label="City" value={city} onChange={(e: string) => setCity(e)} placeholder="Which city are you going to?" options={cities[country]}/>
            <div className="flex gap-4">
                <Input label="Start Date" type="date" value={startDate.toISOString().split('T')[0]} defaultValue={startDate.toISOString().split('T')[0]} onChange={(e: ChangeEvent<HTMLInputElement>) => setStartDate(new Date(e.target.value))} />
                <Input label="End Date" type="date" value={endDate.toISOString().split('T')[0]} defaultValue={endDate.toISOString().split('T')[0]} onChange={(e: ChangeEvent<HTMLInputElement>) => setEndDate(new Date(e.target.value))} />
            </div>
            <div className="flex gap-4">
                <Input label="Adults" type="number" value={adult} onChange={(e: ChangeEvent<HTMLInputElement>) => setAdult(parseInt(e.target.value))} />
                <Input label="Children" type="number" value={child} onChange={(e: ChangeEvent<HTMLInputElement>) => setChild(parseInt(e.target.value))} />
                <Input label="Rooms" type="number" value={room} onChange={(e: ChangeEvent<HTMLInputElement>) => setRoom(parseInt(e.target.value))} />
            </div>
            <Button onClick={() => handleSearch()} text="Search Stays"/>
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