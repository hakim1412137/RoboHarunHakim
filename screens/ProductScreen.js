// screens/ProductsScreen.js
// screens/ProductsScreen.js
import React, { useEffect, useState, useContext } from 'react';
import {
    View,
    FlatList,
    ActivityIndicator,
    Alert,
    StyleSheet,
    Button,
    TextInput,
    Text,
    TouchableHighlight, TouchableHighlightComponent
} from 'react-native';
import ProductCard from '../components/ProductCard';
import { CartContext } from '../context/CartContext';
import { getProducts, deleteProduct } from '../utils/api';
import Header from '../components/Header';
import Menu from '../components/Menu';
import ShoppingCart from './ShoppingCart';
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from '@expo/vector-icons/AntDesign';

const ProductsScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts();
                setProducts(response.data);
                setFilteredProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                Alert.alert('Error', 'Failed to fetch products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
        const newFilteredProducts = products.filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(newFilteredProducts);
    };

    const handleAddToCart = (product) => {
        addToCart(product);
        Alert.alert('Success', `${product.name} has been added to your cart.`);
    };

    const navigateToProductDetail = (productId) => {
        navigation.navigate('ProductDetails', { productId });
    };

    const handleEditProduct = (product) => {
        navigation.navigate('EditProduct', { product });
    };

    const handleDeleteProduct = (productId) => {
        Alert.alert(
            'Delete Product',
            'Are you sure you want to delete this product?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'OK',
                    onPress: async () => {
                        try {
                            await deleteProduct(productId);
                            setProducts((prevProducts) =>
                                prevProducts.filter((product) => product.id !== productId)
                            );
                            setFilteredProducts((prevProducts) =>
                                prevProducts.filter((product) => product.id !== productId)
                            );
                            Alert.alert('Success', 'Product deleted successfully.');
                        } catch (error) {
                            console.error('Error deleting product:', error);
                            Alert.alert('Error', 'Failed to delete the product.');
                        }
                    },
                },
            ]
        );
    };

    const renderProductCard = ({ item }) => (
        <ProductCard
            product={item}
           onAddToCart={() => handleAddToCart(item)}
        // onAddToCart={handleAddToCart}
            onPress={() => navigateToProductDetail(item.id)}
            onEdit={() => handleEditProduct(item)}
            onDelete={() => handleDeleteProduct(item.id)}
        />
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <Header />
            <Menu navigation={navigation} />
            {/* Search Bar */}
            <View style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <View style={{ position: 'absolute', display: 'flex', flexDirection: 'row', alignItems: 'center' ,width: '100%', gap: 20 ,paddingHorizontal: 200, paddingVertical: 20, zIndex: 10 }}>
                    <TextInput
                        placeholder="Search Products..."
                        value={searchQuery}
                        onChangeText={handleSearch}
                        style={{ borderWidth: 1, padding: 10, borderRadius: 5, borderColor: '#ccc', flex: '1', backgroundColor: 'white' }}
                    />
                    <TouchableHighlight onPress={() => navigation.navigate('AddProduct')} style={{ width: 40, height: 40, padding: 5, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <AntDesign name="plus" size={24} color="black" />
                    </TouchableHighlight>
                    <ShoppingCart navigation={navigation} />
                </View>
                <ScrollView style={{ height: '40rem', width: '100%', paddingTop: 80 }}>
                    {/* Add Product Button */}
                    {/* <Button
                        title="Add New Product"
                        onPress={() => navigation.navigate('AddProduct')}
                        color="#007BFF"
                    /> */}
                    {filteredProducts.length === 0 ? (
                        <Text style={styles.noProductsText}>No products found.</Text>
                    ) : (
                        <FlatList
                            data={filteredProducts}
                            renderItem={renderProductCard}
                            scrollEnabled={false}
                            contentContainerStyle={{ display: 'flex', flexDirection: 'column', height: 'auto', paddingVertical: 15, gap: 10, alignItems: 'center' }}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    )}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBF1E6',
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    noProductsText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
});

export default ProductsScreen;
/*

import React, { useEffect, useState, useContext } from 'react';
import { View, FlatList, ActivityIndicator, Alert, StyleSheet, ScrollView, Button } from 'react-native';
import ProductCard from '../components/ProductCard';
import { CartContext } from '../context/CartContext';
import { getProducts, deleteProduct } from '../utils/api';
import Header from '../components/Header';
import Menu from '../components/Menu';
import ProductList from "./ProductList";

const ProductsScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts();
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                Alert.alert('Error', 'Failed to fetch products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        addToCart(product);
        Alert.alert('Success', `${product.name} has been added to your cart.`);
    };

    const navigateToProductDetail = (productId) => {
        navigation.navigate('ProductDetails', { productId });
    };

    const handleEditProduct = (product) => {
        navigation.navigate('EditProduct', { product });
    };

    const handleDeleteProduct = (productId) => {
        Alert.alert(
            'Delete Product',
            'Are you sure you want to delete this product?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'OK',
                    onPress: async () => {
                        try {
                            await deleteProduct(productId);
                            setProducts((prevProducts) =>
                                prevProducts.filter((product) => product.id !== productId)
                            );
                            Alert.alert('Success', 'Product deleted successfully.');
                        } catch (error) {
                            console.error('Error deleting product:', error);
                            Alert.alert('Error', 'Failed to delete the product.');
                        }
                    },
                },
            ]
        );
    };

    const renderProductCard = ({ item }) => (
        <ProductCard
            product={item}
            onAddToCart={() => handleAddToCart(item)}
            onPress={() => navigateToProductDetail(item.id)}
            onEdit={() => handleEditProduct(item)}
            onDelete={() => handleDeleteProduct(item.id)}
        />
    );

    return (
        <ScrollView contentContainerStyle={styles.scrollContentContainer}>
            <Header />
            <Menu navigation={navigation} />
            <View style={styles.container}>
                {/!* Add Product Button *!/}
                <Button
                    title="Add New Product"
                    onPress={() => navigation.navigate('AddProduct')}
                    color="#007BFF"
                />
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <FlatList
                        data={products}
                        renderItem={renderProductCard}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={3}
                    />
                )}
                {/!*<ProductList />*!/}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingHorizontal: 20,
        backgroundColor: '#FBF1E6',
    },
    scrollContentContainer: {
        flexGrow: 1,
    },
});

export default ProductsScreen;
*/

/*
import React, { useEffect, useState, useContext } from 'react';
import {View, FlatList, ActivityIndicator, Alert, StyleSheet, ScrollView} from 'react-native';
import ProductCard from '../components/ProductCard';
import { CartContext } from '../context/CartContext';
import {getProductDetails, deleteProduct, getProducts} from "../utils/api";
import Header from "../components/Header";
import Menu from "../components/Menu"; // Import deleteProduct function

const ProductsScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext);
    // const navigation = useNavigation();
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts(); // Adjust to your API for fetching products
                setProducts(response.data); //                setProducts(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        addToCart(product);
        Alert.alert('Success', `${product.name} has been added to your cart.`);
    };

    const navigateToProductDetail = (productId) => {
        console.log('Navigation object:', navigation); // Check if navigation is defined
        navigation.navigate('ProductDetails', { productId });
    };

    const handleEditProduct = (product) => {
        navigation.navigate('EditProduct', { product: product }); // Navigate with product data
    };

    const handleDeleteProduct = (productId) => {
        Alert.alert(
            'Delete Product',
            'Are you sure you want to delete this product?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'OK',
                    onPress: async () => {
                        try {
                            await deleteProduct(productId); // Call your API to delete the product
                            setProducts(products.filter(product => product.id !== productId)); // Update the state
                            Alert.alert('Success', 'Product deleted successfully');
                        } catch (error) {
                            console.error(error);
                            Alert.alert('Error', 'Failed to delete the product');
                        }
                    }
                },
            ]
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContentContainer}>
            <Header />
            <Menu navigation={navigation} />
            <View style={styles.container}>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <FlatList
                        data={products}
                        renderItem={({ item }) => (
                            <ProductCard
                                product={item}
                                // onAddToCart={handleAddToCart}
                                 onAddToCart={() => handleAddToCart(item)}

                                onPress={() => navigateToProductDetail(item.id)}
                                onEdit={() => handleEditProduct(item)}
                                onDelete={() => handleDeleteProduct(item.id)} // Pass delete functionality
                            />
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={3}

                    />
                )}
            </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingHorizontal: 100,
        backgroundColor: '#FBF1E6',
    },
    scrollContentContainer: {
        height: '40rem',
    },
});

export default ProductsScreen;
*/

/*

import React, { useEffect, useState, useContext } from 'react';
import { View, FlatList, Text, ActivityIndicator, Button, StyleSheet } from 'react-native';
import ProductCard from '../components/ProductCard';
import { CartContext } from '../context/CartContext';
import { getProductDetails,getProducts } from "../utils/api";

const ProductsScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext); // Access cart context

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts(); // Adjust this to your actual API for fetching product list
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

    // Temporary function to navigate to ProductDetail with a hardcoded productId
    const navigateToProductDetail = (productId) => {
        // navigation.navigate('ProductDetails', { productId: productId }); // Navigate with hardcoded ID
        navigation.navigate('ProductDetails', { productId }); // Navigate to ProductDetail screen

    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={products}
                    renderItem={({ item }) => (
                        <ProductCard
                            product={item}
                            onAddToCart={handleAddToCart}
                            onPress={() => navigateToProductDetail(item.id || 1)} // Assuming the product has an ID, you can default to 1 temporarily
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={3}
                    // Removed numColumns prop to display all products in a single column.
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
});

export default ProductsScreen;
*/

/*
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text } from 'react-native';

import ProductCard from '../components/ProductCard'; // Import the ProductCard component
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import {getProductDetails} from "../utils/api"; // Assume you have CartContext to manage cart state

const ProductsScreen = () => {
    const [productId, setProductId] = useState(null); // Declare productId and setProductId
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext); // Access cart context

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProductDetails(productId)// Fetch products
                setProducts(response);
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
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <FlatList
                    data={products}
                    renderItem={({ item }) => (
                        <ProductCard product={item} onAddToCart={handleAddToCart} />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2} // Display two products per row
                />
            )}
        </View>
    );
};

/!* return (
        <View style={styles.container}>
            {loading ? (
                <Loader />
            ) : (
                <FlatList
                    data={products}
                    renderItem={({ item }) => (
                        <ProductCard
                            product={item}
                            onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
        </View>
    );
};*!/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});

export default ProductsScreen;*/


/*
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
//import api from '../services/api'; // Importing the API utility
import {getAllProducts} from "../api/api";

const ProductsScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts(); // Fetch product data
                console.log("Fetched Products: ", data); // Log to check the data structure
                setProducts(data); // Set data to products
            } catch (err) {
                setError('Failed to load products: ' + err.message); // Set error message
            } finally {
                setLoading(false); // End loading
            }
        };

        fetchProducts();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.productItem}
            onPress={() => navigation.navigate('ProductDetails', {
                id: item.id, // Pass the product ID to the details screen
                title: item.title,
                description: item.description,
                price: item.price,
            })}
        >
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
        </TouchableOpacity>
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />;
    }

    if (error) {
        return <Text style={styles.errorText}>Error: {error}</Text>;
    }

    return (
        <View style={styles.container}>
            {/!*<Header />*!/}
            <Text style={styles.title}>Products</Text>
            <FlatList
                data={products}
                keyExtractor={item => item.id ? item.id.toString() : Math.random().toString()} // Ensure each item has a unique ID
                renderItem={renderItem} // Render each product item
            />
            {/!*<Footer />*!/}
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
        textAlign: 'center',
        marginVertical: 20,
    },
    productItem: {
        padding: 15,
        marginVertical: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productPrice: {
        color: '#4CAF50',
        marginTop: 5,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
    },
    errorText: {
        textAlign: 'center',
        marginTop: 20,
        color: 'red',
    },
});

export default ProductsScreen;*/
/*
// ProductsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {getAllProducts} from "../api/api";
/!*import getAllProducts from '../services/api';
import api from "../services/api";*!/
// import productService from "../services/api"; // Import the product service

const ProductsScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts(); // Fetch product data
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.productItem}
            onPress={() => navigation.navigate('ProductDetails', {
               title: item.title,
                description: item.description,
                price: item.price,
                // Add any additional properties as needed
            })}
        >
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
        </TouchableOpacity>
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />;
    }

    if (error) {
        return <Text style={styles.errorText}>Error: {error}</Text>;
    }

    return (
        <View style={styles.container}>
            {/!*<Header />*!/}
            {/!*<Text style={styles.title}>Products</Text>*!/}
            <FlatList
                data={products}
                keyExtractor={item => item.productId.toString()} // Ensure each item has a unique ID
                renderItem={renderItem}
            />
            {/!*<Footer />*!/}
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
        textAlign: 'center',
        marginVertical: 20,
    },
    productItem: {
        padding: 15,
        marginVertical: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
        elevation: 3,
    },
    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productPrice: {
        color: '#4CAF50',
        marginTop: 5,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
    },
    errorText: {
        textAlign: 'center',
        marginTop: 20,
        color: 'red',
    },
});

export default ProductsScreen;*/
/*
// ProductsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import productService from '../services/api'; // Assuming you have a service for fetching products

const ProductsScreen = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productService.getProducts(); // Fetch product data from service
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.productItem}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
        </TouchableOpacity>
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />;
    }

    if (error) {
        return <Text style={styles.errorText}>Error: {error}</Text>;
    }

    return (
        <View style={styles.container}>
            <Header />
            <Text style={styles.title}>Products</Text>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()} // Assuming each item has an 'id' property
                renderItem={renderItem}
            />
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
        textAlign: 'center',
        marginVertical: 20,
    },
    productItem: {
        padding: 15,
        marginVertical: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
        elevation: 3,
    },
    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productPrice: {
        color: '#4CAF50',
        marginTop: 5,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
    },
    errorText: {
        textAlign: 'center',
        marginTop: 20,
        color: 'red',
    },
});

export default ProductsScreen;*/
// Example Filtered View (ProductsScreen.js):

/*
// Add state for selected category
const [selectedCategory, setSelectedCategory] = useState('All');

// Example categories array (could be fetched from an API or database)
const categories = ['All', 'Robotics', 'Programming', 'Mechanical', 'Electronics'];

const filteredProducts = products.filter(product =>
    selectedCategory === 'All' || product.category === selectedCategory
);

// In the return statement, include a Picker for categories:
<Picker
    selectedValue={selectedCategory}
    onValueChange={(itemValue) => setSelectedCategory(itemValue)}
>
    {categories.map(category => (
        <Picker.Item label={category} value={category} key={category} />
    ))}
</Picker>
*/
