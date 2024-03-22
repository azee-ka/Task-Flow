import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ isOpen, onClose }) {
    const [options] = useState([
        { id: 1, label: 'Tasks', path: '/tasks' },
        { id: 1, label: 'Add Task', path: '/add-task' },
        { id: 2, label: 'Calendar', path: '/calendar' },
        { id: 3, label: 'Categories', path: '/categories' },
        { id: 4, label: 'Settings', path: '/settings' }
    ]);

    return (
        <div className={`sidebar-container ${isOpen ? '' : 'close'}`}>
            <div className='sidebar-container-content'>
                <div className='sidebar-container-content-inner'>
                    <div className='sidebar-menu'>
                        {options.map(option => (
                            <li key={option.id} className='sidebar-menu-item'>
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
