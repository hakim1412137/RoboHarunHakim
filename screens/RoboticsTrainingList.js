import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { getAllTrainings } from '../utils/api'; // Ensure this path is correct
import TrainingCard from '../components/TrainingCard'; // Adjust path to your TrainingCard component

const RoboticsTrainingList = ({ navigation }) => {
    const [trainings, setTrainings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrainings = async () => {
            setLoading(true);
            try {
                const response = await getAllTrainings(); // Fetch all trainings
                setTrainings(response.data); // Update state with fetched data
            } catch (error) {
                console.error('Error fetching trainings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrainings(); // Call to fetch the training data
    }, []);

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('trainingDetails', { id: item.id })}>
                <TrainingCard training={item} /> {/* Pass training data to the card component */}
            </TouchableOpacity>
        );
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />; // Show loading indicator
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Robotics Trainings</Text>
            <View style={styles.content}>
            
                <Text style={styles.bodyText}>
                    Our robotics training program is designed for individuals and groups eager to learn about robotics.
                    We provide hands-on training sessions that empower participants with the knowledge needed to build and program robots.
                </Text>
            </View>
            <FlatList
                data={trainings}
                keyExtractor={(item) => item.id.toString()} // Unique key for each item
                renderItem={renderItem} // Render items using the defined function
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
        textAlign: 'center',
    },
    bodyText: {
        fontSize: 16,
        textAlign: 'center',
        padding: 20,
    },
    content: {
        padding: 20,
        paddingHorizontal: 200
    },
});

export default RoboticsTrainingList;
