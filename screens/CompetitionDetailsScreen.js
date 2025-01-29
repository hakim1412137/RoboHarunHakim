// screens/CompetitionDetailsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Loader from '../components/Loader';
import { getCompetitionById } from '../utils/api'

const CompetitionDetailsScreen = ({ route }) => {
    const { competitionId } = route.params;
    const [competition, setCompetition] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompetition = async () => {
            const data = await getCompetitionById(competitionId);
            setCompetition(data);
            setLoading(false);
        };

        fetchCompetition();
    }, [competitionId]);

    if (loading) return <Loader />;

    return (
        <View style={styles.container}>
            <Image source={{ uri: competition.image }} style={styles.image} />
            <Text style={styles.title}>{competition.name}</Text>
            <Text>{competition.description}</Text>
            <Text>Date: {new Date(competition.date).toLocaleDateString()}</Text>
            <Text style={styles.date}>Date: {competition.date}</Text>
            <Button title="Register" onPress={() => {/* Registration logic */}} />
        </View>
    //{loading ? (
        //                 <Loader />
        // ) : competition ? (
   // <Text>No competition details available.</Text>

);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginVertical: 8,
    },
    date: {
        fontSize: 18,
        color: '#4CAF50',
    },
});

export default CompetitionDetailsScreen;
