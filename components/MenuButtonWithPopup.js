import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

export default MenuForAboutUs = ({ navigation, children, subMenu }) => {
    const [expanded, setExpanded] = useState(false);
    const toggleMenu = () => setExpanded(prev => !prev);
    const [hovered, setHovered] = useState(false);

    return (
        <View style={{ position: 'relative' }}>
            <TouchableOpacity onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onPress={toggleMenu} style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                <Text style={{ color: hovered ? '#4CAF50' : '#333', fontWeight: 'bold' }}>{children}</Text>
                <Entypo name="triangle-down" size={18} style={{ transform: expanded ? 'rotate(180deg)': 'rotate(0)' }} color="black" />
            </TouchableOpacity>
            {expanded && (
                <View style={styles.submenu}>
                    {subMenu.map((menu, index) => (
                        <>
                            <TouchableOpacity key={index} onPress={() => navigation.navigate(menu.route)}>
                                <Text style={{ fontSize: 14, color: '#555', borderRadius: 5, padding: 10, marginVertical: 2, textAlign: 'center' }}>{menu.text}</Text>
                            </TouchableOpacity>

                            {/* Discards the divider for the last element */}
                            {index == subMenu.length - 1 ? <></> : <View key={index + 100} style={{ width: '100%', height: 1, backgroundColor: '#ccc', marginVertical: 5, }} /> }
                        </>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    submenu: {
        position: 'absolute',
        minWidth: '6rem',
        top: '100%',         
        left: 0,             
        paddingInline: 5,
        marginTop: 5,
        zIndex: 1000,
        gap: '0.2rem',
        backgroundColor: '#ffffff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});