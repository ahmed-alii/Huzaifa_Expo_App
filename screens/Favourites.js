import React, {useEffect, useState} from "react";
import {useUserContext} from "../context/usercontext";
import {getFavs, removeFromFavs} from "../api/favs";
import {ScrollView, StyleSheet, View} from "react-native";
import {Button, Card, Text} from "@ui-kitten/components";
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function Favourites() {
    const [favs, setFavs] = useState(null)
    const {user} = useUserContext();
    const navigation = useNavigation();


    useEffect(() => {
        if (!favs) {
            getData();
        }
    }, [favs]);


    function getData() {
        getFavs(user.token).then(r => {
            console.log(r)
            if (r.success) {
                setFavs(r.data)
            }
        })
    }


    function unlike(recipe) {
        console.log(recipe)
        removeFromFavs(recipe._id, user.token).then(r => {
            if (r.success){
                getData()
            }
        })
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                {favs && favs.map((recipe, key) => (
                    <Card style={styles.card}
                          onPress={() => {
                              navigation.navigate('RecipeDetails', {recipe})
                          }}>
                        <Text category="h6" style={styles.title}>{recipe.title}</Text>
                        <View style={styles.metaContainer}>
                            <Text appearance="hint" style={styles.meta}>
                                Prep Time: {recipe.prepTime}
                            </Text>

                            <Text appearance="button" style={styles.meta}
                                  onPress={() => {
                                      unlike(recipe)
                                  }}>
                                Unlike
                            </Text>
                        </View>
                    </Card>
                ))}
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
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