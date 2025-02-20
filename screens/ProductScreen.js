// screens/ProductsScreen.js
// screens/ProductsScreen.js
import React, { useEffect, useState, useContext } from 'react';
import { View,FlatList, ActivityIndicator, Alert, StyleSheet, TextInput, Text, TouchableOpacity, ScrollView } from 'react-native';
import ProductCard from '../components/ProductCard';
import { CartContext } from '../context/CartContext';
import { getProducts, deleteProduct } from '../utils/api';
import Header from '../components/Header';
import Menu from '../components/Menu';
import ShoppingCart from './ShoppingCart';
import AntDesign from '@expo/vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ConfirmationModal from '../components/ConfirmationModal'; // Import the modal

const ProductsScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const { addToCart } = useContext(CartContext);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const { data } = await getProducts();
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error('Product fetch error:', error);
               alert('Error', 'Failed to load products');
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
        setFilteredProducts(
            products.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase())
            )
        );
    };

    const handleProductAction = {
        addToCart: (product) => {
            addToCart(product);
            Alert.alert('Added', `${product.name} added to cart`);
        },
        viewDetails: (productId) => navigation.navigate('ProductDetails', { productId }),
        editProduct: (product) => navigation.navigate('EditProduct', { product }),
        deleteProduct: (productId) => {
            setProductIdToDelete(productId);
            setDeleteModalVisible(true);
        }
    };
    const handleConfirmDelete = async () => {
        try {
            await deleteProduct(productIdToDelete);
            setProducts(prev => prev.filter(p => p.id !== productIdToDelete));
            setFilteredProducts(prev => prev.filter(p => p.id !== productIdToDelete));
            setDeleteModalVisible(false);
            setProductIdToDelete(null);
            Alert.alert('Success', 'Product deleted');
        } catch (error) {
            console.error('Delete error:', error);
            Alert.alert('Error', 'Deletion failed');
            setDeleteModalVisible(false);
            setProductIdToDelete(null);
        }
    };


    const renderProductCard = ({ item }) => (
        <ProductCard
            product={item}
            onAddToCart={() => handleProductAction.addToCart(item)}
            onPress={() => handleProductAction.viewDetails(item.id)}
            onEdit={() => handleProductAction.editProduct(item)}
            onDelete={() => handleProductAction.deleteProduct(item.id)}
        />
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2F80ED" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header />
            <Menu navigation={navigation} />

            <View style={styles.contentWrapper}>
                <View style={styles.searchContainer}>
                    <View style={styles.searchInputWrapper}>
                        <Icon name="search" size={20} color="#828282" style={styles.searchIcon} />
                        <TextInput
                            placeholder="Search products..."
                            placeholderTextColor="#828282"
                            value={searchQuery}
                            onChangeText={handleSearch}
                            style={styles.searchInput}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => navigation.navigate('AddProduct')}
                    >
                        <AntDesign name="plus" size={20} color="white" />
                    </TouchableOpacity>

                    <ShoppingCart navigation={navigation} />
                </View>

                <ScrollView
                    style={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {filteredProducts.length === 0 ? (
                        <View style={styles.emptyState}>
                            <Icon name="search-off" size={40} color="#BDBDBD" />
                            <Text style={styles.emptyText}>No products found</Text>
                        </View>
                    ) : (
                        <FlatList
                            data={filteredProducts}
                            renderItem={renderProductCard}
                            scrollEnabled={false}
                            keyExtractor={item => item.id.toString()}
                            contentContainerStyle={styles.listContent}
                        />
                    )}
                </ScrollView>
            </View>
            <ConfirmationModal
                visible={deleteModalVisible}
                onCancel={() => {
                    setDeleteModalVisible(false);
                    setProductIdToDelete(null);
                }}
                onConfirm={handleConfirmDelete}
                title="Confirm Delete"
                message="Permanently delete this product?"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        height: '40rem',
        backgroundColor: '#F8F9FA',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.9)'
    },
    contentWrapper: {
        flex: 1,
        paddingHorizontal: 200,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginTop: 16,
        marginBottom: 8,
        zIndex: 10,
    },
    searchInputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 16,
        elevation: 2,
    },
    searchIcon: {
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        height: 48,
        fontSize: 16,
        color: '#2D3436',
        paddingHorizontal: 16
    },
    addButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#2F80ED',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    scrollContent: {
        paddingBottom: 24,
        height: 40
    },
    listContent: {
        gap: 16,
        paddingTop: 8,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 80,
    },
    emptyText: {
        fontSize: 18,
        color: '#828282',
        marginTop: 16,
        fontWeight: '500',
    },
});

export default ProductsScreen;
