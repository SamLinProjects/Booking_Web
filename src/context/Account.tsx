'use client';
import { createContext, useState } from 'react';

export type User = {
    id: number;
    username: string;
    password: string;
};

export type AccountContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
};

export const AccountContext = createContext<AccountContextType>({
    user: null,
    setUser: () => {},
});

export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <AccountContext.Provider value={{ user, setUser }}>
            {children}
        </AccountContext.Provider>
    );
};
