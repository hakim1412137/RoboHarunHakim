// src/components/Loader.js
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Loader = () => {
    return (
        <View style={styles.loader}>
            <ActivityIndicator size="large" color="#4CAF50" />
        </View>
    );
};

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Loader;

/*// src/components/Loader.js
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Loader = () => {
    return (
        <View style={styles.loader}>
            <ActivityIndicator size="large" color="#4CAF50" />
        </View>
    );
};

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Loader;*/
