import { useState } from "react";
import { Text, TouchableOpacity } from "react-native"

const MenuButton = ({ navigation, route, children, textColor }) => {
    let [hovered, setHovered] = useState(false);

    return (
        <TouchableOpacity onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onPress={() => navigation.navigate(route)}>
            <Text style={{
                color:  hovered ? '#4CAF50' : textColor,
                fontWeight: 'bold',
                fontSize: 15,
                fontFamily: 'Electrolize_400Regular'
            }}>{children}</Text>
        </TouchableOpacity>
    );
}
export default MenuButton;
/*
import { useState } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const MenuButton = ({ navigation, route, children, textColor }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate(route)}
            onPressIn={() => setHovered(true)}  // Set hovered state when pressed
            onPressOut={() => setHovered(false)} // Reset hovered state when released
            style={styles.button}
        >
            <Text style={{
                color: hovered ? '#4CAF50' : textColor,
                fontWeight: 'bold',
                fontSize: 15,
                fontFamily: 'Electrolize_400Regular'
            }}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10, // Padding for better touch area
        borderRadius: 5, // Rounded corners
        backgroundColor: 'transparent', // Ensure button background is transparent
    },
});

export default MenuButton;
 */
