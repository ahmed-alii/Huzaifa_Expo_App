import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {Icon, Input, Button, Card} from '@ui-kitten/components';
import {Formik} from 'formik';
import * as yup from 'yup';
import {addItem, delPantryItem, getPantry} from "../api/pantry";
import {useUserContext} from "../context/usercontext";

const PantrySchema = yup.object().shape({
    title: yup.string().required(),
    qty: yup.number().required(),
    unit: yup.string().required(),
});

const PantryItem = ({item, onDelete}) => {
    return (
        <Card style={{marginVertical: 5}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text>{item._id.title}</Text>
                <TouchableOpacity onPress={() => onDelete(item)}>
                    <Icon name='trash-2-outline' width={20} height={20} fill='red'/>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                <Text style={{marginRight: 5}}>Qty: {item.qty}</Text>
                <Text>Unit: {item.unit}</Text>
            </View>
        </Card>
    );
};

const PantryScreen = () => {
    const [pantryItems, setPantryItems] = useState(null);
    const {user} = useUserContext();

    useEffect(()=>{
        if (pantryItems === null){
           GetData()
        }
    }, [pantryItems])

    function GetData(){
        getPantry(user.token).then(r => {
            console.log(r)
            setPantryItems(r.data)
        })
    }


    const handleAddPantryItem = (values, {resetForm}) => {
        const newPantryItem = {
            title: values.title,
            qty: values.qty,
            unit: values.unit,
        };
       addItem(newPantryItem, user.token).then(r => {
           console.log(r)
           if (r.success){
               alert(r.data)
               resetForm();
               GetData()
           }
       })

    };

    const handleDeletePantryItem = (item) => {
        console.log(item)
        delPantryItem(item._id._id, user.token).then(r => {
           if (r.success){
               alert("Item Deleted")
               GetData()
           }
        })
    };

    return (
        <View style={{flex: 1, padding: 10}}>
            <Formik
                initialValues={{title: '', qty: '', unit: ''}}
                validationSchema={PantrySchema}
                onSubmit={handleAddPantryItem}
            >
                {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
                    <View>
                        <Input
                            placeholder='Ingredient Title'
                            onChangeText={handleChange('title')}
                            onBlur={handleBlur('title')}
                            value={values.title}
                            style={{marginBottom: 5}}
                        />
                        {touched.title && errors.title && <Text style={{color: 'red'}}>{errors.title}</Text>}
                        <View style={{flexDirection: 'row'}}>
                            <View style={{maxWidth: "48%"}}>
                                <Input
                                    placeholder='Qty'
                                    onChangeText={handleChange('qty')}
                                    onBlur={handleBlur('qty')}
                                    value={values.qty}
                                    style={{marginRight: 5}}
                                />
                                {touched.qty && errors.qty && <Text style={{color: 'red'}}>{errors.qty}</Text>}

                            </View>
                            <View style={{maxWidth: "48%"}}>
                                <Input
                                    placeholder='Unit'
                                    onChangeText={handleChange('unit')}
                                    onBlur={handleBlur('unit')}
                                    value={values.unit}
                                />
                                {touched.unit && errors.unit && <Text style={{color: 'red'}}>{errors.unit}</Text>}

                            </View>
                        </View>
                        <Button onPress={handleSubmit} style={{marginTop: 10}}>
                            Add Ingredient
                        </Button>
                    </View>
                )}
            </Formik>
            <Text style={{marginTop: 20, fontWeight: 'bold'}}>My Pantry Items:</Text>
            <ScrollView style={{marginTop: 5}}>
                {pantryItems && pantryItems.map((item, key) => (
                    <PantryItem key={key} item={item} onDelete={handleDeletePantryItem}/>
                ))}
            </ScrollView>
        </View>
    );
};

export default PantryScreen;
