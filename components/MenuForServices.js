import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SupportScreen from "../screens/SupportScreen";
import Entypo from "@expo/vector-icons/Entypo";
const MenuForServices = ({ navigation }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleMenu = () => setExpanded(prev => !prev);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleMenu} style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
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
                  {/*  <View style={styles.divider} />
                    <TouchableOpacity onPress={() => navigation.navigate('roboticsTraining')}>
                        <Text style={styles.submenuItem}>Robotics Training</Text>
                    </TouchableOpacity>*/}
                    <View style={styles.divider} />
                    <TouchableOpacity onPress={() => navigation.navigate('websiteDevelopment')}>
                        <Text style={styles.submenuItem}>Website Development</Text>
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity onPress={() => navigation.navigate('androidDevelopment')}>
                        <Text style={styles.submenuItem}>Android Development</Text>
                    </TouchableOpacity>
                 {/*   <View style={styles.divider} />
                    <TouchableOpacity onPress={() => navigation.navigate('roboticsDesign')}>
                        <Text style={styles.submenuItem}>Robotics Training</Text>
                    </TouchableOpacity>*/}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative', // Make sure it’s positioned relative for absolute children

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
