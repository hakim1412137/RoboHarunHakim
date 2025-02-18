// screens/PaymentScreen.js
import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button, Picker, StyleSheet, Linking, ActivityIndicator} from 'react-native';
import {initializePayment1} from '../utils/api';
import * as WebBrowser from 'expo-web-browser';

const PaymentScreen = ({ navigation }) => {
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('ETB');
    const [email, setEmail] = useState('hakimmuze@gmail.com');
    const [phone, setPhone] = useState('0900833149');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    // Handle deep linking for payment result

    const validateInputs = () => {
        const errors = [];
        const amountNumber = parseFloat(amount);

        if (!amount || isNaN(amountNumber) || amountNumber <= 0) {
            errors.push('Please enter a valid amount');
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.push('Invalid email address');
        }

        if (!/^(?:\+251|0)9\d{8}$/.test(phone)) {
            errors.push('Ethiopian phone number must start with 0 or +251 followed by 9 digits');
        }

        if (errors.length > 0) {
            setError(errors.join('\n'));
            return false;
        }
        return true;
    };

    const handlePayment = async () => {
        if (!validateInputs()) return;

        setLoading(true);
        try {
            const response = await initializePayment1({
                amount: parseFloat(amount),
                currency,
                email: email.trim(),
                phoneNumber: phone.replace(/^0/, '+251') // Convert to international format
            });
            if (response.data.status === 'success') {
                navigation.navigate('PaymentWebView', {
                    checkoutUrl: response.data.data.checkoutUrl,
                    txRef: response.data.data.txRef // Now properly received
                });
            } else {
                throw new Error(response.data.message || 'Payment failed');
            }
       /*     navigation.navigate('PaymentWebView', {
                checkoutUrl: response.data.checkoutUrl,
                txRef: response.data.txRef
            });
            if (!response.data.checkoutUrl) {
                throw new Error('No checkout URL received');
            }
            return response;

*/
        } catch (error) {
            setError(error.response?.data?.message || 'Payment initialization failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Payment Details</Text>

            <Picker
                selectedValue={currency}
                style={styles.picker}
                onValueChange={setCurrency}>
                <Picker.Item label="Ethiopian Birr (ETB)" value="ETB" />
                <Picker.Item label="US Dollar (USD)" value="USD" />
            </Picker>

            <TextInput
                style={styles.input}
                placeholder={`Amount (${currency})`}
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                maxLength={10}
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            {loading ? (
                <ActivityIndicator size="large" color="#4A90E2" />
            ) : (
                <Button
                    title="Proceed to Payment"
                    onPress={handlePayment}
                    color="#4A90E2"
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    picker: {
        height: 50,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    error: {
        color: 'red',
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default PaymentScreen;
/*  if (response.data?.checkoutUrl) {
           // Open the checkout URL in the default browser
           await WebBrowser.openBrowserAsync(response.data.checkoutUrl);
       } else {
           throw new Error('No checkout URL received');
       }*/
/*    useEffect(() => {
        const handleDeepLink = ({ url }) => {
          if (url.includes('http://localhost:8081/payment-result')) {
                    const txRef = new URL(url).searchParams.get('tx_ref');
                navigation.navigate('PaymentVerification', { txRef });
            }
        };

        const subscription = Linking.addEventListener('url', handleDeepLink);
        return () => subscription.remove();
    }, []);*/


/* useEffect(() => {
     const handleMessage = (event) => {
         if (event.data?.txRef) {
             navigation.navigate('PaymentVerification', { txRef: event.data.txRef });
         }
     };

     window.addEventListener('message', handleMessage);

     return () => window.removeEventListener('message', handleMessage);
 }, []);
*/


/*
import React, {useEffect, useState} from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';

import {initializePayment1, verifyPayment1} from "../utils/api";

const PaymentScreen = ({ navigation, route  }) => {
    const [amount, setAmount] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    // Handle payment verification when returning from WebView
    useEffect(() => {
        const verifyPayment = async () => {
            if (route.params?.txRef) {
                try {
                    const result = await handleVerifyPayment(route.params.txRef);
                    console.log("Verification result:", result);
                    // Handle the success scenario, e.g., updating state or redirecting the user
                } catch (error) {
                    console.error("Error verifying payment:", error);
                    // Handle the error, e.g., displaying an error message to the user
                }
            }
        };

        verifyPayment();
    }, [route.params?.txRef]);

    const initializePayment = async () => {
        try {
            setLoading(true);
            setError('');
            const numericAmount = parseFloat(amount).toFixed(2);

            const  response  = await initializePayment1({
                amount: numericAmount,
                currency: 'ETB',
                email: email.trim(),
                phoneNumber: phone.trim()
            });
            // Add null check for response data
            if (!response?.data?.checkoutUrl || !response?.data?.txRef) {
                throw new Error('Invalid response from payment gateway');
            }
            navigation.navigate('PaymentWebView', {
                checkoutUrl: response.data.checkoutUrl, // Make sure to use the correct response structure
                txRef: response.data.txRef
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Payment initialization failed');
            throw err; // Important for the .catch() in handleSubmit
        } finally {
            setLoading(false);
        }
    };
    const handleVerifyPayment = async (txRef) => {
        try {
            setLoading(true);
            setError('');

            const { data } = await verifyPayment1(txRef);

            if (data.status === 'SUCCESS') {
                navigation.replace('OrderConfirmation', {
                    txRef,
                    amount: data.amount,
                    email: data.email
                });
            } else {
                navigation.navigate('PaymentFailure', {
                    txRef,
                    error: data.message || 'Payment failed'
                });
            }

        } catch (err) {
            navigation.navigate('PaymentFailure', {
                txRef,
                error: err.response?.data?.message || 'Verification failed'
            });
        } finally {
            setLoading(false);
        }
    };

    const validateInputs = () => {
        let errors = [];

        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            errors.push('Please enter a valid positive amount');
        }

        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            errors.push('Invalid email address');
        }

        if (!/^09\d{8}$/.test(phone)) {
            errors.push('Ethiopian phone number must be 10 digits starting with 09');
        }

        if (errors.length > 0) {
            setError(errors.join('\n'));
            return false;
        }

        return true;
    };

    const handleSubmit = () => {
        if (validateInputs()) {
            initializePayment()
                .then(response => {
                    // This is now safe because of checks in initializePayment
                    console.log("Payment initialized successfully");
                })
                .catch(error => {
                    // Error already handled in initializePayment
                    console.error("Payment flow error:", error);
                });
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Payment Details</Text>

            <TextInput
                style={styles.input}
                placeholder="Amount (ETB)"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                maxLength={10}
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Button
                    title="Proceed to Payment"
                    onPress={handleSubmit}
                    disabled={!amount || !email || !phone}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 15,
        borderRadius: 8,
        fontSize: 16,
        backgroundColor: 'white',
    },
    error: {
        color: 'red',
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 14,
    },
});

export default PaymentScreen;
*/

/*// App.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';
// import { WebView } from 'react-native-webview';
import axios from 'axios';

// const Stack = createStackNavigator();

const PaymentScreen = ({ navigation }) => {
    const [amount, setAmount] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const initializePayment = async () => {
        try {
            setLoading(true);
            setError('');

            const response = await axios.post('http://localhost:8083/api/payments/initialize', {
                amount: parseFloat(amount),
                currency: 'ETB',
                email,
                phoneNumber: phone
            });

            navigation.navigate('PaymentWebView', {
                checkoutUrl: response.data,
                txRef: response.data.txRef // Assuming your backend returns txRef
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Payment initialization failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Make Payment</Text>

            <TextInput
                style={styles.input}
                placeholder="Amount"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Button title="Proceed to Payment" onPress={initializePayment} />
            )}
        </View>
    );
};
export default PaymentScreen;*/
/*
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Payment">
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="PaymentWebView" component={PaymentWebViewScreen} />
        <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
        <Stack.Screen name="PaymentFailure" component={PaymentFailureScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
 */
/*
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Linking } from 'react-native';
import axios from 'axios';

const PaymentScreen = () => {
    const [amount, setAmount] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [txRef, setTxRef] = useState('');

    const initializePayment = async () => {
        try {
            const response = await axios.post('http://localhost:8083/api/payments/initialize', {
                amount: parseFloat(amount),
                currency: 'ETB',
                email,
                phoneNumber: phone
            });

            setTxRef(response.data.txRef);
            Linking.openURL(response.data.checkoutUrl);

            // Start verification polling
            const interval = setInterval(async () => {
                const verification = await axios.get(`http://localhost:8083/api/payments/verify/${txRef}`);
                if (verification.data.status === 'SUCCESS') {
                    clearInterval(interval);
                    Alert.alert('Payment Successful!');
                }
            }, 5000);

        } catch (error) {
            Alert.alert('Error', error.response?.data?.message || 'Payment failed');
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <TextInput
                placeholder="Amount"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                style={{ marginBottom: 10 }}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={{ marginBottom: 10 }}
            />
            <TextInput
                placeholder="Phone Number"
                value={phone}
                onChangeText={setPhone}
                style={{ marginBottom: 10 }}
            />
            <Button title="Pay Now" onPress={initializePayment} />
        </View>
    );
};

export default PaymentScreen;
 */

/*
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, Linking } from "react-native";

import {initializePayment, verifyPayment} from "../utils/api"; // Import the API service

const PaymentScreen = ({ navigation }) => {
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
             /!*   currency: "ETB",
                txRef: `tx-ref-${Date.now()}`, // Unique transaction reference*!/
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
            navigation.navigate('OrderConfirmation'); // Navigate to confirmation screen

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
*/

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
