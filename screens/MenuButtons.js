import { useState } from "react";
import { Text, TouchableOpacity } from "react-native"

export default MenuButton = ({ navigation, route, children, textColor }) => {
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
