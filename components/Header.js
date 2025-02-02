import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Header = ({ navigation }) => {
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
            <View style={styles.topRow}>
                <View style={styles.contactContainer}>
                    <TouchableOpacity
                        style={styles.contactInfo}
                        onPress={handleEmailPress}
                        activeOpacity={0.7} // Gives feedback to touch interaction
                    >
                        <FontAwesome name="envelope" size={16} color="#FFD700" />
                        <Text style={styles.contactText}>contact@roboticsapp.com</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.contactInfo}
                        onPress={handlePhonePress}
                        activeOpacity={0.7}
                    >
                        <FontAwesome name="phone" size={16} color="#FFD700" />
                        <Text style={styles.contactText}>Mon - Fri: (+251) 000 345 245</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.contactInfo}
                        onPress={handleMapPress}
                        activeOpacity={0.7}
                    >
                        <FontAwesome name="map-marker" size={16} color="#FFD700" />
                        <Text style={styles.contactText}>
                            Bole, Brass Next To Hotel, Addis Ababa, Ethiopia
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
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#4CAF50',
        padding: 10,
    },
    contactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    loginContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 32,
    },
    topRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    contactInfo: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    contactText: {
        color: 'B771E5',
        fontSize: 12,  // Increased font size for better visibility
        fontWeight: '500',  // Make the text slightly bolder
    },
    socialContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 30,
    }
});

export default Header;

/*import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Ensure to install this package

const Header = ({ setCurrentPage }) => {
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
            <View style={styles.topRow}>
                <View style={styles.contactContainer}>
                    <TouchableOpacity style={styles.contactInfo} onPress={handleEmailPress}>
                        <FontAwesome name="envelope" size={20} color="white" />
                        <Text style={styles.contactText}>contact@roboticsapp.com</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contactInfo} onPress={handlePhonePress}>
                        <FontAwesome name="phone" size={20} color="white" />
                        <Text style={styles.contactText}>Mon - Fri: (+251) 000 345 245</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contactInfo} onPress={handleMapPress}>
                        <FontAwesome name="map-marker" size={20} color="white" />
                        <Text style={styles.contactText}>
                            Bole,Brass Next To Hotel, Addis Ababa, Ethiopia
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.socialContainer}>
                    <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/PionnerRoboticsEthiopia')}>
                        <FontAwesome name="facebook" size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com/PionnerRoboticsEthiopia')}>
                        <FontAwesome name="twitter" size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/company/PionnerRoboticsEthiopia')}>
                        <FontAwesome name="linkedin" size={20} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.loginContainer}>
                    <TouchableOpacity  style={styles.signinpButton} onPress={() => setCurrentPage('signin')}>
                        {/!*<Text>Sign In</Text>*!/}
                        <Text style={styles.signText}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signupButton} onPress={() => setCurrentPage("signup")}>
                        <Text style={styles.signText} >Sign Up</Text>
                    </TouchableOpacity>

                </View>

            </View>
            {/!*<Text style={styles.title}>Robotics Education Platform</Text>*!/}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#4CAF50',
    },
    signupButton: {
        backgroundColor: '#ffebbf',
        paddingHorizontal: 12,
        paddingVertical: 8,
     /!*   paddingInline: '0.8rem',
        paddingBlock: '0.4rem',*!/
        borderRadius:50,
    },
    signinpButton: {
        backgroundColor: '#ffebbf',
        paddingHorizontal: 12,
        paddingVertical: 8,
       /!* paddingInline: '0.8rem',
        paddingBlock: '0.4rem',*!/
        borderRadius:50,
    },
    signText: {
        color: '#000', // Change this color for better visibility
    },
    contactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: '3rem',
        padding: 15,
    },
    loginContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // gap: '2rem',
        gap: 32, // Use numbers (pixels) instead of 'rem'
        display:'flex',
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    contactInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    contactText: {
        color: 'white',
        marginLeft: 5,
    },
    socialContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 32, // Use numbers (pixels) instead of 'rem'
        // gap: '3rem',
        padding: 15,
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
});

export default Header;*/

{/* <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: '2rem' }}>
                    <TouchableOpacity style={{ backgroundColor: '#ffebbf', paddingInline: '0.8rem', paddingBlock: '0.4rem', borderRadius: 50 }}
                                      onPress={() => setCurrentPage("signup")}><Text>Sign up</Text></TouchableOpacity>
                    <TouchableOpacity style={{}}><Text style={{ color: '#ffebbf' }} onPress={() => setCurrentPage('signin')}>Sign In</Text></TouchableOpacity>
                </View>*/}
/*import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Ensure to install this package

const Header = () => {
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
            <View style={styles.topRow}>
                <View style={styles.contactContainer}>
                    <TouchableOpacity style={styles.contactInfo} onPress={handleEmailPress}>
                        <FontAwesome name="envelope" size={20} color="white" />
                        <Text style={styles.contactText}>contact@roboticsapp.com</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contactInfo} onPress={handlePhonePress}>
                        <FontAwesome name="phone" size={20} color="white" />
                        <Text style={styles.contactText}>Mon - Fri: (+251) 000 345 245</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contactInfo} onPress={handleMapPress}>
                        <FontAwesome name="map-marker" size={20} color="white" />
                        <Text style={styles.contactText}>
                            Bole,Brass Next To Hotel, Addis Ababa, Ethiopia
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.socialContainer}>
                    <TouchableOpacity onPress={() => Linking.openURL('https://web.facebook.com/100057476498699/')}>
                        <FontAwesome name="facebook" size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/ethiorobotics/')}>
                        <FontAwesome name="instagram" size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com/PionnerRoboticsEthiopia')}>
                        <FontAwesome name="twitter" size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL('https://et.linkedin.com/company/ethio-robo-robotics')}>
                        <FontAwesome name="linkedin" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            {/!*<Text style={styles.title}>Robotics Education Platform</Text>*!/}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#4CAF50',
        padding: 15,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    contactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contactInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    contactText: {
        color: 'white',
        marginLeft: 5,
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
});

export default Header;*/

/*
import React from 'react';
import { View, Text, Button } from 'react-native';

const Header = ({ navigation }) => {
    return (
        <View style={{ padding: 16, backgroundColor: '#4CAF50' }}>
            <Text style={{ fontSize: 24, color: '#fff' }}>Robotic Shop</Text>
            <Button title="Cart" onPress={() => navigation.navigate('Cart')} />
        </View>
    );
};
 */
/*import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Ensure to install this package

const Header = () => {
    return (
        <View style={styles.header}>
            <View style={styles.topRow}>
                <View style={styles.contactContainer}>
                    <View style={styles.contactInfo}>
                        <FontAwesome name="envelope" size={20} color="white" />
                        <Text style={styles.contactText}>contact@roboticsapp.com</Text>
                    </View>
                    <View style={styles.contactInfo}>
                        <FontAwesome name="phone" size={20} color="white" />
                        <Text style={styles.contactText}>Mon - Fri: (+251) 111 275 193</Text>
                    </View>
                    <View style={styles.contactInfo}>
                        <FontAwesome name="map-marker" size={20} color="white" />
                        <Text style={styles.contactText}>
                            Tekle Haymanot, Next To Aseb Hotel, Addis Ababa, Ethiopia
                        </Text>
                    </View>
                </View>
                <View style={styles.socialContainer}>
                    <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/PionnerRoboticsEthiopia')}>
                        <FontAwesome name="facebook" size={20} color="white" style={styles.socialIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com/PionnerRoboticsEthiopia')}>
                        <FontAwesome name="twitter" size={20} color="white" style={styles.socialIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/company/PionnerRoboticsEthiopia')}>
                        <FontAwesome name="linkedin" size={20} color="white" style={styles.socialIcon} />
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.title}>Robotics Education Platform</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#4CAF50',
        padding: 15,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    contactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contactInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    contactText: {
        color: 'white',
        marginLeft: 5,
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end', // Align the social icons to the right
    },
    socialIcon: {
        marginLeft: 10, // Add space between icons
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
});

export default Header;*/
/*import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Ensure to install this package

const Header = () => {
    const [aboutUsExpanded, setAboutUsExpanded] = useState(false);
    const [servicesExpanded, setServicesExpanded] = useState(false);

    const toggleAboutUs = () => setAboutUsExpanded(prev => !prev);
    const toggleServices = () => setServicesExpanded(prev => !prev);

    return (
        <View style={styles.header}>
            <View style={styles.topRow}>
                <View style={styles.contactContainer}>
                    <View style={styles.contactInfo}>
                        <FontAwesome name="envelope" size={20} color="white" />
                        <Text style={styles.contactText}> contact@roboticsapp.com</Text>
                    </View>
                    <View style={styles.contactInfo}>
                        <FontAwesome name="phone" size={20} color="white" />
                        <Text style={styles.contactText}> Mon - Fri: (+251) 111 275 193</Text>
                    </View>
                    <View style={styles.contactInfo}>
                        <FontAwesome name="map-marker" size={20} color="white" />
                        <Text style={styles.contactText}>
                            Tekle Haymanot, Next To Aseb Hotel, Addis Ababa, Ethiopia
                        </Text>
                    </View>
                </View>
                <View style={styles.socialContainer}>
                    <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/PionnerRoboticsEthiopia')}>
                        <FontAwesome name="facebook" size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com/PionnerRoboticsEthiopia')}>
                        <FontAwesome name="twitter" size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/company/PionnerRoboticsEthiopia')}>
                        <FontAwesome name="linkedin" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={styles.title}>Robotics Education Center </Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                placeholderTextColor="gray"
            />

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <TouchableOpacity onPress={() => setCurrentPage('home')}>
                    <Text style={styles.navItem}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={toggleAboutUs}>
                    <Text style={styles.navItem}>About Us</Text>
                </TouchableOpacity>
                {aboutUsExpanded && (
                    <View style={styles.submenu}>
                        <TouchableOpacity onPress={() => setCurrentPage('aboutUs')}>
                            <Text style={styles.submenuItem}>About Us</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setCurrentPage('careers')}>
                            <Text style={styles.submenuItem}>Career</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() =>setCurrentPage('ourTeam')}>
                            <Text style={styles.submenuItem}>Our Team</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setCurrentPage('ourClients')}>
                            <Text style={styles.submenuItem}>Our Clients</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <TouchableOpacity onPress={toggleServices}>
                    <Text style={styles.navItem}>Services</Text>
                </TouchableOpacity>
                {servicesExpanded && (
                    <View style={styles.submenu}>
                        <TouchableOpacity onPress={() => {/!* navigate to Robotics Training *!/}}>
                            <Text style={styles.submenuItem}>Robotics Training</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {/!* navigate to Software Development *!/}}>
                            <Text style={styles.submenuItem}>Software Development</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {/!* navigate to Website Development *!/}}>
                            <Text style={styles.submenuItem}>Website Development</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {/!* navigate to Modernization Bank *!/}}>
                            <Text style={styles.submenuItem}>Modernization Bank</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <TouchableOpacity onPress={() => {/!* navigate to Portfolio *!/}}>
                    <Text style={styles.navItem}>Portfolio</Text>
                </TouchableOpacity>
                 <TouchableOpacity onPress={() => {/!* navigate to News *!/}}>
                    <Text style={styles.navItem}>News</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {/!* navigate to Contact Us *!/}}>
                    <Text style={styles.navItem}>Contact Us</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#4CAF50',
        padding: 15,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    contactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contactInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    contactText: {
        color: 'white',
        marginLeft: 5,
    },
    socialContainer: {
        flexDirection: 'row',
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    searchInput: {
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        color: 'white',
    },
    navItem: {
        color: 'white',
        marginHorizontal: 15,
        fontSize: 16,
    },
    submenu: {
        position: 'absolute',
        backgroundColor: '#4CAF50',
        borderRadius: 5,
        padding: 10,
        zIndex: 1,
    },
    submenuItem: {
        color: 'white',
        paddingVertical: 5,
    },
});

export default Header;*/
/*import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Ensure to install this package

const Header = () => {
    const [aboutUsExpanded, setAboutUsExpanded] = useState(false);
    const [servicesExpanded, setServicesExpanded] = useState(false);

/!*    const toggleAboutUs = () => setAboutUsExpanded(!aboutUsExpanded);
    const toggleServices = () => setServicesExpanded(!servicesExpanded);*!/
    const toggleAboutUs = () => setAboutUsExpanded(prev => !prev);
    const toggleServices = () => setServicesExpanded(prev => !prev);

    return (
        <View style={styles.header}>
            <Text style={styles.title}>Robotics Education Platform</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                placeholderTextColor="gray"
            />

            <View style={styles.contactContainer}>
                <View style={styles.contactInfo}>
                    <FontAwesome name="envelope" size={20} color="white" />
                    <Text style={styles.contactText}> contact@roboticsapp.com</Text>
                </View>
                <View style={styles.contactInfo}>
                    <FontAwesome name="phone" size={20} color="white" />
                    <Text style={styles.contactText}> Mon - Fri: (+251) 111 275 193</Text>
                </View>
                <View style={styles.contactInfo}>
                    <FontAwesome name="map-marker" size={20} color="white" />
                    <Text style={styles.addressText}>
                        Tekle Haymanot, Next To Aseb Hotel, Addis Ababa, Ethiopia
                    </Text>
                </View>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <TouchableOpacity onPress={() => {/!* navigate to Home *!/}}>
                    <Text style={styles.navItem}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={toggleAboutUs}>
                    <Text style={styles.navItem}>About Us</Text>
                </TouchableOpacity>
                {aboutUsExpanded && (
                    <View style={styles.submenu}>
                        <TouchableOpacity onPress={() => {/!* navigate to About Us *!/}}>
                            <Text style={styles.submenuItem}>About Us</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {/!* navigate to Careers *!/}}>
                            <Text style={styles.submenuItem}>Career</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {/!* navigate to Our Team *!/}}>
                            <Text style={styles.submenuItem}>Our Team</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {/!* navigate to Our Clients *!/}}>
                            <Text style={styles.submenuItem}>Our Clients</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <TouchableOpacity onPress={toggleServices}>
                    <Text style={styles.navItem}>Services</Text>
                </TouchableOpacity>
                {servicesExpanded && (
                    <View style={styles.submenu}>
                        <TouchableOpacity onPress={() => {/!* navigate to Robotics Training *!/}}>
                            <Text style={styles.submenuItem}>Robotics Training</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {/!* navigate to Software Development *!/}}>
                            <Text style={styles.submenuItem}>Software Development</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {/!* navigate to Website Development *!/}}>
                            <Text style={styles.submenuItem}>Website Development</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {/!* navigate to Modernization Bank *!/}}>
                            <Text style={styles.submenuItem}>Modernization Bank</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <TouchableOpacity onPress={() => {/!* navigate to Portfolio *!/}}>
                    <Text style={styles.navItem}>Portfolio</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {/!* navigate to News *!/}}>
                    <Text style={styles.navItem}>News</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {/!* navigate to Contact Us *!/}}>
                    <Text style={styles.navItem}>Contact Us</Text>
                </TouchableOpacity>
            </ScrollView>

            <View style={styles.socialLinks}>
                <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/PionnerRoboticsEthiopia')}>
                    <Text style={styles.link}>Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com/PionnerRoboticsEthiopia')}>
                    <Text style={styles.link}>Twitter</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/company/PionnerRoboticsEthiopia')}>
                    <Text style={styles.link}>LinkedIn</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};*/
/*const styles = StyleSheet.create({
    header: {
        padding: 20,
        backgroundColor: '#4CAF50', // Green background
    },
    title: {
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
        marginBottom: 10,
    },
    searchInput: {
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Slightly transparent background
        color: 'white',
    },
    contactContainer: {
        marginBottom: 10,
    },
    contactInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    addressText: {
        marginLeft: 10,
        color: 'white',
    },
    navItem: {
        color: 'white',
        padding: 10,
        fontSize: 16,
    },
    submenu: {
        backgroundColor: '#388E3C', // Darker green for submenu
        padding: 5,
        position: 'absolute',
        top: 40, // Adjust position based on your layout
        left: 0,
        right: 0,
    },
    submenuItem: {
        color: 'white',
        padding: 10,
    },
});

export default Header;*/
/*
// src/components/Header.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>Pioneer Robotics Education Center in Ethiopia</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        padding: 20,
        backgroundColor: '#4CAF50', // Green background
    },
    title: {
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
    },
});

export default Header;*/
/*
const Header = () => (
    <header className="header">
        <h1>Robotics Education Platform</h1>
    </header>
);
 */
