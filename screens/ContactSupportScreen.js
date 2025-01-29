import React from 'react';
import { View, Text, Button, StyleSheet, Linking } from 'react-native';

const ContactSupportScreen = () => {
    const emailSupport = () => {
        Linking.openURL('mailto:support@example.com');
    };

    const callSupport = () => {
        Linking.openURL('tel:1234567890');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Contact Support</Text>
            <Button title="Chat with Support" onPress={() => {/* Navigate to chat screen */}} />
            <Button title="Email Support" onPress={emailSupport} />
            <Button title="Call Support" onPress={callSupport} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 20,
        marginBottom: 20,
    },
});

export default ContactSupportScreen;
