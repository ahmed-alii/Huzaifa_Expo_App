import {createContext, useContext, useEffect, useState} from 'react';
import {getUserByToken, loginUser} from '../api/authentication';
import {toast} from "react-toastify";

export const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    console.log(user)

    const login = async (email, password) => {
        try {
            const data = await loginUser(email, password);
            if (data.success){
                setUser(data);
                localStorage.setItem('token', data.token);
            }else{
                toast(data.message)
            }

        } catch (error) {
            console.error(error);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getUserByToken(token)
                .then((user) => {
                    console.log(user)
                    setUser(user);
                })
                .catch((error) => {
                    console.error(error);
                    localStorage.removeItem('token');
                });
        }
    }, []);


    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
