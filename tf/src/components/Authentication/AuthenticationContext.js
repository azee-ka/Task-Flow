import React, { createContext, useState } from 'react';

const initialAuthState = {
    isLoggedIn: false,
    user: null,
    login: () => {},
    logout: () => {}
};

const AuthContext = createContext(initialAuthState);

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const login = (userData) => {
        // Perform login logic
        setUser(userData);
        setIsLoggedIn(true);
    };

    const logout = () => {
        // Perform logout logic
        setUser(null);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
