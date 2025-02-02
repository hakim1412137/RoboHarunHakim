import React, { useState, useContext } from 'react';
import {View, TextInput, Button, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import { AuthContext } from '../context/AuthContext'; // Adjust path as needed
import {login} from '../utils/api';
import {UserContext} from "../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import your API functions

const LoginScreen = ({ navigation }) => {
  const { setUser } = useContext(UserContext);
    const { saveToken } = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignIn = async () => {
      const credentials = { username, password };

        try {
            const response = await login(credentials);
            console.log('Login Response:', response);
            const token = response.data.token; // Assuming the backend returns a token

            if (token) {
                await AsyncStorage.setItem('token', token); // Store the access token using AsyncStorage
                console.log('Received token:', token);

                saveToken(token); // Call your AuthContext method to save token if needed
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
   /*        const token = response.data; // Expecting the JWT token back from the response
            console.log('Received token:', token); // Log the received token

            await saveToken(token); // Save the token using AsyncStorage
            setUser(username); // Optionally store the username in UserContext

            console.log(navigation)
            navigation.navigate('home');
        } catch (err) {
            console.error('Login error:', error.response ? error.response.data : error.message);
            console.log(err)

            setError('Login failed. Please check your credentials.');
        }*/
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

export default LoginScreen;



/*  const { token, user } = response.data; // Assume the backend returns a token and user data
 await saveToken(token); // Save the token using AsyncStorage
  setUser(user); // Save user information in User*/

//  setUser({ username, token }); // Save the username and token
/*  const { token, username } = response.data; // Expecting token and username
  await saveToken(token); // Save the token in AsyncStorage
  setUser(username); // Set the username in UserContext*/

// Check if the response contains the access token
/*   if (response.accessToken) {
       localStorage.setItem('token', response.accessToken); // Store the access token
       navigate('/posts'); // Redirect to posts page upon successful login
       setError(null); // Clear any previous errors
   } else {
       setError('Login failed. Please check your credentials.'); // Handle failed login
   }*/


/*

import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext'; // Assuming you have an AuthContext for managing authentication

const LoginScreen = ({ navigation }) => {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            await login(username, password); // Call the login function from AuthContext
            navigation.navigate('Home'); // Redirect to the Home screen after successful login
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
            <Button title="Sign Up" onPress={() => navigation.navigate('Signup')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    error: {
        color: 'red',
        marginBottom: 12,
    },
});

export default LoginScreen;
*/

/*

import React, { useState } from 'react';
import { View, Button } from 'react-native';
import FormInput from '../components/FormInput';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View>
            <FormInput label="Username" value={username} onChangeText={setUsername} />
            <Form
            <Stack.Screen name="Products" component={ProductsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Competitions" component={Competitions} options={{ headerShown: false }} />
            <Stack.Screen name="CompetitionDetails" component={CompetitionDetails} options={{ headerShown: false }} / can you add in the above edit project strucutre in details more using axios ?
*/
