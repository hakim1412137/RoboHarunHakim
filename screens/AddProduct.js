// components/AddProduct.js
// screens/AddProductScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { createProduct } from '../utils/api';

const AddProductScreen = ({ navigation, route }) => {
    // const { onProductAdded } = route.params;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handleAddProduct = async () => {
        if (!name || !description || !price) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        try {
            const newProduct = { name, description, price: parseFloat(price) };
            await createProduct(newProduct);
            // onProductAdded(createdProduct); // Call the callback to update the product list

            Alert.alert('Success', 'Product added successfully.');
            navigation.goBack();
        } catch (error) {
            console.error('Error adding product:', error);
            Alert.alert('Error', 'Failed to add product.');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
                multiline
            />
            <TextInput
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                style={styles.input}
            />
            <Button title="Add Product" onPress={handleAddProduct} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
});

export default AddProductScreen;

