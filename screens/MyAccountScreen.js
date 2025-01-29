import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const MyAccountScreen = () => {
    const { user, refreshUser } = useContext(AuthContext);
    const [username, setUsername] = useState(user.username);
    const [error, setError] = useState('');

    useEffect(() => {
        setUsername(user.username);
    }, [user]);

    const handleUpdate = async () => {
        try {
            await axios.put(`http://your-backend-url/api/users/${user.id}`, { username }, {
                headers: {
                    Authorization: `Bearer ${user.token}` // Attach the JWT token in the header
                }
            });
            alert("User details updated successfully!");
            refreshUser(); // Fetch updated user data
        } catch (err) {
            setError('Failed to update. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Account</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
            <Button title="Update" onPress={handleUpdate} />
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

export default MyAccountScreen;
/*

import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext'; // Assuming AuthContext manages user data

const MyAccountScreen = () => {
    const { user, updateUser } = useContext(AuthContext);
    const [username, setUsername] = useState(user.username);
    const [error, setError] = useState('');

    useEffect(() => {
        // Populate other user details if necessary
    }, [user]);

    const handleUpdate = async () => {
        try {
            await updateUser({ username }); // Call the update function from AuthContext
            alert("User details updated successfully!");
        } catch (err) {
            setError('Failed to update. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Account</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
            {/!* Add more fields if needed (e.g., email, password, etc.) *!/}
            <Button title="Update" onPress={handleUpdate} />
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

export default MyAccountScreen;
*/
