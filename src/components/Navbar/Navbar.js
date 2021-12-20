import React from 'react';
import logo from '../../logo/logo.svg';
import { useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/auth');
    }

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
                    <NavLink
                        className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
                        to="/profile">
                        <li>
                            Profile
                        </li>
                    </NavLink>
                    <li className="nav-item" onClick={logout}>
                        Logout
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;