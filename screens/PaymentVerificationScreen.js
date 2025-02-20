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
                console.log(response);
                const paymentStatus = response.data.data.status.toString().toUpperCase();
                if (paymentStatus === 'SUCCESS') {
                    navigation.replace('PaymentSuccess', {
                        txRef: response.data.data.txRef,
                        amount: response.data.data.amount,
                        currency: response.data.data.currency
                    });
                } else {
                    navigation.replace('PaymentFailure', {
                        error: response.data.message || `Payment failed: ${response.data.status}`
                    });
                }

            } catch (error) {
                navigation.replace('PaymentFailure', {
                    error: error.message || 'Verification failed'
                });
            }
        };

        verifyPayment();
}, [txRef, navigation]);
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size="large" />
        </View>
    );
};

export default PaymentVerificationScreen;


/*     if (response.data.status === 'SUCCESS') {
               navigation.replace('PaymentSuccess', response.data);
           } else {
               navigation.replace('PaymentFailure', {
                   error: response.data.message || 'Payment failed'
               });
           }*/
