// components/Header.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CartContext } from '../context/CartContext';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Install this package if not already installed

const ShoppingCart = ({ navigation }) => {
    const { cart } = useContext(CartContext);

    return (
        <View style={styles.header}>
            <Text style={styles.title}>Product Store</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                <View style={styles.cartIcon}>
                    <Icon name="shopping-cart" size={24} color="#000" />
                    {cart.length > 0 && (
                        <View style={styles.cartBadge}>
                            <Text style={styles.cartBadgeText}>{cart.length}</Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    cartIcon: {
        position: 'relative',
    },
    cartBadge: {
        position: 'absolute',
        right: -6,
        top: -3,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartBadgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default ShoppingCart;
