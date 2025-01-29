// screens/AuthScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import login from '../utils/api'; // Import your API functions

const AuthScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const credentials = { username, password };
        try {
            const response = await login(credentials);
            if (response.token) {
                // Store token in AsyncStorage
                await AsyncStorage.setItem('jwt', response.token);
                Alert.alert('Login Successful', 'Welcome back!');
                navigation.navigate('Home') // Navigate to home or another main screen
            } else {
                Alert.alert('Login Failed', response.message);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'An error occurred during login.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Sign In</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Login" onPress={handleLogin} />
            <Button title="Create Account" onPress={() => navigation.navigate('Register')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    heading: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 8,
    },
});

export default AuthScreen;
