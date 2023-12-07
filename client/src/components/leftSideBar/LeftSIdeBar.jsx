// LeftSideBar.js

import React, { useState } from 'react';
import './LeftSideBar.css';
import { Link, NavLink } from 'react-router-dom';
import Globe from '../../assets/Globe.svg';

const LeftSideBar = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className={`left-sidebar ${showDropdown ? 'show-dropdown' : ''}`}>
            <nav className="side-nav">
                <NavLink to="/" className="side-nav-links" activeClassName="active">
                    <p>Home</p>
                </NavLink>
                <div className="side-nav-div">
                    <NavLink to='/publicSpace' className="side-nav-links" activeClassName="active">
                        <p>Public Space</p>
                    </NavLink>
                    <NavLink to='/videoPlayer' className="side-nav-links" activeClassName="active">
                        <p>Video</p>
                    </NavLink>
                    <NavLink to='/textEditor' className="side-nav-links" activeClassName="active">
                        <p>Text Editor</p>
                    </NavLink>
                    <NavLink to="/Questions" className="side-nav-links" activeClassName="active">
                        <img src={Globe} alt="Globe" />
                        <p style={{ paddingLeft: '10px' }}> Questions </p>
                    </NavLink>
                    <NavLink to="/Tags" className="side-nav-links" activeClassName="active" style={{ paddingLeft: '40px' }}>
                        <p>Tags</p>
                    </NavLink>
                    <NavLink to="/Users" className="side-nav-links" activeClassName="active" style={{ paddingLeft: '40px' }}>
                        <p>Users</p>
                    </NavLink>
                </div>

                <div className="dropdown-icon" onClick={toggleDropdown}>
                    &#9776;
                </div>
            </nav>
        </div>
    );
};

export default LeftSideBar;
