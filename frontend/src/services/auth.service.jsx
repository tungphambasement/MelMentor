import React from "react";
import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

const AuthContext = createContext({});

const API_URL = "http://localhost:8080/api/auth";


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("userdata");
        if (!storedUser) return null;
        const user = JSON.parse(storedUser);
        const token = user.jwtToken;
        const decodedJwt = jwtDecode(token);
        if (decodedJwt.exp * 1000 < Date.now()) {
            localStorage.removeItem("userdata");
            return null;
        }
        return user;
    });

    const login = async (userData) => {
        try {
            let response = await axios.post(API_URL + '/login', userData);

            console.log(response.message);
            console.log(response.data);
            if (response.data.jwtToken) {
                localStorage.setItem("userdata", JSON.stringify(response.data));
                setUser(response.data);
                return response.data;
            }else{
                console.log(response.data.message);
                return response.data;
            }
        } catch (e) {
            console.log("Message");
            return e.message;
        }
    }

    const logout = () => {
        try {
            setUser(null);
            localStorage.removeItem("userdata");
        } catch (e) {

        }
    }

    const signup = async (userData) => {
        try {
            const response = await axios.post(API_URL + '/signup', userData);

            console.log(response.message);
            console.log(response.data);

            return response.data;
        } catch (e) {
            console.log(e);
        }
    }

    const value = { user, login, logout, signup };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider };