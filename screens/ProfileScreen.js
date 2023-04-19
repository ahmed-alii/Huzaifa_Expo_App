import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Card, Input, Layout, Text} from '@ui-kitten/components';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useUserContext} from '../context/usercontext';
import {changePasswordOfLoggedInUser} from "../api/authentication";
import {toast} from "react-toastify";

const ProfileSchema = yup.object().shape({
    password: yup
        .string()
        .required('Password is required'),
    newpass: yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
});

const ProfileScreen = () => {
    const {user, logout} = useUserContext();

    console.log(user)
    const handlePasswordUpdate = (values, {resetForm}) => {
        changePasswordOfLoggedInUser(values, user.token).then(r => {
            if (r.success){
                alert(r.message)
            }
        })
        resetForm();
    };

    if (!user) {
        return (
            <Layout style={styles.container}>
                <Text category='h1'>Loading...</Text>
                <Button onPress={logout}>Log Out</Button>
            </Layout>
        );
    }

    return (
        <Layout style={styles.container}>
            <Card>
                <Text category='h1'>{user.name}</Text>
                <Text>{user.email}</Text>

                <Formik
                    initialValues={{password: '', newpass: ''}}
                    validationSchema={ProfileSchema}
                    onSubmit={handlePasswordUpdate}
                >
                    {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
                        <Layout>
                            <Input
                                placeholder='Old Password'
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry
                                style={{marginBottom: 5}}
                            />
                            {touched.password && errors.password &&
                                <Text style={{color: 'red'}}>{errors.password}</Text>}
                            <Input
                                placeholder='New Password'
                                onChangeText={handleChange('newpass')}
                                onBlur={handleBlur('newpass')}
                                value={values.newpass}
                                secureTextEntry
                            />
                            {touched.newpass && errors.newpass && (
                                <Text style={{color: 'red'}}>{errors.newpass}</Text>
                            )}
                            <Button onPress={handleSubmit} style={{marginTop: 10}}>
                                Update Password
                            </Button>
                        </Layout>
                    )}
                </Formik>
            </Card>


            <Button onPress={logout} style={{marginTop: 20}}>
                Log Out
            </Button>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    card: {
        marginVertical: 8,
        padding: 16,
    },
});

export default ProfileScreen;



