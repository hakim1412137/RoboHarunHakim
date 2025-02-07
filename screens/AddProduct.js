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


/*import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { createProduct } from '../utils/api';

const AddProduct = ({ route, navigation }) => {
    const { onProductAdded } = route.params;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handleAddProduct = async () => {
        if (!title || !description || !price) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        try {
            const newProduct = { title, description, price: parseFloat(price) };
            const createdProduct = await createProduct(newProduct);
            onProductAdded(createdProduct); // Call the callback to update the product list
            Alert.alert('Success', 'Product added successfully.');
            navigation.goBack(); // Navigate back to the ProductList screen
        } catch (error) {
            console.error('Error adding product:', error);
            Alert.alert('Error', 'Failed to add product.');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Product Name"
                value={title}
                onChangeText={setTitle}
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

export default AddProduct;*/

/*import React, { useState } from 'react';
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
            <Button title="Add Product" onPress={handleAddProduct} /> {/!* Button to add the product *!/}
        </View>
    );
};

export default AddProduct;*/
// components/AddProduct.js
/*
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { createProduct } from "../utils/api"; // Assuming you have an API function to handle product creation

const AddProduct = ({ onProductAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handleAddProduct = async () => {
        try {
            const newProduct = await createProduct({ title, description, price });
            onProductAdded(newProduct);
            setTitle('');
            setDescription('');
            setPrice('');
            Alert.alert('Success', `Product: ${title} has been added.`);
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>Add New Product</Text>
            <TextInput
                placeholder="Product Name"
                onChangeText={setTitle}
                value={title}
                style={{ borderWidth: 1, marginBottom: 10 }}
            />
            <TextInput
                placeholder="Description"
                onChangeText={setDescription}
                value={description}
                style={{ borderWidth: 1, marginBottom: 10 }}
            />
            <TextInput
                placeholder="Price"
                keyboardType="numeric"
                onChangeText={setPrice}
                value={price}
                style={{ borderWidth: 1, marginBottom: 10 }}
            />
            <Button title="Add Product" onPress={handleAddProduct} />
        </View>
    );
};

export default AddProduct;*/
