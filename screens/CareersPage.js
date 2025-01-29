import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import TimelineCard1 from '../components/TimelineCard1';

const CareersPage = () => {
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
        { id: 1, year: 2003, event: 'Founding of the Robotics Educational Center in Ethiopia.', eventDate: '2003-01-01T00:00:00Z', title: 'Founding the Center', subtitle: 'A New Era in Robotics Education' },
        { id: 2, year: 2005, event: 'Launched the first series of robotics training programs for schools.', eventDate: '2005-06-15T00:00:00Z', title: 'First Training Programs', subtitle: 'Empowering Young Minds' },
        { id: 3, year: 2007, event: 'First robotics competition held in Ethiopia, organized by the center.', eventDate: '2007-09-10T00:00:00Z', title: 'Inaugural Competition', subtitle: 'A Competitive Spirit' },
        { id: 4, year: 2010, event: 'Introduced online shopping platform for robotics kits and educational materials.', eventDate: '2010-04-01T00:00:00Z', title: 'Launch of Online Store', subtitle: 'Convenience in Robotics' },
        { id: 5, year: 2012, event: 'Conducted community workshops to promote STEM education.', eventDate: '2012-11-20T00:00:00Z', title: 'Community Workshops', subtitle: 'Engaging the Community' },
        { id: 6, year: 2015, event: 'Opened a physical store in Addis Ababa for robotics supplies.', eventDate: '2015-07-05T00:00:00Z', title: 'Physical Store Opening', subtitle: 'Accessibility to Robotics Kits' },
        { id: 7, year: 2018, event: 'Became the leading supplier of robotics components in Ethiopia.', eventDate: '2018-10-12T00:00:00Z', title: 'Market Leadership', subtitle: 'Trusted Supplier' },
        { id: 8, year: 2020, event: 'Expanded services to include specialized courses in robotics and AI.', eventDate: '2020-05-30T00:00:00Z', title: 'Course Expansion', subtitle: 'Innovative Learning Paths' },
        { id: 9, year: 2022, event: 'Introduced a scholarship program for underprivileged students.', eventDate: '2022-01-15T00:00:00Z', title: 'Scholarship Program', subtitle: 'Giving Back to the Community' },
        { id: 10, year: 2025, event: 'Celebrated 22 years of service in robotics education and community involvement.', eventDate: '2025-12-01T00:00:00Z', title: 'Anniversary Celebration', subtitle: 'Milestone Achievements' },
    ];

    const getHistoryCompany = (data) => {
        return data; // Currently returns the sample data
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
                        renderItem={({ item, index }) => (
                            <TimelineCard1
                                item={item}
                                index={index}
                            />
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.flatList}
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
        paddingBottom: 20,
    },
    flatList: {
        paddingBottom: 20, // Additional padding for bottom
    },
});
export default CareersPage;


/*// CareersPage.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MenuForAboutUs from '../components/MenuForAboutUs'; // Adjust path

const CareersPage = () => {
    return (
        <View style={styles.container}>
            {/!*<Header />*!/}
            <MenuForAboutUs /> {/!* Render the About Us menu *!/}
            {/!*<MenuForAboutUs setCurrentPage={setCurrentPage} /> /!* Pass down the function *!/!*!/}
            <View style={styles.content}>
                <Text style={styles.title}>Careers</Text>
                <Text style={styles.bodyText}>
                    Join our passionate team at the Robotics Education Platform!
                    We are always looking for innovative minds dedicated to shaping the future of robotics education.
                    Check below for our available positions:
                </Text>
                <Text style={styles.bodyText}>
                    - Robotics Instructor
                    - Software Developer
                    - Curriculum Designer
                </Text>
            </View>
            {/!*<Footer />*!/}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        margin: 20,
    },
    bodyText: {
        fontSize: 16,
        textAlign: 'center',
        padding: 20,
    },
});

export default CareersPage;*/
