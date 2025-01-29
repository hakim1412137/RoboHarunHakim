// components/ProductDetail.js
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Button, Alert, TextInput } from 'react-native';
import { CartContext } from '../context/CartContext'; // Correctly import CartContext
import { useContext } from 'react';

import {getProductDetails} from "../utils/api";
const ProductDetailScreen = ({ route, navigation }) => {

  const { productId } = route.params; // Receive course ID from params
    // const { productId } = route.params || {}; // Make sure to destructure from route.params or set a default value

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Use the CartContext and destructure to get addToCart
    const { addToCart  } = useContext(CartContext); // Correctly use useContext to access addToCart

    useEffect(() => {
        const loadProductDetail = async () => {
            if (productId) {
                try {
                    setLoading(true);
                    const data = await getProductDetails(productId);
                    setProduct(data);
                    setError(null);
                } catch (err) {
                    setError(err.message);
                    setProduct(null);
                } finally {
                    setLoading(false);
                }
            } else {
                console.error("productId is undefined");
                setLoading(false);
            }
        };

        loadProductDetail();
    }, [productId]); // Run effect whenever productId changes


    const addToCartHandler  = () => {
        // Renaming for clarity
        if (product) { // Ensure product is not null
            addToCart(product);
            Alert.alert('Added to Cart', `${product.title} has been added to your cart.`);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return (
            <View>
                <Text>{`Error: ${error}`}</Text>
                <Button title="Go Back" onPress={() => navigation.goBack()} />
            </View>
        );
    }

return (
    <View style={{ padding: 20 }}>
        {product ? ( // Check if product exists
            <>
                <Text style={{ fontSize: 24 }}>{product.title}</Text>
                <Text style={{ marginVertical: 10 }}>{product.description}</Text>
                <Text>Price: ${product.price}</Text>
                <Text>Status: {product.inStock ? 'In stock' : 'Out of stock'}</Text>
                <Button title="Add to Cart" onPress={addToCartHandler} />
                <Button title="Go Back" onPress={() => navigation.goBack()} />
            </>
        ) : (
            <Text>No product found for ID: {productId}</Text> // Display message if no product is found
        )}
    </View>
);
};

export default ProductDetailScreen;
/*    const handleSearch = () => {
        if (productId) {
            setProductId(productId); // Triggers useEffect to fetch new product details
        }
    };*/




/*
    return (
        <View style={{ padding: 20 }}>
            <TextInput
                placeholder="Enter Product ID"
                value={productId}
                onChangeText={text => setProductId(text)}
                style={{ padding: 10, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            />
            <Button title="Search Product ID" onPress={handleSearch} />

            {product ? ( // Check if product exists
                <>
                    <Text style={{ fontSize: 24 }}>{product.title}</Text>
                    <Text style={{ marginVertical: 10 }}>{product.description}</Text>
                    <Text>Price: ${product.price}</Text>
                    <Text>Status: {product.status}</Text>
                    <Button title="Add to Cart" onPress={addToCartHandler} />
                    <Button title="Go Back" onPress={() => navigation.goBack()} />
                </>
            ) : (
                <Text>No product found for ID: {productId}</Text> // Display message if no product is found
            )}
        </View>
    );
};*/
