import React from "react";
import { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import axios from 'axios';

const AuthContext = createContext({});

const API_URL = "http://localhost:8080/api/auth";


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (userData) => {
        try {
            let response = await axios.post(API_URL + '/login', userData);

            console.log(response.message);
            console.log(response.data);
            localStorage.setItem("userdata", response.data);    
            setUser(response.data);
        } catch (e) {
            console.log(e);
        }
    }
    
    const logout = () => {
        try{
            setUser(null)
        } catch (e) {
            
        }
    }

    const signup = async(userData) =>{
        try{
            const response = await axios.post(API_URL + '/signup', userData);

            console.log(response.message);
            console.log(response.data);
            
            return response.data;
        }catch(e){
            console.log(e);
        }
    }

    const value = {user, login, logout, signup};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export {AuthContext, AuthProvider};