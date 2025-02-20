import React, { useEffect, useState, useContext } from 'react';
import { View, FlatList, Text, StyleSheet, Button } from 'react-native';
import api from '../utils/api'; // Your API utility
import ProductCard from '../components/ProductCard'; // Component to display individual product
import { CartContext } from '../context/CartContext'; // Context to manage cart state

const ShopScreen = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext); // Access cart context

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products'); // Fetch products from the backend
                setProducts(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        addToCart(product); // Call the function to add product to the cart
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Products</Text>
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <FlatList
                    data={products}
                    renderItem={({ item }) => (
                        <ProductCard product={item} onAddToCart={handleAddToCart} />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2} // Display products in two columns
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default ShopScreen;
