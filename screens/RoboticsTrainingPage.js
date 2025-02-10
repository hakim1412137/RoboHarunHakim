import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';
import Menu from '../components/Menu';
import { getAllTrainings } from '../utils/api';

const { width } = Dimensions.get('window');

const RoboticsTrainingPage = ({ navigation }) => {
    const [trainings, setTrainings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrainings = async () => {
            try {
                const response = await getAllTrainings();
                setTrainings(response.data || []);
            } catch (error) {
                console.error('Error fetching trainings:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTrainings();
    }, []);

    const renderTrainingItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('trainingDetails', { id: item.id })}
            style={styles.trainingCard}
        >
            <LinearGradient
                colors={['#FFFFFF', '#F8F8F8']}
                style={styles.cardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.cardHeader}>
                    <Ionicons name="hardware-chip" size={24} color="#00A86B" />
                    <Text style={styles.trainingTitle}>{item.title}</Text>
                </View>
                <View style={styles.cardDetails}>
                    <Text style={styles.detailText}>Type: {item.trainingType}</Text>
                    <Text style={styles.detailText}>Level: {item.difficultyLevel}</Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Header />
            <Menu navigation={navigation} />

            <ScrollView
                style={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >


                <Text style={styles.sectionTitle}>Program Highlights</Text>

                <View style={styles.featuresGrid}>
                    <ImageBackground
                        source={require('../assets/images/91995.jpg')} // Adjust path as needed
                        style={styles.heroSection}
                        imageStyle={styles.heroImage}
                    >
                        <LinearGradient
                            colors={['rgba(0, 168, 107, 0.8)', 'rgba(0, 201, 120, 0.8)']}
                            style={styles.heroGradient}
                        >
                            <Text style={styles.heroTitle}>Master Robotics Engineering</Text>
                            <Text style={styles.heroSubtitle}>Hands-on training with industry experts</Text>
                        </LinearGradient>
                    </ImageBackground>
                    {[
                        { icon: 'hardware-chip', title: 'Modern Equipment', text: 'Access to latest robotics kits and tools' },
                        { icon: 'people', title: 'Expert Instructors', text: 'Learn from certified professionals' },
                        { icon: 'certificate', title: 'Certification', text: 'Earn recognized credentials' },
                        { icon: 'calendar', title: 'Flexible Scheduling', text: 'Weekend & evening batches available' },
                    ].map((feature, index) => (
                        <View key={index} style={styles.featureCard}>
                            <Ionicons name={feature.icon} size={32} color="#00A86B" />
                            <Text style={styles.featureTitle}>{feature.title}</Text>
                            <Text style={styles.featureText}>{feature.text}</Text>
                        </View>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Curriculum Overview</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {[
                        { week: 'Week 1-2', topic: 'Robotics Fundamentals' },
                        { week: 'Week 3-4', topic: 'Circuit Design' },
                        { week: 'Week 5-6', topic: 'Programming Basics' },
                        { week: 'Week 7-8', topic: 'Advanced Automation' },
                    ].map((item, index) => (
                        <View key={index} style={styles.timelineCard}>
                            <Text style={styles.timelineWeek}>{item.week}</Text>
                            <Text style={styles.timelineTopic}>{item.topic}</Text>
                        </View>
                    ))}
                </ScrollView>
                <View style={styles.content}>
                    <Text style={styles.sectionTitle}>Available Trainings</Text>

                    {loading ? (
                        <ActivityIndicator size="large" color="#00A86B" />
                    ) : (
                        <FlatList
                            data={trainings}
                            renderItem={renderTrainingItem}
                            keyExtractor={item => item.id.toString()}
                            scrollEnabled={false}
                            contentContainerStyle={styles.trainingsList}
                        />
                    )}

                </View>
            </ScrollView>

            <View style={styles.contactBar}>
                <Text style={styles.contactText}>Questions? </Text>
                <TouchableOpacity style={styles.contactButton}>
                    <Text style={styles.contactLink}>Call us: +1 234 567 890</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        height: '40rem',

        backgroundColor: '#FFFFFF',
    },
    scrollContainer: {
        paddingBottom: 80,
        backgroundColor: '#FAF3E0',
    },
    heroSection: {
        height: 300,
        marginBottom: 30,
    },
    heroImage: {
        borderRadius: 0,
    },
    heroGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    heroTitle: {
        fontSize: 32,
        fontWeight: '800',
        color: 'white',
        textAlign: 'center',
        marginBottom: 10,
    },
    heroSubtitle: {
        fontSize: 18,
        color: 'rgba(255,255,255,0.9)',
        textAlign: 'center',
    },
    content: {
        paddingHorizontal: 20,
        backgroundColor: '#FAF3E0',
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#2D3436',
        marginVertical: 25,
        textAlign: 'center',
    },
    trainingsList: {
        paddingBottom: 20,
    },
    trainingCard: {
        borderRadius: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    cardGradient: {
        padding: 20,
        borderRadius: 15,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    trainingTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2D3436',
        marginLeft: 10,
    },
    cardDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailText: {
        fontSize: 14,
        color: '#666',
    },
    featuresGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    featureCard: {
        width: (width - 50) / 2,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 20,
        marginBottom: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    featureTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2D3436',
        marginVertical: 10,
    },
    featureText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    timelineCard: {
        width: 180,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        marginRight: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    timelineWeek: {
        fontSize: 14,
        color: '#00A86B',
        fontWeight: '600',
        marginBottom: 5,
    },
    timelineTopic: {
        fontSize: 16,
        color: '#2D3436',
        fontWeight: '500',
    },
    contactBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#F8F8F8',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: '#EEE',
    },
    contactText: {
        fontSize: 16,
        color: '#666',
    },
    contactLink: {
        fontSize: 16,
        color: '#00A86B',
        fontWeight: '600',
    },
});

export default RoboticsTrainingPage;
/*

// RoboticsTrainingPage.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import Header from '../components/Header';
import Menu from '../components/Menu';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const RoboticsTrainingPage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Header />
            <Menu navigation={navigation} />
            
            <ScrollView 
                style={styles.scrollContainer}
                showsVerticalScrollIndicator={false}>
                <ImageBackground 
                    source={{ uri: 'https://images.unsplash.com/photo-1601134467661-3d775b999c8b' }}
                    style={styles.heroSection}
                    imageStyle={styles.heroImage}
                >
                    <LinearGradient
                        colors={['rgba(0, 168, 107, 0.8)', 'rgba(0, 201, 120, 0.8)']}
                        style={styles.heroGradient}
                    >
                        <Text style={styles.heroTitle}>Master Robotics Engineering</Text>
                        <Text style={styles.heroSubtitle}>Hands-on training with industry experts</Text>
                    </LinearGradient>
                </ImageBackground>

                <View style={styles.content}>
                    <Text style={styles.sectionTitle}>Program Highlights</Text>
                    
                    <View style={styles.featuresGrid}>
                        {[
                            { icon: 'hardware-chip', title: 'Modern Equipment', text: 'Access to latest robotics kits and tools'},
                            { icon: 'people', title: 'Expert Instructors', text: 'Learn from certified professionals'},
                            { icon: 'certificate', title: 'Certification', text: 'Earn recognized credentials'},
                            { icon: 'calendar', title: 'Flexible Scheduling', text: 'Weekend & evening batches available'},
                        ].map((feature, index) => (
                            <View key={index} style={[styles.featureCard, { alignSelf: index % 2 == 0 ? 'flex-end' : 'flex-start' }]}>
                                <Ionicons name={feature.icon} size={32} color="#00A86B" />
                                <Text style={styles.featureTitle}>{feature.title}</Text>
                                <Text style={styles.featureText}>{feature.text}</Text>
                            </View>
                        ))}
                    </View>

                    <TouchableOpacity 
                        style={styles.ctaButton}
                        activeOpacity={0.9}
                        onPress={() => navigation.navigate('trainingLists')}
                    >
                        <LinearGradient
                            colors={['#00A86B', '#00C978']}
                            style={styles.buttonGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={styles.ctaText}>Training VEX</Text>
                            <Ionicons name="arrow-forward" size={24} color="white" />
                        </LinearGradient>
                    </TouchableOpacity>

                    <Text style={styles.sectionTitle}>Curriculum Overview</Text>
                    <View horizontal showsHorizontalScrollIndicator={false} style={styles.timelineScroll}>
                        {[
                            { week: 'Week 1-2', topic: 'Robotics Fundamentals' },
                            { week: 'Week 3-4', topic: 'Circuit Design' },
                            { week: 'Week 5-6', topic: 'Programming Basics' },
                            { week: 'Week 7-8', topic: 'Advanced Automation' },
                        ].map((item, index) => (
                            <View key={index} style={styles.timelineCard}>
                                <Text style={styles.timelineWeek}>{item.week}</Text>
                                <Text style={styles.timelineTopic}>{item.topic}</Text>
                            </View>
                        ))}
                    </View>

                    <Text style={styles.sectionTitle}>Testimonials</Text>
                    <View style={styles.testimonialContainer}>
                        {[
                            { name: 'Abel J.', role: 'Student', text: 'Transformed my understanding of robotics...' },
                            { name: 'Welde G.', role: 'Engineer', text: 'Best practical training you could give!' },
                        ].map((testimonial, index) => (
                            <LinearGradient
                                key={index}
                                colors={['#FFFFFF', '#F8F8F8']}
                                style={styles.testimonialCard}
                            >
                                <Ionicons name="person-circle" size={40} color="#00A86B" />
                                <Text style={styles.testimonialText}>"{testimonial.text}"</Text>
                                <Text style={styles.testimonialName}>{testimonial.name}</Text>
                                <Text style={styles.testimonialRole}>{testimonial.role}</Text>
                            </LinearGradient>
                        ))}
                    </View>
                </View>
            </ScrollView>

            <View style={styles.contactBar}>
                <Text style={styles.contactText}>Questions? </Text>
                <TouchableOpacity style={styles.contactButton}>
                    <Text style={styles.contactLink}>Call us: +1 234 567 890</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContainer: {
        paddingBottom: 80,
        height: '40rem'
    },
    heroSection: {
        height: 300,
        marginBottom: 30,
    },
    heroImage: {
        borderRadius: 0,
    },
    heroGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    heroTitle: {
        fontSize: 32,
        fontWeight: '800',
        color: 'white',
        textAlign: 'center',
        marginBottom: 10,
    },
    heroSubtitle: {
        fontSize: 18,
        color: 'rgba(255,255,255,0.9)',
        textAlign: 'center',
    },
    content: {
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#2D3436',
        marginVertical: 25,
        textAlign: 'center',
    },
    featuresGrid: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginBottom: 30,
    },
    featureCard: {
        width: (width - 50) / 2,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 20,
        marginBottom: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    featureTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2D3436',
        marginVertical: 10,
    },
    featureText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    ctaButton: {
        borderRadius: 15,
        overflow: 'hidden',
        marginVertical: 25,
    },
    buttonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        paddingHorizontal: 30,
    },
    ctaText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        marginRight: 10,
    },
    timelineScroll: {
        marginBottom: 30,
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center'
    },
    timelineCard: {
        width: 180,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        marginRight: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    timelineWeek: {
        fontSize: 14,
        color: '#00A86B',
        fontWeight: '600',
        marginBottom: 5,
    },
    timelineTopic: {
        fontSize: 16,
        color: '#2D3436',
        fontWeight: '500',
    },
    testimonialContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    testimonialCard: {
        width: (width - 50) / 2,
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
    },
    testimonialText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginVertical: 15,
        fontStyle: 'italic',
    },
    testimonialName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2D3436',
    },
    testimonialRole: {
        fontSize: 14,
        color: '#00A86B',
    },
    contactBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#F8F8F8',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: '#EEE',
    },
    contactText: {
        fontSize: 16,
        color: '#666',
    },
    contactLink: {
        fontSize: 16,
        color: '#00A86B',
        fontWeight: '600',
    },
});

export default RoboticsTrainingPage;*/
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import MenuForServices from '../components/MenuForServices'; // Adjust path
// import Menu from '../components/Menu';

// const RoboticsTrainingPage = ({ navigation }) => {
//     return (
//         <View style={styles.container}>
//             <Header></Header>
//             <Menu navigation={navigation}></Menu>
//             {/*<Header />*/}
//             <View style={styles.content}>
//                 <Text style={styles.title}>Robotics Training</Text>
//                 <Text style={styles.bodyText}>
//                     Our robotics training program is designed for individuals and groups eager to learn about robotics.
//                     We provide hands-on training sessions that empower participants with the knowledge needed to build and program robots.
//                 </Text>
//             </View>
//             {/*<Footer />*/}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     content: {
//         padding: 20,
//         paddingHorizontal: 200
//     },
//     title: {
//         fontSize: 24,
//         textAlign: 'center',
//         margin: 20,
//     },
//     bodyText: {
//         fontSize: 16,
//         textAlign: 'center',
//         padding: 20,
//     },
// });

// export default RoboticsTrainingPage;
