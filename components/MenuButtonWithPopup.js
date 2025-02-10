import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

const  MenuButtonWithPopup = ({ navigation, children, subMenu, textColor, expanded, setExpanded, index }) => {
    const [hovered, setHovered] = useState(false);

    function handleMenuClick() {
        if (expanded !== index) {
            setExpanded(index)   
        } else {
            setExpanded(-1);
        }
    }

    return (
        <View style={{ position: 'relative' }}>
            <TouchableOpacity onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onPress={handleMenuClick} style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                <Text style={{ color: hovered ? '#4CAF50' : textColor, fontWeight: 'bold', fontFamily: 'Electrolize_400Regular' }}>{children}</Text>
                <Entypo name="triangle-down" size={18} style={{ transform: expanded == index ? 'rotate(180deg)': 'rotate(0)', color: hovered ? '#4CAF50' : textColor }} />
            </TouchableOpacity>
            {expanded === index && (
                <View style={styles.submenu}>
                    {subMenu.map((menu, index) => (
                        <>
                            <TouchableOpacity key={index} onPress={() => navigation.navigate(menu.route)} style={{ paddingBlock: 10 }}>
                                <Text style={{ fontSize: 15, color: '#555', borderRadius: 5, padding: 10, fontWeight: 'bold', textAlign: 'center', fontFamily: 'Electrolize_400Regular'  }}>{menu.text}</Text>
                            </TouchableOpacity>

                            {/* Discards the divider for the last element */}
                            {index == subMenu.length - 1 ? <></> : <View key={index + 100} style={{ width: '85%', height: 1, backgroundColor: '#ccc', marginVertical: 5 }} /> }
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
        minWidth: '7rem',
        top: '100%',         
        left: 0,             
        paddingInline: 5,
        marginTop: 5,
        zIndex: 1000,
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
export default MenuButtonWithPopup;
