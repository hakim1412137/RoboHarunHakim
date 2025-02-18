import React, { useEffect } from 'react';
import {WebView, Platform, View, Text, Linking, ActivityIndicator} from 'react-native';

const PaymentWebViewScreen = ({ route, navigation }) => {
    const { checkoutUrl, txRef } = route.params;

    const handleNavigation = (navState) => {
        if (navState.url.includes('http://localhost:8081/payment-result')) {
            const url = new URL(navState.url);
            const txRef = url.searchParams.get('tx_ref');
            navigation.navigate('PaymentVerification', { txRef });
        }
    };

    if (Platform.OS === 'web') {
        useEffect(() => {
            const windowFeatures = 'width=600,height=800';
            const paymentWindow = window.open(checkoutUrl, '_blank', windowFeatures);

            const checkWindowClosed = setInterval(() => {
                if (paymentWindow.closed) {
                    navigation.navigate('PaymentVerification', { txRef });
                    clearInterval(checkWindowClosed);
                }
            }, 1000);

            return () => clearInterval(checkWindowClosed);
        }, []);

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Payment processing in new window...</Text>
            </View>
        );
    }

    return (
        <WebView
            source={{ uri: checkoutUrl }}
            onNavigationStateChange={handleNavigation}
            startInLoadingState={true}
            renderLoading={() => (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size="large" />
                </View>
            )}
        />
    );
};

export default PaymentWebViewScreen;
/*import React, { useEffect } from 'react';
import { Platform, View, Text, Linking } from 'react-native';
import { WebView } from 'react-native-webview';

const PaymentWebViewScreen = ({ route, navigation }) => {
    const { checkoutUrl, txRef } = route.params;

    // Web platform handling
    if (Platform.OS === 'web') {
        useEffect(() => {
            const paymentWindow = window.open(checkoutUrl, '_blank');

            const handleMessage = (event) => {
                if (event.data?.txRef) {
                    navigation.navigate('PaymentVerification', { txRef: event.data.txRef });
                }
            };

            const checkWindowClosed = setInterval(() => {
                if (paymentWindow.closed) {
                    navigation.navigate('PaymentVerification', { txRef });
                    clearInterval(checkWindowClosed);
                }
            }, 1000);

            window.addEventListener('message', handleMessage);

            return () => {
                window.removeEventListener('message', handleMessage);
                clearInterval(checkWindowClosed);
            };
        }, []);

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Payment processing in progress...</Text>
                <Text>Please complete the payment in the new window</Text>
            </View>
        );
    }

    // Mobile handling
    return (
        <WebView
            source={{ uri: checkoutUrl }}
            onNavigationStateChange={(navState) => {
                if (navState.url.includes('roboharunhakim://payment-result')) {
                    const url = new URL(navState.url);
                    const txRef = url.searchParams.get('tx_ref');
                    navigation.navigate('PaymentVerification', { txRef });
                }
            }}
        />
    );
};

export default PaymentWebViewScreen;*/
/*import React from 'react';
import { Platform, Linking, View, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';

const PaymentWebViewScreen = ({ route, navigation }) => {
    const { checkoutUrl, txRef } = route.params;

    // Web platform handling
    if (Platform.OS === 'web') {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, marginBottom: 20 }}>
                    Payment gateway not opening automatically?
                </Text>

                <TouchableOpacity
                    style={{
                        backgroundColor: '#4A90E2',
                        padding: 15,
                        borderRadius: 8
                    }}
                    onPress={() => {
                        // Direct URL open for web
                        window.location.href = checkoutUrl;
                    }}
                >
                    <Text style={{ color: 'white' }}>Click to Open Payment Page</Text>
                </TouchableOpacity>

                <Text style={{ marginTop: 20, color: '#666' }}>
                    If the payment page doesn't open automatically, click the button above
                </Text>
            </View>
        );
    }

    // Mobile handling
    return (
        <WebView
            source={{ uri: checkoutUrl }}
            onNavigationStateChange={(navState) => {
                if (navState.url.includes('roboharunhakim://payment-result')) {
                    const url = new URL(navState.url);
                    const txRef = url.searchParams.get('tx_ref');
                    navigation.navigate('PaymentVerification', { txRef });
                }
            }}
            onError={(error) => {
                console.error('WebView Error:', error);
                navigation.goBack();
                alert('Failed to load payment page. Please try again.');
            }}
        />
    );
};

export default PaymentWebViewScreen;*/

/*import React, { useEffect } from 'react';
import { Platform, View, Text, Linking } from 'react-native';
import { WebView } from 'react-native-webview';

const PaymentWebViewScreen = ({ route, navigation }) => {
    const { checkoutUrl } = route.params;

    // Web platform handling
    if (Platform.OS === 'web') {
        useEffect(() => {
            const newWindow = window.open(checkoutUrl, '_blank');

            const handleMessage = (event) => {
                if (event.data.txRef) {
                    navigation.navigate('PaymentVerification', { txRef: event.data.txRef });
                }
            };

            window.addEventListener('message', handleMessage);

            return () => {
                window.removeEventListener('message', handleMessage);
            };
        }, []);

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Payment window opened in new tab. Please complete the payment there.</Text>
            </View>
        );
    }

    // Mobile handling
    return (
        <WebView
            source={{ uri: checkoutUrl }}
            onNavigationStateChange={(navState) => {
                if (navState.url.startsWith('http://localhost:8081/payment-result')) {
                    const url = new URL(navState.url);
                    const txRef = url.searchParams.get('tx_ref');
                    navigation.navigate('PaymentVerification', { txRef });
                }
            }}
        />
    );
};

export default PaymentWebViewScreen;*/
/*
// screens/PaymentWebViewScreen.js
import {Platform, Linking, View} from 'react-native';
import { WebView } from 'react-native-webview';

const PaymentWebViewScreen = ({ route, navigation }) => {
    const {checkoutUrl} = route.params;
    /!*
        // Handle web platform
        if (Platform.OS === 'web') {
            window.open(checkoutUrl, '_blank'); // Open in new tab
            const txRef = new URL(checkoutUrl).searchParams.get('tx_ref');
            return (
                <View style={{flex: 1, justifyContent: 'center'}}>
                    navigation.navigate('PaymentVerification', {txRef});
                </View>
            );
        }
    }*!/


    // Mobile handling
    return (
        <WebView
            source={{uri: checkoutUrl}}
            onNavigationStateChange={(navState) => {
                if (navState.url.includes('roboharunhakim://payment-result')) {
                    const txRef = new URL(navState.url).searchParams.get('tx_ref');
                    navigation.navigate('PaymentVerification', {txRef});
                }
            }}
        />
    );
}
export default PaymentWebViewScreen;*/
/*// screens/PaymentWebViewScreen.js
import React from 'react';
import { WebView } from 'react-native-webview';
// PaymentWebViewScreen.js: Displays the Chapa payment page in a WebView. Handles navigation to the verification screen when the payment result returns through a deep link.
const PaymentWebViewScreen = ({ route, navigation }) => {
    const { checkoutUrl } = route.params;

const handleNavigationStateChange = (navState) => {
    // if (navState.url.startsWith('roboharunhakim://payment-result')) {
    if (navState.url.startsWith('http://localhost:8081/api/payments/return')) {

        const txRef = new URL(navState.url).searchParams.get('tx_ref');
        navigation.navigate('PaymentVerification', { txRef });
        return false; // Prevent WebView from navigating to the URL
    }
    return true; // Allow the WebView to navigate
};

return (
    <WebView
        source={{ uri: checkoutUrl }}
        onNavigationStateChange={handleNavigationStateChange}
        startInLoadingState={true}
    />
);
};

export default PaymentWebViewScreen;*/

/*// screens/PaymentWebViewScreen.js
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';

const PaymentWebViewScreen = ({ route }) => {
    const { checkoutUrl } = route.params;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <WebView
                source={{ uri: checkoutUrl }}
                onNavigationStateChange={(navState) => {
                    if (navState.url.includes('roboharunhakim://payment-result')) {
                        const txRef = new URL(navState.url).searchParams.get('tx_ref');
                        navigation.navigate('PaymentVerification', { txRef });
                    }
                }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
            />
        </SafeAreaView>
    );
};
export default PaymentWebViewScreen;*/

/*
// screens/PaymentWebViewScreen.js
import React from 'react';
import { WebView } from 'react-native-webview';

const PaymentWebViewScreen = ({ route, navigation }) => {
    const { checkoutUrl } = route.params;

    const handleNavigation = (navState) => {
        if (navState.url.startsWith('roboharunhakim://payment-result')) {
            const txRef = new URL(navState.url).searchParams.get('tx_ref');
            navigation.navigate('PaymentVerification', { txRef });
            return false; // Prevent WebView from loading the URL
        }
        return true;
    };

    return (
        <WebView
            source={{ uri: checkoutUrl }}
            onNavigationStateChange={handleNavigation}
            startInLoadingState={true}
        />
    );
};

export default PaymentWebViewScreen;*/
/*

// screens/PaymentWebViewScreen.js
import React, { useEffect } from 'react';
import {View, StyleSheet, Linking, ActivityIndicator} from 'react-native';
import { WebView } from 'react-native-webview';

const PaymentWebViewScreen = ({ navigation, route }) => {
    const { checkoutUrl, txRef } = route.params;

    const handleNavigationStateChange = (navState) => {
        if (navState.url.includes('RoboHarunHakim://payment-result')) {
            navigation.replace('PaymentVerification', { txRef });
        }
    };

    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: checkoutUrl }}
                onNavigationStateChange={handleNavigationStateChange}
                startInLoadingState={true}
                renderLoading={() => (
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color="#4A90E2" />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default PaymentWebViewScreen;
*/

/*

import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';

const PaymentWebViewScreen = ({ route, navigation }) => {
    const { checkoutUrl, txRef } = route.params;
    const [verificationLoading, setVerificationLoading] = useState(false);

    const verifyPayment = async () => {
        try {
            setVerificationLoading(true);
            const response = await axios.get(`http://localhost:8083/api/payments/verify/${txRef}`);

            if (response.data.status === 'SUCCESS') {
                navigation.navigate('PaymentSuccess', { transaction: response.data });
            } else {
                navigation.navigate('PaymentFailure', { error: 'Payment verification failed' });
            }
        } catch (err) {
            navigation.navigate('PaymentFailure', { error: err.response?.data?.message || 'Verification failed' });
        } finally {
            setVerificationLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: checkoutUrl }}
                onNavigationStateChange={(navState) => {
                    // Handle payment completion redirect
                    if (navState.url.includes('payment-complete')) {
                        verifyPayment();
                    }
                }}
            />

            {verificationLoading && (
                <View style={styles.overlay}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text>Verifying payment...</Text>
                </View>
            )}
        </View>
    );
};
export default PaymentWebViewScreen;

 */
