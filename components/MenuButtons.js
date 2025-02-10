import { useState } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const MenuButtons = ({ navigation, route, children, textColor }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <TouchableOpacity onMouseEnter={() => setHovered(true)}
                          onMouseLeave={() => setHovered(false)}
                          onPress={() => navigation.navigate(route)}>

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

export default MenuButtons;

/*import { useState } from "react";
import { Text, TouchableOpacity } from "react-native"

const MenuButtons = ({ navigation, route, children, textColor }) => {
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
export default MenuButtons;*/

/*
import Icon from "react-native-vector-icons/MaterialIcons";
import { Text, TouchableOpacity } from "react-native"
import { useState } from "react";
const MenuButton = ({ children, route, navigation, icon }) => (
    <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate(route)}
    >
        <Icon name={icon} size={18} color="#2E7D32" />
        <Text style={styles.menuItemText}>{children}</Text>
    </TouchableOpacity>
);
export default MenuButton;
 */
