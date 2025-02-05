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
                const response = await getTrainingsById(id); // Fetch training details
                setTraining(response); // Set the training data
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
            {/* Add more details as needed */}
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
