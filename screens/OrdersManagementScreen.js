// src/screens/OrdersManagementScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import { fetchOrders } from '../utils/api'; // Import relevant API calls
import { updateOrderStatus } from '../utils/api'; // Import relevant API calls

const OrdersManagementScreen = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrdersData = async () => {
        try {
            const ordersData = await fetchOrders(); // Fetch orders from backend
            setOrders(ordersData);
        } catch (error) {
            Alert.alert('Error fetching orders', error.message); // Handle fetch errors
        }
    };

    useEffect(() => {
        fetchOrdersData(); // Call data fetch on mount
    }, []);

    const handleUpdateStatus = async (id, status) => {
        try {
            await updateOrderStatus(id, status); // Call API to update order status
            fetchOrdersData(); // Refresh the orders list
            Alert.alert('Success', `Order status updated to ${status}`);
        } catch (error) {
            Alert.alert('Error updating order', error.message); // Handle update errors
        }
    };

    const renderOrderItem = ({ item }) => (
        <View style={styles.order}>
            <Text>Order ID: {item.id}</Text>
            <Text>Items: {item.items.join(', ')}</Text>
            <Text>Status: {item.status}</Text>
            <Button
                title="Mark as Completed"
                onPress={() => handleUpdateStatus(item.id, 'Completed')}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={orders}
                keyExtractor={item => item.id.toString()}
                renderItem={renderOrderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    order: {
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
});

export default OrdersManagementScreen;

/*
import React, { useState, useEffect } from 'react';
import { View, Button, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const OrdersManagementScreen = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const ordersSnapshot = await firestore().collection('orders').get();
            setOrders(ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };
        fetchOrders();
    }, []);

    const updateOrderStatus = async (id, status) => {
        await firestore().collection('orders').doc(id).update({ status });
        fetchOrders();
    };

    const fetchOrders = async () => {
        const ordersSnapshot = await firestore().collection('orders').get();
        setOrders(ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={orders}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.order}>
                        <Text>Order ID: {item.id}</Text>
                        <Text>Items: {item.items.join(', ')}</Text>
                        <Text>Status: {item.status}</Text>
                        <Button title="Mark as Completed" onPress={() => updateOrderStatus(item.id, 'Completed')} />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    order: {
        marginBottom: 20,
    },
});

export default OrdersManagementScreen;
 */
