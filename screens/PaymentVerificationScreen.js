// screens/PaymentVerificationScreen.js
import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { verifyPayment1} from '../utils/api';

const PaymentVerificationScreen = ({ navigation, route }) => {
    const { txRef } = route.params;

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                const response = await verifyPayment1(txRef);
                if (response.data.status === 'SUCCESS') {
                    navigation.replace('PaymentSuccess', {
                        amount: response.data.amount,
                        currency: response.data.currency,
                        txRef: response.data.txRef
                    });
                } else {
                    navigation.replace('PaymentFailure', {
                        error: response.data.message || `Payment failed: ${response.data.status}`
                    });
                }
             /*   if (response.data.status === 'SUCCESS') {
                    navigation.replace('PaymentSuccess', response.data);
                } else {
                    navigation.replace('PaymentFailure', {
                        error: response.data.message || 'Payment failed'
                    });
                }*/
            } catch (error) {
                navigation.replace('PaymentFailure', {
                    error: error.message || 'Verification failed'
                });
            }
        };

        verifyPayment();
    // }, [txRef]);
}, [txRef, navigation]);
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size="large" />
        </View>
    );
};

export default PaymentVerificationScreen;
