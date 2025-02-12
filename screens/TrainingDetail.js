import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; // For icons
import { getTrainingsById } from '../utils/api'; // Function to fetch training data by ID

const TrainingDetail = ({ navigation }) => {
    const route = useRoute();
    const { id } = route.params; // Get the training ID from the route parameters
    const [training, setTraining] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTraining = async () => {
            setLoading(true);
            try {
                const response = await getTrainingsById(id);
                setTraining(response.data);
            } catch (error) {
                console.error("Error fetching training details:", error);
            } finally {
                setLoading(false);
            }
        };

        loadTraining(); // Call the load training function
    }, [id]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6C63FF" />
            </View>
        );
    }

    if (!training) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Training not found!</Text>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>Back to Trainings</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.header}>
                <Text style={styles.title}>{training.title}</Text>
                <Text style={styles.subtitle}>{training.trainingType}</Text>
            </View>

            <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                    <MaterialIcons name="fitness-center" size={24} color="#6C63FF" />
                    <Text style={styles.detailText}>Difficulty: {training.difficultyLevel}</Text>
                </View>

                <View style={styles.detailItem}>
                    <MaterialIcons name="description" size={24} color="#6C63FF" />
                    <Text style={styles.detailText}>Description: {training.description}</Text>
                </View>

                {/* Add more details as needed */}
            </View>

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backButtonText}>Back to Trainings</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#F8FAFC',
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        padding: 20,
    },
    header: {
        marginBottom: 30,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2D3748',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 18,
        color: '#4A5568',
        textAlign: 'center',
    },
    detailsContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    detailText: {
        fontSize: 16,
        color: '#4A5568',
        marginLeft: 10,
    },
    backButton: {
        backgroundColor: '#6C63FF',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    backButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    errorText: {
        fontSize: 18,
        color: '#FF4444',
        textAlign: 'center',
        marginBottom: 20,
    },
});

export default TrainingDetail;

/*
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import {getTrainingsById} from '../utils/api'; // Function to fetch training data by ID

const TrainingDetail = ({ navigation }) => {
    const route = useRoute();
    const { id } = route.params; // Get the training ID from the route parameters
    const [training, setTraining] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTraining = async () => {
            setLoading(true);
            try {
                const response = await getTrainingsById(id);
                setTraining(response.data);
            } catch (error) {
                console.error("Error fetching training details:", error);
            } finally {
                setLoading(false);
            }
        };

        loadTraining(); // Call the load training function
    }, [id]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />; // Show loading indicator
    }

    if (!training) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Training not found!</Text>
                <Button title="Back to Trainings" onPress={() => navigation.goBack()} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{training.title}</Text>
            <Text style={styles.bodyText}>Type: {training.trainingType}</Text>
            <Text style={styles.bodyText}>Difficulty Level: {training.difficultyLevel}</Text>
            <Text style={styles.bodyText}>Description: {training.description}</Text>

            <Button title="Back to Trainings" onPress={() => navigation.goBack()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    bodyText: {
        fontSize: 16,
        marginBottom: 5,
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    },
});

export default TrainingDetail;
*/
