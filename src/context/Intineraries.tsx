'use client';
import { createContext, useState } from 'react';

export type Itinerary = {
    id: number;
    type: string;
    name: string;
    description: string;
    image: string;
    url: string;
    start: string;
    destination: string;
    departure_time: string;
    arrival_time: string;
    price: number;
};

export type ItineraryContextType = {
    itinerary: Itinerary | null;
    setItinerary: (itinerary: Itinerary | null) => void;
};

export const ItineraryContext = createContext<ItineraryContextType>({
    itinerary: null,
    setItinerary: () => {},
});

export const ItineraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [itinerary, setItinerary] = useState<Itinerary | null>(null);

    return (
        <ItineraryContext.Provider value={{ itinerary, setItinerary }}>
            {children}
        </ItineraryContext.Provider>
    )
};
