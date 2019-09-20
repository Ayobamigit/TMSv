import React, { createContext, useState, useEffect } from 'react';

export const authContext = createContext();

const AuthProvider = ({ children }) => {
    const authStatus = sessionStorage.getItem('authentication');
    
    const [isAuthenticated, setIsAuthenticated ] = useState(authStatus ? JSON.parse(authStatus) : false);
    const setAuthenticationStatus = (status) => {
        setIsAuthenticated(status)
    }

    useEffect(() => {
        sessionStorage.setItem('authentication', JSON.stringify(isAuthenticated))
    })

    return (
        <authContext.Provider value={{
            isAuthenticated,
            setAuthenticationStatus
        }}>
            { children }
        </authContext.Provider>
    )
}
export default AuthProvider;