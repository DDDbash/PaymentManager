import React from 'react';
import logo from '../logo/logo.svg';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-items">
                <img
                    src={logo}
                    alt=""
                    height="40px"
                    width="40px"
                    className="logo"
                />
                <ul className="nav-list">
                    <NavLink
                        className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
                        to="/">
                        <li>
                            Dashboard
                        </li>
                    </NavLink>
                    <NavLink
                        className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
                        to="/logs">
                        <li>
                            Logs
                        </li>
                    </NavLink>

                </ul>
            </div>
        </nav>
    );
}

export default Navbar;