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
/*// screens/OrderConfirmationScreen.js
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { paymentApi } from '../utils/api';

const OrderConfirmationScreen = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [paymentStatus, setPaymentStatus] = useState(null);

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                const txRef = searchParams.get('tx_ref');
                if (!txRef) throw new Error('Missing transaction reference');

                const response = await paymentApi.verify(txRef);
                setPaymentStatus(response.data.status);

                if (response.data.status === 'SUCCESS') {
                    navigate('/payment-success', { state: response.data });
                } else {
                    navigate('/payment-failure', { state: response.data });
                }
            } catch (error) {
                navigate('/payment-failure', { state: { error: error.message } });
            } finally {
                setLoading(false);
            }
        };

        verifyPayment();
    }, [searchParams, navigate]);

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#4A90E2" />
            <Text>Verifying payment...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    }
});

export default OrderConfirmationScreen;*/
/*// screens/OrderConfirmationScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const OrderConfirmationScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Order Confirmation</Text>
            <Text style={styles.message}>Your order has been placed successfully!</Text>
            <Button title="Go to Home" onPress={() => navigation.navigate('products')} />
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

export default OrderConfirmationScreen;*/
