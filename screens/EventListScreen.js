import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import TimelineCard from '../components/TimelineCard';
import { getEvents } from "../utils/api";
import Menu from '../components/Menu';
import Header from '../components/Header';
import {ImageBackground} from "expo-image";

const AboutScreen = ({ navigation }) => {
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
            <Header></Header>
            <Menu navigation={navigation}></Menu>
            <ImageBackground
                source={require('../assets/images/29033.jpg')} // Replace with your image path
                style={styles.background} // Apply full screen styles
                // resizeMode="cover" // Cover the entire background
            >
            <View style={{ padding: 20, paddingHorizontal: 200 }}>
                <Text style={styles.title}>Robotics WorkShop- Timeline of Key Events</Text>
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
            </View>
            </ImageBackground>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '40rem',
        backgroundColor: '#FBF1E6', // Sky Blue
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: 'white', // Text color
    },
    background: {
        flex: 1, // Allow ImageBackground to cover the full screen
        // height: '20rem',

        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: 'white', // Text color
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
