import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import TimelineCard from '../components/TimelineCard';
import { getEvents } from "../utils/api";

const AboutScreen = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    //const [hovered, setHovered] = useState(true);

    useEffect(() => {
        const fetchTimelineData = async () => {
            setLoading(true);
            try {
                const response = await getEvents(); // Fetch events from the backend
                setEvents(response.data); // Set state with fetched events
            } catch (error) {
                console.error('Error fetching timeline data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTimelineData();

    }, []);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Robotics Educational and Shop - Timeline of Key Events</Text>
            <Text style={styles.description}>Robotics Application strives to make a better Africa via AI technology and innovation.</Text>

            <View style={styles.timelineItem}>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <FlatList
                        data={events}
                        style={{ height: 'auto', overflow: 'visible', width: '80%' }}
                        renderItem={({ item, index }) => (
                            <TimelineCard
                                item={item}
                                index={index}
                            />
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 'auto',
        padding: 16,
        backgroundColor: '#FFFFFF', // Sky Blue
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    timelineItem: {
        marginVertical: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '1rem' // Adjusts spacing
    },
});

export default AboutScreen;

// import React, { useEffect, useState } from 'react';
// import {View, FlatList, Text, StyleSheet, ScrollView} from 'react-native';
// import EventCard from '../components/EventCard'; // Create a component to show event details
// import Loader from '../components/Loader';
// import {getEvents} from "../utils/api";

// const EventListScreen = ({ navigation }) => {
//     const [events, setEvents] = useState([]);
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         const fetchEvents = async () => {
//             try {
//                 const response = await getEvents(); // Fetch events from backend
//                 setEvents(response.data);
//             } catch (error) {
//                 console.error(error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//
//         fetchEvents();
//     }, []);
//
//     return (
//         <ScrollView style={styles.container}>
//             <Text style={styles.title}>Upcoming Events</Text>
//             {loading ? (
//                 <Loader />
//             ) : (
//                 <FlatList
//                     data={events}
//                     renderItem={({ item }) => (
//                         <EventCard
//                             event={item}
//                             onPress={() => navigation.navigate('EventDetails', { eventId: item.id })} // Logic to navigate to Event Details
//
//                         />
//                     )}
//                     keyExtractor={(item) => item.id.toString()}
//                 />
//             )}
//         </ScrollView>
//     );
// };
//
// const styles = StyleSheet.create({
//     container: {
//         height: '40rem',
//         padding: 16,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     },
// });
//
// export default EventListScreen;
