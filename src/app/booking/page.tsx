"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Items from "@/src/components/ui/Items"
import useBooking from "@/src/hooks/useBooking";
import useAuth from "@/src/hooks/useAuth";
import { Itinerary } from "@/src/context/Intineraries";

export default function Page() {
    const router = useRouter();
    const { getBookings } = useBooking();
    const { isloggedIn, getCurrentUser } = useAuth();
    const [bookings, setBookings] = useState<Itinerary[]>([]);
    const [user, setUser] = useState<{ userId: number; username: string | null; } | null>(null);

    type ClassKey = 'Coming_Journeys' | 'Trip_Memories' | 'Booking_History';
    const [activeTab, setActiveTab] = useState<ClassKey>("Coming_Journeys");
    const tabs: {id : ClassKey, label:string}[] = [
        { id: "Coming_Journeys", label: "Coming Journeys" },
        { id: "Trip_Memories", label: "Trip Memories" },
        { id: "Booking_History", label: "Booking History" },
    ];
    const classes = {
        Coming_Journeys:[
        { id: "This week", description: "Upcoming bookings scheduled within this week" },
        { id: "This month", description: "Upcoming bookings scheduled within this month" },
        { id: "More in future . . .", description: "ALl the other upcoming bookings" }],
        Trip_Memories:[
        { id: "Just past", description: "Past bookings scheduled within 30 days" },
        { id: "More in past . . .", description: "ALl the other past bookings" }],
        Booking_History:[
        { id: "Reservation list ", description: "All the bookings reserved; arranged by the payment date" }],
    };

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getCurrentUser();
            if (user) {
                setUser(user);
                console.log("User fetched:", user);
                const bookings = await getBookings(user.userId);
                setBookings(bookings.itineraries);
                console.log("Bookings fetched:", bookings.itineraries);
            } else {
                alert("You are not logged in. Please log in to view your bookings.");
                router.push("/login");
            }
        };
        fetchUser();
    }, []);

    return(
        <div className="layout-container flex h-full grow flex-col pt-16">
        <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">

            <h1 className="text-white tracking-light text-[32px] font-bold leading-tight px-4 text-center pb-3 pt-6">
            My Bookings
            </h1>
            <div className="pb-3">
            <div className="flex border-b border-[#3b543b] px-4 gap-8">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center justify-center pb-[13px] pt-4 transition duration-200
                    ${activeTab === tab.id
                        ? "border-b-[3px] border-b-white text-white font-bold"
                        : "border-b-[3px] border-b-transparent hover:border-b-white text-[#9cba9c] hover:text-white"
                }`}>
                <p className="text-sm tracking-[0.015em] font-bold leading-normal">{tab.label}</p>
                </button>))}
            </div>
            </div>
            {isloggedIn && bookings.length !== 0 && classes[activeTab].map((c) => (
                <Class name={c.id} key={c.id} bookings={bookings} />
            ))}
            {!isloggedIn && (
                <div className="text-white text-center px-4 py-6">
                    <p className="text-lg">Please log in to view your bookings.</p>
                </div>
            )}
            {isloggedIn && bookings.length === 0 && (
                <div className="text-white text-center px-4 py-6">
                    <p className="text-lg">You have no bookings yet.</p>
                </div>
            )}
        </div>
        </div>
        </div>
    );
}

function Class({
    name="",
    bookings=[], 
} : {
    name: string;
    bookings: Itinerary[];
}) {

    const filterBookings = (bookings: Itinerary[]) => {
        const now = new Date();
        
        return bookings.filter((booking) => {
            if (!booking.arrival_time) return false;
            
            const bookingDate = new Date(booking.departure_time);
            const diffTime = bookingDate.getTime() - now.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            switch (name) {
                case "This week":
                    return diffDays >= 0 && diffDays <= 7;                    
                case "This month":
                    return diffDays >= 7 && diffDays <= 30;
                case "More in future . . .":
                    return diffDays > 30;
                case "Just past":
                    return diffDays < 0 && diffDays >= -30;
                case "More in past . . .":
                    return diffDays < -30;
                case "Reservation list ":
                    return true;
                default:
                    return true;
            }
        });
    };
    
    const filteredBookings = filterBookings(bookings);

    return(
        <>
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            {name}
        </h2>
        {filteredBookings.map((booking, index) => (
            <Items
                key={booking.id || index}
                type={booking.type || ""}
                source="booking"
                name={booking.name || ""}
                description={booking?.description || ""}
                image={booking?.image || ""}
                url={booking?.url || ""}
                start_time={booking?.departure_time || ""}
                end_time={booking?.arrival_time || ""}
                start_place={booking?.start || ""}
                end_place={booking?.destination || ""}
                price={booking.price?.toString() || "0"}
            />
        ))}
        </>
    );
}
