import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/Auth';
// import useAccount from '../hooks/useAccount';

export default function useAuth() {
    const { isloggedIn, setIsLoggedIn } = useContext(AuthContext);
    // const { refreshToken } = useAccount();

    const checkAuthStatus = async () => {
        const token = localStorage.getItem('access_token');
        // console.log("Checking auth status, token:", token);
        if (token) {
            console.log("User is logged in.");
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    };

    useEffect(() => {
        checkAuthStatus();

        const handleStorageChange = () => {
            checkAuthStatus();
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('authChange', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('authChange', handleStorageChange);
        };
    }, []);

    return { isloggedIn, setIsLoggedIn };
}