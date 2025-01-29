// RoboticsMaintenancePage.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MenuForServices from '../components/MenuForServices'; // Adjust path

const RoboticsMaintenancePage = () => {
    return (
        <View style={styles.container}>
            {/*<Header />*/}
            <MenuForServices /> {/* Render the Services menu */}
            <View style={styles.content}>
                <Text style={styles.title}>Robotics Maintenance</Text>
                <Text style={styles.bodyText}>
                    We offer comprehensive maintenance services for robotic systems, ensuring they operate at peak performance.
                    Our expert technicians provide regular check-ups and immediate repairs to minimize downtime.
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

export default RoboticsMaintenancePage;
