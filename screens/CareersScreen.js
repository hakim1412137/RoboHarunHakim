import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAllCareers } from "../utils/api";
import Menu from "../components/Menu";
import Header from "../components/Header";

const CareersScreen = ({ navigation }) => {
    const [careers, setCareers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCareers = async () => {
            try {
                const response = await getAllCareers();
                setCareers(response.data);
            } catch (error) {
                console.error(error);
                Alert.alert("Error", "Failed to fetch careers");
            } finally {
                setLoading(false);
            }
        };
        fetchCareers();
    }, []);

    const renderCareerItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Ionicons name="briefcase" size={24} color="#4B5563" />
                <Text style={styles.title}>{item.title}</Text>
            </View>
            <Text style={styles.description}>{item.description}</Text>
            <TouchableOpacity
                style={styles.applyButton}
                onPress={() => Linking.openURL(item.application_link)}
            >
                <Text style={styles.buttonText}>Apply Now</Text>
                <Ionicons name="arrow-forward-circle" size={20} color="white" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Header />
            <Menu navigation={navigation} />

            <FlatList
                ListHeaderComponent={
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>Career Opportunities</Text>
                        <View style={styles.aboutSection}>
                            <Text style={styles.aboutText}>
                                Welcome to the Robotics Educational Center, dedicated to nurturing innovation
                                and creativity in robotics education.
                            </Text>
                            <View style={styles.highlightBox}>
                                <Ionicons name="school" size={28} color="#3B82F6" />
                                <Text style={styles.highlightText}>
                                    Established in 2003, we're leaders in Ethiopian robotics education
                                </Text>
                            </View>
                        </View>
                    </View>
                }
                data={careers}
                renderItem={renderCareerItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No current openings available</Text>
                }
                ListFooterComponent={<View style={{ height: 30 }} />}
                refreshing={loading}
                onRefresh={() => {}}
            />

            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#3B82F6" />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    headerContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    header: {
        fontSize: 28,
        fontWeight: '800',
        color: '#1F2937',
        textAlign: 'center',
        marginBottom: 15,
    },
    aboutSection: {
        marginBottom: 25,
    },
    aboutText: {
        fontSize: 16,
        color: '#4B5563',
        lineHeight: 24,
        textAlign: 'center',
        marginBottom: 20,
    },
    highlightBox: {
        backgroundColor: '#EFF6FF',
        borderRadius: 12,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    highlightText: {
        flex: 1,
        fontSize: 14,
        color: '#1E40AF',
        lineHeight: 20,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        marginHorizontal: 20,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1F2937',
    },
    description: {
        fontSize: 14,
        color: '#4B5563',
        lineHeight: 20,
        marginBottom: 20,
    },
    applyButton: {
        backgroundColor: '#3B82F6',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
    emptyText: {
        textAlign: 'center',
        color: '#6B7280',
        marginVertical: 40,
        fontSize: 16,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255,255,255,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContainer: {
        paddingBottom: 40,
    },
});

export default CareersScreen;
/*
import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, ScrollView} from 'react-native';
import {getAllCareers} from "../utils/api";
import Menu from "../components/Menu";
import Header from "../components/Header"; // Replace with your API utility

const CareersScreen = ({ navigation }) => {
    const [careers, setCareers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCareers = async () => {
            try {
                const response = await getAllCareers(); // Adjust the endpoint accordingly
                setCareers(response.data);
            } catch (error) {
                console.error(error);
                Alert.alert("Error", "Failed to fetch careers");
            } finally {
                setLoading(false);
            }
        };

        fetchCareers();
    }, []);

    const renderCareerItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text style={styles.link}>{item.application_link}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Header />
            <Menu navigation={navigation} />
            <ScrollView style={{ padding: 17, paddingHorizontal: 100, height: '40rem' }} showsVerticalScrollIndicator={false}>
                <Text style={styles.header}>Career Opportunities</Text>
                <Text style={{ textAlign: 'center', marginVertical: 11, fontSize: 14 }}>
                    Welcome to the Robotics Educational Center, dedicated to nurturing innovation and creativity in the field of robotics education.
                    Our mission is to empower the youth of Ethiopia by providing access to advanced educational resources and hands-on training in robotics and technology.
                </Text>
                <Text style={{ marginVertical: 11, fontWeight: 'bold', textAlign: 'center', fontSize: 16 }}>Background of the Company</Text>
                <Text style={{ fontSize: 15, textAlign: 'center' }}>
                    Founded in 2004, we have established ourselves as a leader in robotics education in Ethiopia, offering comprehensive training and resources to
                    foster technological advancement.
                </Text>
                {loading ? (
                    <ActivityIndicator size="large" color="#0001ff" />
                ) : (
                    <FlatList
                        data={careers}
                        contentContainerStyle={{  marginTop: 26 }}
                        renderItem={renderCareerItem}
                        keyExtractor={item => item.id.toString()}
                    />
                )}
            </ScrollView>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: '#FBF2E6',
        height: '41rem'
    },
    header: {
        fontSize: 25,
        fontWeight: 'bold',
        width: '101%',
        textAlign: 'center'
    },
    card: {
        marginBottom: 16,
        padding: 16,
        borderRadius: 6,
        shadowColor: '#001',
        shadowOpacity: 1.1,
        shadowRadius: 6,
        elevation: 3,
    },
    title: {
        fontSize: 19,
        fontWeight: 'bold',
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
});

export default CareersScreen;

 */
