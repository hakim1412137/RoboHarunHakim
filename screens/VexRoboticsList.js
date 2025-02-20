// src/components/VexRoboticsList.js
import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    Dimensions,
    ImageBackground,
    TouchableOpacity,
    FlatList,
    Animated
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { getAllVexRobotics } from "../utils/api";
import Header from '../components/Header';
import Menu from '../components/Menu';
import { transform } from '@babel/core';

const { width } = Dimensions.get('window');

const VexRoboticsList = ({ navigation }) => {
    const [platforms, setPlatforms] = useState([]);
    const [loading, setLoading] = useState(true);

    const imageScale = useRef(new Animated.Value(1)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const mainTitleTranslate = fadeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [60, 0], // Inline calculation
    });

    const subTitleTranslate= fadeAnim.interpolate({
        inputRange: [0.5, 1],
        outputRange: [60, 0], // Inline calculation
    });

    // Fade in animation on mount.
    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
            easing: Animated.easing
        }).start();

        Animated.timing(imageScale, {
            toValue: 1.2,
            duration: 20000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);


    useEffect(() => {
        const loadPlatforms = async () => {
            setLoading(true);
            try {
                const { data } = await getAllVexRobotics();
                setPlatforms(data || []);
            } catch (error) {
                console.error("Error fetching platforms: ", error);
            } finally {
                setLoading(false);
            }
        };
        loadPlatforms();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('VexRobotDetail', { id: item.id })}
            style={styles.cardContainer}
        >
            <ImageBackground
                style={styles.cardImage}
                imageStyle={styles.cardImageInner}
            >
                <LinearGradient
                    colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.8)']}
                    style={styles.cardOverlay}
                >
                        <Text style={styles.cardTitle}>{item.platformName}</Text>
                        <View style={styles.cardInfo}>
                            <MaterialIcons name="precision-manufacturing" size={20} color="#00C978" />
                            <Text style={styles.cardText}>{item.targetAudience}</Text>
                        </View>
                </LinearGradient>
            </ImageBackground>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <>
            <Header />
            <Menu navigation={navigation} />

            <LinearGradient colors={['#FFFFFF', '#F4F6F9']} style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#00C978" />
                <Text style={styles.loadingText}>Loading Robotics Platforms...</Text>
            </LinearGradient>
            </>
        );
    }

    return (
        <View style={styles.container}>
            <Header />
            <Menu navigation={navigation} />

            <ScrollView showsVerticalScrollIndicator={false} style={{ height: '40rem' }}>
                <View style={styles.heroSection}>
                    <LinearGradient
                        colors={['white', 'transparent', 'white']}
                        style={{ position: 'absolute', width: '100%', height: '100%', top: 0, bottom: 0, zIndex: -1 }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
    
                    </LinearGradient>

                    <Animated.Image 
                        source={{ uri: 'https://img.freepik.com/premium-photo/quothigh-school-students-energized-tech-labquot_1324785-78582.jpg?w=1060' }}
                        style={{ transform: [{ scale: imageScale }], position: 'absolute', width: '100%', height: '100%', top: 0, bottom: 0, zIndex: -2 }} 
                    />

                    <Animated.View style={[{ opacity: fadeAnim }]}>
                        <Animated.View style={{ transform: [{ translateY: mainTitleTranslate }] }}>
                            <Text style={styles.heroTitle}>VEX Robotics Platforms</Text>
                        </Animated.View>
                        <Animated.View style={{ transform: [{ translateY: subTitleTranslate }] }}>
                            <Text style={styles.heroSubtitle}>Innovative Solutions for STEM Education</Text>
                        </Animated.View>
                    </Animated.View>
                </View>

                <View style={styles.gridContainer}>
                    <FlatList
                        data={platforms}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                        numColumns={2}
                        contentContainerStyle={styles.gridContent}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100vh',
        backgroundColor: '#F4F6F9',
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
    heroSection: {
        height: '25rem',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    heroTitle: {
        fontSize: 50,
        fontWeight: '800',
        color: 'white',
        fontFamily: 'Electrolize_400Regular',
        textAlign: 'center',
        marginBottom: 8,
        textShadowColor: 'rgba(0,0,0,0.15)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    heroSubtitle: {
        fontSize: 18,
        fontFamily: 'Electrolize_400Regular',
        color: 'rgba(255,255,255,0.9)',
        textAlign: 'center',
        fontWeight: '500',
    },
    gridContainer: {
        padding: 16,
    },
    gridContent: {
        justifyContent: 'space-between',
    },
    cardContainer: {
        width: (width - 40) / 2,
        height: 200,
        margin: 8,
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    cardImage: {
        flex: 1,
    },
    cardImageInner: {
        borderRadius: 20,
    },
    cardOverlay: {
        flex: 1,
        padding: 16,
        justifyContent: 'flex-end',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: 'white',
        marginBottom: 8,
    },
    cardInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardText: {
        color: 'rgba(255,255,255,0.9)',
        marginLeft: 8,
        fontSize: 14,
    },
});
export default VexRoboticsList;


