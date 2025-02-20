 // screens/CartScreen.js
import React, { useContext } from 'react';
import {View, Text, Button, FlatList, StyleSheet, Alert} from 'react-native';
import { CartContext } from '../context/CartContext';

const CartScreen =  ({ navigation }) => {
 /*   const { cart } = useContext(CartContext);*/
  const { cart, removeItem, clearCart } = useContext(CartContext);

    const calculateTotal = () => {
        return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    };


    const handleCheckout = () => {
     if (cart.length === 0) {
            Alert.alert('Error', 'Your cart is empty.');
           return;
     }
    // navigation.navigate('Payment');
        navigation.navigate('Payment', {
            cartItems: cart,
            totalPrice: calculateTotal()
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Cart</Text>
            {cart.length === 0 ? (
                <Text>Your cart is empty.</Text>
            ) : (
                <FlatList
                    data={cart}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.cartItem}>
                            <Text>{item.name} - Price: ${item.price} x {item.quantity}</Text>
                            <Button title="Remove" onPress={() => removeItem(item.id)} />

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
