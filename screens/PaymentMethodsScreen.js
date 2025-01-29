import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet } from 'react-native';
import Keychain from 'react-native-keychain';

const PaymentMethodsScreen = () => {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [newPaymentMethod, setNewPaymentMethod] = useState('');

    useEffect(() => {
        const loadPaymentMethods = async () => {
            const credentials = await Keychain.getGenericPassword();
            if (credentials) {
                setPaymentMethods(JSON.parse(credentials.password));
            }
        };

        loadPaymentMethods();
    }, []);

    const addPaymentMethod = async () => {
        const updatedMethods = [...paymentMethods, newPaymentMethod];
        await Keychain.setGenericPassword('paymentMethods', JSON.stringify(updatedMethods));
        setPaymentMethods(updatedMethods);
        setNewPaymentMethod('');
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={paymentMethods}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item}</Text>
                    </View>
                )}
            />
            <TextInput
                value={newPaymentMethod}
                onChangeText={setNewPaymentMethod}
                placeholder="Add new payment method"
                style={styles.input}
            />
            <Button title="Add" onPress={addPaymentMethod} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
});

export default PaymentMethodsScreen;
