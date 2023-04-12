import React from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import {toast} from 'react-toastify';
import {useUserContext} from '../context/usercontext';
import {StyleSheet, Text, TextInput, TouchableOpacity, View, Image} from 'react-native';


const LoginScreen = ({navigation}) => {

    const {login} = useUserContext();

    // define validation schema
    const validationSchema = yup.object().shape({
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string().required('Password is required'),
    });

    const initialValues = {
        email: "admin@admin.com",
        password: "123123123"
    }

    function onSubmit(values) {
        console.log('Login submit');
        console.log(values);

        login(values.email, values.password)
            .then(() => {
                console.log('User logged in');
            })
            .catch((error) => {
                console.error(error);
                toast.error(error.message || 'An error occurred');
            });
    }


    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20}}>
            <Image
                source={{uri: 'https://via.placeholder.com/150x150.png?text=Logo'}}
                style={{width: 150, height: 150, marginBottom: 50}}
            />
            <Text style={styles.title}>Login your account</Text>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            autoCapitalize="none"
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
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </>
                )}
            </Formik>
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.navigate('Reset Password')}>
                    <Text style={styles.footerText}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.footerText}>Don't have an account? Register here</Text>
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


export default LoginScreen;
