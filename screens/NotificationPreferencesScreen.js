import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const NotificationPreferencesScreen = () => {
    const [orderUpdates, setOrderUpdates] = useState(true);
    const [promotions, setPromotions] = useState(true);

    return (
        <View style={styles.container}>
            <View style={styles.preference}>
                <Text>Order Updates</Text>
                <Switch value={orderUpdates} onValueChange={setOrderUpdates} />
            </View>
            <View style={styles.preference}>
                <Text>Promotions and Offers</Text>
                <Switch value={promotions} onValueChange={setPromotions} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
});

export default NotificationPreferencesScreen;
