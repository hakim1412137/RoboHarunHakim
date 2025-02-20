import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { getAllTeams } from '../utils/api';
import Header from '../components/Header';
import Menu from '../components/Menu';
import { BlurView } from 'expo-blur';
import {ImageBackground} from "expo-image";

const { width, height } = Dimensions.get('window');

const TeamScreen = ({ navigation }) => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeams = async () => {
            setLoading(true);
            try {
                const { data } = await getAllTeams();
                setTeams(data || []);
            } catch (error) {
                console.error('Error fetching teams:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTeams();
    }, []);

    const renderItem = ({ item }) => {
        const roles = Array.isArray(item.role) ? item.role : [item.role || 'Team Member'];

        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('teamDetail', { id: item.id })}
                style={styles.cardContainer}
                activeOpacity={0.9}
            >
                <LinearGradient
                    colors={['#FFFFFF', '#F8F8F8']}
                    style={styles.teamCard}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <ImageBackground
                        source={require('../assets/images/robotWoodWork.jpg')} // Replace with your image path
                        style={styles.avatarContainer}
                        imageStyle={styles.avatar}
                    >
                        <LinearGradient
                            colors={['rgba(0,168,107,0.3)', 'rgba(0,201,120,0.3)']}
                            style={styles.avatarOverlay}
                        />
                        <View style={styles.socialBadge}>
                            <Ionicons name="logo-linkedin" size={16} color="white" />
                        </View>
                    </ImageBackground>

                    <View style={styles.cardContent}>
                        <Text style={styles.name}>{item.name || 'Anonymous'}</Text>
                        <View style={styles.positionContainer}>
                            <MaterialIcons name="work" size={14} color="#00A86B" />
                            <Text style={styles.position}>{item.position || 'Team Member'}</Text>
                        </View>

                        <View style={styles.expertiseContainer}>
                            {roles.map((skill, index) => (
                                <View key={index} style={styles.expertisePill}>
                                    <Ionicons name="ios-checkmark-circle" size={12} color="#00A86B" />
                                    <Text style={styles.expertiseText}>{skill}</Text>
                                </View>
                            ))}
                        </View>

                        <View style={styles.contactInfo}>
                            <Ionicons name="mail" size={14} color="#00A86B" />
                            <Text style={styles.contactText}>{item.email || 'No email provided'}</Text>
                        </View>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        );
    };

    if (loading) {
        return (
            <LinearGradient colors={['#FFFFFF', '#F8F8F8']} style={styles.loadingContainer}>
                <Image
                    source={require('../assets/images/robotWoodWork.jpg')} // Replace with your image path

                    style={{ width: 150, height: 150 }}
                />
                <Text style={styles.loadingText}>Assembling Dream Team...</Text>
            </LinearGradient>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header />
                <Menu navigation={navigation} />

                <View style={styles.scrollContainer}>
                    <LinearGradient
                        colors={['#00A86B', '#00C978']}
                        style={styles.heroSection}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                    >
                        <Text style={styles.heroTitle}>Our Dream Team</Text>
                        <Text style={styles.heroSubtitle}>Experts Driving Innovation Forward</Text>
                        <Ionicons name="ios-people" size={80} color="rgba(255,255,255,0.15)" style={styles.heroIcon} />
                    </LinearGradient>

                    <View style={styles.content}>
                        <Text style={styles.sectionTitle}>Meet the Experts</Text>

                        <View style={styles.teamGrid}>
                            {teams.map((item, index) => renderItem({ item, index }))}
                        </View>

                        <View style={styles.valuesContainer}>
                            <BlurView intensity={30} style={styles.blurContainer}>
                                <View style={styles.statItem}>
                                    <Text style={styles.statNumber}>20+</Text>
                                    <Text style={styles.statLabel}>Years Experience</Text>
                                </View>
                                <View style={styles.statItem}>
                                    <Text style={styles.statNumber}>98%</Text>
                                    <Text style={styles.statLabel}>Satisfaction</Text>
                                </View>
                                <View style={styles.statItem}>
                                    <Text style={styles.statNumber}>∞</Text>
                                    <Text style={styles.statLabel}>Innovation</Text>
                                </View>
                            </BlurView>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <BlurView intensity={30} style={styles.contactBar}>
                <Text style={styles.contactText}>Want to join our team? </Text>
                <TouchableOpacity style={styles.contactButton}>
                    <Ionicons name="briefcase" size={18} color="#00A86B" />
                    <Text style={styles.contactLink}> View Openings</Text>
                </TouchableOpacity>
            </BlurView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '40rem',
        backgroundColor: '#FFFFFF',
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
    },
    loadingText: {
        marginTop: 20,
        color: '#00A86B',
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    scrollContainer: {
        flex: 1,
        paddingBottom: 100,
    },
    heroSection: {
        padding: 24,
        paddingTop: 60,
        paddingBottom: 40,
        position: 'relative',
        overflow: 'hidden',
    },
    heroIcon: {
        position: 'absolute',
        right: 20,
        bottom: -20,
        transform: [{ rotate: '-15deg' }],
    },
    heroTitle: {
        fontSize: 36,
        fontWeight: '800',
        color: 'white',
        textAlign: 'center',
        marginBottom: 12,
        textShadowColor: 'rgba(0,0,0,0.15)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
        letterSpacing: -0.5,
    },
    heroSubtitle: {
        fontSize: 18,
        color: 'rgba(255,255,255,0.95)',
        textAlign: 'center',
        lineHeight: 24,
        fontWeight: '500',
    },
    content: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    sectionTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#2D3436',
        marginVertical: 25,
        textAlign: 'center',
        letterSpacing: -0.5,
    },
    teamGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    cardContainer: {
        width: (width - 50) / 2,
        marginBottom: 20,
        borderRadius: 24,
        shadowColor: '#00A86B',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    teamCard: {
        borderRadius: 24,
        overflow: 'hidden',
    },
    avatarContainer: {
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        borderRadius: 24,
    },
    avatarOverlay: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 24,
    },
    socialBadge: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0,168,107,0.9)',
        borderRadius: 20,
        padding: 6,
    },
    cardContent: {
        padding: 16,
    },
    name: {
        fontSize: 17,
        fontWeight: '700',
        color: '#2D3436',
        marginBottom: 4,
        letterSpacing: -0.2,
    },
    positionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    position: {
        fontSize: 13,
        color: '#00A86B',
        fontWeight: '600',
        marginLeft: 6,
    },
    expertiseContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    expertisePill: {
        backgroundColor: '#E8F5E9',
        borderRadius: 14,
        paddingVertical: 6,
        paddingHorizontal: 10,
        marginRight: 6,
        marginBottom: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    expertiseText: {
        fontSize: 11,
        color: '#00A86B',
        fontWeight: '600',
        marginLeft: 4,
    },
    contactInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    contactText: {
        fontSize: 12,
        color: '#666',
        marginLeft: 6,
    },
    valuesContainer: {
        borderRadius: 24,
        overflow: 'hidden',
        marginTop: 30,
    },
    blurContainer: {
        padding: 25,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        color: '#00A86B',
        fontSize: 28,
        fontWeight: '800',
        marginBottom: 4,
    },
    statLabel: {
        color: '#2D3436',
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
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
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        overflow: 'hidden',
    },
    contactButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,168,107,0.1)',
        borderRadius: 14,
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    contactLink: {
        fontSize: 16,
        color: '#00A86B',
        fontWeight: '600',
        marginLeft: 6,
    },
});

export default TeamScreen;
