import React, { useState, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

export const AppContext = React.createContext();

const useAuth = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
        const token = user?.token;

        //JWT

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [])

    return user;
}

const ProtectedRoutes = () => {
    const isAuth = useAuth();

    return isAuth?.loggedin ?
        <AppContext.Provider value={{ isAuth }}>
            <Navbar />
            <Outlet />
        </AppContext.Provider> :
        <Navigate replace to="/auth" />
}

export default ProtectedRoutes;
