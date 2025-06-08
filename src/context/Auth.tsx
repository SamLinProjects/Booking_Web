import { createContext, useEffect, useState } from "react";

export type AuthContextType = {
    isloggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
    isloggedIn: false,
    setIsLoggedIn: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isloggedIn, setIsLoggedIn] = useState<boolean>(false);

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
        <AuthContext.Provider value={{ isloggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};