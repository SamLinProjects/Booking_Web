'use client'
import React, { useState } from 'react';
import useAccount from '@/src/hooks/useAccount';

export default function page() {
    const { loginUser, registerUser, protectedToken, refreshToken, logoutUser } = useAccount();
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
            await registerUser({ username, password });
            setIsRegister(false);
            setIsLogin(true);
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
            } else {
                alert("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    }

    const handleProtected = async () => {
        const access_token = localStorage.getItem('access_token');
        if (!access_token) {
            alert("You need to login first!");
            return;
        }

        try {
            await protectedToken();
        } catch (error) {
            console.error("Error accessing protected route:", error);
        }
    }

    const handleRefresh = async() => {
        const refresh_token = localStorage.getItem('refresh_token');
        if (!refresh_token) {
            alert("You need to login first!");
            return;
        }

        try {
            await refreshToken();
        } catch (error) {
            console.error("Error refreshing token:", error);
        }
    }

    const handleLogout = async () => {
        const access_token = localStorage.getItem('access_token');
        if (!access_token) {
            alert("You need to login first!");
            return;
        }

        try {
            await logoutUser();
            setIsLogin(false);
            setIsRegister(false);
            setUsername('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error("Error during logout:", error);
        }
    }

    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className="flex flex-col items-center justify-center">
              <p className="m-2 text-2xl font-bold">{isRegister ? "Register" : isLogin ? "Welcome" : "Login"}</p>
              <input type="text" placeholder="Username" className="m-2 ml-4 p-2 border border-gray-300 rounded text-black" value={username} onChange={(e) => setUsername(e.target.value)}/>
              <input type="password" placeholder="Password" className="m-2 ml-4 p-2 border border-gray-300 rounded text-black" value={password} onChange={(e) => setPassword(e.target.value)}/>
              {isRegister && <input type="password" placeholder="Confirm Password" className="m-2 ml-4 p-2 border border-gray-300 rounded text-black" value={password} onChange={(e) => setConfirmPassword(e.target.value)}/>}
              <div className="flex items-center mt-2">
                  {!isRegister && !isLogin && <button className="w-20 m-2 mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => handleLogin()}>Login</button>}
                  {isRegister && <button className="w-20 m-2 mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => handleRegister()}>Register</button>}
                  {isRegister && <button className="w-20 m-2 mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => setIsRegister(false)}>Cancel</button>}
                  {isLogin && <button className="w-30 m-2 mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => handleProtected()}>Protected</button>}
                  {isLogin && <button className="w-35 m-2 mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => handleRefresh()}>Refresh Token</button>}
                  {isLogin && <button className="w-20 m-2 mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => handleLogout()}>Log out</button>}
              </div>
              {!isRegister && !isLogin && <button className="underline" onClick={() => setIsRegister(true)}>don't have account</button>}
          </div>
      </main>
    )
}
