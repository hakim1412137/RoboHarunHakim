// OurClientsPage.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MenuForAboutUs from '../components/MenuForAboutUs'; // Adjust path
import Menu from '../components/Menu';

const OurClientsPage = () => {
    return (
        <View style={styles.container}>
            <Header></Header>
            <Menu navigation={navigation}></Menu>

            <View style={styles.content}>
                <Text style={styles.title}>Our Clients</Text>
                <Text style={styles.bodyText}>
                    We proudly serve a wide range of clients, including educational institutions, NGOs, and private enterprises.
                    Our solutions cater to a variety of needs in the robotics education sector.
                </Text>
                <Text style={styles.bodyText}>
                    - Tech University
                    - Global Robotics Initiative
                    - Local Schools and Clubs
                </Text>
            </View>
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
        padding: 10,
        paddingHorizontal: 200
    },
    bodyText: {
        fontSize: 16,
        textAlign: 'center',
        padding: 20,
    },
});

export default OurClientsPage;
