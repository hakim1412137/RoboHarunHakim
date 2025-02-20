import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { updateProduct } from "../utils/api"; // Ensure this import is correct

const EditProductScreen = ({ route, navigation }) => {
    const { product } = route.params; // Get the product data passed from the previous screen

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        if (product) {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price.toString());
        }
    }, [product]);

    const handleUpdate = async () => {
        const updatedProduct = {
            ...product,
            name,
            description,
            price: parseFloat(price),
        };

        try {
            await updateProduct(product.id, updatedProduct); // Ensure updateProduct is called with the correct parameters
            Alert.alert('Success', 'Product updated successfully');
            navigation.goBack();
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to update product details');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Product Name"
            />
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="Product Description"
            />
            <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                placeholder="Product Price"
                keyboardType="numeric"
            />
            <Button title="Update Product" onPress={handleUpdate} />
            <Button title="Cancel" onPress={() => navigation.goBack()} color="red" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});

export default EditProductScreen;
