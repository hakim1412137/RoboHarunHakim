import React, { useEffect } from 'react';
import {View, Text, ActivityIndicator, Platform} from 'react-native';

const PaymentResultScreen = ({ route, navigation }) => {

    const txRef = route.params?.txRef;
    useEffect(() => {
        if (txRef) {
            // Web handling
            if (Platform.OS === 'web') {
                // Send message to parent window
                if (window.opener) {
                    window.opener.postMessage({ txRef }, '*');
                    window.close();
                }
                // Mobile/desktop fallback
                else {
                    setTimeout(() => {
                        navigation.navigate('PaymentVerification', { txRef });
                    }, 2000);
                }
            }
            // Mobile handling
            else {
                navigation.navigate('PaymentVerification', { txRef });
            }
        }
    }, [txRef]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
            <Text>Processing payment result...</Text>
        </View>
    );
};
export default PaymentResultScreen;
