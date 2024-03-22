import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ isOpen, onClose }) {
    const [options] = useState([
        { label: 'Tasks', path: '/tasks' },
        { label: 'Add Task', path: '/add-task' },
        { label: 'Calendar', path: '/calendar' },
        { label: 'Categories', path: '/categories' },
        { label: 'Settings', path: '/settings' }
    ]);

    return (
        <div className={`sidebar-container ${isOpen ? '' : 'close'}`}>
            <div className='sidebar-container-content'>
                <div className='sidebar-container-content-inner'>
                    <div className='sidebar-menu'>
                        {options.map((option, index) => (
                            <li key={`${index}-${option.label}`} className='sidebar-menu-item'>
                                <div>
                                    <Link to={option.path} className='sidebar-menu-link' onClick={onClose}>
                                        {option.label}
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
