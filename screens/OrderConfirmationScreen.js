// screens/OrderConfirmationScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const OrderConfirmationScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Order Confirmation</Text>
            <Text style={styles.message}>Your order has been placed successfully!</Text>
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    message: {
        fontSize: 18,
        marginBottom: 20,
    },
});

export default OrderConfirmationScreen;
