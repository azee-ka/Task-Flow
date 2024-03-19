import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';

const navItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Tasks', path: '/tasks' },
    { label: 'Profile', path: '/profile' },
    // Add more items as needed
];

function NavigationBar() {
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
                </ul>
            </div>
        </nav>
    );
}

export default NavigationBar;
