import axios from "axios";
import {BASE_URL} from "./config";

export const addToFavourites = async (id, token) => {
    try {
        const response = await axios.post(BASE_URL + 'users/add-to-favorites',
            {recipeId: id},
            {
                headers: {Authorization: `Bearer ${token}`},
            });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const removeFromFavs = async (id, token) => {
    try {
        const response = await axios.post(BASE_URL + 'users/remove-from-favorites',
            {recipeId: id},
            {
                headers: {Authorization: `Bearer ${token}`},
            });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getFavs = async (token) => {
    try {
        const response = await axios.get(BASE_URL + 'users/favorites',
            {
                headers: {Authorization: `Bearer ${token}`},
            });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};