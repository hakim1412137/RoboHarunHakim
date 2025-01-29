import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const EventCard = ({ event, onPress }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{event.title}</Text>
            <Text>{event.description}</Text>
            <Text style={styles.date}>Date: {new Date(event.eventDate).toLocaleDateString()}</Text>
            <Text style={styles.location}>Location: {event.location}</Text>
            <Button title="View Details" onPress={onPress} />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    date: {
        marginTop: 5,
        color: '#4CAF50', // Green color for date
    },
    location: {
        fontSize: 14,
        color: '#555',
    },
});

export default EventCard;
