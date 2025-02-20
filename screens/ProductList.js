import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getProducts } from '../utils/api';
import AddProduct from './AddProduct'; // Add the AddProduct component

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddProduct, setShowAddProduct] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                Alert.alert('Error', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
        const newFilteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(newFilteredProducts);
    };

    const handleProductAdded = (newProduct) => {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
        setFilteredProducts((prevFiltered) => [...prevFiltered, newProduct]);
        setShowAddProduct(false); // Close add product form
    };
// Navigate to the AddProduct screen
  /*  const navigateToAddProduct = () => {
        navigation.navigate('AddProduct', { onProductAdded: handleProductAdded });
    };*/

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={{ padding: 20 }}>
            <TextInput
                placeholder="Search Products..."
                value={searchQuery}
                onChangeText={handleSearch}
                style={{ borderWidth: 1, marginBottom: 10 }}
            />
            <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{ marginBottom: 15 }}>
                        <Text>{item.name}</Text>
                        <Button title="View Details" onPress={() => navigation.navigate('ProductDetails', { productId: item.id })} />
                    </View>
                )}
            />
            {/* Add New Product Button */}
       {/*     <Button
                title="Add New Product"
                onPress={navigateToAddProduct}
                color="#007BFF"
            />*/}
            <Button title="Add New Product" onPress={() => setShowAddProduct(true)} />
            {showAddProduct && <AddProduct onProductAdded={handleProductAdded} />}
        </View>
    );
};

export default ProductList;
