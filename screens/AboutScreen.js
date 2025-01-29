import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import TimelineCard from '../components/TimelineCard';
import { getTimelineEvents } from '../utils/api'; // Ensure this path is correct

const AboutScreen = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
      //const [hovered, setHovered] = useState(true);

    useEffect(() => {
        const fetchTimelineData = async () => {
            setLoading(true);
     try {
                const response = await getTimelineEvents(); // Fetch events from the backend
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
        flex: 1,
        padding: 16,
        backgroundColor: '#87CEEB', // Sky Blue
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
        flexDirection: 'column',
        gap: '1rem' // Adjusts spacing
    },
});
export default AboutScreen;
/*// AboutUsPage.js
    const response = [
                    {
                        id: 1,
                        title: "Launching New Robotics Program",
                        subtitle: "Exciting opportunities ahead!",
                        description: "We are thrilled to announce our new robotics program.",
                        eventDate: "2025-08-01T09:00:00",
                    },
                    {
                        id: 2,
                        title: "Annual Fair Recap",
                        subtitle: "Highlights from the event.",
                        description: "Join us to celebrate the success of the Annual Robotics Fair.",
                        eventDate: "2025-07-20T15:00:00",
                    },
                    {
                        id: 3,
                        title: "Summer Camp Registration",
                        subtitle: "Time to Sign Up!",
                        description: "Registration for the summer robotics camp opens on May 1st.",
                        eventDate: "2025-05-01T08:00:00",
                    },
                    {
                        id: 4,
                        title: "AI in Robotics Workshop",
                        subtitle: "Workshop Announcement",
                        description: "Join us for a workshop on AI applications in robotics.",
                        eventDate: "2025-05-12T14:00:00",
                    },
                    {
                        id: 5,
                        title: "Community Robotics Competition",
                        subtitle: "Get Ready!",
                        description: "The community robotics competition is scheduled for June 20th.",
                        eventDate: "2025-06-20T09:00:00",
                    },
                ];
                setEvents(response); // Set state with fetched events
            } catch (error) {
                console.error('Error fetching timeline data:', error);
            } finally {
                setLoading(false);
            }
        };

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getTimelineEvents } from '../utils/api'; // Ensure this path is correct

const AboutScreen = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTimelineData = async () => {
            setLoading(true);
            try {
                const response = await getTimelineEvents(); // Fetch events from the backend
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
        <View style={styles.container}>
            <Text style={styles.title}>About Robotics Educational and Shop Center</Text>
            <Text style={styles.description}>
                Robotics Application strives to make a better Africa via AI technology and innovation.
            </Text>

            <Text style={styles.subtitle}>Timeline of Key Events</Text>
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <FlatList
                    data={events}
                    renderItem={({ item }) => (
                        <View style={styles.timelineItem}>
                            <Text style={styles.date}>{item.eventDate}</Text>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                            <Text>{item.subtitle}</Text>
                            {item.description && <Text style={styles.description}>{item.description}</Text>}
                        </View>
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
    description: {
        fontSize: 16,
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '600',
        marginVertical: 10,
    },
    timelineItem: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
    },
    date: {
        fontWeight: 'bold',
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },

 description: {
        fontSize: 14,
        color: '#666',
    },

});

export default AboutScreen;*/



/*

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

// Sample data for Ewenet Communication's history
const timelineData = [
    {
        id: '1',
        title: 'Establishment',
        subtitle: 'Establishment of Ewenet Communication with a capital of 20,000 birr.',
        date: '17-02-2012',
        description: 'Founded to provide comprehensive communication solutions in Africa.',
    },
    {
        id: '2',
        title: 'Voluntary Support',
        subtitle: 'Voluntarily supported the rebranding of the Ministry of Labor and Social Affairs Ethiopia.',
        date: '2012',
    },
    {
        id: '3',
        title: 'Covid-19 Time & Election',
        subtitle: 'Developed different technologies voluntarily to combat COVID-19 transmission in Ethiopia.',
        date: '2013',
    },
    {
        id: '4',
        title: 'Election Time',
        subtitle: 'Continued supporting technological development and communication strategies in Ethiopia during elections.',
        date: '2013',
    },
];

const AboutScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>About Ewenet Communication</Text>
            <Text style={styles.description}>
                Ewenet Communication strives to make a better Africa via technology and innovation.
            </Text>

            <Text style={styles.subtitle}>Timeline of Key Events</Text>
            <FlatList
                data={timelineData}
                renderItem={({ item }) => (
                    <View style={styles.timelineItem}>
                        <Text style={styles.date}>{item.date}</Text>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <Text>{item.subtitle}</Text>
                        {item.description && <Text style={styles.description}>{item.description}</Text>}
                    </View>
                )}
                keyExtractor={(item) => item.id}
                style={styles.timelineList}
            />
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
    description: {
        fontSize: 16,
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '600',
        marginVertical: 10,
    },
    timelineList: {
        marginVertical: 20,
    },
    timelineItem: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
    },
    date: {
        fontWeight: 'bold',
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AboutScreen;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MenuForAboutUs from '../components/MenuForAboutUs'; // Adjust path

const AboutUsPage = () => {
    return (
        <View style={styles.container}>
            {/!*<Header />*!/}
            <MenuForAboutUs /> {/!* Render the About Us menu *!/}
            {/!*<MenuForAboutUs setCurrentPage={setCurrentPage} /> /!* Pass down the function *!/!*!/}

            <View style={styles.content}>
                <Text style={styles.title}>About Us</Text>
                <Text style={styles.bodyText}>
                    Welcome to the Robotics Education Platform. We strive to create all-rounded customer satisfaction and prioritize social concerns.
                    Our mission is to empower individuals and organizations through innovative robotics education.
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

export default AboutUsPage;*/
/*
// AboutUsPage.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MenuForAboutUs from './MenuForAboutUs'; // Adjust the import path
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutUsPage = ({ setCurrentPage }) => {
    return (
        <View style={styles.container}>
            <Header />
            <MenuForAboutUs setCurrentPage={setCurrentPage} /> {/!* Render the About Us menu *!/}
            <View style={styles.content}>
                <Text style={styles.title}>About Us Content Goes Here!</Text>
            </View>
            <Footer />
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
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AboutUsPage;
*/

/*// AboutUsPage.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MenuForAboutUs from '../components/MenuForAboutUs'; // Adjust paths as necessary
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutUsPage = () => {
    return (
        <View style={styles.container}>
            <Header />
            <MenuForAboutUs /> {/!* Render specific menu for About Us *!/}
            <View style={styles.content}>
                <Text style={styles.title}>About Us Content Goes Here!</Text>
            </View>
            <Footer />
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
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AboutUsPage;*/

/*// src/pages/AboutUsPage.js
import React from 'react';

const AboutUsPage = () => (
    <div className="about-us-page">
        <h2>About Us</h2>
        <p>Learn more about our mission to educate the next generation of roboticists.</p>
    </div>
);

export default AboutUsPage;*/
