import {Card, Text} from "@ui-kitten/components";
import {StyleSheet, View} from "react-native";
import React from "react";
import {TouchableOpacity} from "react-native-web";
import {useNavigation} from '@react-navigation/native';

export default function RecipeCard({recipe}) {
    const navigation = useNavigation();

    const handleRecipePress = () => {
        console.log(recipe._id)
        navigation.navigate('RecipeDetails', {recipe});
    };
    return (
        <>
            <Card style={styles.card}
                  onPress={handleRecipePress}
            >
                <Text category="h6">{recipe.title}</Text>
                <View style={styles.metaContainer}>
                    <Text appearance="hint" style={styles.meta}>
                        Cuisine: {recipe.cuisine}
                    </Text>
                    <Text appearance="hint" style={styles.meta}>
                        Prep Time: {recipe.prepTime}
                    </Text>
                    <Text appearance="hint" style={styles.meta}>
                        Calories: {recipe.calories}
                    </Text>
                    <Text appearance="hint" style={styles.meta}>
                        Servings: {recipe.servings}
                    </Text>
                </View>
            </Card>
        </>
    )
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
