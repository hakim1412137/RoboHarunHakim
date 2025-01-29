// screens/ProductDetailsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
// import productService from '../services/productService';
import Loader from '../components/Loader';
import { getProductDetails} from "../utils/api";

const ProductDetailsScreen = ({ route }) => {
    const { productId } = route.params;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            const data = await getProductDetails(productId);
            setProduct(data);
            setLoading(false);
        };
        fetchProduct();
    }, [productId]);

    if (loading) return <Loader />;
    const handleAddToCart = () => {
        // Logic to add to cart
    };
    return (
        <View style={styles.container}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <Text style={styles.name}>{product.name}</Text>
            <Text>{product.description}</Text>
            <Text>Price: ${product.price}</Text>
            {/*<Button title="Add to Cart" onPress={() => /!* Add logic to add to cart *!/} />*/}
            <Button title="Add to Cart" onPress={handleAddToCart} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});
export default ProductDetailsScreen;
/*
// ProductDetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRoute } from '@react-navigation/native'; // For accessing route parameters
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProductDetailsScreen = () => {
    const route = useRoute();
    const { title, description, price } = route.params; // Get data passed from ProductsScreen

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.price}>Price: ${price}</Text>
                <Button title="Add to Cart" onPress={() => {/!* Add to cart logic here *!/}} />
            </View>
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    description: {
        fontSize: 16,
        marginVertical: 10,
    },
    price: {
        fontSize: 18,
        color: '#4CAF50', // Green color for the price
        marginVertical: 10,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ProductDetailsScreen;*/
/*

 */


/*

// ProductDetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRoute } from '@react-navigation/native'; // For accessing route parameters
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProductDetailsScreen = () => {
    const route = useRoute();
    const { title, description, price } = route.params; // Assuming these properties are passed via navigation

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.price}>Price: ${price}</Text>
                <Button title="Add to Cart" onPress={() => {/!* Add to cart functionality *!/}} />
            </View>
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    description: {
        fontSize: 16,
        marginVertical: 10,
    },
    price: {
        fontSize: 18,
        color: '#4CAF50', // Green color for the price
        marginVertical: 10,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ProductDetailsScreen;
*/
