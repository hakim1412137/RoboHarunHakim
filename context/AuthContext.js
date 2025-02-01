import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }
    };
    loadToken();
  }, []);

  const saveToken = async (userToken) => {
    await AsyncStorage.setItem('token', userToken);
    setToken(userToken);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setToken(null);
  };

  const isAuthenticated = () => {
    return token !== null; // Check if a token exists
  };

  return (
      <AuthContext.Provider value={{ token, saveToken, logout, isAuthenticated }}>
        {children}
      </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

/*const login = (userData) => {
  // Assuming userData contains { username, token }
  setUser(userData.username); // Store the username in UserContext
  saveToken(userData.token); // Save the token in AsyncStorage
};

return (
    <AuthContext.Provider value={{token, saveToken, logout, login}}>
      {children}
    </AuthContext.Provider>
);

};*/
/*import React, { createContext, useContext, useState } from 'react';

import {UserContext} from "./UserContext";
// import { UserContext } from '../UserContext'; // Adjust path as necessary

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { setUser } = useContext(UserContext); // Access setUser from UserContext
  const [token, setToken] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('token'); // Safely get token from localStorage
    }
    return null;
  });

  const saveToken = (userToken) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('token', userToken);
    }
    setToken(userToken);
  };

  const logout = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token');
    }
    setToken(null);
    setUser(null); // Clear user state on logout
  };

  const login = (userData) => {
    // Assuming userData contains { username, token }
    setUser(userData); // Set user state when logging in
    saveToken(userData.token); // Save token to localStorage
  };

  return (
      <AuthContext.Provider value={{ token, saveToken, logout, login }}>
        {children}
      </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};*/

/*
import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(localStorage.getItem('token'));

  if (typeof window !== 'undefined' && window.localStorage) {
    return localStorage.getItem('token'); // Safely access localStorage
  }


  const saveToken = (userToken) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('token', userToken);
    }
    setToken(userToken);
  };

  const logout = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token');
    }
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser,token, saveToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
*/
