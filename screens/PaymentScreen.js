import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, Linking } from "react-native";
import api from "./api";
import {initializePayment, verifyPayment} from "../utils/api"; // Import the API service

const PaymentScreen = () => {
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [txRef, setTxRef] = useState("");

    const handleInitializePayment = async () => {
        try {
            const paymentData = {
                email,
                phoneNumber,
                amount: parseFloat(amount),
             /*   currency: "ETB",
                txRef: `tx-ref-${Date.now()}`, // Unique transaction reference*/
            };
            // Call the initializePayment API
            const response = await initializePayment(paymentData);
            // Get the checkout URL from the backend
            const checkoutUrl = response.data;

            // Redirect to the payment link
            Linking.openURL(checkoutUrl);
        } catch (error) {
            Alert.alert("Error", "Failed to initialize payment");
        }
    };

    const handleVerifyPayment = async () => {
        try {
            // Call the verifyPayment API
            const response = await verifyPayment(txRef);
            const transaction = response.data;

            Alert.alert("Payment Status", `Transaction status: ${transaction.status}`);
        } catch (error) {
            Alert.alert("Error", "Failed to verify payment");
        }
    };

    return (
        <View>
            <Text>Email:</Text>
            <TextInput value={email} onChangeText={setEmail} />

            <Text>Phone Number:</Text>
            <TextInput value={phoneNumber} onChangeText={setPhoneNumber} />

            <Text>Amount:</Text>
            <TextInput value={amount} onChangeText={setAmount} keyboardType="numeric" />

            <Button title="Initialize Payment" onPress={handleInitializePayment} />

            <Text>Transaction Reference:</Text>
            <TextInput value={txRef} onChangeText={setTxRef} />

            <Button title="Verify Payment" onPress={handleVerifyPayment} />
        </View>
    );
};

export default PaymentScreen;

/*
Frontend: Sends only the necessary data (email, phone number, and amount) to the backend.
Backend: Handles the creation of the paymentData object, generates the tx_ref, and calls the Chapa API.
Benefits: Simpler frontend, improved security, and centralized logic.

import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, Linking } from "react-native";
import api from "./api"; // Import the API service

const PaymentScreen = () => {
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [amount, setAmount] = useState("");

    const handleInitializePayment = async () => {
        try {
            // Send only the necessary data to the backend
            const response = await api.post("/payments/initialize", {
                email,
                phoneNumber,
                amount: parseFloat(amount),
            });

            // Get the checkout URL from the backend
            const checkoutUrl = response.data;
            Linking.openURL(checkoutUrl); // Redirect to the payment page
        } catch (error) {
            Alert.alert("Error", "Failed to initialize payment");
        }
    };

    return (
        <View>
            <Text>Email:</Text>
            <TextInput value={email} onChangeText={setEmail} />

            <Text>Phone Number:</Text>
            <TextInput value={phoneNumber} onChangeText={setPhoneNumber} />

            <Text>Amount:</Text>
            <TextInput value={amount} onChangeText={setAmount} keyboardType="numeric" />

            <Button title="Initialize Payment" onPress={handleInitializePayment} />
        </View>
    );
};

export default PaymentScreen;

Uses the api service to call the backend endpoints.
Handles user input for email, phone number, amount, and transaction reference.
Redirects the user to the payment link after initializing the payment.
Verifies the payment status using the transaction reference.

Initialize Payment
When the user clicks the "Initialize Payment" button, the handleInitializePayment function is called. It sends a POST request to the backend with the payment details.

Verify Payment
When the user clicks the "Verify Payment" button, the handleVerifyPayment function is called. It sends a GET request to the backend with the transaction reference (txRef).

import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import axios from "axios";

const PaymentScreen = () => {
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [txRef, setTxRef] = useState("");

    const initializePayment = async () => {
        try {
            const response = await axios.post("http://your-backend-url/api/payments/initialize", {
                email,
                phoneNumber,
                amount: parseFloat(amount),
                currency: "ETB",
                txRef: `tx-ref-${Date.now()}`, // Unique transaction reference
            });
            const checkoutUrl = response.data;
            // Redirect to the payment link (e.g., using WebView or Linking)
            Alert.alert("Payment Link", checkoutUrl);
        } catch (error) {
            Alert.alert("Error", "Failed to initialize payment");
        }
    };

    const verifyPayment = async () => {
        try {
            const response = await axios.get(`http://your-backend-url/api/payments/verify/${txRef}`);
            const transaction = response.data;
            Alert.alert("Payment Status", `Transaction status: ${transaction.status}`);
        } catch (error) {
            Alert.alert("Error", "Failed to verify payment");
        }
    };

    return (
        <View>
            <Text>Email:</Text>
            <TextInput value={email} onChangeText={setEmail} />

            <Text>Phone Number:</Text>
            <TextInput value={phoneNumber} onChangeText={setPhoneNumber} />

            <Text>Amount:</Text>
            <TextInput value={amount} onChangeText={setAmount} keyboardType="numeric" />

            <Button title="Initialize Payment" onPress={initializePayment} />

            <Text>Transaction Reference:</Text>
            <TextInput value={txRef} onChangeText={setTxRef} />

            <Button title="Verify Payment" onPress={verifyPayment} />
        </View>
    );
};

export default PaymentScreen;
*/
