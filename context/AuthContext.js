import React , { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import {BASE_URL} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const register = async (fullName, email, password) => {
        try{
            const response = await axios.post(`${BASE_URL}/register`, {
                fullName: fullName,
                email: email,
                password: password
            });

            console.log("Response: ", response.data);

            if(response.status === 200 && response.data!= null) {
                let info = response.data;
                setUserInfo(email);
                AsyncStorage.setItem('userInfo', JSON.stringify(info));
                console.log("User registered successfully");
        }
       
    }catch(error){
        console.log("Error: ", error);
    }
}
    

    const login = (email,password) => {
        setIsLoading(true);
        axios.post("https://transcendx.onrender.com/login", {
            email: email,
            password: password
        })
        .then(response => {
            if(response.status === 200 && response.data!= null) {
            console.log("Async: ", email);    
            setUserInfo(email);
            AsyncStorage.setItem(userInfo.fullName, JSON.stringify(email));
            setIsLoading(false);
            console.log(userInfo);
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
        AsyncStorage.removeItem(email);
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