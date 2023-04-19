import {createContext, useContext, useEffect, useState} from 'react';
import {getUserByToken, loginUser} from '../api/authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    console.log(user)

    const login = async (email, password) => {
        console.log("Login func called...")
        try {
            const data = await loginUser(email, password);
            console.log("data", data)

            if (data.success) {
                setUser(data);
                await AsyncStorage.setItem('token', data.token);

            } else {
                alert(data.message)
            }

        } catch (error) {
            console.error(error);
        }
    };

    const logout = async () => {
        setUser(null);
        await AsyncStorage.removeItem('token');
    };

    useEffect(() => {

        async function LoadData() {
            const token = await AsyncStorage.getItem('token');

            console.log({token})

            if (token) {
                getUserByToken(token)
                    .then((user) => {
                        console.log(user)
                        setUser(user);
                    })
                    .catch(async (error) => {
                        console.error(error);
                        await AsyncStorage.removeItem('token');
                    });
            }
        }

        LoadData().then(r => {
            console.log("data loaded")
        });

    }, []);


    return (
        <UserContext.Provider value={{user, login, logout}}>
            {children}
        </UserContext.Provider>
    );
};
