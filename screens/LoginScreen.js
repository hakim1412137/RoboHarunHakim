import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // Adjust path as needed

const LoginScreen = ({ navigation }) => {
    const { setUser } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://your-backend-url/api/login', {
                username, password,
            });
            const { token } = response.data; // Assume the backend returns a token
            setUser({ username, token }); // Save the username and token
            navigation.navigate('Home');
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
