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

/*
import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import { login } from "../utils/api";

const SignInScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignIn = async () => {
        try {
            const user = await login(email, password); // API call
            console.log('Sign in successful:', user);
            navigation.navigate('Home'); // Navigate to Profile screen
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
        <View>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {error ? <Text>{error}</Text> : null}
            <Button title="Sign In" onPress={handleSignIn} />
            <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
            <Button title="Forgot Password?" onPress={() => { /!* Handle password reset *!/ }} />
        </View>
    );
};

export default SignInScreen;*/
/*
/*
import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import { signInUser } from '../api/api'; // Import the sign-in function from the API service

const SignInScreen = ({ navigation }) => {
    const [email, setEmail] = useState(''); // State to hold email input
    const [password, setPassword] = useState(''); // State to hold password input
    const [error, setError] = useState(''); // State to hold error messages

    // Function to handle sign-in
    const handleSignIn = async () => {
        try {
            const user = await signInUser(email, password); // Call to API for signing in
            console.log('Sign in successful:', user);
            navigation.replace('Home'); // Navigate to Home on successful sign-in
        } catch (error) {
            setError(error.message); // Set error message to state for display
            Alert.alert('Error', error.message); // Show alert with error message
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email} // Bind email state
                onChangeText={setEmail} // Update email state on change
                keyboardType="email-address"
                autoCapitalize="none" // Prevent automatic capitalization
                required
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password} // Bind password state
                onChangeText={setPassword} // Update password state on change
                secureTextEntry // Make password input secure
                required
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null} {/!* Display error if exists *!/}
            <Button title="Sign In" onPress={handleSignIn} /> {/!* Trigger sign-in on button press *!/}
            <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} /> {/!* Navigate to Sign Up Screen *!/}
            <Button title="Forgot Password?" onPress={() => {/!* Handle password reset logic *!/}} />
        </View>
    );
};

// Basic styles for the SignInScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 8,
    },
    errorText: {
        color: 'red',
    },
});

export default SignInScreen;*/
/*
// screens/SignInScreen.js
import React, { useState } from 'react';
import {View, TextInput, Button, Text, Alert} from 'react-native';
//import { auth } from '../firebaseConfig';
import { auth } from '../firebase'; // Import firebase auth service

const SignInScreen = ({ navigation,route }) => {
   const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    // const { email, password } = route.params; // Retrieve the token passed from LoginScreen    //const { username, password } = route.params; // Retrieve credentials from route params


    const handleSignIn = () => {
        auth().signInWithEmailAndPassword(email, email)
            .then(() => {
                navigation.navigate('Profile');
              //  navigation.navigate('Home');
            })
            .catch(error => setError(error.message));
    };


    const handlePasswordReset = () => {
        if (email) {
            auth().sendPasswordResetEmail(email)
                .then(() => {
                    alert('Password reset email sent!');
                })
                .catch(error => setError(error.message));
        } else {
            setError('Please enter your email address');
        }
    };
    return (
        <View>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {error ? <Text>{error}</Text> : null}
            <Button title="Sign In" onPress={handleSignIn} />
            <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
            <Button title="Forgot Password?" onPress={handlePasswordReset} />

        </View>
    );
};

export default SignInScreen;*/
/*auth().signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
              // Sign in successful
              const user = userCredential.user;
              navigation.navigate('Profile'); // Navigate to profile after sign-in
          })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.error(`Error signing in: ${errorCode} - ${errorMessage}`);
              Alert.alert('Sign In Error', errorMessage);
          });*/
