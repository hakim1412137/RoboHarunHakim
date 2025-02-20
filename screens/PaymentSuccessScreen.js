// screens/PaymentSuccessScreen.js
import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';

const PaymentSuccessScreen = ({ navigation, route }) => {
    const { txRef } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.icon}>✅</Text>
            <Text style={styles.heading}>Payment Successful!</Text>
            <Text style={styles.reference}>Reference: {txRef}</Text>

            <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => navigation.navigate('home')}
            >
                <Text style={styles.buttonText}>Return to Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => navigation.navigate('OrderDetails')}
            >
                <Text style={styles.secondaryButtonText}>View Order Details</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    icon: {
        fontSize: 80,
        marginBottom: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#2ecc71', // Green for success, red for failure
    },
    errorMessage: {
        color: '#e74c3c',
        marginBottom: 15,
        textAlign: 'center',
    },
    reference: {
        color: '#7f8c8d',
        marginBottom: 30,
    },
    primaryButton: {
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 8,
        width: '100%',
        marginBottom: 10,
    },
    secondaryButton: {
        borderWidth: 1,
        borderColor: '#3498db',
        padding: 15,
        borderRadius: 8,
        width: '100%',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    secondaryButtonText: {
        color: '#3498db',
        textAlign: 'center',
    },
});

export default PaymentSuccessScreen;
