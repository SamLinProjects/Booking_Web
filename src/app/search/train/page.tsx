"use client";
import { useState, ChangeEvent } from "react";
import useItineraries from "@/src/hooks/useItineraries";
import Input from "@/src/components/ui/Input";
import Loading from "@/src/components/ui/Loading";
import Item from "@/src/components/ui/Items";
import Dropdown from "@/src/components/ui/Dropdown";
import Button from "@/src/components/ui/Button"


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
    type CityCode = typeof trainType

    type CityOption = {
      value: string;
      label: string;
    };

    const cities: Record<CityCode,CityOption[]> = {
    thsr:[{ value: '南港', label: '南港' },
    { value: '台北', label: '台北' },
    { value: '板橋', label: '板橋' },
    { value: '桃園', label: '桃園' },
    { value: '新竹', label: '新竹' },
    { value: '苗栗', label: '苗栗' },
    { value: '台中', label: '台中' },
    { value: '彰化', label: '彰化' },
    { value: '雲林', label: '雲林' },
    { value: '嘉義', label: '嘉義' },
    { value: '台南', label: '台南' },
    { value: "左營", label: '左營'},],
    twr:[{ value: '基隆', label: '基隆' },
        { value: '七堵', label: '七堵' },
        { value: '南港', label: '南港' },
        { value: '臺北', label: '臺北' },
        { value: '萬華', label: '萬華' },
        { value: '板橋', label: '板橋' },
        { value: '樹林', label: '樹林' },
        { value: '鶯歌', label: '鶯歌' },
        { value: '桃園', label: '桃園' },
        { value: '中壢', label: '中壢' },
        { value: '新竹', label: '新竹' },
        { value: '竹南', label: '竹南' },
        { value: '苗栗', label: '苗栗' },
        { value: '豐原', label: '豐原' },
        { value: '臺中', label: '臺中' },
        { value: '彰化', label: '彰化' },
        { value: '員林', label: '員林' },
        { value: '斗六', label: '斗六' },
        { value: '嘉義', label: '嘉義' },
        { value: '新營', label: '新營' },
        { value: '台南', label: '台南' },
        { value: '高雄', label: '高雄' },
        { value: '鳳山', label: '鳳山' },
        { value: '屏東', label: '屏東' },
        { value: '潮州', label: '潮州' },
        { value: '臺東', label: '臺東' },
        { value: '花蓮', label: '花蓮' },
        { value: '宜蘭', label: '宜蘭' },
        { value: '羅東', label: '羅東' },
        { value: '蘇澳新站', label: '蘇澳新站' }
      ],}

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
            <Dropdown label="Start From"  value={startPlace} onChange={(e:string) => setStartPlace(e)} options={cities[trainType]} />
            <Dropdown label="Arrive At" value={endPlace} onChange={(e:string) => setEndPlace(e)} options={cities[trainType]} />
            <div className="flex gap-4">
                <Input label="Departure Time" type="datetime-local" value={formatDateTimeLocal(startDate)} defaultValue={formatDateTimeLocal(startDate)} onChange={(e: ChangeEvent<HTMLInputElement>) => setStartDate(new Date(e.target.value))} />
                <Input label="Arrival Time" type="datetime-local" value={formatDateTimeLocal(endDate)} defaultValue={formatDateTimeLocal(endDate)} onChange={(e: ChangeEvent<HTMLInputElement>) => setEndDate(new Date(e.target.value))} />
            </div>
            <Button onClick={() => handleSearch()} text="Search Train"/>
        </div>
        {isLoading && <Loading size="xl"/>}
        {!isLoading && searchResults.length > 0 && (
            searchResults.map((item, index) => (
                <Item type="stay" source="search" name={item.title} description={item.description} image={item.image} url={item.link} start_time={item.start_time} end_time={item.end_time} start_place={item.start_place} price={item.price} />
            ))
        )}
        </>
    );
}