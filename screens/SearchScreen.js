import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Icon, Input, Radio, Button, Text} from '@ui-kitten/components';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {searchRecipeByIngredients, findRecipe} from '../api/recipe';
import {useUserContext} from "../context/usercontext";
import RecipeCard from "../components/RecipeCard";

const validationSchema = Yup.object().shape({
    query: Yup.string().required('Please enter a search query'),
});

export default function SearchScreen() {
    const {user} = useUserContext();
    const [recipes, setRecipes] = useState([])
    const formik = useFormik({
        initialValues: {query: '', searchBy: 'title'},
        validationSchema,
        onSubmit: async (values) => {
            setRecipes([])
            if (values.searchBy === 'title') {
                findRecipe(values.query, user.token).then(r => {
                    r.success && setRecipes(r.data)
                })

            } else {
                searchRecipeByIngredients(values.query, user.token).then(r => {
                    r.success && setRecipes(r.data)
                })
            }
        },
    });

    return (
        <View style={styles.container}>
            <Input
                placeholder="Search title, or ingredients"
                value={formik.values.query}
                onChangeText={formik.handleChange('query')}
                onBlur={formik.handleBlur('query')}
                status={formik.errors.query ? 'danger' : 'basic'}
                caption={formik.errors.query}
            />
            <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 10}}>
                <Radio
                    style={{marginRight: 8}}
                    checked={formik.values.searchBy === 'title'}
                    onChange={() => formik.setFieldValue('searchBy', 'title')}
                >
                    Find By Title
                </Radio>
                <Radio
                    checked={formik.values.searchBy === 'ingredients'}
                    onChange={() => formik.setFieldValue('searchBy', 'ingredients')}
                >
                    Find By Ingredients
                </Radio>
            </View>
            <Button onPress={formik.handleSubmit}>Search</Button>

            <ScrollView style={styles.scrollContainer}>
                {recipes && recipes.map((recipe, key) => (
                    <RecipeCard recipe={recipe} key={key}/>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
});
