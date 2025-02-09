import React from 'react';
import { View, Text, Linking, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';

const Footer = () => {
    return (
        <View style={styles.footerContainer}>
            {/* Contact Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Contacts</Text>
                <Text style={styles.infoText}>
                    <Icon name="phone" size={14} color="#FFD700" /> (+251) 000 456 342
                </Text>
                <Text style={styles.infoText}>
                    <Icon name="phone" size={14} color="#FFD700" /> (+251) 000 456 343
                </Text>
            </View>

            {/* Address Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Address</Text>
                <Text style={styles.infoText}>
                    <Icon name="map-marker" size={14} color="#FFD700" /> Bole, Brass, Addis Ababa, Ethiopia
                </Text>
            </View>

            {/* Open Hours + Gallery Button */}
            <View style={[styles.section, styles.lastSection]}>
                <View>
                    <Text style={styles.sectionTitle}>Open Hours</Text>
                    <Text style={styles.infoText}>Mon – Sat: 8 AM - 6 PM</Text>
                    <Text style={styles.infoText}>Sunday: CLOSED</Text>
                </View>

                {/* View Gallery Button */}
                <TouchableOpacity 
                    onPress={() => Linking.openURL('https://www.instagram.com/ethiorobotics/')} 
                    style={styles.galleryButton}
                >
                    <Text style={styles.galleryText}>View Gallery</Text>
                    <AntDesign name="arrowright" size={16} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    footerContainer: {
        flexDirection: 'row',
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    section: {
        flex: 1,
        paddingHorizontal: 15,
    },
    lastSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
        marginBottom: 5,
    },
    infoText: {
        fontSize: 14,
        color: 'white',
        marginBottom: 3,
    },
    galleryButton: {
        backgroundColor: '#FFD700',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    galleryText: {
        color: 'black',
        fontWeight: 'bold',
        marginRight: 8,
    },
});

export default Footer;

// import React from 'react';
// import { View, Text, Linking, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome'; // Using FontAwesome for icons
// import AntDesign from '@expo/vector-icons/AntDesign';                

// const Footer = () => {
//     return (
//         <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#4CAF50', paddingVertical: 15 }}>
//             <View style={{ flex: 1, height: '100%', paddingHorizontal: 30 }}>
//                 <Text style={{ fontWeight: 'bold', fontSize: 19, color: 'white', paddingBottom: 5 }}>Contacts</Text>
//                 <View style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
//                     <Text style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5, color: 'white', fontSize: 12 }}>
//                         <Icon name="phone" size={12} color="#FFD700" />
//                         (+251) 000 456 342
//                     </Text>
//                     <Text style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5, color: 'white', fontSize: 12 }}>
//                         <Icon name="phone" size={12} color="#FFD700" />
//                         (+251) 000 456 343
//                     </Text>
//                 </View>
//             </View>
//             <View style={{ flex: 1, height: '100%', paddingHorizontal: 30 }}>
//                 <Text style={{ fontWeight: 'bold', fontSize: 19, color: 'white', paddingBottom: 5 }}>Address</Text>
//                 <Text style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5, color: 'white', fontSize: 12 }}>
//                     <Icon name="map-marker" size={12} color="#FFD700" />
//                     Bole, Brass, Addis Ababa, Ethiopia
//                 </Text>
//             </View>

//             <View style={{ flex: 1, height: '100%', paddingHorizontal: 30, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <View>
//                     <Text style={{ fontWeight: 'bold', fontSize: 19, color: 'white', paddingBottom: 5 }}>Open Hours</Text>
//                     <Text style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5, color: 'white', fontSize: 12 }}>
//                         Mon – Sat: 8 AM - 6 PM
//                     </Text>
//                     <Text style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5, color: 'white', fontSize: 12 }}>
//                         Sunday: CLOSED
//                     </Text>
//                 </View>
//                 <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/ethiorobotics/')} style={{ backgroundColor: '#FFD700', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
//                     <Text style={{ color: 'black' }}>View Gallary</Text>
//                     <AntDesign name="arrowright" style={{ width: 10, height: 10 }} color="black" />                
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };

// export default Footer;