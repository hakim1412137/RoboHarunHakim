// screens/PaymentScreen.js
import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button, Picker, StyleSheet, Linking, ActivityIndicator, FlatList} from 'react-native';
import {initializePayment1} from '../utils/api';

const PaymentScreen = ({ navigation, route  }) => {
    const [amount, setAmount] = useState('totalPrice');
    const [currency, setCurrency] = useState('ETB');
    const [email, setEmail] = useState('hakimmuze@gmail.com');
    const [phone, setPhone] = useState('0900833149');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const {cartItems = [], totalPrice = 0} = route.params || {};
    // const { cartItems = [], totalPrice = 0 } = route.params;

    const validateInputs = () => {
        const errors = [];

        // Validate cart total
        if (!totalPrice || totalPrice <= 0) {
            errors.push('Invalid cart total');
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
                // amount: parseFloat(amount),
                amount: totalPrice,
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
            {/* Cart Summary */}
            <View style={styles.summaryContainer}>
                <Text style={styles.summaryTitle}>Order Summary</Text>
                <FlatList
                    data={cartItems}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.itemRow}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemPrice}>
                                {currency} {item.price.toFixed(2)} x {item.quantity}
                            </Text>
                        </View>
                    )}
                />
                <View style={styles.totalRow}>
                    <Text style={styles.totalText}>Total:</Text>
                    <Text style={styles.totalPrice}>
                        {currency} {totalPrice.toFixed(2)}
                    </Text>
                </View>
            </View>

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
    summaryContainer: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#F8F9FA', // Light grey background for summary
        borderRadius: 8,
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    itemName: {
        fontSize: 16,
        color: '#333',
    },
    itemPrice: {
        fontSize: 16,
        color: '#666',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderColor: '#EEE',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2ECC71', // Green color for the total price
    },
});

export default PaymentScreen;
