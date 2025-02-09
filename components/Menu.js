import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MenuForAboutUs from "./MenuForAboutUs";
import MenuForServices from "./MenuForServices";
import MenuButtons from '../screens/MenuButtons';
import MenuButtonWithPopup from './MenuButtonWithPopup';

let MenuRoutes = [{ text: 'Products', route: 'products' }, 
                  { text: 'Courses', route: 'courses' }, 
                  { text: 'Vex Robotics', route: 'vexRobotics' },
                  { text: 'Competitions', route: 'competitions' }, 
                  { text: 'Events', route: 'events' },
                  { text: 'Posts', route: 'postList' },
                  { text: 'Contact Us', route: 'contactUs' }
                ];

let popupMenus = [
                   { text: 'About Us', subMenu: [
                                        { text: "About Us", route: "aboutUs" },
                                        { text: "Careers", route: "careers" },
                                        { text: "Our Team", route: "ourTeam" },
                                        { text: "Our Clients", route: "ourClients" },
                                    ]
                   },
                   { text: 'Services', subMenu: [
                                        { text: "Supports", route: "supportScreen" },
                                        { text: "Robotics Training", route: "roboticsTraining" },
                                        { text: "Website Development", route: "websiteDevelopment" },
                                        { text: "Android Development", route: "androidDevelopment" },
                                        { text: "Robotics Training", route: "roboticsTraining" },
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
                    <MenuButtonWithPopup key={index} navigation={navigation} subMenu={popupMenu.subMenu} expanded={expanded} setExpanded={setExpanded} index={index}>{popupMenu.text}</MenuButtonWithPopup>
                ))}
                {MenuRoutes.map((menu, index) => (
                    <MenuButtons route={menu.route} navigation={navigation} key={index}>{menu.text}</MenuButtons>
                ))}
            </View>
            <View style={styles.authContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('login')}>
                    <Text style={{ color: '#4CAF50', fontWeight: 'bold', fontSize: 14 }}>Log in</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: '#4CAF50', padding: 7, paddingHorizontal: 20, borderRadius: 20 }} onPress={() => navigation.navigate("signup")}>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#FFFFFF' }}>Sign Up</Text>
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
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      backgroundColor: '#fffce3',
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5,
      zIndex: 1
    },
    menuContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingInline: 20,
        gap: 20
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
/*
// Component for "About Us" Menu
const MenuForAboutUs = ({ setCurrentPage }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleMenu = () => setExpanded(prev => !prev);

    return (
        <View style={styles.menuContainer}>
            <TouchableOpacity onPress={toggleMenu} style={[styles.menuItem, expanded && styles.activeMenuItem]}>
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

// Similar component for "Services"
const MenuForServices = ({ setCurrentPage }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleMenu = () => setExpanded(prev => !prev);

    return (
        <View style={styles.menuContainer}>
            <TouchableOpacity onPress={toggleMenu} style={[styles.menuItem, expanded && styles.activeMenuItem]}>
                <Text>Services {expanded ? '-' : '+'}</Text>
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
                </View>
            )}
        </View>
    );
};*/


/*
// Main Menu Component
const Menu = ({ setCurrentPage }) => {
    return (
        <View style={styles.menuContainer}>
            <MenuForAboutUs setCurrentPage={setCurrentPage} />
            <MenuForServices setCurrentPage={setCurrentPage} />
            <TouchableOpacity onPress={() => setCurrentPage('Products')} style={styles.menuItem}>
                <Text>Products</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCurrentPage('news')} style={styles.menuItem}>
                <Text>News</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCurrentPage('contactUs')} style={styles.menuItem}>
                <Text>Contact Us</Text>
            </TouchableOpacity>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    menuContainer: {
        flexDirection: 'row',  // Aligning items in a single row
        paddingVertical: 10,
        backgroundColor: '#f8f8f8',
    },
    menuItem: {
        fontSize: 16,
        padding: 10,
        color: '#000',
        borderBottomWidth: 1,
        marginHorizontal: 5, // To add some space between items
    },
    submenu: {
        paddingLeft: 15,
    },
    submenuItem: {
        fontSize: 14,
        paddingVertical: 5,
        color: '#555',
    },
});

export default Menu;
 */

/*// Menu.js
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MenuForAboutUs from './MenuForAboutUs'; // Assuming you've created this component
import MenuForServices from './MenuForServices'; // Assuming you've created this component

const Menu = ({ setCurrentPage, toggleExpanded, setPoistion, expanded }) => {
    const aboutRef = useRef(null);

    useEffect(() => {
        if (aboutRef.current) {
            aboutRef.current.measure((x, y, width, height, pageX, pageY) => {
                setPoistion({ x: y + 3 * height, y: x - width / 4 });
            });
        }
    }, [expanded]); // Only include `expanded`, no need for `aboutRef`

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity onPress={() => setCurrentPage('home')}>
                    <Text style={styles.menuItem}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity ref={aboutRef} onPress={() => toggleExpanded()} accessibilityLabel="About section">
                    <Text style={styles.menuItem}>About</Text>
                </TouchableOpacity>

                {expanded && <MenuForAboutUs setCurrentPage={setCurrentPage} />}
                <TouchableOpacity ref={aboutRef} onPress={() => toggleExpanded()} accessibilityLabel="Services section">
                    <Text style={styles.menuItem}>Services</Text>
                </TouchableOpacity>

                {expanded && <MenuForServices setCurrentPage={setCurrentPage} />}

                <TouchableOpacity onPress={() => setCurrentPage('Products')} accessibilityLabel="Product section">
                    <Text style={styles.menuItem}>Products</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setCurrentPage('news')} accessibilityLabel="News section">
                    <Text style={styles.menuItem}>News</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setCurrentPage('contactUs')} accessibilityLabel="Contact Us section">
                    <Text style={styles.menuItem}>Contact Us</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        backgroundColor: '#ffebbf',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5, // Use margin instead of gap
    },
    menuItem: {
        fontSize: 16,
        paddingVertical: 10,
        marginHorizontal: 10,
        color: '#000',
        borderBottomWidth: 3,
    },
});

export default Menu;*/
/*
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MenuForAboutUs from './MenuForAboutUs';
import MenuForServices from './MenuForServices';

const Menu = ({ setCurrentPage, toggleExpanded, setPoistion, expanded, menuPosition }) => {
    const aboutRef = useRef(null);
    const servicesRef = useRef(null);

    useEffect(() => {
        if (aboutRef.current) {
            aboutRef.current.measure((x, y, width, height) => {
                setPoistion({ x: y + 3 * height, y: x - width / 4 });
            });
        }
    }, [expanded]); // Monitor the expanded state

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity onPress={() => setCurrentPage('home')}>
                    <Text style={styles.menuItem}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity ref={aboutRef} onPress={toggleExpanded} accessibilityLabel="About section">
                    <Text style={styles.menuItem}>About</Text>
                </TouchableOpacity>

                {expanded && <MenuForAboutUs setCurrentPage={setCurrentPage} />}

                <TouchableOpacity ref={servicesRef} onPress={toggleExpanded} accessibilityLabel="Services section">
                    <Text style={styles.menuItem}>Services</Text>
                </TouchableOpacity>

                {expanded && <MenuForServices setCurrentPage={setCurrentPage} />}

                <TouchableOpacity onPress={() => setCurrentPage('Products')} accessibilityLabel="Product section">
                    <Text style={styles.menuItem}>Products</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setCurrentPage('news')} accessibilityLabel="News section">
                    <Text style={styles.menuItem}>News</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setCurrentPage('contactUs')} accessibilityLabel="Contact Us section">
                    <Text style={styles.menuItem}>Contact Us</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        backgroundColor: '#ffebbf',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5, // Use margin instead of gap
    },
    menuItem: {
        fontSize: 16,
        paddingVertical: 10,
        marginHorizontal: 10,
        color: '#000',
        borderBottomWidth: 3,
    },
});

export default Menu;
 */
/*// Menu.js
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import MenuForAboutUs from './MenuForAboutUs'; // Assuming you've created this component
import MenuForServices from './MenuForServices'; // Assuming you've created this component

const Menu = ({ setCurrentPage, toggleExpanded, setPoistion, expanded }) => {

    let aboutRef = useRef(null);

    useEffect(() => {
        if (aboutRef.current) {
            aboutRef.current.measure((x, y, width, height, pageX, pageY) => {
                setPoistion({ x: y + 3 * height, y: x - width / 4 })
            });
        }
    }, [aboutRef, expanded])

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity onPress={() => setCurrentPage('home')}>
                    <Text style={styles.menuItem}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity ref={aboutRef} onPress={() => toggleExpanded()}>
                    <Text style={styles.menuItem}>About</Text>
                </TouchableOpacity>

                {/!* <MenuForAboutUs setCurrentPage={setCurrentPage} /> *!/}
                {/!* <MenuForServices setCurrentPage={setCurrentPage} /> *!/}

                <TouchableOpacity onPress={() => setCurrentPage('Products')}>
                    <Text style={styles.menuItem}>Product</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCurrentPage('news')}>
                    <Text style={styles.menuItem}>News</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setCurrentPage('contactUs')}>
                    <Text style={styles.menuItem}>Contact Us</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        backgroundColor: '#ffebbf',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem'
    },
    menuItem: {
        fontSize: 16,
        paddingVertical: 10,
        marginHorizontal: 10,
        color: '#000',
        paddingInline: 5,
        borderBottomWidth: 3,
    },
});

export default Menu;*/
/*
// Menu.js
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import MenuForAboutUs from './MenuForAboutUs'; // Assuming you've created this component
import MenuForServices from './MenuForServices';
import AddProduct from "../screens/AddProduct"; // Assuming you've created this component

const Menu = ({ setCurrentPage }) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity onPress={() => setCurrentPage('home')}>
                    <Text style={styles.menuItem}>Home</Text>
                </TouchableOpacity>
                <MenuForAboutUs setCurrentPage={setCurrentPage} />
                <MenuForServices setCurrentPage={setCurrentPage} />

                <TouchableOpacity onPress={() => setCurrentPage('Products')}>
                    <Text style={styles.menuItem}>Product</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCurrentPage('AddProducts')}>
                    <Text style={styles.menuItem}>AddProduct</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCurrentPage('ProductLists')}>
                    <Text style={styles.menuItem}>ProductList</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCurrentPage('ProductDetails')}>
                    <Text style={styles.menuItem}>ProductDetail</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCurrentPage('ProductDetails1')}>
                    <Text style={styles.menuItem}>ProductDetail1</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCurrentPage('contactUs')}>
                    <Text style={styles.menuItem}>Contact Us</Text>
                </TouchableOpacity>
               <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    placeholderTextColor="gray"
                />

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        backgroundColor: '#f8f8f8',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    menuItem: {
        fontSize: 16,
        paddingVertical: 10,
        marginHorizontal: 10,
        color: '#000',
    },
});

export default Menu;*/

/*// Menu.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MenuForAboutUs from './MenuForAboutUs'; // Import the About Us menu
import MenuForServices from './MenuForServices'; // Import the Services menu

const Menu = ({ setCurrentPage }) => {
    const [aboutUsExpanded, setAboutUsExpanded] = useState(false);
    const [servicesExpanded, setServicesExpanded] = useState(false);

    const toggleAboutUs = () => setAboutUsExpanded(prev => !prev);
    const toggleServices = () => setServicesExpanded(prev => !prev);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity onPress={() => setCurrentPage('home')}>
                    <Text style={styles.menuItem}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={toggleAboutUs}>
                    <Text style={styles.menuItem}>About Us {aboutUsExpanded ? '-' : '+'}</Text>
                </TouchableOpacity>
                {aboutUsExpanded && (
                    <MenuForAboutUs setCurrentPage={setCurrentPage} />
                )}

                <TouchableOpacity onPress={toggleServices}>
                    <Text style={styles.menuItem}>Services {servicesExpanded ? '-' : '+'}</Text>
                </TouchableOpacity>
                {servicesExpanded && (
                    <MenuForServices setCurrentPage={setCurrentPage} />
                )}

                <TouchableOpacity onPress={() => setCurrentPage('portfolio')}>
                    <Text style={styles.menuItem}>Portfolio</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCurrentPage('news')}>
                    <Text style={styles.menuItem}>News</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCurrentPage('contactUs')}>
                    <Text style={styles.menuItem}>Contact Us</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#f8f8f8',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    menuItem: {
        fontSize: 16,
        paddingVertical: 10,
        marginHorizontal: 10,
        color: '#000',
    },
});

export default Menu;*/

/*// Menu.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Menu = ({ navigation }) => {
    const [aboutUsExpanded, setAboutUsExpanded] = useState(false);
    const [servicesExpanded, setServicesExpanded] = useState(false);

    const toggleAboutUs = () => setAboutUsExpanded(prev => !prev);
    const toggleServices = () => setServicesExpanded(prev => !prev);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.menuItem}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={toggleAboutUs}>
                    <Text style={styles.menuItem}>About Us {aboutUsExpanded ? '-' : '+'}</Text>
                </TouchableOpacity>
                {aboutUsExpanded && (
                    <View style={styles.submenu}>
                        <TouchableOpacity onPress={() => navigation.navigate('AboutUsPage')}>
                            <Text style={styles.submenuItem}>About Us</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('CareersPage')}>
                            <Text style={styles.submenuItem}>Careers</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('OurTeamPage')}>
                            <Text style={styles.submenuItem}>Our Team</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('OurClientsPage')}>
                            <Text style={styles.submenuItem}>Our Clients</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <TouchableOpacity onPress={toggleServices}>
                    <Text style={styles.menuItem}>Services {servicesExpanded ? '-' : '+'}</Text>
                </TouchableOpacity>
                {servicesExpanded && (
                    <View style={styles.submenu}>
                        <TouchableOpacity onPress={() => navigation.navigate('RoboticsTraining')}>
                            <Text style={styles.submenuItem}>Robotics Training</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('SoftwareDevelopment')}>
                            <Text style={styles.submenuItem}>Software Development</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('WebsiteDevelopment')}>
                            <Text style={styles.submenuItem}>Website Development</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('RoboticsMaintenance')}>
                            <Text style={styles.submenuItem}>Robotics Maintenance</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <TouchableOpacity onPress={() => navigation.navigate('Portfolio')}>
                    <Text style={styles.menuItem}>Portfolio</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('News')}>
                    <Text style={styles.menuItem}>News</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ContactUs')}>
                    <Text style={styles.menuItem}>Contact Us</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#f8f8f8',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    menuItem: {
        fontSize: 16,
        paddingVertical: 10,
        marginHorizontal: 10,
        color: '#000',
    },
    submenu: {
        paddingLeft: 15,
    },
    submenuItem: {
        fontSize: 14,
        paddingVertical: 5,
        color: '#555',
    },
});

export default Menu;*/
/*// Menu.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Menu = ({ setCurrentPage }) => {
    const [aboutUsExpanded, setAboutUsExpanded] = useState(false);
    const [servicesExpanded, setServicesExpanded] = useState(false);

    const toggleAboutUs = () => setAboutUsExpanded(prev => !prev);
    const toggleServices = () => setServicesExpanded(prev => !prev);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity onPress={() => setCurrentPage('home')}>
                    <Text style={styles.menuItem}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={toggleAboutUs}>
                    <Text style={styles.menuItem}>About Us {aboutUsExpanded ? '-' : '+'}</Text>
                </TouchableOpacity>
                {aboutUsExpanded && (
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

                <TouchableOpacity onPress={toggleServices}>
                    <Text style={styles.menuItem}>Services {servicesExpanded ? '-' : '+'}</Text>
                </TouchableOpacity>
                {servicesExpanded && (
                    <View style={styles.submenu}>
                        <TouchableOpacity onPress={() => setCurrentPage('roboticsTraining')}>
                            <Text style={styles.submenuItem}>Robotics Training</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setCurrentPage('softwareDevelopment')}>
                            <Text style={styles.submenuItem}>Software Development</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setCurrentPage('websiteDevelopment')}>
                            <Text style={styles.submenuItem}>Website Development</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setCurrentPage('roboticsMaintenance')}>
                            <Text style={styles.submenuItem}>Robotics Maintenance</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <TouchableOpacity onPress={() => setCurrentPage('portfolio')}>
                    <Text style={styles.menuItem}>Portfolio</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCurrentPage('news')}>
                    <Text style={styles.menuItem}>News</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCurrentPage('contactUs')}>
                    <Text style={styles.menuItem}>Contact Us</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#f8f8f8',
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap', // Allows wrapping of submenu items if needed
        justifyContent: 'flex-start', // Aligns items to the left
    },
    menuItem: {
        fontSize: 16,
        paddingVertical: 10,
        marginHorizontal: 10,  // Space between main menu items
        color: '#000',
    },
    submenu: {
        position: 'absolute',
        backgroundColor: '#f8f8f8',
        padding: 10,
        zIndex: 1,
        marginLeft: 10, // Align submenu under the parent item
    },
    submenuItem: {
        fontSize: 14,
        paddingVertical: 5,
        color: '#555',
    },
});

export default Menu;*/
/*// Menu.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Menu = ({ setCurrentPage }) => {
    const [aboutUsExpanded, setAboutUsExpanded] = useState(false);
    const [servicesExpanded, setServicesExpanded] = useState(false);

    const toggleAboutUs = () => setAboutUsExpanded(prev => !prev);
    const toggleServices = () => setServicesExpanded(prev => !prev);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setCurrentPage('home')}>
                <Text style={styles.menuItem}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleAboutUs}>
                <Text style={styles.menuItem}>About Us {aboutUsExpanded ? '-' : '+'}</Text>
            </TouchableOpacity>
            {aboutUsExpanded && (
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

            <TouchableOpacity onPress={toggleServices}>
                <Text style={styles.menuItem}>Services {servicesExpanded ? '-' : '+'}</Text>
            </TouchableOpacity>
            {servicesExpanded && (
                <View style={styles.submenu}>
                    <TouchableOpacity onPress={() => setCurrentPage('roboticsTraining')}>
                        <Text style={styles.submenuItem}>Robotics Training</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setCurrentPage('softwareDevelopment')}>
                        <Text style={styles.submenuItem}>Software Development</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setCurrentPage('websiteDevelopment')}>
                        <Text style={styles.submenuItem}>Website Development</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setCurrentPage('roboticsMaintenance')}>
                        <Text style={styles.submenuItem}>Robotics Maintenance</Text>
                    </TouchableOpacity>
                </View>
            )}

            <TouchableOpacity onPress={() => setCurrentPage('portfolio')}>
                <Text style={styles.menuItem}>Portfolio</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCurrentPage('news')}>
                <Text style={styles.menuItem}>News</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCurrentPage('contactUs')}>
                <Text style={styles.menuItem}>Contact Us</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#f8f8f8',
    },
    menuItem: {
        fontSize: 16,
        paddingVertical: 10,
        marginHorizontal: 10, // Space between menu items
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

export default Menu;*/

/*// Menu.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Menu = ({ navigation }) => {
    const [aboutUsExpanded, setAboutUsExpanded] = useState(false);
    const [servicesExpanded, setServicesExpanded] = useState(false);

    const toggleAboutUs = () => setAboutUsExpanded(prev => !prev);
    const toggleServices = () => setServicesExpanded(prev => !prev);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.menuItem}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={toggleAboutUs}>
                    <Text style={styles.menuItem}>About Us {aboutUsExpanded ? '-' : '+'}</Text>
                </TouchableOpacity>
                {aboutUsExpanded && (
                    <View style={styles.submenu}>
                        <TouchableOpacity onPress={() => navigation.navigate('AboutUs')}>
                            <Text style={styles.submenuItem}>About Us</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Careers')}>
                            <Text style={styles.submenuItem}>Careers</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('OurTeam')}>
                            <Text style={styles.submenuItem}>Our Team</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('OurClients')}>
                            <Text style={styles.submenuItem}>Our Clients</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <TouchableOpacity onPress={toggleServices}>
                    <Text style={styles.menuItem}>Services {servicesExpanded ? '-' : '+'}</Text>
                </TouchableOpacity>
                {servicesExpanded && (
                    <View style={styles.submenu}>
                        <TouchableOpacity onPress={() => navigation.navigate('RoboticsTraining')}>
                            <Text style={styles.submenuItem}>Robotics Training</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('SoftwareDevelopment')}>
                            <Text style={styles.submenuItem}>Software Development</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('WebsiteDevelopment')}>
                            <Text style={styles.submenuItem}>Website Development</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('RoboticsMaintenance')}>
                            <Text style={styles.submenuItem}>Robotics Maintenance</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <TouchableOpacity onPress={() => navigation.navigate('Portfolio')}>
                    <Text style={styles.menuItem}>Portfolio</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('News')}>
                    <Text style={styles.menuItem}>News</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('ContactUs')}>
                    <Text style={styles.menuItem}>Contact Us</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#f8f8f8',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Adjusts space between items
        alignItems: 'center',
    },
    menuItem: {
        fontSize: 16,
        paddingVertical: 10,
        marginHorizontal: 10, // Space between menu items
        color: '#000',
    },
    submenu: {
        position: 'absolute',
        backgroundColor: '#f8f8f8',
        padding: 10,
        zIndex: 1,
    },
    submenuItem: {
        fontSize: 14,
        paddingVertical: 5,
        paddingLeft: 20, // Indentation for submenu items
        color: '#555',
    },
});

export default Menu;*/

/*
// Menu.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Menu = ({ navigation }) => {
    const [aboutUsExpanded, setAboutUsExpanded] = useState(false);
    const [servicesExpanded, setServicesExpanded] = useState(false);

    const toggleAboutUs = () => setAboutUsExpanded(prev => !prev);
    const toggleServices = () => setServicesExpanded(prev => !prev);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text style={styles.menuItem}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleAboutUs}>
                <Text style={styles.menuItem}>About Us {aboutUsExpanded ? '-' : '+'}</Text>
            </TouchableOpacity>
            {aboutUsExpanded && (
                <View style={styles.submenu}>
                    <TouchableOpacity onPress={() => navigation.navigate('AboutUs')}>
                        <Text style={styles.submenuItem}>About Us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Careers')}>
                        <Text style={styles.submenuItem}>Careers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('OurTeam')}>
                        <Text style={styles.submenuItem}>Our Team</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('OurClients')}>
                        <Text style={styles.submenuItem}>Our Clients</Text>
                    </TouchableOpacity>
                </View>
            )}

            <TouchableOpacity onPress={toggleServices}>
                <Text style={styles.menuItem}>Services {servicesExpanded ? '-' : '+'}</Text>
            </TouchableOpacity>
            {servicesExpanded && (
                <View style={styles.submenu}>
                    <TouchableOpacity onPress={() => navigation.navigate('RoboticsTraining')}>
                        <Text style={styles.submenuItem}>Robotics Training</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('SoftwareDevelopment')}>
                        <Text style={styles.submenuItem}>Software Development</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('WebsiteDevelopment')}>
                        <Text style={styles.submenuItem}>Website Development</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('RoboticsMaintenance')}>
                        <Text style={styles.submenuItem}>Robotics Maintenance</Text>
                    </TouchableOpacity>
                </View>
            )}

            <TouchableOpacity onPress={() => navigation.navigate('Portfolio')}>
                <Text style={styles.menuItem}>Portfolio</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('News')}>
                <Text style={styles.menuItem}>News</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ContactUs')}>
                <Text style={styles.menuItem}>Contact Us</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f8f8',
        paddingVertical: 10,
        paddingHorizontal: 15,
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

export default Menu;
*/

/*// Menu.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Menu = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text style={styles.menuItem}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AboutUs')}>
                <Text style={styles.menuItem}>About Us</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Services')}>
                <Text style={styles.menuItem}>Services</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Portfolio')}>
                <Text style={styles.menuItem}>Portfolio</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('News')}>
                <Text style={styles.menuItem}>News</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ContactUs')}>
                <Text style={styles.menuItem}>Contact Us</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#4CAF50', // Same as header color for consistency
    },
    menuItem: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Menu;*/
/*

// src/components/Menu.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Menu = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.menuHeading}>Main Menu</Text>
            <Button title="Products" onPress={() => navigation.navigate('Products')} />
            <Button title="Courses" onPress={() => navigation.navigate('Courses')} />
            <Button title="Competitions" onPress={() => navigation.navigate('Competitions')} />
            <Button title="Community" onPress={() => navigation.navigate('Community')} />
            <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
            <Button title="Cart" onPress={() => navigation.navigate('Cart')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    menuHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default Menu;
*/
