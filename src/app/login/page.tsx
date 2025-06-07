'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAccount from '@/src/hooks/useAccount';

export default function page() {
    const router = useRouter();
    const { loginUser, registerUser } = useAccount();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    const handleRegister = async () => {
        if (username === '' || password === '') {
            alert("Username and password cannot be empty!");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const res = await registerUser({ username, password });
            if (res) {
                setIsRegister(false);
                setIsLogin(true);
                router.refresh();
                router.push('/');
            } else {
                alert("Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during registration:", error);
        }
    }

    const handleLogin = async () => {
        if (username === '' || password === '') {
            alert("Username and password cannot be empty!");
            return;
        }

        try {
            const res = await loginUser({ username, password });
            if (res) {
                setIsLogin(true);
                setIsRegister(false);
                router.refresh();
                router.push('/');
            } else {
                alert("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="flex flex-col items-center justify-center">
                <p className="m-2 text-2xl font-bold">{isRegister ? "Register" : isLogin ? "Welcome" : "Login"}</p>
                <input type="text" placeholder="Username" className="m-2 ml-4 p-2 border border-gray-300 rounded text-black" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input type="password" placeholder="Password" className="m-2 ml-4 p-2 border border-gray-300 rounded text-black" value={password} onChange={(e) => setPassword(e.target.value)}/>
                {isRegister && <input type="password" placeholder="Confirm Password" className="m-2 ml-4 p-2 border border-gray-300 rounded text-black" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>}
                <div className="flex items-center mt-2">
                    {!isRegister && !isLogin && <button className="w-20 m-2 mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => handleLogin()}>Login</button>}
                    {isRegister && <button className="w-20 m-2 mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => handleRegister()}>Register</button>}
                    {isRegister && <button className="w-20 m-2 mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => setIsRegister(false)}>Cancel</button>}
                </div>
                {!isRegister && !isLogin && <button className="underline" onClick={() => setIsRegister(true)}>don't have account?</button>}
            </div>
        </main>
    )
}
