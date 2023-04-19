import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {Button, Card, Icon, Text} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';
import {getRecipeById} from "../../api/recipe";
import {useUserContext} from "../../context/usercontext";
import HTML from 'react-native-render-html';
import StarRating from "../../components/StarRatingAdd";
import { IMadeThis} from "../../api/pantry";
import {addToFavourites} from "../../api/favs";

const RecipeDetailScreen = ({route}) => {
    const navigation = useNavigation();
    const {user} = useUserContext();
    const [recipe, setRecipe] = useState(null)

    useEffect(() => {
        navigation.setOptions({
            title: route.params.recipe.title
        });

        getRecipeById(route.params.recipe._id, user.token).then(r => {
            console.log(r)
            r.success && setRecipe(r.data)
        })


    }, []);

    function handleImadeThis() {
        IMadeThis(recipe._id, user.token).then(r => {
            console.log(r)
            r.success && alert(r.data)
        })
    }

    function addToFav() {
        addToFavourites(recipe._id, user.token).then(r => {
            console.log(r)
            if (r.success){
                alert(r.data)
            }
        })
    }

    return (
        <ScrollView>
            <Card style={styles.card}>
                {recipe !== null && <>
                    <Text category='h5' style={styles.title}>{recipe.title}</Text>
                    <Text style={styles.description}><HTML source={{html: recipe.description}}/></Text>
                    <Text style={styles.details}>Cuisine: {recipe.cuisine}</Text>
                    <Text style={styles.details}>Prep Time: {recipe.prepTime} minutes</Text>
                    <Text style={styles.details}>Calories per Serving: {recipe.calories.toFixed(2)}</Text>
                    <Text style={styles.details}>Servings: {recipe.servings}</Text>
                    <Text style={styles.ingredients}>Ingredients:</Text>
                    {recipe.ingredients.map((ingredient, index) => (
                        <Text key={index} style={styles.ingredientItem}>
                            {ingredient.ingredient.title} - {ingredient.qty} {ingredient.unit}
                        </Text>
                    ))}
                </>}
                {recipe === null && <Text>Loading...</Text>}
            </Card>

            {recipe !== null &&
                <Card style={styles.card}>
                    <Button onPress={addToFav}>
                        Add to Favourites
                    </Button>

                    <Button onPress={handleImadeThis}>
                        I made this!
                    </Button>
                </Card>
            }

            {recipe !== null && <StarRating recipeID={recipe._id}/>}

            {recipe !== null && recipe.totalRatings !== 0 &&
                <>
                    <Card style={styles.ratingCard}>
                        <Icon
                            name={'star'}
                            fill={'#FACC15'}
                            style={{width: 25, height: 25, marginRight: 5}}
                        />
                        <Text>{recipe.avgRating} ({recipe.totalRatings})</Text>
                    </Card>

                    {recipe.ratings.map((rating, key) => {

                        return <Card style={styles.card}>
                            <View style={{display: "flex", flexDirection: "row"}}>
                                <Icon
                                    name={'star'}
                                    fill={'#FACC15'}
                                    style={{width: 25, height: 25, marginRight: 5}}
                                />
                                <Text>{rating.rating} </Text>
                            </View>
                            <Text>{rating.comment} </Text>
                        </Card>
                    })}
                </>
            }

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 16,
        borderRadius: 8,
    },
    ratingCard: {
        margin: 16,
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        marginBottom: 16,
    },
    details: {
        marginBottom: 8,
    },
    ingredients: {
        marginTop: 8,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    ingredientItem: {
        marginBottom: 4,
    },
});

export default RecipeDetailScreen;
