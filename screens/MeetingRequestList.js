import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getAllMeetingRequests } from '../utils/api'; // Ensure this path is correct
import MeetingRequestCard from '../components/MeetingRequestCard'; // Your component that renders individual meeting request cards

const MeetingRequestList = ({ navigation }) => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequests = async () => {
            setLoading(true);
            try {
                const data = await getAllMeetingRequests(); // Fetch all meeting requests
                console.log("Fetched Meeting Requests Data: ", data); // Log to check fetched data
                setRequests(data); // Update state with fetched data
            } catch (error) {
                console.error('Error fetching meeting requests:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests(); // Call to fetch the meeting requests
    }, []);

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('MeetingRequestDetail', { id: item.requestId })}>
                <MeetingRequestCard request={item} /> {/* Pass request data to the card component */}
            </TouchableOpacity>
        );
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />; // Show loading indicator
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Meeting Requests</Text>
            <FlatList
                data={requests}
                keyExtractor={(item) => item.requestId.toString()} // Unique key for each item
                renderItem={renderItem} // Render items using the defined function
            />
        </View>
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

export default MeetingRequestList;
