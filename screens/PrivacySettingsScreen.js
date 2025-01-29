import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const PrivacySettingsScreen = () => {
    const [locationAccess, setLocationAccess] = useState(false);
    const [dataSharing, setDataSharing] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.preference}>
                <Text>Location Access</Text>
                <Switch value={locationAccess} onValueChange={setLocationAccess} />
            </View>
            <View style={styles.preference}>
                <Text>Data Sharing</Text>
                <Switch value={dataSharing} onValueChange={setDataSharing} />
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

export default PrivacySettingsScreen;
