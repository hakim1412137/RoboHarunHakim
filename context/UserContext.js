import React, { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext};

/*
import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
*/


// Optional: Define prop types for the provider
/*UserProvider.propTypes = {
    children: PropTypes.node.isRequired, // Ensure children prop is required and is a node
};*/
/*

// src/context/UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserData = async () => {
            const storedUser = await AsyncStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
            setLoading(false);
        };

        loadUserData();
    }, []);

    const login = async (userData) => {
        setUser(userData);
        await AsyncStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = async () => {
        setUser(null);
        await AsyncStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
*/
