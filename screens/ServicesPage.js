// ServicesPage.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MenuForServices from '../components/MenuForServices'; // Adjust the import path
import Header from '../components/Header';
import Footer from '../components/Footer';

const ServicesPage = ({ setCurrentPage }) => {
    return (
        <View style={styles.container}>
            <Header />
            <MenuForServices setCurrentPage={setCurrentPage} /> {/* Render the Services menu */}
            <View style={styles.content}>
                <Text style={styles.title}>Services Content Goes Here!</Text>
            </View>
            <Footer />
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
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ServicesPage;
