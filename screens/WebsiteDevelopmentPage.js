// WebsiteDevelopmentPage.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MenuForServices from '../components/MenuForServices'; // Adjust path

const WebsiteDevelopmentPage = () => {
    return (
        <View style={styles.container}>
            {/*<Header />*/}
            <MenuForServices /> {/* Render the Services menu */}
            <View style={styles.content}>
                <Text style={styles.title}>Website Development</Text>
                <Text style={styles.bodyText}>
                    Our website development service focuses on building responsive and user-friendly websites
                    tailored to meet your needs. We ensure that your online presence is impactful.
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

export default WebsiteDevelopmentPage;
