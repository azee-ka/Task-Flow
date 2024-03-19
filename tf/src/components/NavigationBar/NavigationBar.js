import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavigationBar.css';
import { useAuth } from '../Authentication/AuthenticationContext';

function NavigationBar() {
    const { isLoggedIn, logout } = useAuth();
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

    const navItems = isLoggedIn ? privatePages : publicPages;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    console.log(navItems);
    return (
        <nav className="navigation-bar">
            <div className="navigation-bar-inner">
                <h1>Task Portal</h1>
                <ul>
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <Link to={item.path}>{item.label}</Link>
                        </li>
                    ))}
                    {isLoggedIn && (
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default NavigationBar;
