import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getTeamById } from '../utils/api'; // Function to fetch team data by ID

const TeamDetail = ({ navigation }) => {
    const route = useRoute();
    const { id } = route.params; // Get the team ID from the route parameters
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTeam = async () => {
            setLoading(true);
            try {
                const response = await getTeamById(id); // Fetch team details
                setTeam(response.data); // Set the team data
            } catch (error) {
                console.error("Error fetching team details:", error);
            } finally {
                setLoading(false);
            }
        };

        loadTeam(); // Call the load team function
    }, [id]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (!team) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Team not found!</Text>
                <Button title="Back to Teams" onPress={() => navigation.goBack()} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{team.name}</Text>
            <Text style={styles.bodyText}>Role: {team.role}</Text>
            <Text style={styles.bodyText}>Email: {team.email}</Text>
            <Text style={styles.bodyText}>Details: {team.details}</Text>
            {/* Add more team member details as needed */}
            <Button title="Back to Teams" onPress={() => navigation.goBack()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
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

export default TeamDetail;
