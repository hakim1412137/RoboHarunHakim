// src/screens/SignInScreen.js

import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { login } from "../utils/api";

const SignInScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignIn = async () => {
        try {
            const user = await login(username, password); // API call
            console.log('Sign in successful:', user);
            navigation.navigate('Home'); // Navigate to Home screen
        } catch (error) {
            console.error('Sign-In Error:', error.message); // Logging the error
            if (error.response) {
                // Backend sent an error response
                console.error('Error response data:', error.response.data);
                Alert.alert('Error', error.response.data.message || 'Sign-in failed, please try again.');
            } else {
                // Other types of error (network issue, etc.)
                Alert.alert('Error', error.message);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/robot1.jpg')} style={styles.logo} />
            <Text style={styles.title}>Welcome Back!</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('signup')}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { /* Handle password reset */ }}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#E8F0FE', // Light background color
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 20,
        resizeMode: 'contain', // Keep the aspect ratio
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    input: {
        height: 55,
        borderColor: '#007BFF',
        borderWidth: 2,
        marginBottom: 15,
        paddingHorizontal: 15,
        fontSize: 18,
        width: '100%',
        borderRadius: 10,
        backgroundColor: '#fff', // White background for input
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007BFF', // Blue background
        padding: 15,
        marginVertical: 5,
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    forgotPassword: {
        color: '#007BFF',
        marginTop: 10,
        textDecorationLine: 'underline',
    },
});

export default SignInScreen;
