 // screens/CartScreen.js
import React, { useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { CartContext } from '../context/CartContext';

const CartScreen = () => {
    const { cart } = useContext(CartContext);
    //const { cartItems, removeItem, clearCart } = useContext(CartContext);

    const calculateTotal = () => {
        return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    };

    const handleCheckout = () => {
        // Implement checkout logic here (e.g., navigate to PaymentScreen)
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Cart</Text>
            {cart.length === 0 ? (
                <Text>Your cart is empty.</Text>
            ) : (
                <FlatList
                    data={cart}
                    keyExtractor={item => item.productId.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.cartItem}>
                            <Text>{item.name}</Text>
                            <Text>Price: ${item.price}</Text>
                            <Text>Quantity: {item.quantity}</Text>
                        </View>
                    )}
                />
            )}
            <Text style={styles.total}>Total: ${calculateTotal().toFixed(2)}</Text>
            <Button title="Checkout" onPress={handleCheckout} />
            <Button title="Clear Cart" onPress={clearCart} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        marginBottom: 10,
    },
    cartItem: {
        padding: 15,
        backgroundColor: '#f0f0f0',
        marginVertical: 10,
        borderRadius: 8,
    },

    total: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
});

export default CartScreen;
/*
import React, { useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import CartItem from '../components/CartItem';

const CartScreen = () => {
    const { cartItems } = useContext(AuthContext); // Assuming AuthContext holds cart info

    return (
        <View>
            <FlatList
                data={cartItems}
                renderItem={({ item }) => <CartItem item={item} />}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

export default CartScreen;
 */
/*
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { fetchCartItems, fetchAddresses, fetchPaymentMethods } from '../api/api'; // Import API calls

const CartScreen = ({ navigation }) => {
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const items = await fetchCartItems();
                setCartItems(items); // Fetch and set cart items

                const fetchedAddresses = await fetchAddresses();
                setAddresses(fetchedAddresses); // Fetch and set addresses

                const fetchedPaymentMethods = await fetchPaymentMethods();
                setPaymentMethods(fetchedPaymentMethods); // Fetch and set payment methods
            } catch (error) {
                Alert.alert('Error fetching data', error.message); // Handle errors
            }
        };

        fetchData(); // Call fetch data function upon component mount
    }, []);

    const handlePlaceOrder = () => {
        if (!selectedAddress || !selectedPaymentMethod) {
            Alert.alert('Error', 'Please select an address and a payment method');
            return;
        }
        // Implement order placement logic
        Alert.alert('Order placed', 'Your order has been successfully placed!');
        navigation.navigate('OrderConfirmation'); // Navigate to confirmation screen
    };

    const renderCartItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Text style={styles.cartItemName}>{item.name}</Text>
            <Text style={styles.cartItemPrice}>${item.price} x {item.quantity}</Text>
            <Text style={styles.cartItemTotal}>Total: ${item.price * item.quantity}</Text>
        </View>
    );

    const renderAddress = ({ item }) => (
        <TouchableOpacity
            style={[styles.addressItem, selectedAddress === item ? styles.selectedItem : {}]}
            onPress={() => setSelectedAddress(item)}
        >
            <Text>{item.address}</Text>
        </TouchableOpacity>
    );

    const renderPaymentMethod = ({ item }) => (
        <TouchableOpacity
            style={[styles.paymentMethodItem, selectedPaymentMethod === item ? styles.selectedItem : {}]}
            onPress={() => setSelectedPaymentMethod(item)}
        >
            <Text>{item.method}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Cart Summary</Text>
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderCartItem}
            />

            <Text style={styles.sectionTitle}>Delivery Address</Text>
            <FlatList
                data={addresses}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderAddress}
            />

            <Text style={styles.sectionTitle}>Payment Options</Text>
            <FlatList
                data={paymentMethods}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderPaymentMethod}
            />

            <Button title="Place Order" onPress={handlePlaceOrder} />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    cartItem: {
        marginBottom: 10,
    },
    cartItemName: {
        fontSize: 18,
    },
    cartItemPrice: {
        fontSize: 16,
    },
    cartItemTotal: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    couponInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    addressItem: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        marginBottom: 10,
    },
    selectedItem: {
        backgroundColor: '#ddd',
    },
    addressText: {
        fontSize: 16,
    },
    paymentMethodItem: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        marginBottom: 10,
    },
    paymentMethodText: {
        fontSize: 16,
    },
});

export default CartScreen;

/*import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Button } from 'react-native';
//import { cartItems, addresses, paymentMethods } from '../data/cart';
import { fetchCartItems, fetchAddresses, fetchPaymentMethods } from '../api'; // Adjust based on your API calls

const CartScreen = ({ navigation }) => {
    const [coupon, setCoupon] = useState('');
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

    const handleApplyCoupon = () => {
        // Apply coupon logic here
        alert('Coupon applied');
    };

    const handlePlaceOrder = () => {
        if (!selectedAddress || !selectedPaymentMethod) {
            alert('Please select address and payment method');
            return;
        }
        // Place order logic here
        alert('Order placed');
        navigation.navigate('OrderConfirmation');
    };

    const renderCartItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Text style={styles.cartItemName}>{item.name}</Text>
            <Text style={styles.cartItemPrice}>${item.price} x {item.quantity}</Text>
            <Text style={styles.cartItemTotal}>Total: ${item.price * item.quantity}</Text>
        </View>
    );

    const renderAddress = ({ item }) => (
        <TouchableOpacity
            style={[styles.addressItem, selectedAddress === item && styles.selectedItem]}
            onPress={() => setSelectedAddress(item)}
        >
            <Text style={styles.addressText}>{item.address}</Text>
        </TouchableOpacity>
    );

    const renderPaymentMethod = ({ item }) => (
        <TouchableOpacity
            style={[styles.paymentMethodItem, selectedPaymentMethod === item && styles.selectedItem]}
            onPress={() => setSelectedPaymentMethod(item)}
        >
            <Text style={styles.paymentMethodText}>{item.method}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Cart Summary</Text>
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderCartItem}
            />

            <TextInput
                style={styles.couponInput}
                placeholder="Enter coupon code"
                value={coupon}
                onChangeText={setCoupon}
            />
            <Button title="Apply Coupon" onPress={handleApplyCoupon} />

            <Text style={styles.sectionTitle}>Delivery Address</Text>
            <FlatList
                data={addresses}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderAddress}
            />

            <Text style={styles.sectionTitle}>Payment Options</Text>
            <FlatList
                data={paymentMethods}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderPaymentMethod}
            />

            <Button title="Place Order" onPress={handlePlaceOrder} />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    cartItem: {
        marginBottom: 10,
    },
    cartItemName: {
        fontSize: 18,
    },
    cartItemPrice: {
        fontSize: 16,
    },
    cartItemTotal: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    couponInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    addressItem: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        marginBottom: 10,
    },
    selectedItem: {
        backgroundColor: '#ddd',
    },
    addressText: {
        fontSize: 16,
    },
    paymentMethodItem: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        marginBottom: 10,
    },
    paymentMethodText: {
        fontSize: 16,
    },
});

export default CartScreen;

*/
