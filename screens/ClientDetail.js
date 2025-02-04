import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { useRoute } from '@react-navigation/native'; // For accessing route parameters
import { getClientById } from '../utils/api'; // Function to fetch client data by ID

const ClientDetail = ({ navigation }) => {
    const route = useRoute();
    const { id } = route.params; // Get the client ID from the route parameters
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadClient = async () => {
            setLoading(true);
            try {
                const response = await getClientById(id); // Fetch client details
                setClient(response.data); // Set the client data
            } catch (error) {
                console.error("Error fetching client details:", error);
            } finally {
                setLoading(false);
            }
        };

        loadClient(); // Call the load client function
    }, [id]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (!client) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Client not found!</Text>
                <Button title="Back to Clients" onPress={() => navigation.goBack()} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{client.name}</Text>
            <Text style={styles.bodyText}>Email: {client.email}</Text>
            <Text style={styles.bodyText}>Details: {client.details}</Text>
            {/* Add more client details as needed */}
            <Button title="Back to Clients" onPress={() => navigation.goBack()} />
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

export default ClientDetail;
