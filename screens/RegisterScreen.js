import React from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {loginUser, registerUser} from "../api/authentication";
import {toast} from "react-toastify";
import {useUserContext} from "../context/usercontext";


export default function RegisterScreen({navigation}) {
    const {login} = useUserContext();
    const handleRegister = async (values) => {
        console.log(values);

        try {
            const data = await registerUser(values.name, values.email, values.password);
            console.log(data)
            toast(data.message)
            if (data.success){
                login(values.email, values.password)
            }
        } catch (error) {
            console.error(error);
        }
    };

    const RegisterSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    });

    const initialValues = {
        name: 'ahmed',
        email: `ahmed${Math.floor(Math.random()*100)}@mail.com`,
        password: '123123123'
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create an account</Text>
            <Formik
                initialValues={initialValues}
                onSubmit={handleRegister}
                validationSchema={RegisterSchema}
            >
                {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                            autoCapitalize="words"
                        />
                        {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType="email-address"
                        />
                        {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry
                        />
                        {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableOpacity>
                    </>
                )}
            </Formik>

            <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.navigate('Reset Password')}>
                    <Text style={styles.footerText}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.footerText}>Already have an account? Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
        width: '100%',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'column-reverse',
        justifyContent: 'space-between',
        marginTop: 20,
        width: '100%',
        textAlign: "center"
    },
    footerText: {
        color: '#007AFF',
        fontSize: 16,
        marginBottom: 20
    },
});

