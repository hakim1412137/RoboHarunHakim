import React, { useState, useContext } from 'react';
import {View, TextInput, Button, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { AuthContext } from '../context/AuthContext'; // Adjust path as needed
import {getUserDetails, login} from '../utils/api';
import {UserContext} from "../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import your API functions

const LoginScreen = ({ navigation }) => {
  const {user, setUser } = useContext(UserContext);
    const { token, saveToken, logout, isAuthenticated } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignIn = async () => {
      const credentials = { username, password };
        console.log('Login Payload:', credentials); // Log the payload for debugging

        try {
            const response = await login(credentials);
            console.log('Login Response:', response);
            const { accessToken, tokenType } = response.data; // Assuming the backend returns a token


            if (accessToken && tokenType) {
                await AsyncStorage.setItem('token', accessToken); // Store the access token using AsyncStorage
                const fetchedUser = await getUserDetails(username);
                await AsyncStorage.setItem('user', JSON.stringify(fetchedUser.data));
                const user1=  await AsyncStorage.getItem('user');
                const userId = JSON.parse(user1).id;
                console.log('fetchedUser:', user1);
                console.log('User ID:', userId);

                console.log('Received token:', accessToken);
                saveToken(accessToken); // Call your AuthContext method to save token if needed
                setUser(username); // Optionally store the username in UserContext

                navigation.navigate('home'); // Navigate to home screen
            }
        } catch (error) {
            console.error('Login attempt failed:', error); // Log any errors
            const errorMessage = error.response
                ? error.response.data.message || 'Login failed. Please try again.'
                : 'Login failed. Please try again.';
            setError(errorMessage); // Set and display error message
        }

    };
    const handleLogout = async () => {
        await logout(); // Clear token and user data
        setUser(null); // Clear user data in UserContext
        // navigation.navigate('Login'); // Redirect to login screen
    };

    const fetchUserDetails = async (userId) => {
        try {
            const response = await getUserDetails(userId);
            console.log('User Details:', response.data);
        } catch (error) {
            console.error('Failed to fetch user details:', error);
        }
    };
    return (
        <View style={styles.container}>
            <Image source={require('../assets/robot1.jpg')} style={styles.logo} />
            <Text style={styles.title}>Welcome Back!</Text>
            {isAuthenticated() ? (
                <>
                    <Text style={styles.welcomeText}>You are logged in as {user}!</Text>
                    <TouchableOpacity style={styles.button} onPress={handleLogout}>
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
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
                    <TouchableOpacity onPress={() =>navigation.navigate('forgotPassword')}>
                        <Text style={styles.forgotPassword}>Forgot Password?</Text>
                    </TouchableOpacity>
                  {/*  <TouchableOpacity style={styles.button} onPress={handleLogout}>
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>*/}
                </>
            )}
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

export default LoginScreen;
