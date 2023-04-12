import axios from "axios";

import {BASE_URL} from "./config";

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}users/login`, {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const registerUser = async (name, email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}users/register`, {
            name,
            email,
            password,
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const forgotPassword = async (email) => {
    try {
        const response = await axios.post(`${BASE_URL}users/reset-password`, email);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const changePasswordOfLoggedInUser = async (password, token) => {
    try {
        const response = await axios.post(`${BASE_URL}users/change-password`, password, {
            headers: {Authorization: `Bearer ${token}`},
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};


export const getUserByToken = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL}users/token_user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const {success, user} = response.data;
        if (success) {
            return user;
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error getting user by token');
    }
};