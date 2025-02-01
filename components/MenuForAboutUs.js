
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';

const MenuForAboutUs = ({ navigation }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleMenu = () => setExpanded(prev => !prev);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleMenu} style={styles.menuItem}>
                <Text style={styles.menuText}>About Us</Text>
                <Entypo name="triangle-down" size={18} style={{ transform: expanded ? 'rotate(180deg)': 'rotate(0)' }} color="black" />
            </TouchableOpacity>
            {expanded && (
                <View style={styles.submenu}>
                    <TouchableOpacity onPress={() => navigation.navigate('aboutUs')}>
                        <Text style={styles.submenuItem}>About Us</Text>
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity onPress={() => navigation.navigate('careers')}>
                        <Text style={styles.submenuItem}>Careers</Text>
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity onPress={() => navigation.navigate('ourTeam')}>
                        <Text style={styles.submenuItem}>Our Team</Text>
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity onPress={() => navigation.navigate('ourClients')}>
                        <Text style={styles.submenuItem}>Our Clients</Text>
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
        fontSize: 18,
        padding: 15,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
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
    menuText: {
        color: '#333',
        fontWeight: 'bold',
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
    },
});

export default MenuForAboutUs;

/*
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MenuForAboutUs = ({ setCurrentPage }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleMenu = () => setExpanded(prev => !prev);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleMenu} style={styles.menuItem}>
                <Text>About Us {expanded ? '-' : '+'}</Text>
            </TouchableOpacity>
            {expanded && (
                <View style={styles.submenu}>
                    <TouchableOpacity onPress={() => setCurrentPage('aboutUs')}>
                        <Text style={styles.submenuItem}>About Us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setCurrentPage('careers')}>
                        <Text style={styles.submenuItem}>Careers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setCurrentPage('ourTeam')}>
                        <Text style={styles.submenuItem}>Our Team</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};


// MenuForAboutUs.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MenuForAboutUs = ({ setCurrentPage }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleMenu = () => setExpanded(prev => !prev);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleMenu}>
                <Text style={styles.menuItem}>About Us {expanded ? '-' : '+'}</Text>
            </TouchableOpacity>
            {expanded && (
                <View style={styles.submenu}>
                    <TouchableOpacity onPress={() => setCurrentPage('aboutUs')}>
                        <Text style={styles.submenuItem}>About Us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setCurrentPage('careers')}>
                        <Text style={styles.submenuItem}>Careers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setCurrentPage('ourTeam')}>
                        <Text style={styles.submenuItem}>Our Team</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setCurrentPage('ourClients')}>
                        <Text style={styles.submenuItem}>Our Clients</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        backgroundColor: '#f8f8f8',
    },
    menuItem: {
        fontSize: 16,
        paddingVertical: 10,
        color: '#000',
    },
    submenu: {
        paddingLeft: 15, // Indentation for submenu items
    },
    submenuItem: {
        fontSize: 14,
        paddingVertical: 5,
        color: '#555',
    },
});

export default MenuForAboutUs;
*/
/*import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MenuForAboutUs = ({ setCurrentPage }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleMenu = () => setExpanded(prev => !prev);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleMenu}>
                <Text style={styles.menuItem}>About Us {expanded ? '-' : '+'}</Text>
            </TouchableOpacity>
            {expanded && (
                <View style={styles.submenu}>
                    <TouchableOpacity onPress={() => setCurrentPage('aboutUs')}>
                        <Text style={styles.submenuItem}>About Us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setCurrentPage('careers')}>
                        <Text style={styles.submenuItem}>Careers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setCurrentPage('ourTeam')}>
                        <Text style={styles.submenuItem}>Our Team</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setCurrentPage('ourClients')}>
                        <Text style={styles.submenuItem}>Our Clients</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        backgroundColor: '#f8f8f8',
    },
    menuItem: {
        fontSize: 16,
        paddingVertical: 10,
        color: '#000',
    },
    submenu: {
        paddingLeft: 15, // Indentation for submenu items
    },
    submenuItem: {
        fontSize: 14,
        paddingVertical: 5,
        color: '#555',
    },
});

export default MenuForAboutUs;

 */
