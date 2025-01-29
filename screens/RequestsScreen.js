// screens/RequestsScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { createMeetingRequest, getAllMeetingRequests } from "../utils/api";

const RequestsScreen = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [purpose, setPurpose] = useState('');
    const [contactInfo, setContactInfo] = useState('');

    const handleRequest = async () => {
        const request = { requesterName: name, requestedDate: date, purpose, contactInfo };
        await createMeetingRequest(request);
        // Handle navigation or display success message
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Request a Meeting</Text>
            <TextInput
                style={styles.input}
                placeholder="Your Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Requested Date (YYYY-MM-DD)"
                value={date}
                onChangeText={setDate}
            />
            <TextInput
                style={styles.input}
                placeholder="Purpose of the Meeting"
                value={purpose}
                onChangeText={setPurpose}
            />
            <TextInput
                style={styles.input}
                placeholder="Contact Information"
                value={contactInfo}
                onChangeText={setContactInfo}
            />
            <Button title="Submit Request" onPress={handleRequest} />
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
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 8,
    },
});

export default RequestsScreen;
