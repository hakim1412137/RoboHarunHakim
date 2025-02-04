// RoboticsTrainingPage.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MenuForServices from '../components/MenuForServices'; // Adjust path
import Menu from '../components/Menu';

const RoboticsTrainingPage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Header></Header>
            <Menu navigation={navigation}></Menu>
            {/*<Header />*/}
            <View style={styles.content}>
                <Text style={styles.title}>Robotics Training</Text>
                <Text style={styles.bodyText}>
                    Our robotics training program is designed for individuals and groups eager to learn about robotics.
                    We provide hands-on training sessions that empower participants with the knowledge needed to build and program robots.
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
    content: {
        padding: 20,
        paddingHorizontal: 200
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

export default RoboticsTrainingPage;
