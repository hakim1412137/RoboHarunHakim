import { useState } from "react";
import { Text, TouchableOpacity } from "react-native"

export default MenuButton = ({ navigation, route, children }) => {
    let [hovered, setHovered] = useState(false);

    return (
        <TouchableOpacity onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onPress={() => navigation.navigate(route)}>
            <Text style={{
                color:  hovered ? '#4CAF50' : '#000000',
                fontWeight: 'bold',
                fontSize: 15,
            }}>{children}</Text>
        </TouchableOpacity>
    );
}
