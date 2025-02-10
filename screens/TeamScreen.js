/*import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { getAllTeams } from '../utils/api'; // Ensure this path is correct
import TeamCard from '../components/TeamCard'; // Adjust path to your TeamCard component
import Header from '../components/Header';
import Menu from '../components/Menu';

const TeamScreen = ({ navigation }) => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeams = async () => {
            setLoading(true);
            try {
                const response = await getAllTeams(); // Fetch teams data
                console.log("Fetched Teams Data: ", response); // Log to check fetched data
                setTeams(response.data); // Set teams data in state
            } catch (error) {
                console.error("Error fetching teams: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeams(); // Call the function to fetch team data
    }, []);

    const renderItem = ({ item }) => {
        return (
            <TeamCard
                team={item} // Pass team member data to the TeamCard component
                onPress={() => navigation.navigate('teamDetail', { id: item.id })} // Navigate to detail screen
            />
        );
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <ScrollView style={styles.container}  showsVerticalScrollIndicator={false} >
            <Header></Header>
            <Menu navigation={navigation}></Menu>
            <View style={{ padding: 20, paddingHorizontal: 200 }}>
                <Text style={styles.title}>Our Team</Text>
                <FlatList
                    data={teams}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem} // Render item using the defined function
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '40rem',
        backgroundColor: '#FBF1E6'
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
        textAlign: 'center',
    },
});

export default TeamScreen;*/
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { getAllTeams } from '../utils/api';
import Header from '../components/Header';
import Menu from '../components/Menu';

const { width, height } = Dimensions.get('window');

const TeamScreen = ({ navigation }) => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeams = async () => {
            setLoading(true);
            try {
                const { data } = await getAllTeams();
                setTeams(data || []); // Fallback to empty array if data is undefined
            } catch (error) {
                console.error('Error fetching teams:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTeams();
    }, []);

    const renderItem = ({ item }) => {
        // Ensure item.role is an array
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
                  {/*  <ImageBackground
                        source={{ uri: item.photo }}
                        style={styles.avatarContainer}
                        imageStyle={styles.avatar}
                    >
                        <LinearGradient
                            colors={['rgba(0, 168, 107, 0.3)', 'rgba(0, 201, 120, 0.3)']}
                            style={styles.avatarOverlay}
                        />
                    </ImageBackground>*/}

                    <View style={styles.cardContent}>
                        <Text style={styles.name}>{item.name || 'Anonymous'}</Text>
                        <Text style={styles.position}>{item.position || 'Team Member'}</Text>

                        <View style={styles.expertiseContainer}>
                            {roles.map((skill, index) => (
                                <View key={index} style={styles.expertisePill}>
                                    <Text style={styles.expertiseText}>{skill}</Text>
                                </View>
                            ))}
                        </View>

                        <View style={styles.contactInfo}>
                            <Ionicons name="mail" size={16} color="#00A86B" />
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
                <ActivityIndicator size="large" color="#00A86B" />
                <Text style={styles.loadingText}>Loading Dream Team</Text>
            </LinearGradient>
        );
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Header />
            <Menu navigation={navigation} />

            <View
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <LinearGradient
                    colors={['#00A86B', '#00C978']}
                    style={styles.heroSection}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                >
                    <Text style={styles.heroTitle}>Our Dream Team</Text>
                    <Text style={styles.heroSubtitle}>Experts Driving Innovation Forward</Text>
                </LinearGradient>

                <View style={styles.content}>
                    <Text style={styles.sectionTitle}>Meet the Experts</Text>

                    <View style={styles.teamGrid}>
                        {teams.map((item, index) => renderItem({ item, index }))}
                    </View>

                    <LinearGradient
                        colors={['#00A86B', '#00C978']}
                        style={styles.valuesContainer}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Ionicons name="people" size={40} color="white" />
                        <View style={styles.valuesTextContainer}>
                            <Text style={styles.valuesTitle}>Our Strength</Text>
                            <Text style={styles.valuesSubtitle}>
                                100+ Years Combined Experience • 98% Client Satisfaction • Continuous Learning
                            </Text>
                        </View>
                    </LinearGradient>
                </View>
            </View>

            <LinearGradient
                colors={['rgba(255,255,255,0.97)', 'rgba(248,248,248,0.97)']}
                style={styles.contactBar}
            >
                <Text style={styles.contactText}>Want to join our team? </Text>
                <TouchableOpacity style={styles.contactButton}>
                    <Ionicons name="briefcase" size={18} color="#00A86B" />
                    <Text style={styles.contactLink}> View Openings</Text>
                </TouchableOpacity>
            </LinearGradient>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        height: '40rem',

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
        padding: 24,
        paddingTop: 40,
        paddingBottom: 40,
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
    teamGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    cardContainer: {
        width: (width - 50) / 2,
        marginBottom: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    teamCard: {
        borderRadius: 20,
        overflow: 'hidden',
    },
    avatarContainer: {
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        borderRadius: 20,
    },
    avatarOverlay: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 20,
    },
    cardContent: {
        padding: 15,
    },
    name: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2D3436',
        marginBottom: 4,
    },
    position: {
        fontSize: 12,
        color: '#00A86B',
        fontWeight: '600',
        marginBottom: 10,
    },
    expertiseContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    expertisePill: {
        backgroundColor: '#E8F5E9',
        borderRadius: 12,
        paddingVertical: 4,
        paddingHorizontal: 8,
        marginRight: 6,
        marginBottom: 6,
    },
    expertiseText: {
        fontSize: 10,
        color: '#00A86B',
        fontWeight: '600',
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
        borderRadius: 20,
        padding: 25,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
    },
    valuesTextContainer: {
        flex: 1,
        marginLeft: 20,
    },
    valuesTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 8,
    },
    valuesSubtitle: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 14,
        lineHeight: 20,
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
    contactLink: {
        fontSize: 16,
        color: '#00A86B',
        fontWeight: '600',
    },
});

export default TeamScreen;

