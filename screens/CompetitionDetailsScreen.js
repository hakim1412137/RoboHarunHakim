import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import Loader from '../components/Loader';
import { getCompetitionById } from '../utils/api';

const CompetitionDetailsScreen = ({ route }) => {
    const { competitionId } = route.params;
    const [competition, setCompetition] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompetition = async () => {
            try {
                const data = await getCompetitionById(competitionId);
                console.log(data); // Check the structure of the fetched data
                setCompetition(data);
            } catch (error) {
                console.error(error);
                Alert.alert('Error', 'Failed to fetch competition details');
            } finally {
                setLoading(false);
            }
        };

        fetchCompetition();
    }, [competitionId]);

    if (loading) return <Loader />;

    return (
        <View style={styles.container}>
            {competition ? (
                <>
                    <Text style={styles.title}>{competition.name}</Text>
                    <Text>{competition.description}</Text>
                    <Text style={styles.date}>
                        Due Date: {competition.dueDate ? new Date(competition.dueDate).toLocaleDateString() : 'N/A'}
                    </Text>
                    <Text style={styles.price}>
                        Price: {competition.price ? `$${competition.price}` : 'Call For Price'}
                    </Text>
                </>
            ) : (
                <Text>No competition details available.</Text> // Ensure this is wrapped in Text
            )}
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
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    date: {
        fontSize: 16,
        marginBottom: 5,
    },
    price: {
        fontSize: 16,
        marginBottom: 20,
    },
});

export default CompetitionDetailsScreen;

/*
// screens/CompetitionDetailsScreen.js
import React, { useEffect, useState } from 'react';
import {View, Text, Button, StyleSheet, Alert} from 'react-native';
import Loader from '../components/Loader';
import { getCompetitionById, registerForCompetition  } from '../utils/api'

const CompetitionDetailsScreen = ({ route }) => {
    const { competitionId } = route.params;
    const [competition, setCompetition] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompetition = async () => {
            try {
                const data = await getCompetitionById(competitionId);
                setCompetition(data);
            } catch (error) {
                console.error(error);
                Alert.alert('Error', 'Failed to fetch competition details');
            } finally {
                setLoading(false);
            }
        };

        fetchCompetition();
    }, [competitionId]);
    if (loading) return <Loader />;

    return (
        <View style={styles.container}>
            {competition ? (
                <>
                {competition.image &&
                    <Image source={{ uri: competition.image }} style={styles.image} />}
            {/!*<Image source={{ uri: competition.image }} style={styles.image} />*!/}
            <Text style={styles.title}>{competition.name}</Text>
            <Text>{competition.description}</Text>
            <Text>Date: {new Date(competition.date).toLocaleDateString()}</Text>
            <Text style={styles.date}>Date: {competition.date}</Text>
                <Button title="Register" onPress={handleRegister} />
                </>
            ) : (
                <Text>No competition details available.</Text>
            )}
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
*/
