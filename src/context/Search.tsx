"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchData {
    keyword?: string;
    country?: string;
    city?: string;
    startDate?: string;
    endDate?: string;
    [key: string]: any; // Allow additional properties
}

interface SearchContextType {
    searchData: SearchData | null;
    setSearchData: (data: SearchData | null) => void;
    clearSearchData: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
    const [searchData, setSearchData] = useState<SearchData | null>(null);

    const clearSearchData = () => setSearchData(null);

    return (
        <SearchContext.Provider value={{ searchData, setSearchData, clearSearchData }}>
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch() {
    const context = useContext(SearchContext);
    if (context === undefined) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
}
