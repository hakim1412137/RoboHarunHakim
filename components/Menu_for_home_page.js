import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MenuForAboutUs from "./MenuForAboutUs";
import MenuForServices from "./MenuForServices";
import MenuButtons from './MenuButtons';
import MenuButtonWithPopup from './MenuButtonWithPopup';

let MenuRoutes = [{ text: 'Products', route: 'products' }, 
                  { text: 'Courses', route: 'courses' }, 
                  { text: 'Vex Robotics', route: 'vexRobotics' },
                  { text: 'Competitions', route: 'competitions' }, 
                  { text: 'Events', route: 'events' },
                  { text: 'Posts', route: 'posts' },
                  { text: 'Contact Us', route: 'contactUs' },
                ];

let popupMenus = [
                   { text: 'About Us', subMenu: [
                                        { text: "About Us", route: "aboutUs" },
                                        { text: "Careers", route: "careers" },
                                        { text: "Our Team", route: "ourTeam" },
                                        { text: "Our Clients", route: "ourClients" },
                                        { text: "Join Us", route: "joinUs" },
                                    ]
                   },
                   { text: 'Services', subMenu: [
                                        { text: "Services", route: "services1" },
                                        { text: "Supports", route: "supportScreen" },
                                        { text: "Robotics Training", route: "roboticsTraining" },
                                        { text: "Website Development", route: "websiteDevelopment" },
                                        { text: "Android Development", route: "androidDevelopment" },
                                    ]
                   },
                  ];

// Main Menu Component
const Menu = ({ navigation }) => {
    let [expanded, setExpanded] = useState(-1);

    return (
        <View style={styles.mainContainer}>
            <View style={styles.menuContainer}>
                {popupMenus.map((popupMenu, index) => (
                    <MenuButtonWithPopup key={index} navigation={navigation} subMenu={popupMenu.subMenu} textColor={"white"} expanded={expanded} setExpanded={setExpanded} index={index}>{popupMenu.text}</MenuButtonWithPopup>
                ))}
                {MenuRoutes.map((menu, index) => (
                    <MenuButtons route={menu.route} navigation={navigation} key={index} textColor={"white"}>{menu.text}</MenuButtons>
                ))}
            </View>
            <View style={styles.authContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('login')}>
                    <Text style={{ color: '#4CAF50', fontWeight: 'bold', fontSize: 14 }}>Log in</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: '#4CAF50', padding: 5, paddingHorizontal: 15, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onPress={() => navigation.navigate("signup")}>
                    <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'black' }}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
};

// Styles
const styles = StyleSheet.create({
    mainContainer: {
      display: 'flex',
      flexDirection: 'row',
      paddingVertical: 8,
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',



    },
    menuContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingInline: 20,
        gap: 20,
        // backgroundColor: 'white',
    },
    menuItem: {
        fontSize: 22,
        paddingHorizontal: 15,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuItemText: {
        color: '#4CAF50', // Changed text color to white
        fontWeight: 'bold', // Made the text bold for better emphasis
        fontSize: 15, // Increased font size for added emphasis
    },
    activeMenuItem: {
        backgroundColor: '#5A995C', // Slightly lighter shade for active menu items

    },
    submenu: {
        position: 'absolute', // Important for submenu visibility
        top: '100%', // Places it directly below the menu item
        left: 0, // Align to the left
        paddingLeft: 20,
        marginTop: 5,
        zIndex: 1000, // Ensure it appears above other components
        backgroundColor: '#ffffff', // Background color to separate from underlying content
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3, // Elevation for Android
        width: 'auto', // Allows for flexible width
    },
    submenuItem: {
        fontSize: 16,
        color: '#555',
        backgroundColor: '#eaeaea',
        borderRadius: 5,
        padding: 10,
        marginVertical: 2,
    },
    authContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 32,
        marginRight: 30
    }
});

export default Menu;
