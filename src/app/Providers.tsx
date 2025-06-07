import React from "react";
import { AccountProvider } from "../context/Account";
import { AuthProvider } from "../context/Auth";
import { BookingProvider } from "../context/Booking";
import { ItineraryProvider } from "../context/Intineraries";

type Props = {
    children: React.ReactNode;
};
export default function Providers({ children }: Props) {
    return (
        <>
        <AccountProvider>
        <AuthProvider>
        <BookingProvider>
        <ItineraryProvider>
            {children}
        </ItineraryProvider>
        </BookingProvider>
        </AuthProvider>
        </AccountProvider>
        </>
    );
}