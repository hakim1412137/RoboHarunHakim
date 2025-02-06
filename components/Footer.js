import React from 'react';
import { View, Text, Linking, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Using FontAwesome for icons
import AntDesign from '@expo/vector-icons/AntDesign';                

const Footer = () => {
    return (
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#4CAF50', paddingVertical: 15 }}>
            <View style={{ flex: 1, height: '100%', paddingHorizontal: 30 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 19, color: 'white', paddingBottom: 5 }}>Contacts</Text>
                <View style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <Text style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5, color: 'white', fontSize: 12 }}>
                        <Icon name="phone" size={12} color="#FFD700" />
                        (+251) 000 456 342
                    </Text>
                    <Text style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5, color: 'white', fontSize: 12 }}>
                        <Icon name="phone" size={12} color="#FFD700" />
                        (+251) 000 456 343
                    </Text>
                </View>
            </View>
            <View style={{ flex: 1, height: '100%', paddingHorizontal: 30 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 19, color: 'white', paddingBottom: 5 }}>Address</Text>
                <Text style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5, color: 'white', fontSize: 12 }}>
                    <Icon name="map-marker" size={12} color="#FFD700" />
                    Bole, Brass, Addis Ababa, Ethiopia
                </Text>
            </View>

            <View style={{ flex: 1, height: '100%', paddingHorizontal: 30, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 19, color: 'white', paddingBottom: 5 }}>Open Hours</Text>
                    <Text style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5, color: 'white', fontSize: 12 }}>
                        Mon – Sat: 8 AM - 6 PM
                    </Text>
                    <Text style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5, color: 'white', fontSize: 12 }}>
                        Sunday: CLOSED
                    </Text>
                </View>
                <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/ethiorobotics/')} style={{ backgroundColor: '#FFD700', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                    <Text style={{ color: 'black' }}>View Gallary</Text>
                    <AntDesign name="arrowright" style={{ width: 10, height: 10 }} color="black" />                
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Footer;