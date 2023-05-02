import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Card, Text, Icon, Input, Button} from '@ui-kitten/components';
import {useUserContext} from "../context/usercontext";
import {addRatingToRecipe} from "../api/recipe";
import {useNavigation} from "@react-navigation/native";

const StarRating = ({recipeID}) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("")
    const {user} = useUserContext();
    const navigation = useNavigation();
    const onSubmit = () => {
        console.log(comment)
        console.log(rating)

        if (rating === 0) {
            window.alert("Please add star rating")
        } else if (comment === "") {
            window.alert("Please add a comment")
        } else {
            addRatingToRecipe({
                recipeId: recipeID,
                rating: rating,
                comment: comment
            }, user.token).then(r => {
                console.log(r)
                if (r.success) {
                    alert(r.data)
                }
            })
        }

    };

    function onStarPress(number) {
        setRating(number);
    }

    return (
        <Card style={styles.card}>
            <Text category="h6">Add Your Rating</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                {[...Array(5)].map((_, index) => {
                    const filled = index < rating;
                    return (
                        <>
                            <TouchableOpacity key={index} onPress={() => onStarPress(index + 1)}>
                                <Icon
                                    name={filled ? 'star' : 'star-outline'}
                                    fill={filled ? '#FACC15' : '#C4C4C4'}
                                    style={{width: 25, height: 25, marginRight: 5}}
                                />
                            </TouchableOpacity>
                        </>
                    );
                })}
            </View>
            <Input value={comment} onChangeText={text => {
                setComment(text)
            }}/>
            <Button onPress={() => {
                onSubmit()
            }}>
                Submit
            </Button>
        </Card>
    );
};
const styles = StyleSheet.create({
    card: {
        margin: 16,
        borderRadius: 8,
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
export default StarRating;
