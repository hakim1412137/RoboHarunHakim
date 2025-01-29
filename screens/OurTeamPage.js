// OurTeamPage.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MenuForAboutUs from '../components/MenuForAboutUs'; // Adjust path

const OurTeamPage = () => {
    return (
        <View style={styles.container}>
            {/*<Header />*/}
            <MenuForAboutUs /> {/* Render the About Us menu */}
            {/*<MenuForAboutUs setCurrentPage={setCurrentPage} /> /!* Pass down the function *!/*/}
            <View style={styles.content}>
                <Text style={styles.title}>Our Team</Text>
                <Text style={styles.bodyText}>
                    Our team consists of highly qualified professionals dedicated to delivering the best in robotics education.
                    Meet the passionate individuals who are shaping the future of technology:
                </Text>
                <Text style={styles.bodyText}>
                    - Dr. Jane Smith, Chief Technology Officer
                    - John Doe, Lead Robotics Engineer
                    - Emily Johnson, Curriculum Specialist
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

export default OurTeamPage;
