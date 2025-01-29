import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { CartContext } from '../context/CartContext'; // If needed for adding to cart
import { updateProductDetails } from "../utils/api"; // Import your API update function

const EditProductScreen = ({ route, navigation }) => {
    const { product } = route.params; // Get the product data passed from the previous screen

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [inStock, setInStock] = useState(false);

    useEffect(() => {
        if (product) {
            setName(product.name); // Set initial state values from the product
            setDescription(product.description);
            setPrice(product.price.toString()); // Convert to string for TextInput
            setInStock(product.inStock);
        }
    }, [product]);

    const handleUpdate = async () => {
        const updatedProduct = {
            ...product,
            name,
            description,
            price: parseFloat(price), // Convert to number
            inStock,
        };

        try {
            await updateProductDetails(updatedProduct); // Update API call
            Alert.alert('Success', 'Product updated successfully');
            navigation.goBack(); // Navigate back to the previous screen
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to update product details');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Edit Product</Text>
            <TextInput
                placeholder="Product Name"
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
                keyboardType="numeric"
                onChangeText={setPrice}
                style={styles.input}
            />
            <View style={styles.checkboxContainer}>
                <Text>In Stock</Text>
                <Switch
                    value={inStock}
                    onValueChange={setInStock}
                />
            </View>
            <Button title="Update Product" onPress={handleUpdate} />
            <Button title="Cancel" onPress={() => navigation.goBack()} color="red" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 20,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
});

export default EditProductScreen;
