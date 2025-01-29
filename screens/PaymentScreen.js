// screens/PaymentScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { initiatePayment } from '../utils/api';
import { verifyPayment } from '../utils/api';

const PaymentScreen = ({ route }) => {
    const { amount } = route.params; // Get amount from parameters
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [payMethodToken, setPayMethodToken] = useState('');

    const initiatePayment1 = async () => {
        const paymentData = {
            email,phoneNumber,amount,
            paymentMethod: payMethodToken,
        };

        try {
            const response = await initiatePayment(paymentData);
            Alert.alert(response);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'An error occurred while initiating payment.');
        }
    };

    const verifyPayment1 = async (token) => {
        const verificationData = {
            token,
            amount,
            paymentMethod: payMethodToken,
        };

        try {
            const response = await verifyPayment(verificationData);
            Alert.alert('Success', 'Payment successful!');
            // Navigate to another screen if needed
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Payment verification failed.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Payment Page</Text>
            <Text>Total Amount: ${amount}</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter your Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
            />
            <TextInput
                style={styles.input}
                placeholder="Payment Method Token"
                value={payMethodToken}
                onChangeText={setPayMethodToken}
            />
            <Button title="Initiate Payment" onPress={initiatePayment1} />
            <Button title="Verify Payment" onPress={() => verifyPayment1(payMethodToken)} />
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
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 8,
    },
});

export default PaymentScreen;
/*
// screens/PaymentScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import paymentService from '../services/paymentService';

const PaymentScreen = ({ route }) => {
    const { orderId, amount } = route.params;  // Get order details from params
    const [paymentMethod, setPaymentMethod] = useState('');

    const handlePayment = async () => {
        const paymentData = {
            orderId,
            amount,
            paymentMethod,
        };

        try {
            const response = await paymentService.createPayment(paymentData);
            if (response.status === 'success') {
                // Handle success (e.g., navigate to confirmation page)
                alert('Payment Successful!');
            } else {
                alert('Payment Failed: ' + response.message);
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while processing the payment.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Payment Page</Text>
            <Text>Total Amount: ${amount}</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Payment Method (e.g., token or card info)"
                value={paymentMethod}
                onChangeText={setPaymentMethod}
            />
            <Button title="Process Payment" onPress={handlePayment} />
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
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 8,
    },
});

export default PaymentScreen;
 */
