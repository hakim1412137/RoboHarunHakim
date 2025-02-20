import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { getAllTrainings } from '../utils/api';
import Header from "../components/Header";
import Menu from "../components/Menu";

const { width, height } = Dimensions.get('window');

const RoboticsTrainingList = ({ navigation }) => {
    const [trainings, setTrainings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrainings = async () => {
            setLoading(true);
            try {
                const response = await getAllTrainings();
                setTrainings(response.data);
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
            style={styles.cardContainer}
            activeOpacity={0.9}
        >
            <LinearGradient
                colors={['#FFFFFF', '#F8F8F8']}
                style={styles.trainingCard}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.cardHeader}>
                    <Ionicons name="robot" size={28} color="#00A86B" />
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <View style={[styles.difficultyBadge,
                        { backgroundColor: item.difficultyLevel === 'Advanced' ? '#FFEBEE' : '#E8F5E9' }]}>
                        <Text style={styles.difficultyText}>{item.difficultyLevel}</Text>
                    </View>
                </View>

                <View style={styles.cardFooter}>
                    <View style={styles.durationBadge}>
                        <Ionicons name="time" size={16} color="#00A86B" />
                        <Text style={styles.durationText}>8 Weeks</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color="#666" />
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <LinearGradient colors={['#FFFFFF', '#F8F8F8']} style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#00A86B" />
                <Text style={styles.loadingText}>Loading Cutting-Edge Content</Text>
            </LinearGradient>
        );
    }

    return (
        <View style={styles.container}>
            <Header />
            <Menu navigation={navigation} />

            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Hero Section */}
                <ImageBackground
                    source={{ uri: 'https://images.unsplash.com/photo-1601134467661-3d775b999c8b' }}
                    style={styles.heroSection}
                    imageStyle={styles.heroImage}
                >
                    <LinearGradient
                        colors={['rgba(0, 168, 107, 0.9)', 'rgba(0, 201, 120, 0.8)']}
                        style={styles.heroGradient}
                    >
                        <Text style={styles.heroTitle}>Future Robotics Academy</Text>
                        <Text style={styles.heroSubtitle}>Master AI-Powered Robotics Systems</Text>
                    </LinearGradient>
                </ImageBackground>

                {/* Categories */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesContainer}
                >
                    {['All', 'Beginner', 'Advanced', 'Certification', 'Workshops'].map((category, index) => (
                        <TouchableOpacity key={index} style={styles.categoryPill}>
                            <Text style={styles.categoryText}>{category}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Main Content */}
                <View style={styles.content}>
                    <Text style={styles.sectionTitle}>Featured Programs</Text>

                    {trainings.map((item, index) => renderTrainingItem({ item, index }))}

                    {/* Value Proposition */}
                    <LinearGradient
                        colors={['#00A86B', '#00C978']}
                        style={styles.valueProposition}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Ionicons name="ribbon" size={40} color="white" />
                        <View style={styles.valueTextContainer}>
                            <Text style={styles.valueTitle}>Why Choose Us?</Text>
                            <Text style={styles.valueSubtitle}>Industry-leading curriculum • 94% Success Rate • Job Placement Support</Text>
                        </View>
                    </LinearGradient>
                </View>
            </ScrollView>

            {/* Floating Action Button */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('enrollment')}
            >
                <LinearGradient
                    colors={['#00A86B', '#00C978']}
                    style={styles.fabGradient}
                >
                    <Ionicons name="add" size={28} color="white" />
                </LinearGradient>
            </TouchableOpacity>

            {/* Contact Bar */}
            <LinearGradient
                colors={['rgba(255,255,255,0.97)', 'rgba(248,248,248,0.97)']}
                style={styles.contactBar}
            >
                <Text style={styles.contactText}>Need career guidance? </Text>
                <TouchableOpacity style={styles.contactButton}>
                    <Ionicons name="logo-whatsapp" size={20} color="#00A86B" />
                    <Text style={styles.contactLink}> Chat Now</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 20,
        color: '#00A86B',
        fontSize: 16,
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    heroSection: {
        height: height * 0.35,
    },
    heroImage: {
        borderRadius: 0,
    },
    heroGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    heroTitle: {
        fontSize: 32,
        fontWeight: '800',
        color: 'white',
        textAlign: 'center',
        marginBottom: 12,
        textShadowColor: 'rgba(0,0,0,0.15)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    heroSubtitle: {
        fontSize: 18,
        color: 'rgba(255,255,255,0.95)',
        textAlign: 'center',
        lineHeight: 24,
    },
    categoriesContainer: {
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    categoryPill: {
        backgroundColor: '#E8F5E9',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginRight: 10,
    },
    categoryText: {
        color: '#00A86B',
        fontWeight: '600',
    },
    content: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    sectionTitle: {
        fontSize: 26,
        fontWeight: '700',
        color: '#2D3436',
        marginVertical: 25,
        textAlign: 'center',
        letterSpacing: -0.5,
    },
    cardContainer: {
        marginBottom: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    trainingCard: {
        padding: 25,
        borderRadius: 20,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#2D3436',
        marginLeft: 15,
        flex: 1,
    },
    difficultyBadge: {
        borderRadius: 12,
        paddingVertical: 4,
        paddingHorizontal: 12,
    },
    difficultyText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#00A86B',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    durationBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8F5E9',
        borderRadius: 12,
        padding: 8,
    },
    durationText: {
        color: '#00A86B',
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 6,
    },
    valueProposition: {
        borderRadius: 20,
        padding: 25,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
    },
    valueTextContainer: {
        flex: 1,
        marginLeft: 20,
    },
    valueTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 8,
    },
    valueSubtitle: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 14,
        lineHeight: 20,
    },
    fab: {
        position: 'absolute',
        bottom: 80,
        right: 25,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 8,
    },
    fabGradient: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contactBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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

export default RoboticsTrainingList;
