// AndroidDevelopmentPage.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MenuForServices from '../components/MenuForServices'; // Adjust path

const AndroidDevelopmentPage = () => {
    return (
        <View style={styles.container}>
            {/*<Header />*/}
            <MenuForServices /> {/* Render the Services menu */}
            <View style={styles.content}>
                <Text style={styles.title}>Android Development</Text>
                <Text style={styles.bodyText}>
                    Our Android development service offers custom solutions to bring your app ideas to life.
                    We focus on creating robust and scalable applications tailored to your target audience.
                </Text>
            </View>
            {/*<Footer />*/}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        margin: 20,
    },
    bodyText: {
        fontSize: 16,
        textAlign: 'center',
        padding: 20,
    },
});

export default AndroidDevelopmentPage;
