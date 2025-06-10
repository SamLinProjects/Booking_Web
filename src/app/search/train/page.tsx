"use client";
import { useState, ChangeEvent, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import useItineraries from "@/src/hooks/useItineraries";
import Input from "@/src/components/ui/Input";
import Loading from "@/src/components/ui/Loading";
import Item from "@/src/components/ui/Items";
import Dropdown from "@/src/components/ui/Dropdown";
import Button from "@/src/components/ui/Button"


export default function Page() {
    const searchParams = useSearchParams();
    const { searchItineraries } = useItineraries();
    const [ searchResults, setSearchResults ] = useState<any[]>([]);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const [ trainType, setTrainType ] = useState<string>("");
    const [ startPlace, setStartPlace ] = useState<string>("");
    const [ endPlace, setEndPlace ] = useState<string>("");
    const [ startDate, setStartDate ] = useState<Date>(new Date());
    const [ endDate, setEndDate ] = useState<Date>(new Date());
    
    // Load search results from sessionStorage on component mount
    useEffect(() => {
        const savedResults = sessionStorage.getItem('train-search-results');
        if (savedResults) {
            try {
                const parsedResults = JSON.parse(savedResults);
                setSearchResults(parsedResults);
            } catch (error) {
                console.error('Error parsing saved search results:', error);
            }
        }
    }, []);
    
    // Load parameters from URL on component mount
    useEffect(() => {
        const fetchParams = async () => {
            // Create a unique key for this search session based on URL params
            const currentParams = searchParams?.toString() || '';
            const sessionKey = `train-auto-search-${currentParams}`;
            const hasAlreadySearched = sessionStorage.getItem(sessionKey);

            if (searchParams && !hasAlreadySearched && currentParams) {
                const urlTrainType = searchParams.get('type');
                const urlStartPlace = searchParams.get('start_place');
                const urlEndPlace = searchParams.get('end_place');
                const urlStartDate = searchParams.get('start_time');
                const urlEndDate = searchParams.get('end_time');

                console.log("URL parameters:", {
                    trainType: urlTrainType,
                    startPlace: urlStartPlace,
                    endPlace: urlEndPlace,
                    startDate: urlStartDate,
                    endDate: urlEndDate
                });
    
                if (urlTrainType) setTrainType(urlTrainType);
                if (urlStartPlace) setStartPlace(urlStartPlace);
                if (urlEndPlace) setEndPlace(urlEndPlace);
                if (urlStartDate) setStartDate(new Date(urlStartDate));
                if (urlEndDate) setEndDate(new Date(urlEndDate));
    
                // Auto-search if all required parameters are present
                if (urlTrainType && urlStartPlace && urlEndPlace) {
                    await handleAutoSearch(urlTrainType, urlStartPlace, urlEndPlace, urlStartDate, urlEndDate);
                    // Mark this search as completed for this session
                    sessionStorage.setItem(sessionKey, 'true');
                }
            } else if (currentParams) {
                // If we already searched for these params, restore the form state
                const urlTrainType = searchParams?.get('type');
                const urlStartPlace = searchParams?.get('start_place');
                const urlEndPlace = searchParams?.get('end_place');
                const urlStartDate = searchParams?.get('start_time');
                const urlEndDate = searchParams?.get('end_time');

                if (urlTrainType) setTrainType(urlTrainType);
                if (urlStartPlace) setStartPlace(urlStartPlace);
                if (urlEndPlace) setEndPlace(urlEndPlace);
                if (urlStartDate) setStartDate(new Date(urlStartDate));
                if (urlEndDate) setEndDate(new Date(urlEndDate));
            }
        }

        fetchParams();
    }, [searchParams]);

    const handleAutoSearch = async (trainType: string, startPlace: string, endPlace: string, startDate?: string | null, endDate?: string | null) => {
        setIsLoading(true);
        try {
            const searchStartDate = startDate ? new Date(startDate) : new Date();
            const searchEndDate = endDate ? new Date(endDate) : new Date();
            
            const data = await searchItineraries({
                type: trainType,
                start_place: startPlace,
                end_place: endPlace,
                start_time: formatDateTimeLocal(searchStartDate).replace('T', ','),
                end_time: formatDateTimeLocal(searchEndDate).replace('T', ',')
            });
            console.log(data);
            if (data) {
                const results = data.results || [];
                setSearchResults(results);
                // Save results to sessionStorage
                sessionStorage.setItem('train-search-results', JSON.stringify(results));
                console.log("Auto search results:", results);
            }
        } catch (error) {
            console.error("Auto search error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    
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
        let adjustedStartDate = new Date(startDate);
        let adjustedEndDate = new Date(endDate);

        // Adjust start date to nearest 30 minutes (round down)
        if (adjustedStartDate.getMinutes() % 30 !== 0) {
            const minutesToSubtract = adjustedStartDate.getMinutes() % 30;
            adjustedStartDate = new Date(adjustedStartDate.getTime() - (minutesToSubtract * 60 * 1000));
            console.log("Adjusted start date to nearest 30 minutes:", adjustedStartDate);
            setStartDate(adjustedStartDate); // Update state for UI
        }

        // Adjust end date to nearest 30 minutes (round down)
        if (adjustedEndDate.getMinutes() % 30 !== 0) {
            const minutesToSubtract = adjustedEndDate.getMinutes() % 30;
            adjustedEndDate = new Date(adjustedEndDate.getTime() - (minutesToSubtract * 60 * 1000));
            console.log("Adjusted end date to nearest 30 minutes:", adjustedEndDate);
            setEndDate(adjustedEndDate); // Update state for UI
        }
        if (adjustedStartDate >= adjustedEndDate) {
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
                start_time: formatDateTimeLocal(adjustedStartDate).replace('T', ','),
                end_time: formatDateTimeLocal(adjustedEndDate).replace('T', ',')
            });
            if (data) {
                const results = data.results || [];
                setSearchResults(results);
                // Save results to sessionStorage
                sessionStorage.setItem('train-search-results', JSON.stringify(results));
                console.log("Search results:", results);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error during search:", error);
            alert("An error occurred while searching for trains. Please try again.");
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
                <Item key={index} type="transport" source="search" name={item.title} description={item.description} image={item.image} url={item.link} start_time={item.start_time} end_time={item.end_time} start_place={item.start_place} price={item.price} />
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