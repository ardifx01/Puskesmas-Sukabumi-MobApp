import React, { createContext, useState, useContext, useEffect, use } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'userToken';
const USER_DATA = 'userData';
export const API_URL = ' https://capable-premium-filly.ngrok-free.app/api';

const AuthContext = createContext({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState({
        userToken: null,
        userData: null,
        isSignedIn: false,
    });                

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            response => response,
            async err => {  
                console.log("Error Interceptor Caught an error: ", err);
                if(err.response?.status === 400) {
                    alert('Bad Request !, Token Status: ' + err.response?.data?.tokenStatus + ', ' + err.response?.data?.message);
                } else if (err.response?.status === 401) {
                    if(err.response?.data?.isLoginAttempt) {
                       alert('Login failed !, Reason: ' + err.response?.data?.message);
                    } else {
                        console.log("401 Error, Unauthorized !, Token Status: ", err.response?.data?.tokenStatus, " Message: ", err.response?.data?.message);
                        alert("Token Status:" + err.response?.data?.tokenStatus + " Message: " + err.response?.data?.message);
                        console.log('Deleting token ', await SecureStore.getItemAsync(TOKEN_KEY));
                        await SecureStore.deleteItemAsync(TOKEN_KEY);
                        console.log('Token deleted, Token: ', await SecureStore.getItemAsync(TOKEN_KEY));
                        console.log('Deleting user data ', await SecureStore.getItemAsync(USER_DATA));
                        await SecureStore.deleteItemAsync(USER_DATA);
                        console.log('User Data deleted, User Data: ', await SecureStore.getItemAsync(USER_DATA));
                        console.log("Removing Auth Header...");
                        axios.defaults.headers.common['Authorization'] = `Bearer ${null}`;
                        console.log("Auth Header removed, Auth Header: ", axios.defaults.headers.common['Authorization']);
                        console.log('Clearing Auth Data...');
                        setAuthData({
                            userToken: null,
                            userData: null,
                            isSignedIn: false,
                        });
                    };

                } else if(err.response?.status === 409) {
                    alert("Conflict !, " + err.response?.data?.message);
                } else if(err.response?.status === 422) {
                    alert("Unprocessable Content, Reason: " + err.response?.data?.message);
                } else if(err.response?.status === 500) {
                    alert("TERJADI ERROR PADA SERVER !");
                }
                return Promise.reject(err);
            }
        );

        const loadAuthData = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            const userData = JSON.parse(await SecureStore.getItemAsync(USER_DATA));
            if (token) {
                console.log('Token found:', token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                console.log("Checking token validity...");
                try {
                    const tokenStatus = await axios.post(
                                            `${API_URL}/user/check`, { 
                                                headers: {
                                                    'Accept': 'application/json',
                                                    'Content-Type': 'application/json',
                                                }
                                            }
                                        );
                    console.log("Token Status:", tokenStatus?.data?.tokenStatus, " Data: ", tokenStatus?.data?.data);
                    console.log("Setting Auth Data...");
                    setAuthData({
                        userToken: token,
                        userData: userData,
                        isSignedIn: true,
                    });
                    console.log("Auth Data Setting Complete!");
                } catch (error) {
                    console.log("There is an error, check alert on phone !");
                }
            }
        };
        loadAuthData();
        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, []);

    useEffect(() => {
        console.log("Auth Data: ", authData);
    }, [authData]);

    const auth = async (username, password) => {
        try {
            const response = await axios.post(`${API_URL}/auth`, { 'email':username, 'password':password });
            await SecureStore.setItemAsync(TOKEN_KEY, response.data.token);
            await SecureStore.setItemAsync(USER_DATA, JSON.stringify(response.data.user));
            axios.defaults.headers.common['Authorization'] = `Bearer ${await SecureStore.getItemAsync(TOKEN_KEY)}`;
            setAuthData({
                userToken: await SecureStore.getItemAsync(TOKEN_KEY),
                userData: JSON.parse(await SecureStore.getItemAsync(USER_DATA)),
                isSignedIn: true,
            });
            console.log("Login Success!");
        } catch (error) {
           console.log("There is an error, check alert on phone !"); 
        }
        
    };

    const deauth = async () => {
        try {
            console.log("Logging out...");
            console.log("Current Headers", axios.defaults.headers.common);
            await axios.post(`${API_URL}/user/deauth`, { 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            console.log('Logged out !, deleting token ', await SecureStore.getItemAsync(TOKEN_KEY));
            await SecureStore.deleteItemAsync(TOKEN_KEY);
            console.log('Token deleted, Token: ', await SecureStore.getItemAsync(TOKEN_KEY));
            console.log('Deleting user data ', await SecureStore.getItemAsync(USER_DATA));
            await SecureStore.deleteItemAsync(USER_DATA);
            console.log('User Data deleted, User Data: ', await SecureStore.getItemAsync(USER_DATA));
            console.log("Removing Auth Header...");
            axios.defaults.headers.common['Authorization'] = `Bearer ${null}`;
            console.log("Auth Header removed, Auth Header: ", axios.defaults.headers.common['Authorization']);
            console.log('Clearing Auth Data...');
            await setAuthData({
                userToken: null,
                userData: null,
                isSignedIn: false,
            });
            console.log("Auth Data cleared !");
            alert("You have been logged out !");
        } catch (error) {
            console.log("There is an error, check alert on phone !");
        }

    };

    const value = {
        onLogin: auth,
        onLogout: deauth,
        authData,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};