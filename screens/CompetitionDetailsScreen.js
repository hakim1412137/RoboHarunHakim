import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Animated } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import { LinearGradient } from 'expo-linear-gradient';
import Loader from '../components/Loader';
import { getCompetitionById, registerForCompetition } from '../utils/api';
import { UserContext } from "../context/UserContext";

const CompetitionDetailsScreen = ({ navigation, route }) => {
    const { competitionId } = route.params;
    const [competition, setCompetition] = useState(null);
    const [loading, setLoading] = useState(true);
    const [registering, setRegistering] = useState(false);
    const fadeAnim = useState(new Animated.Value(0))[0];

    useEffect(() => {
        const fetchCompetition = async () => {
            try {
                const response = await getCompetitionById(competitionId);
                setCompetition(response.data);
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                }).start();
            } catch (error) {
                console.error(error);
                Alert.alert('Error', 'Failed to fetch competition details');
            } finally {
                setLoading(false);
            }
        };

        fetchCompetition();
    }, [competitionId]);

    const handleRegistration = async () => {
        setRegistering(true);
        try {
            const userData = await AsyncStorage.getItem('user');
            const { id: userId } = JSON.parse(userData);
            await registerForCompetition(userId, competitionId);

            Alert.alert("🎉 Success", "Registration successful!");
            navigation.goBack();
        } catch (error) {
            console.error('Registration error:', error);
            Alert.alert("⚠️ Error", error.response?.data?.message || "Registration failed");
        } finally {
            setRegistering(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Icon name="arrow-back" size={28} color="#fff" />
            </TouchableOpacity>

            <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
                {/* Header Section */}
                <LinearGradient
                    colors={['#6C63FF', '#4A47FF']}
                    style={styles.header}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <Text style={styles.title}>{competition?.name}</Text>
                    <View style={styles.priceTag}>
                        <Text style={styles.priceText}>
                            {competition?.price ? `$${competition.price}` : 'Free Entry'}
                        </Text>
                    </View>
                </LinearGradient>

                {/* Details Section */}
                <View style={styles.detailsCard}>
                    <View style={styles.detailItem}>
                        <Icon name="calendar-today" size={22} color="#6C63FF" />
                        <Text style={styles.detailText}>
                            {competition?.dueDate ?
                                new Date(competition.dueDate).toLocaleDateString() :
                                'No deadline'
                            }
                        </Text>
                    </View>

                    <View style={styles.detailItem}>
                        <Icon name="description" size={22} color="#6C63FF" />
                        <Text style={styles.detailText}>
                            {competition?.description || 'No description available'}
                        </Text>
                    </View>

                    <View style={styles.termsSection}>
                        <Icon name="info" size={22} color="#6C63FF" />
                        <Text style={styles.termsText}>
                            By registering, you agree to our terms and conditions
                        </Text>
                    </View>
                </View>

                {/* Action Button */}
                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={handleRegistration}
                    disabled={registering}
                >
                    <LinearGradient
                        colors={['#6C63FF', '#4A47FF']}
                        style={styles.gradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        {registering ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <>
                                <Icon name="how-to-reg" size={24} color="#fff" />
                                <Text style={styles.registerButtonText}>
                                    Register Now
                                </Text>
                            </>
                        )}
                    </LinearGradient>
                </TouchableOpacity>
            </Animated.View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#F5F5F5',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 10,
        padding: 10,
    },
    content: {
        flex: 1,
    },
    header: {
        padding: 30,
        paddingTop: 60,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 15,
        fontFamily: 'Roboto-Bold',
    },
    priceTag: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingVertical: 8,
        paddingHorizontal: 25,
        borderRadius: 20,
    },
    priceText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '600',
    },
    detailsCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 25,
        margin: 20,
        marginTop: -20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 5,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
    },
    detailText: {
        fontSize: 16,
        color: '#555',
        marginLeft: 15,
        flex: 1,
        lineHeight: 24,
    },
    termsSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        padding: 15,
        backgroundColor: '#F8F9FF',
        borderRadius: 12,
    },
    termsText: {
        fontSize: 14,
        color: '#666',
        marginLeft: 15,
        flex: 1,
        fontStyle: 'italic',
    },
    registerButton: {
        marginHorizontal: 20,
        marginBottom: 40,
        borderRadius: 15,
        overflow: 'hidden',
    },
    gradient: {
        padding: 18,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 10,
        fontFamily: 'Roboto-Bold',
    },
});

export default CompetitionDetailsScreen;
