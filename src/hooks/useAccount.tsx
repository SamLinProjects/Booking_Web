'use client';
import { useRouter } from 'next/navigation';

export default function useAccount() {
    const router = useRouter();

    // Register
    const registerUser = async ({
        username, 
        password,
    }: {
        username: string;
        password: string;
    }) => {
        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();
            if (data.access_token) {
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('refresh_token', data.refresh_token);
                console.log("Access Token:", data.access_token);
                console.log("Refresh Token:", data.refresh_token);
                window.dispatchEvent(new Event('authChange'));
                alert("Registration successful!");
                router.refresh();
                return res.ok;
            } else {
                alert("Registration failed: " + data.message);
                throw new Error(data.message);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("An error occurred during registration. Please try again.");
        }
    }

    // Login
    const loginUser = async ({
        username, 
        password,
    }: {
        username: string;
        password: string;
    }) => {
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();
            if (data.access_token) {
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('refresh_token', data.refresh_token);
                console.log("Access Token:", data.access_token);
                console.log("Refresh Token:", data.refresh_token);
                window.dispatchEvent(new Event('authChange'));
                alert("Login successful!");
                router.refresh();
                return res.ok;
            } else {
                alert("Login failed: " + data.message);
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred during login. Please try again.");
        }
    }

    // Protected Route
    const protectedToken = async () => {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            alert("You need to log in first!");
            return;
        }

        try {
            const res = await fetch('/api/protected', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
            const data = await res.json();
            if (data.message) {
                alert("Protected data: " + data.message);
            } else {
                alert("Failed to fetch protected data: " + data.error);
            }
        } catch (error) {
            console.error("Error fetching protected data:", error);
            alert("An error occurred while fetching protected data. Please try again.");
        }
    }

    // Refresh Token
    const refreshToken = async () => {
        const refreshToken = localStorage.getItem('refresh_token');
        console.log("Refresh Token:", refreshToken);
        if (!refreshToken) {
            alert("You need to log in first!");
            return;
        }

        try {
            const res = await fetch('/api/refresh', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${refreshToken}`,
                },
            });
            const data = await res.json();
            if (data.access_token) {
                localStorage.setItem('access_token', data.access_token);
                alert("Token refreshed successfully!");
                console.log("New Access Token:", data.access_token);
                return res.ok;
            } else {
                alert("Failed to refresh token: " + data.message);
            }
        } catch (error) {
            console.error("Error refreshing token:", error);
            alert("An error occurred while refreshing the token. Please try again.");
        }
    }

    // Logout
    const logoutUser = async () => {
        const accessToken = localStorage.getItem('access_token');
        console.log("Access Token:", accessToken);
        if (!accessToken) {
            alert("You need to log in first!");
            return;
        }

        try {
            const res = await fetch('/api/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
            const data = await res.json();
            if (data.message) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.dispatchEvent(new Event('authChange'));
                alert("Logout successful!");
                router.refresh();
                return res.ok;
            } else {
                console.error("Logout failed:", data);
                alert("Logout failed: " + data.message);
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
            }
        } catch (error) {
            console.error("Error during logout:", error);
            alert("An error occurred during logout. Please try again.");
        }
    }

    return {
        registerUser,
        loginUser,
        protectedToken,
        refreshToken,
        logoutUser,
    }
}