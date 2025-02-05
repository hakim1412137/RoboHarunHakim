import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getMeetingRequestById } from '../utils/api'; // Function to fetch meeting request data by ID

const MeetingRequestDetail = ({ navigation }) => {
    const route = useRoute();
    const { id } = route.params; // Get the request ID from the route parameters
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadRequest = async () => {
            setLoading(true);
            try {
                const response = await getMeetingRequestById(id); // Fetch meeting request details
                setRequest(response.data); // Set the meeting request data
            } catch (error) {
                console.error("Error fetching meeting request details:", error);
            } finally {
                setLoading(false);
            }
        };

        loadRequest(); // Call to load the meeting request data
    }, [id]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />; // Show loading indicator
    }

    if (!request) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Meeting request not found!</Text>
                <Button title="Back to Requests" onPress={() => navigation.goBack()} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Request Details</Text>
            <Text style={styles.bodyText}>Requester: {request.requesterName}</Text>
            <Text style={styles.bodyText}>Requested Date: {request.requestedDate?.toString()}</Text>
            <Text style={styles.bodyText}>Purpose: {request.purpose}</Text>
            <Text style={styles.bodyText}>Contact Info: {request.contactInfo}</Text>
            <Text style={styles.bodyText}>Status: {request.status}</Text>
            <Button title="Back to Requests" onPress={() => navigation.goBack()} />
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

export default MeetingRequestDetail;
