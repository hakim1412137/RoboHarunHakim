import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SupportScreen from "../screens/SupportScreen";
import Entypo from "@expo/vector-icons/Entypo";
const MenuForServices = ({ navigation }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleMenu = () => setExpanded(prev => !prev);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleMenu} style={styles.menuItem}>
                <Text style={styles.menuText}>Services </Text>
                <Entypo name="triangle-down" size={18} color="black" style={{ transform: expanded ? 'rotate(180deg)': 'rotate(0)' }} />
            </TouchableOpacity>
            {expanded && (
                <View style={styles.submenu}>
                    <TouchableOpacity onPress={() => navigation.navigate('servicesScreen')}>
                        <Text style={styles.submenuItem}>Services</Text>
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity onPress={() => navigation.navigate('supportScreen')}>
                        <Text style={styles.submenuItem}>Supports</Text>
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity onPress={() => navigation.navigate('roboticsTraining')}>
                        <Text style={styles.submenuItem}>Robotics Training</Text>
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity onPress={() => navigation.navigate('websiteDevelopment')}>
                        <Text style={styles.submenuItem}>Website Development</Text>
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity onPress={() => navigation.navigate('androidDevelopment')}>
                        <Text style={styles.submenuItem}>Android Development</Text>
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity onPress={() => navigation.navigate('roboticsTraining')}>
                        <Text style={styles.submenuItem}>Robotics Training</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        position: 'relative', // Make sure it’s positioned relative for absolute children

    },
    menuItem: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        fontSize: 18,
        padding: 15,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        // elevation: 2, // Shadow effect for each menu item
    },
    menuText: {
        color: '#333',
        fontWeight: 'bold',
    },
    submenu: {
        position: 'absolute', // Crucial for making the submenu pop out
        top: '100%',         // Places it directly below the menu item
        left: 0,             // Align to the left
        padding: 10,
        marginTop: 5,
        zIndex: 1000,       // Ensures it appears above other components
        gap: '0.2rem',
        backgroundColor: '#ffffff', // Background color to separate from underlying components
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3, // Elevation for Android
    },

    submenuItem: {
        fontSize: 16,
        color: '#555',
        // backgroundColor: '#eaeaea',
        borderRadius: 5,
        padding: 10,
        marginVertical: 2,

    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 5,
    }
});

export default MenuForServices;

/*import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MenuForServices = ({ setCurrentPage }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleMenu = () => setExpanded(prev => !prev);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleMenu} style={styles.menuItem}>
                <Text style={styles.menuText}>Services {expanded ? '-' : '+'}</Text>
            </TouchableOpacity>
            {expanded && (
                <View style={styles.submenu}>
                    {['ServicesScreen', 'SupportScreen', 'RoboticsTrainingPage', 'WebsiteDevelopmentPage', 'AndroidDevelopmentPage'].map(service => (
                        <TouchableOpacity
                            key={service}
                            onPress={() => setCurrentPage(service.replace(' ', '') + 'Page')}
                            style={styles.submenuItemContainer}
                        >
                            <Text style={styles.submenuItem}>{service}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        position: 'relative', // Set the container to relative for absolute positioning
    },
    menuItem: {
        fontSize: 18,
        padding: 15,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
    },
    menuText: {
        color: '#333',
        fontWeight: 'bold',
    },
    submenu: {
        position: 'absolute', // Position it absolutely
        top: '100%', // Align it directly below the menu item
        left: 0,
        padding: 10,
        backgroundColor: '#ffffff', // Background color for the submenu
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 3,
        marginHorizontal: 10,
        zIndex: 10, // Ensure it appears above other items
    },
    submenuItemContainer: {
        paddingVertical: 8,
    },
    submenuItem: {
        fontSize: 16,
        color: '#555',
        backgroundColor: '#eaeaea',
        borderRadius: 5,
        padding: 10,
        marginVertical: 2,
    },
});

export default MenuForServices;*/


/*

 */

/*// MenuForServices.js
*/
/*
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MenuForServices = ({ setCurrentPage }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleMenu = () => setExpanded(prev => !prev);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleMenu}>
                <Text style={styles.menuItem}>Services {expanded ? '-' : '+'}</Text>
            </TouchableOpacity>
            {expanded && (
                <View style={styles.submenu}>
                    <TouchableOpacity onPress={() => setCurrentPage('websiteDevelopment')}>
                        <Text style={styles.submenuItem}>Website Development</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setCurrentPage('androidDevelopment')}>
                        <Text style={styles.submenuItem}>Android Development</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setCurrentPage('roboticsTraining')}>
                        <Text style={styles.submenuItem}>Robotics Training</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setCurrentPage('roboticsMaintenance')}>
                        <Text style={styles.submenuItem}>Robotics Maintenance</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

 */
