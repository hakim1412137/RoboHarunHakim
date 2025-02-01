// components/ProductList.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AddProduct from './AddProduct';
import SearchComponent from "../components/SearchComponent";
import {getProductDetails} from "../utils/api";
/*
import SearchComponent from './SearchComponent'; // Import SearchComponent
*/

const ProductList = ({ robotId }) => {
    const [products, setProducts] = useState([]); // State for all products
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
    const [showAddProduct, setShowAddProduct] = useState(false); // Toggle to show add product form
    const navigation = useNavigation();

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await getProductDetails(robotId); // Fetch all products
                setProducts(data); // Set all products
                setFilteredProducts(data); // Initialize filtered products to all products
            } catch (err) {
                setError(err.message); // Set error if fetching fails
            } finally {
                setLoading(false); // End loading state
            }
        };

        loadProducts();
    }, [robotId]);

    const handleProductAdded = (newProduct) => {
        setProducts((prevProducts) => [...prevProducts, newProduct]); // Update the products list with the newly added product
        setFilteredProducts((prevFiltered) => [...prevFiltered, newProduct]); // Also update filtered products
        setShowAddProduct(false); // Close AddProduct form
    };

    // Function to handle the search from the SearchComponent
    const handleSearch = (query) => {
        // Filter products based on search query (by name or ID)
        const newFilteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.id.toString().includes(query) // Search by ID
        );

        // Update the filtered products state
        setFilteredProducts(newFilteredProducts.length > 0 ? newFilteredProducts : []);
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />; // Show loading indicator
    }

    if (error) {
        return (
            <View>
                <Text>Error: {error}</Text>
                <Button title="Retry" onPress={() => loadProducts(robotId)} />
            </View>
        );
    }

    return (
        <View>
            <SearchComponent onSearch={handleSearch} /> {/* Use SearchComponent for searching */}
            {filteredProducts.length === 0 ? (
                <Text>No products found.</Text> // Message if no products match the search
            ) : (
                <FlatList
                    data={filteredProducts} // Display filtered products
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={{ padding: 10 }}>
                            <Text>{item.name}</Text>
                            <Button
                                title="View Details"
                                onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
                            />
                        </View>
                    )}
                />
            )}
            <Button title="Add New Product" onPress={() => setShowAddProduct(true)} />
            {showAddProduct && <AddProduct robotId={robotId} onProductAdded={handleProductAdded} />}
        </View>
    );
};

export default ProductList;
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

/*
// components/ProductList.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Button, TextInput } from 'react-native';
/!*
import { fetchProducts } from '../services/ApiService';
*!/
import { useNavigation } from '@react-navigation/native';
import AddProduct from './AddProduct';
import {getProductById} from "../api/api";

const ProductList = ({ productId }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddProduct, setShowAddProduct] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await getProductById(productId);
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [productId]);

    const handleProductAdded = (newProduct) => {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
        setShowAddProduct(false);
    };

    // Filter products based on search query (by name or ID)
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.id.toString().includes(searchQuery) // Search by product ID
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return (
            <View>
                <Text>Error: {error}</Text>
                <Button title="Retry" onPress={() => loadProducts(productId)} />
            </View>
        );
    }

    return (
        <View>
            <TextInput
                placeholder="Search by Name or ID"
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={{ padding: 10, borderColor: 'gray', borderWidth: 1 }}
            />
            {filteredProducts.length === 0 ? (
                <Text>No products found for "{searchQuery}"</Text> // Message when no products are found
            ) : (
                <FlatList
                    data={filteredProducts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={{ padding: 10 }}>
                            <Text>{item.title}</Text>
                            <Button
                                title="View Details"
                                onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
                            />
                        </View>
                    )}
                />
            )}
            <Button title="Add New Product" onPress={() => setShowAddProduct(true)} />
            {showAddProduct && <AddProduct productId={productId} onProductAdded={handleProductAdded} />}
        </View>
    );
};

export default ProductList;
*/
