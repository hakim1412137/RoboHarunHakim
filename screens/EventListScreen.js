import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import EventCard from '../components/EventCard'; // Create a component to show event details
import Loader from '../components/Loader';
import {getEvents} from "../utils/api";

const EventListScreen = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await getEvents(); // Fetch events from backend
                setEvents(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Upcoming Events</Text>
            {loading ? (
                <Loader />
            ) : (
                <FlatList
                    data={events}
                    renderItem={({ item }) => (
                        <EventCard
                            event={item}
                            onPress={() => navigation.navigate('EventDetails', { eventId: item.id })} // Logic to navigate to Event Details

                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default EventListScreen;
