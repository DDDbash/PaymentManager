import React from 'react';
import logo from '../logo/logo.svg';

const Navbar = () => {
    return (
        <nav className="navbar">
            <img
                src={logo}
                alt=""
                height="40px"
                width="40px"
                className="logo"
            />
            <ul className="nav-list">
                <li className="nav-item">
                    Dashboard
                </li>
                <li className="nav-item">
                    Logs
                </li>
                <li className="nav-item">
                    Profile
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;