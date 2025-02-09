import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import Loader from '../components/Loader';
import {enrollInCourse, getCompetitionById, registerForCompetition} from '../utils/api';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {UserContext} from "../context/UserContext";
import Icon from "react-native-vector-icons/MaterialIcons";

const CompetitionDetailsScreen = ({ navigation, route }) => {
    // const { user } = useContext(UserContext);
    const { competitionId } = route.params;

    const [competition, setCompetition] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompetition = async () => {
            try {
                const response = await getCompetitionById(competitionId);
                console.log(response); // Check the structure of the fetched data
                setCompetition(response.data);
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
        try {
            const userData = await AsyncStorage.getItem('user');
            const { id: userId } = JSON.parse(userData);

            console.log(userId, competitionId)

            const { data } = await registerForCompetition(userId, competitionId);

            Alert.alert("Success", "registerForCompetition successful!");
            navigation.goBack();
        } catch (error) {
            console.error('Enrollment error:', error);
            Alert.alert("Error", error.response?.data?.message || "registerForCompetition failed");
        }
    };

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

                <TouchableOpacity
                    style={styles.enrollButton}
                    onPress={handleRegistration}
                >
                    <Text style={styles.enrollButtonText}>
                        <Icon name="assignment" size={18} color="white" /> Enroll Now
                    </Text>
                </TouchableOpacity>        </>)

                : (
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
