// screens/PaymentFailureScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const PaymentFailureScreen = ({ navigation, route }) => {
    const { error } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Payment Failed ❌</Text>
            <Text style={styles.error}>{error}</Text>
            <Button
                title="Try Again"
                onPress={() => navigation.goBack()}
                color="#D32F2F"
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
    error: {
        color: 'red',
        marginBottom: 20,
    },
});

export default PaymentFailureScreen;
/*
// screens/PaymentFailureScreen.js
import React from 'react';
import {View, Text, Button, StyleSheet, Linking} from 'react-native';

const PaymentFailureScreen = ({ navigation, route }) => {
    const { error, txRef } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.icon}>❌</Text>
            <Text style={styles.title}>Payment Failed</Text>
            <Text style={styles.error}>{error}</Text>
            <Text style={styles.detail}>Transaction ID: {txRef}</Text>

            <View style={styles.buttonContainer}>
                <Button
                    title="Try Again"
                    onPress={() => navigation.goBack()}
                    color="#D32F2F"
                />
                <Button
                    title="Contact Support"
                    onPress={() => Linking.openURL('mailto:support@example.com')}
                    color="#4A90E2"
                />
            </View>
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
        color: '#D32F2F',
    },
    error: {
        color: '#B71C1C',
        marginBottom: 20,
        textAlign: 'center',
    },
    icon: {
        fontSize: 60,
        marginBottom: 20,
    },
    buttonContainer: {
        gap: 15,
        width: '100%',
        marginTop: 30,
    },
});

export default PaymentFailureScreen;*/
// screens/PaymentFailureScreen.js
/*import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { View, Text, Button, StyleSheet } from 'react-native';

const PaymentFailureScreen = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Payment Failed ❌</Text>
            <Text style={styles.error}>{state?.error || 'Unknown error occurred'}</Text>
            <Button
                title="Try Again"
                onPress={() => navigate('/payment')}
                color="#D32F2F"
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
    error: {
        color: 'red',
        marginBottom: 20,
    }
});

export default PaymentFailureScreen;*/
/*
import React, { useState } from 'react';

import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';

const PaymentFailureScreen = ({ route }) => {
    const { error } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.errorTitle}>Payment Failed</Text>
            <Text style={styles.errorText}>{error}</Text>
        </View>
    );
};
export default PaymentFailureScreen;
*/
