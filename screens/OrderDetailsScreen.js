// src/screens/OrderDetailsScreen.js

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const OrderDetailsScreen = ({ route, navigation }) => {
    const { order } = route.params; // Get order details passed from OrderHistoryScreen

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Order ID: {order.id}</Text>
            <Text style={styles.detail}>Status: {order.status}</Text>
            <Text style={styles.detail}>Total: ${order.total}</Text>
            <Text style={styles.sectionTitle}>Items:</Text>
            {order.items.map((item, index) => (
                <Text key={index} style={styles.itemText}>
                    {item.name} - ${item.price.toFixed(2)}
                </Text>
            ))}
            <Button title="Go back" onPress={() => navigation.goBack()} />
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
        fontWeight: 'bold',
    },
    detail: {
        fontSize: 18,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
    itemText: {
        fontSize: 16,
        marginTop: 5,
    },
});

export default OrderDetailsScreen;

/*
/*import React from 'react';
import { View, Text, Button } from 'react-native';

const OrderDetailsScreen = ({ route }) => {
    const { order } = route.params;

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text>Order ID: {order.id}</Text>
            <Text>Status: {order.status}</Text>
            <Text>Total: ${order.total}</Text>
            <Text>Items:</Text>
            {order.items.map((item, index) => (
                <Text key={index}>{item.name} - ${item.price}</Text>
            ))}
        </View>
    );
};

export default OrderDetailsScreen;*/
