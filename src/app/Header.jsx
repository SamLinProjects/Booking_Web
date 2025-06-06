"use client";
import Lan_Button from "../components/ui/Lan_Button";

export default function Header(){
    const handlechange = (page) => {
    }

    return(
        <header className="w-full flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#283928] px-10 py-3 fixed top-0 z-10 bg-[#283928]">
            <h2 className="flex items-center gap-4 text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                Bookify
            </h2>
            <div className="flex flex-1 justify-end gap-8">
                <li className="flex items-center gap-9">
                    <button className="text-white text-sm font-medium leading-normal" onClick={() => handlechange("search")}>
                        Search
                    </button>
                    <button className="text-white text-sm font-medium leading-normal" onClick={() => handlechange("bookings")}>
                        Bookings
                    </button>
                    <button className="text-white text-sm font-medium leading-normal" onClick={() => handlechange("profile")}>
                        My profile
                    </button>
                </li>
                <Lan_Button/>
            </div>
        </header>
    );
}