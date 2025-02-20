import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import TimelineCard1 from '../components/TimelineCard1';
import Header from '../components/Header';
import Menu from '../components/Menu';
import {ImageBackground} from "expo-image";

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
      <ImageBackground
          source={require('../assets/images/91995.jpg')} // Replace with your image path
          style={styles.background} // Apply full screen styles
          resizeMode="cover" // Cover the entire background
      >
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
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '40rem',
  },
  background: {
    flex: 1, // Allow ImageBackground to cover the full screen
    // height: '20rem',
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  content: {
    padding: 20, // Add padding around the content
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: Transparent overlay for better text readability
    padding: 10,
    borderRadius: 5,
    alignItems: 'center', // Center the text
  },
  contentWrapper: {
    padding: 25,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    // color: '#2C3E50',
    color: 'white', // Text color
    textAlign: 'center',
    fontFamily: 'Electrolize_400Regular',
    marginBottom: 25,
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  card: {
    // backgroundColor: '#003366',
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
    // color: '#2C3E50',
    color: 'white', // Text color
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

