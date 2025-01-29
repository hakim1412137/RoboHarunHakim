import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Using FontAwesome for icons

const Footer = () => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.infoSection}>
                    <Text style={styles.openHoursTitle}>Open Hours:</Text>
                    <Text>Mon – Sat: 8 AM - 6 PM</Text>
                    <Text>Sunday: CLOSED</Text>
                </View>

                <View style={styles.infoSection}>
                    <Text style={styles.officeTitle}>Office:</Text>
                    <Text style={styles.addressText}>
                        <Icon name="map-marker" size={14} color="#000" />
                        Bole, Brass, Addis Ababa, Ethiopia
                    </Text>
                    <Text style={styles.phoneText}>
                        <Icon name="phone" size={14} color="#000" />
                        (+251) 000 456 342
                    </Text>
                    <Text style={styles.phoneText}>
                        <Icon name="phone" size={14} color="#000" />
                        (+251) 000 456 343
                    </Text>
                </View>

                <View style={styles.infoSection}>
                    <Text style={styles.galleryTitle}>Gallery:</Text>
                    <Text style={styles.linkText} onPress={() => Linking.openURL('https://www.instagram.com/ethiorobotics/')}>
                        View Gallery
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#2E7D32', // Darker green for a more distinguished look
        borderTopWidth: 2,
        borderTopColor: '#FFD700', // Gold border at the top
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    infoSection: {
        flex: 1,
        marginHorizontal: 10,
    },
    openHoursTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18, // Increased font size
        marginBottom: 5, // Added space below title
    },
    officeTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18, // Increased font size
        marginBottom: 5, // Added space below title
    },
    galleryTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18, // Increased font size
        marginBottom: 5, // Added space below title
    },
    addressText: {
        color: 'white',
        marginTop: 5,
        fontSize: 16, // Increased font size
    },
    phoneText: {
        color: 'white',
        marginTop: 5,
        fontSize: 16, // Increased font size
    },
    linkText: {
        color: '#FFD700', // Gold color for the link
        textDecorationLine: 'underline',
        marginTop: 5,
        fontSize: 16, // Increased font size
    },
});

export default Footer;

/*import React from 'react';
import { View, Text } from 'react-native';

const Footer = () => {
    return (
        <View style={{ padding: 16, backgroundColor: '#4CAF50' }}>
            <Text style={{ color: '#fff' }}>© 2025 Robotic App</Text>
        </View>
    );
};

export default Footer;*/

/*

import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Using FontAwesome for icons

const Footer = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Robotics App</Text>
            <Text style={styles.tagline}>Empowering Innovation in Robotics</Text>

            <View style={styles.contactContainer}>
                <Text style={styles.sectionTitle}>Contact Information</Text>

                <Text style={styles.openHours}>Open Hours:</Text>
                <Text>• Monday to Friday: 9 AM - 6 PM</Text>
                <Text>• Saturday & Sunday: Closed</Text>

                <Text style={styles.office}>Office Location:</Text>
                <Text style={styles.location}>
                    <Icon name="map-marker" size={14} color="#000" />
                    Innovation Hub, 123 Robot Lane, Tech City, Country
                </Text>

                <Text style={styles.phone}>
                    <Icon name="phone" size={14} color="#000" />
                    (+123) 456 7890
                </Text>
                <Text style={styles.phone}>
                    <Icon name="phone" size={14} color="#000" />
                    (+123) 987 6543
                </Text>
            </View>

            <View style={styles.linksContainer}>
                <Text style={styles.sectionTitle}>Additional Links</Text>
                <Text>
                    • <Text style={styles.link} onPress={() => Linking.openURL('https://yourwebsite.com/about')}>About Us</Text>
                </Text>
                <Text>
                    • <Text style={styles.link} onPress={() => Linking.openURL('https://yourwebsite.com/help')}>Help Center</Text>
                </Text>
                <Text>
                    • <Text style={styles.link} onPress={() => Linking.openURL('https://yourwebsite.com/gallery')}>Gallery</Text>
                </Text>
            </View>

            <View style={styles.socialMediaContainer}>
                <Text style={styles.sectionTitle}>Follow Us</Text>
                <Text>
                    <Icon name="facebook" size={20} color="#3b5998" style={styles.socialIcon} />
                    <Icon name="twitter" size={20} color="#1DA1F2" style={styles.socialIcon} />
                    <Icon name="instagram" size={20} color="#c32aa3" style={styles.socialIcon} />
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f2f2f2',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        marginTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    tagline: {
        fontSize: 16,
        marginBottom: 20,
        fontStyle: 'italic',
    },
    contactContainer: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    openHours: {
        fontWeight: 'bold',
        marginTop: 10,
    },
    office: {
        fontWeight: 'bold',
        marginTop: 10,
    },
    location: {
        marginVertical: 5,
    },
    phone: {
        marginVertical: 5,
    },
    linksContainer: {
        marginTop: 10,
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    socialMediaContainer: {
        marginTop: 10,
    },
    socialIcon: {
        marginHorizontal: 10,
    },
});

export default Footer;
*/

/*
// src/components/Footer.js
import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Make sure to install this package for icons

const Footer = () => {
    return (
        <View style={styles.footer}>
            <Text style={styles.heading}>Open Hours:</Text>
            <Text>Mon – Sat: 8 am – 5 pm</Text>
            <Text>Sunday: CLOSED</Text>

            <Text style={styles.heading}>Contact Us:</Text>
            <View style={styles.contactInfo}>
                <FontAwesome name="map-marker" size={20} color="black" />
                <Text style={styles.address}>
                    Tekle Haymanot, Next To Aseb Hotel, Addis Ababa, Ethiopia
                </Text>
            </View>
            <View style={styles.contactInfo}>
                <FontAwesome name="phone" size={20} color="black" />
                <Text style={styles.phone}>(+251) 111 275 193</Text>
            </View>
            <View style={styles.contactInfo}>
                <FontAwesome name="phone" size={20} color="black" />
                <Text style={styles.phone}>(+251) 111 273 771</Text>
            </View>
            <View style={styles.contactInfo}>
                <FontAwesome name="phone" size={20} color="black" />
                <Text style={styles.phone}>(+251) 946 841 444</Text>
            </View>

            <Text style={styles.heading}>Follow Us:</Text>
            // src/components/Footer.js (continued)
            <View style={styles.socialLinks}>
                <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/PionnerRoboticsEthiopia')}>
                    <FontAwesome name="facebook" size={30} color="#3b5998" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com/PionnerRoboticsEthiopia')}>
                    <FontAwesome name="twitter" size={30} color="#1DA1F2" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/company/PionnerRoboticsEthiopia')}>
                    <FontAwesome name="linkedin" size={30} color="#0072b1" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        padding: 20,
        backgroundColor: '#eee',
        alignItems: 'flex-start',
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    contactInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    address: {
        marginLeft: 10,
        color: 'black',
    },
    phone: {
        marginLeft: 10,
        color: 'black',
    },
    socialLinks: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
});

export default Footer;
*/
