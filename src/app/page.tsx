"use client"
import useItineraries from "../hooks/useItineraries";
import SnakeGame from "./Game";

export default function Home() {
    const { searchItineraries } = useItineraries();

    const testSearch = async () => {
        const type = 'TWR';
        const start_time = "2025-08-01,10:30";
        const end_time = "2025-08-01,22:30";
        const start_place = "臺北"
        const end_place = "高雄";


        const res = await searchItineraries({
            type: type,
            start_time: start_time,
            end_time: end_time,
            start_place: start_place,
            end_place: end_place,
        });
        console.log("Search results:");
        
    }

    return (

    <main className="pt-16 relative flex size-full min-h-screen flex-col dark group/design-root overflow-x-hidden"
        style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
        <SnakeGame bgcolor="#111811"/>
        <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat saturate-50 pointer-events-none"
            style={{
            backgroundImage: 'linear-gradient(rgba(30, 43, 30, 0.3), rgba(30, 43, 30, 0.4)), url("/images/homepage.png")',
            zIndex: 10,
            opacity: 0.35
        }}/>
    </main>
    );
}
