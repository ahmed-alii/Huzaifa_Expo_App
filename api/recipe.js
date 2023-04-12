import axios from 'axios';
import {BASE_URL} from "./config";

// Add a new recipe
export const addNewRecipe = async (recipeData, token) => {
    try {
        const response = await axios.post(BASE_URL + 'add/new-recipe', JSON.stringify(recipeData), {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};


// Add a rating to a recipe
export const addRatingToRecipe = async (recipeData, token) => {
    try {
        const response = await axios.post(BASE_URL + 'add/add-recipe-rating', recipeData, {
            headers: {Authorization: `Bearer ${token}`},
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};


// Get all recipes
export const getAllRecipes = async (authToken) => {
    try {
        const response = await axios.get(BASE_URL+'get/recipes', {
            headers: { Authorization: `Bearer ${authToken}` },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Search recipes by ingredients
export const searchRecipeByIngredients = async (query, authToken) => {
    try {
        const response = await axios.get(BASE_URL+`get/searchRecipeByIngredients?q=${query}`, {
            headers: { Authorization: `Bearer ${authToken}` },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Find recipes by title
export const findRecipe = async (query, authToken) => {
    try {
        const response = await axios.get(BASE_URL+`get/searchRecipe?q=${query}`, {
            headers: { Authorization: `Bearer ${authToken}` },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Get recipe by id
export const getRecipeById = async (id, authToken) => {
    try {
        const response = await axios.get(BASE_URL+`get/recipeById?id=${id}`, {
            headers: { Authorization: `Bearer ${authToken}` },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
