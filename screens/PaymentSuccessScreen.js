// screens/PaymentSuccessScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const PaymentSuccessScreen = ({ navigation, route }) => {
    const { txRef, amount, currency } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Payment Successful! 🎉</Text>
            <Text style={styles.detail}>Transaction ID: {txRef}</Text>
            <Text style={styles.detail}>Amount: {amount} {currency}</Text>
            <Button
                title="Continue Shopping"
                onPress={() => navigation.popToTop()}
                color="#4A90E2"
            />
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
        marginBottom: 20,
    },
    detail: {
        fontSize: 16,
        marginBottom: 10,
    },
});

export default PaymentSuccessScreen;
/*
// screens/PaymentSuccessScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const PaymentSuccessScreen = ({ navigation, route }) => {
    const { txRef, amount } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.icon}>🎉</Text>
            <Text style={styles.title}>Payment Successful!</Text>
            <Text style={styles.detail}>Transaction ID: {txRef}</Text>
            <Text style={styles.detail}>Amount: {amount} ETB</Text>

            <Button
                title="Continue Shopping"
                onPress={() => navigation.replace('home')}
                color="#4A90E2"
            />
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
        fontSize: 28,
        fontWeight: '600',
        marginVertical: 20,
        color: '#4CAF50',
    },
    detail: {
        fontSize: 16,
        marginBottom: 10,
        color: '#666',
    },
    icon: {
        fontSize: 60,
        marginBottom: 20,
    },
});

export default PaymentSuccessScreen;*/
/*// screens/PaymentSuccessScreen.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { View, Text, Button, StyleSheet } from 'react-native';

const PaymentSuccessScreen = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Payment Successful! 🎉</Text>
            <Text style={styles.detail}>Amount: {state?.amount} ETB</Text>
            <Text style={styles.detail}>Transaction ID: {state?.txRef}</Text>
            <Button
                title="Return Home"
                onPress={() => navigate('/')}
                color="#4A90E2"
            />
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
        marginBottom: 20,
    },
    detail: {
        fontSize: 16,
        marginBottom: 10,
    }
});

export default PaymentSuccessScreen;*/

/*import React, { useState } from 'react';

import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';


const PaymentSuccessScreen = ({ route }) => {
    const { transaction } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.successTitle}>Payment Successful!</Text>
            <Text>Amount: {transaction.amount} {transaction.currency}</Text>
            <Text>Transaction ID: {transaction.txRef}</Text>
            <Text>Check your email for confirmation</Text>
        </View>
    );
};
export default PaymentSuccessScreen;*/

