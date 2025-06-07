"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Lan_Button from "./ui/Lan_Button";
import useAccount from "../hooks/useAccount";
import useAuth from "../hooks/useAuth";

export default function Header(){
    const router = useRouter();
    const { logoutUser } = useAccount();
    const { isloggedIn, setIsLoggedIn } = useAuth();

    const handleLogout = async () => {
        const res = await logoutUser();
        if (res) {
            alert("You have been logged out successfully.");
            setIsLoggedIn(false);
            router.refresh();
        }
    }

    return(
        <header className="w-full flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#283928] px-10 py-3 fixed top-0 z-10 bg-[#283928]">
            <a href="/" className="flex items-center gap-4">
                <h2 className="flex items-center gap-4 text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                    Bookify
                </h2>
            </a>
            <div className="flex flex-1 justify-end gap-8">
                <li className="flex items-center gap-9">
                    <a href="/search" className="text-white text-sm font-medium leading-normal">
                        <button className="text-white text-sm font-medium leading-normal">
                            Search
                        </button>
                    </a>
                    <a href="/booking" className="text-white text-sm font-medium leading-normal">
                        <button className="text-white text-sm font-medium leading-normal">
                            Bookings
                        </button>
                    </a>
                    <a href="/profile" className="text-white text-sm font-medium leading-normal">
                        <button className="text-white text-sm font-medium leading-normal">
                            My profile
                        </button>
                    </a>
                    {!isloggedIn ? (
                        <a href="/login" className="text-white text-sm font-medium leading-normal">
                            <button className="text-white text-sm font-medium leading-normal">
                                Login
                            </button>
                        </a>
                    ) : (
                        <button onClick={() => handleLogout()} className="text-white text-sm font-medium leading-normal">
                            Logout
                        </button>
                    )}
                </li>
                {/* <Lan_Button/> */}
            </div>
        </header>
    );
}