
import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, StyleSheet, Linking, Platform, Button} from 'react-native'; // Added Platform import
import { WebView } from 'react-native-webview';

const PaymentWebViewScreen = ({ route, navigation }) => {
    const { checkoutUrl, txRef } = route.params;
    // const [showFallback, setShowFallback] = useState(false);
    // Universal handling


    useEffect(() => {
        const openPayment = async () => {
            if (Platform.OS === 'web') {
                const win = window.open(checkoutUrl, '_blank');

                if (!win) {
                    setShowFallback(true);
                    return;
                }

                const checkClosed = setInterval(() => {
                    try {
                        if (win.closed) {
                            clearInterval(checkClosed);
                            navigation.navigate('PaymentVerification', { txRef });
                        }
                    } catch (e) {
                        clearInterval(checkClosed);
                        navigation.navigate('PaymentVerification', { txRef });
                    }
                }, 1000);
            }/* else {
                await Linking.openURL(checkoutUrl);
            }*/
        };

        openPayment();
    }, [checkoutUrl, txRef]);

   /* if (showFallback) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Allow popups to continue</Text>
                <Button
                    title="Open Payment Manually"
                    onPress={() => window.open(checkoutUrl, '_blank')}
                />
            </View>
        );
    }
*/
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
            <Text style={styles.text}>Redirecting to payment gateway...</Text>
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
    message: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
    smallText: {
        fontSize: 14,
        color: '#666',
    },
    link: {
        color: '#4A90E2',
        textDecorationLine: 'underline',
    },
});

export default PaymentWebViewScreen;
