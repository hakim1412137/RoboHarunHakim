// screens/OrderConfirmationScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { verifyPayment1} from '../utils/api';

const OrderConfirmationScreen = ({ route }) => {
    const { txRef } = route.params;
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await verifyPayment1(txRef);
                setOrderDetails(response.data);
            } catch (error) {
                console.error('Failed to fetch order details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [txRef]);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#4A90E2" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Order Confirmed</Text>
            <View style={styles.detailsContainer}>
                <Text style={styles.detail}>Transaction ID: {orderDetails.txRef}</Text>
                <Text style={styles.detail}>Amount: {orderDetails.amount} ETB</Text>
                <Text style={styles.detail}>Status: {orderDetails.status}</Text>
                <Text style={styles.detail}>Date: {new Date(orderDetails.createdAt).toLocaleString()}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginVertical: 30,
        textAlign: 'center',
    },
    detailsContainer: {
        backgroundColor: '#FAFAFA',
        borderRadius: 10,
        padding: 20,
        marginVertical: 20,
    },
    detail: {
        fontSize: 16,
        marginVertical: 8,
        color: '#444',
    },
});

export default OrderConfirmationScreen;
