import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Alert,
    FlatList,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Dimensions
} from 'react-native';
import { createJoinUs, getJoinUs } from '../utils/api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from "../components/Header";
import Menu from "../components/Menu";
import {ImageBackground} from "expo-image";

const JoinUsScreen = ( navigation ) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [joinRequests, setJoinRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJoinRequests = async () => {
            setLoading(true);
            try {
                const response = await getJoinUs();
                setJoinRequests(response.data || []);
            } catch (error) {
                console.error('Error fetching join requests:', error);
                Alert.alert("Error", "Unable to load join requests.");
            } finally {
                setLoading(false);
            }
        };

        fetchJoinRequests();
    }, []);
    const jooinUsData = { name, email, message };

    const handleSubmit = async () => {
        if (!name || !email || !message) {
            Alert.alert("Validation Error", "Please fill in all fields.");
            return;
        }

        try {
            await createJoinUs(jooinUsData);
            Alert.alert("Success", "Your application has been submitted.");
            setName('');
            setEmail('');
            setMessage('');
            const response = await getJoinUs();
            setJoinRequests(response.data || []);
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "There was an issue submitting your application.");
        }
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Header />
            <Menu navigation={navigation} />
            <ImageBackground
                source={require('../assets/images/33279.jpg')} // Replace with your image path
                style={styles.background} // Apply full screen styles
                // resizeMode="cover" // Cover the entire background
            >

            {/*<ScrollView contentContainerStyle={styles.scrollContent}>*/}
                <View style={styles.formContainer}>
                    <Text style={styles.headerTitle}>Join Our Team</Text>
                    <Text style={styles.headerSubtitle}>Be part of something amazing!</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Your Name"
                        placeholderTextColor="#999"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Your Email"
                        placeholderTextColor="#999"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={[styles.input, styles.messageInput]}
                        placeholder="Your Message"
                        placeholderTextColor="#999"
                        value={message}
                        multiline
                        numberOfLines={4}
                        onChangeText={setMessage}
                    />
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>
                            <Icon name="send" size={18} color="white" /> Submit
                        </Text>
                    </TouchableOpacity>
                </View>


                {loading ? (
                    <Text style={styles.loadingText}>Loading requests...</Text>
                ) : (
                    <View style={styles.requestsContainer}>
                        <Text style={styles.sectionTitle}>Recent Applications</Text>
                        <FlatList
                            data={joinRequests}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.requestItem}>
                                    <Text style={styles.requestName}>{item.name}</Text>
                                    <Text style={styles.requestEmail}>{item.email}</Text>
                                    <Text style={styles.requestMessage}>{item.message}</Text>
                                </View>
                            )}
                        />
                    </View>
                )}
            </ImageBackground>

        </ScrollView>
    );
};
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        height: '40rem',
        backgroundColor: '#f8f9fa',
    },
    background: {
        flex: 1, // Allow ImageBackground to cover the full screen
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
        // width: width * 0.5, // Half of screen height
        // height: height * 0.5, // Half of screen height

    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: 'white',
        textShadowColor: 'rgba(0,0,0,0.2)',
        // textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    headerSubtitle: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.9)',
        marginTop: 8,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    formContainer: {
        padding: 20,
        width: width * 0.5, // Half of screen height

    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 12,
        marginBottom: 15,
        paddingHorizontal: 15,
        backgroundColor: 'white',
        fontSize: 16,
        shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    messageInput: {
        height: 120,
        textAlignVertical: 'top',
    },
    submitButton: {
        backgroundColor: '#00A86B',
        borderRadius: 12,
        paddingVertical: 15,
        alignItems: 'center',
        shadowColor: '#000',
        // shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    requestsContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
        width: width * 0.5, // Half of screen height
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#2d3436',
        marginBottom: 15,
    },
    requestItem: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
/*
        shadowOffset: { width: 0, height: 2 },
*/
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    requestName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2d3436',
    },
    requestEmail: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    requestMessage: {
        fontSize: 14,
        color: '#555',
        marginTop: 10,
    },
    loadingText: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
    },
});

export default JoinUsScreen;

/*import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList } from 'react-native';
import { createJoinUs, getJoinUs } from '../utils/api';
import Header from "../components/Header";
import Menu from "../components/Menu";

const JoinUsScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [joinRequests, setJoinRequests] = useState([]); // Store existing join requests
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchJoinRequests = async () => {
            setLoading(true);
            try {
                const response = await getJoinUs();
                setJoinRequests(response.data || []); // Ensure it's an array
            } catch (error) {
                console.error('Error fetching join requests:', error);
                Alert.alert("Error", "Unable to load join requests.");
            } finally {
                setLoading(false);
            }
        };

        fetchJoinRequests();
    }, []);

    const handleSubmit = async () => {
        if (!name || !email || !message) {
            Alert.alert("Please fill in all fields");
            return;
        }

        try {
            await createJoinUs(name, email, message);
            Alert.alert("Success", "Your application has been submitted.");
            // Clear the form
            setName('');
            setEmail('');
            setMessage('');
            // Optionally refresh the list after adding a new entry
            const response = await getJoinUs();
            setJoinRequests(response.data || []);
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "There was an issue submitting your application.");
        }
    };

    return (
        <View style={styles.container}>
            <Header />
            <Menu navigation={navigation} />
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
            {loading ? (
                <Text style={styles.loadingText}>Loading requests...</Text>
            ) : (
                <FlatList
                    data={joinRequests}
                    keyExtractor={(item) => item.id.toString()} // Ensure a unique key
                    renderItem={({ item }) => (
                        <View style={styles.requestItem}>
                            <Text style={styles.requestText}>Name: {item.name}</Text>
                            <Text style={styles.requestText}>Email: {item.email}</Text>
                            <Text style={styles.requestText}>Message: {item.message}</Text>
                        </View>
                    )}
                />
            )}
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
    loadingText: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 16,
    },
    requestItem: {
        padding: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 5,
        backgroundColor: '#f9f9f9',
    },
    requestText: {
        fontSize: 14,
    },
});

export default JoinUsScreen;*/
/*

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import {createJoinUs, getJoinUs} from "../utils/api";

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
            await createJoinUs(name, email, message);
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
*/
