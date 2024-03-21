import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ isOpen, onClose }) {

    return (
        <div className={`sidebar-container ${isOpen ? '' : 'close'}`}>
            <div className='sidebar-container-content'>
                <div className='sidebar-container-content-inner'>
                    <p>Helo</p>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
