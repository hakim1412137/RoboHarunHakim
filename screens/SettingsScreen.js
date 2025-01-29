import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const SettingsScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Button title="Notification Preferences" onPress={() => navigation.navigate('NotificationPreferences')} />
            <Button title="Manage Payment Methods" onPress={() => navigation.navigate('PaymentMethods')} />
            <Button title="Address Book" onPress={() => navigation.navigate('AddressBook')} />
            <Button title="Privacy Settings" onPress={() => navigation.navigate('PrivacySettings')} />
            <Button title="FAQ" onPress={() => navigation.navigate('FAQ')} />
            <Button title="Contact Support" onPress={() => navigation.navigate('ContactSupport')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
});

export default SettingsScreen;
