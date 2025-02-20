import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { getAllClients } from "../utils/api";
import Header from '../components/Header';
import Menu from '../components/Menu';
import { ImageBackground } from "expo-image";
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

const ClientScreen = ({ navigation }) => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadClients = async () => {
            setLoading(true);
            try {
                const { data } = await getAllClients();
                setClients(data || []);
            } catch (error) {
                console.error("Error fetching clients: ", error);
            } finally {
                setLoading(false);
            }
        };
        loadClients();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('clientDetail', { id: item.id })}
            style={styles.cardContainer}
            activeOpacity={0.9}
        >
            <BlurView intensity={30} style={styles.card}>
                <ImageBackground
                    source={require('../assets/images/courseimg.jpg')} // Replace with your image path
                    style={styles.logoContainer}
                    imageStyle={styles.logo}
                >
                    <LinearGradient
                        colors={['rgba(0,168,107,0.3)', 'rgba(0,201,120,0.3)']}
                        style={styles.logoOverlay}
                    />
                </ImageBackground>

                <View style={styles.cardContent}>
                    <Text style={styles.clientName}>{item.company}</Text>
                    <View style={styles.industryTag}>
                        <Text style={styles.industryText}>{item.name || 'Technology'}</Text>
                    </View>

                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <Ionicons name="time" size={14} color="#00A86B" />
                            <Text style={styles.statText}>{item.years || '2+'} Years</Text>
                        </View>
                        <View style={styles.statItem}>
                            <MaterialIcons name="work" size={14} color="#00A86B" />
                            <Text style={styles.statText}>{item.projects || '15+'} Projects</Text>
                        </View>
                    </View>
                </View>
            </BlurView>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <LinearGradient colors={['#FFFFFF', '#F8F8F8']} style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#00A86B" />
                <Text style={styles.loadingText}>Loading Client Portfolio</Text>
            </LinearGradient>
        );
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/images/10511849.jpg')}
                style={styles.background}
                resizeMode="cover"
            >
                <LinearGradient
                    colors={['rgba(0,0,0,0.85)', 'rgba(0,0,0,0.85)']}
                    style={styles.gradientOverlay}
                >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Header />
                        <Menu navigation={navigation} />

                        <View style={styles.content}>
                            <Text style={styles.title}>Trusted Partners</Text>
                            <Text style={styles.subtitle}>Collaborating with Industry Leaders Worldwide</Text>

                            <FlatList
                                data={clients}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.id.toString()}
                                numColumns={2}
                                contentContainerStyle={styles.grid}
                                scrollEnabled={false}
                            />

                            <LinearGradient
                                colors={['#00A86B', '#00C978']}
                                style={styles.statsCard}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <View style={styles.statColumn}>
                                    <Text style={styles.statMain}>150+</Text>
                                    <Text style={styles.statLabel}>Satisfied Clients</Text>
                                </View>
                                <View style={styles.statColumn}>
                                    <Text style={styles.statMain}>98%</Text>
                                    <Text style={styles.statLabel}>Retention Rate</Text>
                                </View>
                            </LinearGradient>
                        </View>
                    </ScrollView>
                </LinearGradient>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100vh',
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
        fontWeight: '600',
    },
    background: {
        flex: 1,
    },
    gradientOverlay: {
        flex: 1,
    },
    content: {
        padding: 20,
        paddingBottom: 40,
    },
    title: {
        fontSize: 36,
        fontWeight: '800',
        color: 'white',
        textAlign: 'center',
        marginBottom: 8,
        textShadowColor: 'rgba(0,0,0,0.15)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    subtitle: {
        fontSize: 18,
        color: 'rgba(255,255,255,0.9)',
        textAlign: 'center',
        marginBottom: 40,
        fontWeight: '500',
    },
    grid: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10
    },
    cardContainer: {
        width: (width - 50) / 2,
        borderRadius: 20,
    },
    card: {
        borderRadius: 20,
        overflow: 'hidden',
        padding: 15,
        backgroundColor: 'rgba(255,255,255,0.15)',
    },
    logoContainer: {
        height: 120,
        marginBottom: 15,
        borderRadius: 15,
        overflow: 'hidden',
    },
    logo: {
        resizeMode: 'contain',
    },
    logoOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    cardContent: {
        alignItems: 'center',
    },
    clientName: {
        fontSize: 16,
        fontWeight: '700',
        color: 'white',
        marginBottom: 10,
        textAlign: 'center',
    },
    industryTag: {
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 12,
        paddingVertical: 4,
        paddingHorizontal: 10,
        marginBottom: 12,
    },
    industryText: {
        fontSize: 12,
        color: 'white',
        fontWeight: '600',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 8,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 6,
    },
    statText: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.9)',
        marginLeft: 4,
    },
    statsCard: {
        borderRadius: 20,
        padding: 25,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 30,
    },
    statColumn: {
        alignItems: 'center',
    },
    statMain: {
        fontSize: 32,
        fontWeight: '800',
        color: 'white',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
        fontWeight: '500',
    },
});

export default ClientScreen;
