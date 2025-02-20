import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import TimelineCard from '../components/TimelineCard';

const AboutUsPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTimelineData = () => {
            setLoading(true);
            const historyData = getHistoryCompany(sampleData); // Fetch history data from sampleData
            setEvents(historyData);
            setLoading(false);
        };

        fetchTimelineData();
    }, []);

    // Sample timeline events data
    const sampleData = [
        { id: 1, year: 2003, event: 'Founding of the Robotics Educational Center in Ethiopia.' },
        { id: 2, year: 2005, event: 'Launched the first series of robotics training programs for schools.' },
        { id: 3, year: 2007, event: 'First robotics competition held in Ethiopia, organized by the center.' },
        { id: 4, year: 2010, event: 'Introduced online shopping platform for robotics kits and educational materials.' },
        { id: 5, year: 2012, event: 'Conducted community workshops to promote STEM education.' },
        { id: 6, year: 2015, event: 'Opened a physical store in Addis Ababa for robotics supplies.' },
        { id: 7, year: 2018, event: 'Became the leading supplier of robotics components in Ethiopia.' },
        { id: 8, year: 2020, event: 'Expanded services to include specialized courses in robotics and AI.' },
        { id: 9, year: 2022, event: 'Introduced a scholarship program for underprivileged students.' },
        { id: 10, year: 2025, event: 'Celebrated 22 years of service in robotics education and community involvement.' },
    ];

    const getHistoryCompany = (data) => {
        return data; // Currently returns the sample data; can add filtering or processing if needed
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>About Us</Text>
            <Text style={styles.description}>
                Welcome to the Robotics Educational Center, dedicated to nurturing innovation and creativity in the field of robotics education.
                Our mission is to empower the youth of Ethiopia by providing access to advanced educational resources and hands-on training in robotics and technology.
            </Text>
            <Text style={styles.bgTitle}>Background of the Company</Text>
            <Text style={styles.description}>
                Founded in 2003, we have established ourselves as a leader in robotics education in Ethiopia, offering comprehensive training and resources to foster technological advancement.
            </Text>
            <Text style={styles.historyTitle}>History of the Company</Text>
            <View style={styles.timelineItem}>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <FlatList
                        data={events} // Use the fetched events
                        renderItem={({ item }) => (
                            <TimelineCard item={item} />
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#87CEEB', // Sky Blue
    },
    title: {
        fontSize: 28, // Increased font size
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333', // Darker color for better readability
    },
    description: {
        fontSize: 18, // Slightly larger font
        marginBottom: 20,
        textAlign: 'center',
        color: '#555', // Adjusted color for description
    },
    bgTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'center',
        color: '#333',
    },
    historyTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'center',
        color: '#333',
    },
timelineItem: {
    marginVertical: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 10, // Adjusts spacing
},
});

export default AboutUsPage;
