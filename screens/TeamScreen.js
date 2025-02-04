import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { getAllTeams } from '../utils/api'; // Ensure this path is correct
import TeamCard from '../components/TeamCard'; // Adjust path to your TeamCard component

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
                onPress={() => navigation.navigate('TeamDetail', { id: item.id })} // Navigate to detail screen
            />
        );
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Our Team</Text>
            <FlatList
                data={teams}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem} // Render item using the defined function
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
});

export default TeamScreen;
