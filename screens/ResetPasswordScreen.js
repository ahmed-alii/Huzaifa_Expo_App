import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Text } from '@ui-kitten/components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {forgotPassword} from "../api/authentication";
import {toast} from "react-toastify";

const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
});

export default function ResetPasswordScreen({ navigation }) {
    const handleResetPassword = (values) => {
        console.log(values);
        forgotPassword(values).then(r => {
            console.log(r)
            if (r.success){
                toast(r.message)
            }
        })
    };

    return (
        <View style={styles.container}>
            <Text category='h3' style={styles.title}>
                Reset Password
            </Text>

            <Formik
                initialValues={{ email: '' }}
                onSubmit={handleResetPassword}
                validationSchema={ResetPasswordSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                        <Input
                            style={styles.input}
                            placeholder='Email'
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType='email-address'
                            status={touched.email && errors.email ? 'danger' : 'basic'}
                            caption={touched.email && errors.email ? errors.email : ''}
                        />

                        <Button style={styles.button} onPress={handleSubmit}>
                            Reset Password
                        </Button>
                    </>
                )}
            </Formik>

            <Button appearance='ghost' onPress={() => navigation.navigate('Login')}>
                Back to Login
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        marginBottom: 20,
    },
    input: {
        width: '100%',
        marginBottom: 20,
    },
    button: {
        width: '100%',
        marginBottom: 20,
    },
});
