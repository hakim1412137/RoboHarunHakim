// src/screens/SignUpScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { signup } from "../utils/api";

const SignupScreen = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async () => {
        try {
            await signup(username,password,email);
            // Optional: Redirect on successful signup
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
            <Text style={styles.footerText}>Already have an account? <Text style={styles.link}>Log In</Text></Text>
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
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
    link: {
        color: '#007BFF', // Link color
        fontWeight: 'bold',
    },
});

export default SignupScreen;

/*// src/screens/SignUpScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { signup } from "../utils/api";

const SignupScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async () => {
        try {
            await signup(username, password);
            // Optional: Redirect on successful signup
        } catch (err) {
            setError('Signup failed. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
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
            <Button title="Sign Up" onPress={handleSignup} />
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

export default SignupScreen;*/
/*

import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { signUpUser } from '../api/api'; // Import the sign-up function from api.js

const SignUpScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = async () => {
        try {
            const userData = { email, password }; // Prepare user data object
            await signUpUser(userData); // Call the sign-up API

            navigation.navigate('Home'); // Navigate to Profile upon successful signup
        } catch (error) {
            setError(error.message); // Capture any error message
            Alert.alert('Error', error.message); // Show alert with the error
        }
    };

    return (
        <View>
            <Text>Sign Up</Text>
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
            <Button title="Sign Up" onPress={handleSignUp} />
            <Button title="Go to Sign In" onPress={() => navigation.navigate('SignIn')} />
        </View>
    );
};

export default SignUpScreen;*/
/*

// screens/SignUpScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { auth } from '../firebase';

const SignUpScreen = ({ navigation, route }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // const { email, password } = route.params; // Retrieve the token passed from LoginScreen    //const { username, password } = route.params; // Retrieve credentials from route params

    const handleSignUp = () => {
        auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
               navigation.navigate('Profile');
             //   navigation.navigate('Home');

            })
            .catch(error => setError(error.message));
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
            <Button title="Sign Up" onPress={handleSignUp} />

        </View>
    );
};

export default SignUpScreen;
*/
