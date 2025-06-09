import { createContext, useEffect, useState } from "react";
import { User } from "./Account";

export type AuthContextType = {
    isloggedIn: boolean;
    user: User | null;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
    isloggedIn: false,
    user: null,
    setIsLoggedIn: () => {},
    setUser: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isloggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        checkTokenAndRefresh();
    }, []);

    const checkTokenAndRefresh = async () => {
        const token = localStorage.getItem('access_token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    };

    return (
        <AuthContext.Provider value={{ isloggedIn, user, setIsLoggedIn, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};