import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Button, Easing,ImageBackground  } from 'react-native';
import Header from '../components/Header';
import HomePage from "./HomePage";
const HomeScreen = ({ navigation }) => {
    // const [currentPage, setCurrentPage] = useState('homepage');
    const [expanded, setExpanded] = useState(false);
    const [position, setPosition] = useState({ x: 100, y: 100 });

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            {/*{renderContent()}*/}
            <HomePage navigation={navigation} />
        </View>
    );
};

function AboutUsPopup({ position, setCurrentPage }) {
    const slideAnim = useRef(new Animated.Value(-10)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();

        Animated.timing(opacityAnim, {
            toValue: 1, // Set to 1 for full opacity
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <View style={{ position: 'absolute', top: position.y, left: position.x, zIndex: 100 }}>
            <Animated.View
                style={{
                    width: 200, // Set width as needed
                    padding: 15,
                    borderWidth: 2,
                    opacity: opacityAnim,
                    transform: [{ translateY: slideAnim }]
                }}
            >
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, //flex: 1 to allow the container to fill the available screen space.
        position: 'relative', // Ensure this is positioned relative

    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        margin: 20,
    },
    submenuItem: {
        fontSize: 16,
        paddingVertical: 10,
        textAlign: 'center',
        color: '#555',
    },
    divider: {
        width: '100%',       // Full width of the container
        height: 1,           // Thickness of the divider
        backgroundColor: '#000',  // Divider color (black)
        marginVertical: 10,  // Spacing around the divider
    },
});

export default HomeScreen;
