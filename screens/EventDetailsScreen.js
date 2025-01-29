import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import {getEventById, registerFortEvents} from '../utils/api';

const EventDetailsScreen = ({ route }) => {
    const { eventId } = route.params;
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await getEventById(eventId);
                setEvent(response);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [eventId]);

    const handleRegister = async () => {
        // Add your registration logic here
        try {
            // await api.post(`/events/${eventId}/register`, { /* include user data if necessary */ });

            const response = await registerFortEvents(eventId, userId);
            setEvent(response);
            Alert.alert('Success', 'Registered successfully for the event!');

        } catch (error) {
            Alert.alert('Error', 'Failed to register for the event.');
        }
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <Text>Loading...</Text>
            ) : event ? (
                <>
                    <Text style={styles.title}>{event.title}</Text>
                    <Text style={styles.description}>{event.description}</Text>
                    <Text style={styles.date}>Date: {new Date(event.eventDate).toLocaleDateString()}</Text>
                    <Text style={styles.location}>Location: {event.location}</Text>
                    <Button title="Register" onPress={handleRegister} />
                </>
            ) : (
                <Text>No event details available.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginVertical: 10,
    },
    date: {
        fontSize: 18,
        color: '#4CAF50',
    },
    location: {
        fontSize: 16,
    },
});

export default EventDetailsScreen;
