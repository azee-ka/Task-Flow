import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import AuthContext from './AuthContext';

const Authentication = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const handleLogin = (userData) => {
        // Perform login logic (e.g., send login request to backend)
        setUser(userData);
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        // Perform logout logic (e.g., send logout request to backend)
        setUser(null);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, handleLogin, handleLogout }}>
            {isLoggedIn ? (
                <div>
                    <h1>Welcome, {user.username}!</h1>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <h1>Login/Register</h1>
                    <Login />
                    <Register />
                </div>
            )}
        </AuthContext.Provider>
    );
}

export default Authentication;
