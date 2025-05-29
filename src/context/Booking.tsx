'use client';
import { createContext, useState } from 'react';

export type Booking = {
    user_id: number;
    itinerary_id: number;
    booked_at: Date;
};

export type BookingContextType = {
    booking: Booking | null;
    bookings: Booking[];
    setBooking: (booking: Booking | null) => void;
    setBookings: (bookings: Booking[]) => void;
    addBooking: (booking: Booking) => void;
    removeBooking: (itinerary_id: number) => void;
};

export const BookingContext = createContext<BookingContextType>({
    booking: null,
    bookings: [],
    setBooking: () => {},
    setBookings: () => {},
    addBooking: () => {},
    removeBooking: () => {},
});

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [booking, setBooking] = useState<Booking | null>(null);
    const [bookings, setBookings] = useState<Booking[]>([]);

    const addBooking = (newBooking: Booking) => {
        setBookings((prevBookings) => [...prevBookings, newBooking]);
    };
    const removeBooking = (itinerary_id: number) => {
        setBookings((prevBookings) => prevBookings.filter(b => b.itinerary_id !== itinerary_id));
    };

    return (
        <BookingContext.Provider value={{ booking, bookings, setBooking, setBookings, addBooking, removeBooking }}>
            {children}
        </BookingContext.Provider>
    );
};
