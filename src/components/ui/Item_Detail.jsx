import React, { useEffect, useState } from 'react';
import useRouter from 'next/navigation';
import useAuth from '../../hooks/useAuth';
import useBooking from '../../hooks/useBooking';

export default function Item_Detail({
    id,
    description="",
    url="",
    Booked = false,
    cancelDisplay=()=>{}
}) {
    const router = useRouter();
    const { isloggedIn, getCurrentUser } = useAuth();
    const { postBooking } = useBooking();
    const [booked,setBooked] = useState(Booked);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            if (isloggedIn) {
                const user = await getCurrentUser();
                console.log(id);
                if (user) {
                    setBooked(user.booked);
                    setUser(user);
                }
            }
        };
        fetchUser();
    }, []);

    const handleBook = async () => {
        if (!isloggedIn) {
            alert("Please login to book this item.");
            return;
        }
        try {
            console.log("Booking item with ID:", id);
            console.log("User ID:", user.userId);
            const res = await postBooking({
                user_id: user.userId, 
                itinerary_id: id,
            });
            if (res) {
                alert("Booking successful!");
                setBooked(true);
                router.push('/booking');
            } else {
                alert("Booking failed. Please try again.");
                return;
            }
        } catch (error) {
            console.error("Error booking item:", error);
            alert("An error occurred while booking. Please try again.");
            return;
        }
    }
    
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 animate-in fade-in duration-300">
        <div className="layout-container flex flex-col max-w-[960px] w-full bg-[#111811] rounded-xl shadow-lg px-10 py-8">

            <div className="flex flex-wrap justify-between gap-3 p-4">
            <div className="flex min-w-72 flex-col gap-3">
                <p className="text-white tracking-light text-[32px] font-bold leading-tight">
                Booking Details
                </p>
                <p className="text-[#9cba9c] text-sm font-normal leading-normal">
                View the booking details
                </p>
            </div>
            </div>

            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            Item Information
            </h2>
            <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
            <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#3b543b] py-5">
                <p className="text-[#9cba9c] text-sm font-normal leading-normal">
                description
                </p>
                <p className="text-white text-sm font-normal leading-normal">
                {description}
                </p>
            </div>
            <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#3b543b] py-5">
                <p className="text-[#9cba9c] text-sm font-normal leading-normal">
                connection
                </p>
                <a className={`text-white text-sm font-normal leading-normal overflow-x-hidden`} href={url}>
                {url.length > 50 ? `${url.slice(0, 50)}...` : url}
                </a>
            </div>
            </div>
            {isloggedIn && 
                <>
                <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                Booking Information
                </h2>
                <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
                    <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#3b543b] py-5">
                        <p className="text-[#9cba9c] text-sm font-normal leading-normal">
                            Booked yet ?
                        </p>
                        <p className="text-white text-sm font-normal leading-normal">
                            {booked?"Yes":"None"}
                        </p>
                    </div>
                </div>
                </>
            }
            <div className="flex flex-row px-4 py-3 gap-4 justify-evenly">
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#283928] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#c5d4c5] hover:text-[#283928] transition-all" 
                onClick={cancelDisplay}
            >
                <span className="truncate">Back</span>
            </button>
            {isloggedIn && 
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#283928] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#c5d4c5] hover:text-[#283928] transition-all" 
                    onClick={() => handleBook()}
                >
                    <span className="truncate">Booked ?</span>
                </button>
            }
            </div>

        </div>
        </div>
    )
}