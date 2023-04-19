import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Input, Text} from '@ui-kitten/components';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {ScrollView} from 'react-native';
import {addNewRecipe} from '../../api/recipe';
import {useUserContext} from '../../context/usercontext';

const IngredientInput = ({index, ingredient, handleIngredientChange}) => {
    const fields = ['title', 'unit', 'qty'];

    return (
        <View key={index}>
            {fields.map((field) => (
                <Input
                    key={field}
                    label={`${field.charAt(0).toUpperCase() + field.slice(1)} ${index + 1}`}
                    placeholder={`Enter ${field}`}
                    value={ingredient[field]}
                    onChangeText={(text) =>
                        handleIngredientChange(index, field, text)
                    }
                />
            ))}
        </View>
    );
};


const FormField = ({label, fieldName, values, errors, touched, handleChange, handleBlur}) => (
    <Input
        label={label}
        placeholder={`Enter ${label.toLowerCase()}`}
        value={values[fieldName]}
        onChangeText={handleChange(fieldName)}
        onBlur={handleBlur(fieldName)}
        status={errors[fieldName] && touched[fieldName] ? 'danger' : 'basic'}
        caption={errors[fieldName] && touched[fieldName] ? errors[fieldName] : ''}
    />
);

const AddNewRecipe = () => {
    const [ingredients, setIngredients] = useState([{title: '', unit: '', qty: ''}]);
    const {user} = useUserContext();

    const addIngredient = () => {
        setIngredients((prevState) => [
            ...prevState,
            {title: "", unit: "", qty: ""},
        ]);
    };

    const validationSchema = Yup.object({
        title: Yup.string()
            .required('Required')
            .max(140, 'Title must be 140 characters or less'),
        description: Yup.string().required('Required'),
        prepTime: Yup.string().required('Required'),
        cuisine: Yup.string().required('Required'),
        calories: Yup.number()
            .required('Required')
            .max(99999, 'Calories must be 5 digits or less'),
        servings: Yup.string().required('Required'),
        ingredients: Yup.array().of(
            Yup.object().shape({
                title: Yup.string().required('Required'),
                unit: Yup.string().required('Required'),
                qty: Yup.string().required('Required'),
            }),
        ),
    });


    const defaultIngredient = {title: "", unit: "", qty: ""};
    const defaultIngredients = Array.from({length: 1}, () => defaultIngredient);

    const initialValues = {
        title: "",
        description: "",
        prepTime: "",
        cuisine: "",
        calories: "",
        servings: "",
        ingredients: defaultIngredients,
    };

    const handleSubmit = (values, {setSubmitting}) => {

        addNewRecipe(values, user.token).then(r => {
            console.log(r)
            setSubmitting(false)
            alert("Recipe added successfully!")
        })
    };

    const handleIngredientChange = (index, field, value, setFieldValue) => {
        setIngredients((prevState) => {
            const newIngredients = [...prevState];
            newIngredients[index][field] = value;
            setFieldValue(`ingredients[${index}].${field}`, value);
            return newIngredients;
        });
    };


    const formFields = [
        'title',
        'description',
        'prepTime',
        'cuisine',
        'calories',
        'servings',
    ];
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.title} category="h5">
                    Add New Recipe
                </Text>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          setFieldValue,
                          isSubmitting,
                      }) => (
                        <View>
                            {formFields.map((field) => (
                                <FormField
                                    key={field}
                                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                                    fieldName={field}
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                />
                            ))}
                            {ingredients.map((ing, index) => (
                                <IngredientInput
                                    key={index}
                                    index={index}
                                    ingredient={ing}
                                    handleIngredientChange={(index, field, value) => handleIngredientChange(index, field, value, setFieldValue)}
                                />
                            ))}

                            <Button onPress={addIngredient}>Add Ingredient</Button>
                            <Button onPress={handleSubmit} disabled={isSubmitting}>
                                Add Recipe
                            </Button>
                        </View>
                    )}
                </Formik>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    container: {
        marginHorizontal: 20,
        marginVertical: 40,
    },
    title: {
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default AddNewRecipe;
