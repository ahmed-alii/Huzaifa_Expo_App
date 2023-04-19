import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {UserProvider, useUserContext} from './context/usercontext';

// import screens
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import {ApplicationProvider} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {default as theme} from './custom-theme.json';
import * as eva from "@eva-design/eva";
import {mapping} from "@eva-design/eva";
import AddNewRecipe from "./screens/recipe/addNewRecipe";
import RecipeDetailScreen from "./screens/recipe/RecipeDetails";
import {Ionicons} from '@expo/vector-icons';
import PantryScreen from "./screens/Pantry";
import Favourites from "./screens/Favourites";

// create stack navigator
const Stack = createStackNavigator();
const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{headerShown: false}}
            />

            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{headerShown: false}}
            />

            <Stack.Screen
                name="Reset Password"
                component={ResetPasswordScreen}
                options={{headerShown: false}}
            />

        </Stack.Navigator>
    );
};

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Cookalicious" component={HomeScreen}/>
            <Stack.Screen name="AddNewRecipe" component={AddNewRecipe}/>
            <Stack.Screen name="RecipeDetails" component={RecipeDetailScreen}/>
        </Stack.Navigator>
    );
};

// create bottom tabs navigator
const Tab = createBottomTabNavigator();
const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({color, size}) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'home-outline';
                    } else if (route.name === 'Search') {
                        iconName = 'search-outline';
                    } else if (route.name === 'Profile') {
                        iconName = 'person-outline';
                    } else if (route.name === 'Favorite') {
                        iconName = 'heart-outline';
                    } else if (route.name === 'Pantry') {
                        iconName = 'egg-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color}/>;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeStack} options={{headerShown: false}}/>
            <Tab.Screen name="Search" component={SearchScreen} options={{unmountOnBlur: true}}/>
            <Tab.Screen name="Pantry" component={PantryScreen} options={{unmountOnBlur: true}}/>
            <Tab.Screen name="Favorite" component={Favourites} options={{unmountOnBlur: true}}/>
            <Tab.Screen name="Profile" component={ProfileScreen} options={{unmountOnBlur: true}}/>
        </Tab.Navigator>
    );
};

export default function ApplicationEntry() {
    const {user} = useUserContext();
    const [authenticated, setAuthenticated] = useState(user !== null);

    useEffect(() => {
        setAuthenticated(user !== null);
    }, [user]);

    return (
        <ApplicationProvider
            {...eva}
            theme={{...eva.light, ...theme}}
            customMapping={mapping}
            iconPack={EvaIconsPack}
        >
            <NavigationContainer>
                {!authenticated ? <StackNavigator/> : <TabNavigator/>}
            </NavigationContainer>
        </ApplicationProvider>
    );
}
