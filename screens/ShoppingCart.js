// components/Header.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CartContext } from '../context/CartContext';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Install this package if not already installed
import FontAwesome from '@expo/vector-icons/FontAwesome';

const ShoppingCart = ({ navigation }) => {
    const { cart } = useContext(CartContext);

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={{ width: 40, height: 40, padding: 5, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <FontAwesome name="cart-plus" size={24} color="#000" />
                {cart.length > 0 && (
                    <View style={{ position: 'absolute', width: 'auto', aspectRatio: 1, top: 0, right: 0, padding: 5, backgroundColor: 'red', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: '10', fontWeight: 'bold' }}>{cart.length}</Text>
                    </View>
                )}
        </TouchableOpacity>
    );
};

export default ShoppingCart;
