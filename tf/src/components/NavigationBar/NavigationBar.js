import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavigationBar.css';
import { useAuthDispatch } from '../Authentication/utils/AuthProvider';
import Sidebar from '../sidebar/Sidebar';

function NavigationBar() {
    const { isAuthenticated, logout } = useAuthDispatch();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

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

    const handleSidebarClose = () => {
        setMenuOpen(false);
    }

    return (
        <nav className="navigation-bar">
            <div className="navigation-bar-inner">
                <div className='navigation-side-menubar'>
                    <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
                        <div className={`menu-line ${menuOpen ? 'open' : ''}`}></div>
                        <div className={`menu-line ${menuOpen ? 'open' : ''}`}></div>
                        <div className={`menu-line ${menuOpen ? 'open' : ''}`}></div>
                    </div>
                </div>
                <div className='navigation-bar-header'>
                    <h1>TaskFlow</h1>
                    <ul>
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <Link to={item.path}>{item.label}</Link>
                            </li>
                        ))}
                        {
                            
                        }
                        {isAuthenticated && (
                            <button onClick={handleLogout}>Sign Out</button>
                        )}
                    </ul>
                </div>
            </div>
            {isLoading && <div className="loading-bar"></div>}
            {<Sidebar isOpen={menuOpen} onClose={handleSidebarClose} />}
        </nav>
    );
}

export default NavigationBar;
