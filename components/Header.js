import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Dimensions } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const Header = ({ navigation }) => {
    const { width } = Dimensions.get('window');
    const isSmallScreen = width < 768; // Adjust breakpoint as needed

    const handleEmailPress = () => {
        Linking.openURL('mailto:contact@roboticsapp.com');
    };

    const handlePhonePress = () => {
        Linking.openURL('tel:+251111275193');
    };

    const handleMapPress = () => {
        Linking.openURL('https://maps.google.com/?q=Bole+Brass,+Next+To+Bole+Hotel,+Addis+Ababa,+Ethiopia');
    };

    return (
        <View style={styles.header}>
            {/* Top Contact Bar */}
            <View style={styles.topBar}>
                <View style={styles.contactContainer}>
                    <TouchableOpacity
                        style={styles.contactItem}
                        onPress={handleEmailPress}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="mail" size={16} color="#FFD700" />
                        <Text style={styles.contactText}>contact@roboticsapp.com</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.contactItem}
                        onPress={handlePhonePress}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="call" size={16} color="#FFD700" />
                        <Text style={styles.contactText}>(+251) 000 345 245</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.contactItem}
                        onPress={handleMapPress}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="location" size={16} color="#FFD700" />
                        <Text style={styles.contactText} numberOfLines={1}>
                            Bole, Brass Next To Hotel, Addis Ababa
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.socialContainer}>
                    <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/PionnerRoboticsEthiopia')}>
                        <FontAwesome name="facebook" size={16} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com/PionnerRoboticsEthiopia')}>
                        <FontAwesome name="twitter" size={16} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/company/PionnerRoboticsEthiopia')}>
                        <FontAwesome name="linkedin" size={16} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Main Header */}
        {/*    <View style={styles.mainHeader}>
                <Text style={styles.logo}>Robotics Center</Text>
                <View style={styles.navContainer}>
                    <TouchableOpacity style={styles.navItem}>
                        <Text style={styles.navText}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem}>
                        <Text style={styles.navText}>About</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem}>
                        <Text style={styles.navText}>Programs</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem}>
                        <Text style={styles.navText}>Contact</Text>
                    </TouchableOpacity>
                </View>
            </View>*/}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        backgroundColor: '#4CAF50',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#388E3C', // Darker shade for contrast
    },
    contactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        flexShrink: 1,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    contactText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '500',
    },
    socialContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    mainHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 24,
    },
    logo: {
        fontSize: 24,
        fontWeight: '700',
        color: 'white',
        textTransform: 'uppercase',
    },
    navContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24,
    },
    navItem: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    navText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default Header;
