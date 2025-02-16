/*import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function PaymentResult() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const txRef = searchParams.get('tx_ref');

    useEffect(() => {
        if (txRef) {
            // Close the payment window and notify parent
            if (window.opener) {
                window.opener.postMessage({ txRef }, '*');
                window.close();
            } else {
                // Direct navigation if in main window
                navigate(`/payment-verification/${txRef}`);
            }
        }
    }, [txRef]);

    return (
        <div style={{ padding: 20, textAlign: 'center' }}>
            <h1>Payment Processing Complete</h1>
            <p>Transaction Reference: {txRef}</p>
            <p>You may close this window.</p>
        </div>
    );
}*/
import React, { useEffect } from 'react';
import {View, Text, ActivityIndicator, Platform} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const PaymentResultScreen = ({ route, navigation }) => {
    // const navigation = useNavigation();
    // const route = useRoute();
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

/*    useEffect(() => {
        if (txRef) {
            // Send message back to parent window if in web
            if (Platform.OS === 'web' && window.opener) {
                window.opener.postMessage({ txRef }, '*');
                setTimeout(() => window.close(), 1000);
            }

            // Navigate to verification after short delay
            setTimeout(() => {
                navigation.navigate('PaymentVerification', { txRef });
            }, 1500);
        }
    }, [txRef]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
            <Text>Processing payment result...</Text>
        </View>
    );
};*/

/*import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PaymentResultScreen = () => {
    const { txRef } = useParams();

    useEffect(() => {
        if (txRef && window.opener) {
            window.opener.postMessage({ txRef }, '*');
            setTimeout(() => window.close(), 1000);
        }
    }, [txRef]);

    return (
        <div style={{ padding: 20, textAlign: 'center' }}>
            <h1>Payment Completed! ✅</h1>
            <p>Transaction ID: {txRef}</p>
            <p>This window will close automatically...</p>
        </div>
    );
};

export default PaymentResultScreen;*/

/*// In your web project
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PaymentWebViewScreen from "./PaymentWebViewScreen";
const PaymentResult = ({ navigation }) => {
    const { txRef } = useParams();

    useEffect(() => {
        if (txRef) {
            // Close the payment tab after 2 seconds
            setTimeout(() => window.close(), 2000);
        }
    }, [txRef]);

    return (
        <div>
            <h1>Payment Completed!</h1>
            <p>Transaction ID: {txRef}</p>
            <p>This window will close automatically.</p>
        </div>
    );
}
export default PaymentResult;*/
