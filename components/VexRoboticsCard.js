import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const VexRoboticsCard = ({ platform, onPress }) => {
    const backgroundImage = { uri: 'https://www.vexrobotics.com/Content/Images/Product/555-0022-202_v5_product_web_v1.jpg' }; // Replace with the desired image URL

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Text style={styles.title}>{platform.platformName}</Text>
            <Text style={styles.subtitle}>Target Audience: <Text style={styles.highlight}>{platform.targetAudience}</Text></Text>
            <Text style={styles.description}>Focus: <Text style={styles.highlight}>{platform.focus}</Text></Text>
            <Text style={styles.description}>Components: <Text style={styles.highlight}>{platform.components}</Text></Text>
            <Text style={styles.description}>Programming: <Text style={styles.highlight}>{platform.programming}</Text></Text>
            <Text style={styles.description}>Curriculum: <Text style={styles.highlight}>{platform.curriculum}</Text></Text>
            <Text style={styles.description}>Use Case: <Text style={styles.highlight}>{platform.useCase}</Text></Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 20,
        backgroundColor: '#e0f7fa', // Soft light blue background
        marginVertical: 12,
        marginHorizontal: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#b2ebf2', // Light border color
        elevation: 3, // Shadow on Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 }, // Shadow offset
        shadowOpacity: 0.2, // Shadow opacity
        shadowRadius: 4, // Shadow radius
    },
    title: {
        fontSize: 22, // Increased font size
        fontWeight: 'bold',
        color: '#00796b', // Darker teal color for the title
    },
    subtitle: {
        fontSize: 16, // Increased font size for subtitle
        color: '#004d40', // Darker color for subtlety
        marginVertical: 5, // Added vertical margin
    },
    description: {
        fontSize: 14, // Slightly increased font size for description
        color: '#555',
        marginVertical: 4, // Added spacing for descriptions
    },
    highlight: {
        fontWeight: '600', // Bold for highlighted text
        color: '#f57f20', // Different color for contrast
    },
});

export default VexRoboticsCard;
/*

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const VexRoboticsCard = ({ platform, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Text style={styles.title}>{platform.platformName}</Text>
            <Text style={styles.subtitle}>Target Audience: {platform.targetAudience}</Text>
            <Text style={styles.detail}>Focus: {platform.focus}</Text>
            <Text style={styles.detail}>Components: {platform.components}</Text>
            <Text style={styles.detail}>Programming: {platform.programming}</Text>
            <Text style={styles.detail}>Curriculum: {platform.curriculum}</Text>
            <Text style={styles.detail}>Use Case: {platform.useCase}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 14,
        color: '#777',
    },
    detail: {
        fontSize: 12,
        color: '#555',
        marginTop: 5,
    },
});

export default VexRoboticsCard;
*/
