import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/Auth';
// import useAccount from '../hooks/useAccount';

const decodeJWT = (token: string) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error decoding JWT:', error);
        return null;
    }
};

export default function useAuth() {
    const { isloggedIn, setIsLoggedIn } = useContext(AuthContext);
    // const { refreshToken } = useAccount();

    const checkAuthStatus = async () => {
        const token = localStorage.getItem('access_token');
        // console.log("Checking auth status, token:", token);
        if (token) {
            const decodedToken = decodeJWT(token);
            // console.log("Decoded token:", decodedToken);

            if (decodedToken && decodedToken.exp) {
                const userId = decodedToken.user_id || decodedToken.sub || decodedToken.id;
                const username = decodedToken.username || decodedToken.name;

                localStorage.setItem('user_id', userId.toString());
                localStorage.setItem('username', username || '');

                setIsLoggedIn(true);
                return { userId, username };
            } else {
                localStorage.removeItem('access_token');
                localStorage.removeItem('user_id');
                localStorage.removeItem('username');
                setIsLoggedIn(false);
                return null;
            }
        } else {
            setIsLoggedIn(false);
            return null;
        }
    };

    useEffect(() => {
        checkAuthStatus();

        const handleStorageChange = async () => {
            await checkAuthStatus();
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('authChange', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('authChange', handleStorageChange);
        };
    }, []);

    const getCurrentUser = () => {
        const userId = localStorage.getItem('user_id');
        const username = localStorage.getItem('username');
        return userId ? { userId: parseInt(userId), username } : null;
    }

    return { isloggedIn, setIsLoggedIn, getCurrentUser };
}