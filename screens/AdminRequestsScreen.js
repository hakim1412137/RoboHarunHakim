// screens/AdminRequestsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import Loader from '../components/Loader';

const AdminRequestsScreen = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequests = async () => {
            const data = await meetingRequestService.getAllRequests();
            setRequests(data);
            setLoading(false);
        };
        fetchRequests();
    }, []);

    if (loading) return <Loader />;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Meeting Requests</Text>
            <FlatList
                data={requests}
                keyExtractor={item => item.requestId.toString()}
                renderItem={({ item }) => (
                    <View style={styles.requestCard}>
                        <Text><strong>Name:</strong> {item.requesterName}</Text>
                        <Text><strong>Date:</strong> {new Date(item.requestedDate).toLocaleString()}</Text>
                        <Text><strong>Purpose:</strong> {item.purpose}</Text>
                        <View style={styles.buttonContainer}>
                            <Button title="Approve" onPress={() => { /* Handle approve request */ }} />
                            <Button title="Decline" onPress={() => { /* Handle decline request */ }} />
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        marginBottom: 10,
    },
    requestCard: {
        padding: 15,
        backgroundColor: '#f0f0f0',
        marginVertical: 10,
        borderRadius: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default AdminRequestsScreen;
