import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Button, Text, Card} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';
import {getAllRecipes} from "../api/recipe";
import {useUserContext} from "../context/usercontext";
import RecipeCard from "../components/RecipeCard";

export default function HomeScreen() {
    const navigation = useNavigation();
    const [recipes, setRecipes] = useState(null)
    const {user} = useUserContext();

    const handleAddRecipePress = () => {
        navigation.navigate('AddNewRecipe');
    };

    useEffect(() => {
        if (user){
            getAllRecipes(user.token).then(e => {
               if (e.success){
                   setRecipes(e.data)
               }
            })
        }
    }, [user])


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text category="h5" style={styles.title}>
                    Recipes
                </Text>
                <Button onPress={handleAddRecipePress}>Add New Recipe</Button>
            </View>
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
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    title: {
        fontWeight: 'bold',
    },
    scrollContainer: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    card: {
        marginVertical: 8,
        padding: 16,
    },
    metaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    meta: {
        fontSize: 12,
    },
});
