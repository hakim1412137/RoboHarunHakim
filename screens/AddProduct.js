// components/AddProduct.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { createProduct } from "../utils/api";

const AddProduct = ({ productId, onProductAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handleAddProduct = async () => {
        // API call to add product
        try {
            const newProduct = await createProduct({ productId ,title, description, price}); // Assuming the addProduct function returns the newly created product
            onProductAdded(newProduct); // Call the callback to update the product list
            // Clear input fields for the next entry
            setTitle('');
            setDescription('');
            setPrice('');
            Alert.alert('Product Added', `Product: ${title} has been added.`); // Inform the user
        } catch (error) {
            Alert.alert('Error', error.message); // Handle and display errors
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>Add New Product</Text>
            <TextInput
                placeholder="Product Name"
                onChangeText={setTitle} // Update state on text change
                value={title}
                style={{ padding: 10, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }} // Styling for consistency
            />
            <TextInput
                placeholder="Description"
                onChangeText={setDescription}
                value={description}
                style={{ padding: 10, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            />
            <TextInput
                placeholder="Price"
                keyboardType="numeric" // Numeric keyboard for pricing
                onChangeText={setPrice}
                value={price}
                style={{ padding: 10, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            />
            <Button title="Add Product" onPress={handleAddProduct} /> {/* Button to add the product */}
        </View>
    );
};

export default AddProduct;
