import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import api from '../utils/api'; // Your API utility

const JoinUsScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        if (!name || !email || !message) {
            Alert.alert("Please fill in all fields");
            return;
        }

        try {
            await api.post('/join', { name, email, message });
            Alert.alert("Success", "Your application has been submitted.");
            // Clear the form
            setName('');
            setEmail('');
            setMessage('');
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "There was an issue submitting your application.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Join Our Team</Text>
            <TextInput
                style={styles.input}
                placeholder="Your Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Your Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Your Message"
                value={message}
                multiline
                numberOfLines={4}
                onChangeText={setMessage}
            />
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});

export default JoinUsScreen;
