import axios from "axios";
import {BASE_URL} from "./config";

export const IMadeThis = async (recipeId, token) => {
    try {
        const response = await axios.post(BASE_URL + 'pantry/i-made-this',
            {recipeId: recipeId}, {
                headers: {Authorization: `Bearer ${token}`},
            });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const addItem = async (data, token) => {
    try {
        const response = await axios.post(BASE_URL + 'pantry/add',
            data,
            {
                headers: {Authorization: `Bearer ${token}`},
            });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getPantry = async (token) => {
    try {
        const response = await axios.get(BASE_URL + 'pantry',
            {
                headers: {Authorization: `Bearer ${token}`},
            });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const delPantryItem = async (id, token) => {
    try {
        const response = await axios.get(BASE_URL + `pantry/delete?id=${id}`,
            {
                headers: {Authorization: `Bearer ${token}`},
            });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};


