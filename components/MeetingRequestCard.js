import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MeetingRequestCard = ({ request }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>Request from: {request.requesterName}</Text>
            <Text style={styles.details}>Purpose: {request.purpose}</Text>
            <Text style={styles.details}>Status: {request.status}</Text>
            {/* Add more details as needed */}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 15,
        margin: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    details: {
        fontSize: 14,
    },
});

export default MeetingRequestCard;
