// src/screens/SignUpScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { signup } from "../utils/api";

const SignupScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async () => {
        const signupdata = { username, password, email };

        try {
            await signup(signupdata);
        } catch (err) {
            setError('Signup failed. Please try again.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Create Your Account</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
                placeholderTextColor="#aaa" // Lighter color for placeholders
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                placeholderTextColor="#aaa" // Lighter color for placeholders
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholderTextColor="#aaa" // Lighter color for placeholders
            />
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <View style={styles.footerText}>
                <Text style={{ fontSize: 20 }}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('login')}>
                    <Text style={{ color: '#007BFF', fontSize: 20 }}>Log in</Text>
                </TouchableOpacity>
            </View>
            {/*<Button title="Already have an account?" onPress={() => navigation.navigate('signin')} />*/}

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#E8F0FE', // Light background color for a modern look
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    input: {
        height: 55,
        borderColor: '#007BFF',
        borderWidth: 2,
        marginBottom: 15,
        paddingHorizontal: 10,
        fontSize: 18,
        backgroundColor: '#fff', // White background for input fields
        borderRadius: 8, // Rounded corners
    },
    button: {
        backgroundColor: '#007BFF', // Primary button color
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        marginBottom: 12,
        textAlign: 'center',
    },
    footerText: {
        width: '100%',
        marginTop: 20,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 5
    },
    link: {
        color: '#007BFF', // Link color
        fontWeight: 'bold',
    },
});

export default SignupScreen;
