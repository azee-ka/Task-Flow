import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavigationBar.css';
import { useAuthDispatch } from '../Authentication/utils/AuthProvider';

function NavigationBar() {
    const { isAuthenticated, logout } = useAuthDispatch();
    const navigate = useNavigate();
    const privatePages = [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Tasks', path: '/tasks' },
        { label: 'Profile', path: '/profile' },
    ];
    const publicPages = [
        { label: 'Login', path: '/login' },
        { label: 'Register', path: '/register' },
    ];

    const navItems = isAuthenticated ? privatePages : publicPages;
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = () => {
        logout();
        setIsLoading(true);
        setTimeout(() => {
            navigate('/login');
            setIsLoading(false);
        }, 500);
    };

    return (
        <nav className="navigation-bar">
            <div className="navigation-bar-inner">
                <h1>TaskFlow</h1>
                <ul>
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <Link to={item.path}>{item.label}</Link>
                        </li>
                    ))}
                    {isAuthenticated && (
                        <button onClick={handleLogout}>Sign Out</button>
                    )}
                </ul>
            </div>
            {isLoading && <div className="loading-bar"></div>}
        </nav>
    );
}

export default NavigationBar;
