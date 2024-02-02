import React , { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import {BASE_URL} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);


    const register = (fullName,email,password) => {
        setIsLoading(true);
        axios.post(`${BASE_URL}/register`, {
            fullName: "abhay",
            email: "test@gmail.com",
            password: "abcs"
        })
        .then(response => {
            let info = response.data;
            setUserInfo(info);
            AsyncStorage.setItem('userInfo', JSON.stringify(info));
            setIsLoading(false);
            console.log(info);
        })
        .catch(error => {
            console.log(error);
            setIsLoading(false);
        });
    };

    const login = (email,password) => {
        setIsLoading(true);
        axios.post(`${BASE_URL}/login`, {
            email: email,
            password: password
        })
        .then(response => {
            if(response.status === 200 && response.data!= null) {
            let info = response.data;
            setUserInfo(info);
            AsyncStorage.setItem('userInfo', JSON.stringify(info));
            setIsLoading(false);
            console.log(info);
            }else{
                console.log(`Error: ${response.status}`);
            }
        })
        .catch(error => {
            console.log(error);
            setIsLoading(false);
        });
    }


    const logout = () => {
        AsyncStorage.removeItem('userInfo');
        setUserInfo({});
    }

    return (
    <AuthContext.Provider value={{
        isLoading,
        userInfo,
        register,
        login,
        logout
        }}>
        {children}
    </AuthContext.Provider>
    )
};