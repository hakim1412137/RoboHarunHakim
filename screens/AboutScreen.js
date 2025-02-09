import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import TimelineCard1 from '../components/TimelineCard1';
import Header from '../components/Header';
import Menu from '../components/Menu';

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

const AboutUsScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimelineData = () => {
      setLoading(true);
      setEvents(sampleData);
      setLoading(false);
    };

    fetchTimelineData();
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header />
      <Menu navigation={navigation} />

      <View style={styles.contentWrapper}>
        <Text style={styles.title}>About Us</Text>
        <Text style={styles.description}>
          Welcome to the Robotics Educational Center, dedicated to nurturing innovation and creativity in robotics education.
          Our mission is to empower the youth of Ethiopia by providing access to advanced educational resources and hands-on training in robotics and technology.
        </Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Background of the Company</Text>
          <Text style={styles.description}>
            Founded in 2003, we have established ourselves as a leader in robotics education in Ethiopia,
            offering comprehensive training and resources to foster technological advancement.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>History of the Company</Text>
          <View style={styles.timelineContainer}>
            <View style={styles.timelineLine} />
            {loading ? (
              <ActivityIndicator size="large" color="#4A90E2" style={{ marginVertical: 20 }} />
            ) : (
              events.map((item, index) => (
                <View key={item.id} style={styles.timelineItem}>
                  <View style={styles.timelineDot} />
                  <TimelineCard1 item={item} index={index} />
                </View>
              ))
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '40rem',
    backgroundColor: '#FFFFFF',
  },
  contentWrapper: {
    padding: 25,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    fontFamily: 'Electrolize_400Regular',
    marginBottom: 25,
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 15,
    paddingLeft: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4A90E2',
  },
  timelineContainer: {
    marginTop: 10,
    position: 'relative',
  },
  timelineLine: {
    position: 'absolute',
    left: 35,
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: '#4A90E2',
  },
  timelineItem: {
    paddingLeft: 50,
    marginBottom: 25,
    position: 'relative',
  },
  timelineDot: {
    position: 'absolute',
    left: 27,
    top: 24,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4A90E2',
    zIndex: 0,
    borderWidth: 3,
    borderColor: 'white',
  },
});

export default AboutUsScreen;

// import React, { useEffect, useState } from 'react';
// import { View, FlatList, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
// import { Text } from 'react-native-paper';
// import TimelineCard1 from '../components/TimelineCard1';
// import Header from '../components/Header';
// import Menu from '../components/Menu';

// const AboutUsScreen = ({ navigation }) => {
//     const [events, setEvents] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchTimelineData = () => {
//             setLoading(true);
//             const historyData = getHistoryCompany(sampleData); // Fetch history data from sampleData
//             setEvents(historyData);
//             setLoading(false);
//         };

//         fetchTimelineData();
//     }, []);

//     // Sample timeline events data

//     const getHistoryCompany = (data) => {
//         return data; // Currently returns the sample data
//     };

//     return (
//         <ScrollView style={styles.container}>
//             <Header></Header>
//             <Menu navigation={navigation}></Menu>
//             <View style={{ padding: 10, paddingHorizontal: 200 }}>
//                 <Text style={styles.title}>About Us</Text>
//                 <Text style={styles.description}>
//                     Welcome to the Robotics Educational Center, dedicated to nurturing innovation and creativity in the field of robotics education.
//                     Our mission is to empower the youth of Ethiopia by providing access to advanced educational resources and hands-on training in robotics and technology.
//                 </Text>
//                 <Text style={styles.bgTitle}>Background of the Company</Text>
//                 <Text style={styles.description}>
//                     Founded in 2003, we have established ourselves as a leader in robotics education in Ethiopia, offering comprehensive training and resources to foster technological advancement.
//                 </Text>
//                 <Text style={styles.historyTitle}>History of the Company</Text>
//                 <View style={styles.timelineItem}>
//                     {loading ? (
//                         <ActivityIndicator size="large" color="#0000ff" />
//                     ) : (
//                         <FlatList
//                             data={events} // Use the fetched events
//                             style={{ overflow: 'visible' }}
//                             renderItem={({ item, index }) => (
//                                 <TimelineCard1
//                                     item={item}
//                                     index={index}
//                                 />
//                             )}
//                             keyExtractor={(item) => item.id.toString()}
//                             contentContainerStyle={styles.flatList}
//                         />
//                     )}
//                 </View>
//             </View>
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         height: '40rem',
//         backgroundColor: '#FBF1E6', // Sky Blue
//     },
//     title: {
//         fontSize: 28, // Increased font size
//         fontWeight: 'bold',
//         marginBottom: 20,
//         textAlign: 'center',
//         color: '#333', // Darker color for better readability
//     },
//     description: {
//         fontSize: 18, // Slightly larger font
//         marginBottom: 20,
//         textAlign: 'center',
//         color: '#555', // Adjusted color for description
//     },
//     bgTitle: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginTop: 20,
//         marginBottom: 10,
//         textAlign: 'center',
//         color: '#333',
//     },
//     historyTitle: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginTop: 20,
//         marginBottom: 10,
//         textAlign: 'center',
//         color: '#333',
//     },
//     timelineItem: {
//         marginVertical: 10,
//         paddingBottom: 20,
//     },
//     flatList: {
//         paddingBottom: 20, // Additional padding for bottom
//     },
// });
// export default AboutUsScreen;
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
