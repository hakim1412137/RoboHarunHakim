// src/components/SearchCompetition.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getCompetitionById } from '../utils/api';

const SearchCompetition = ({ onSearchComplete }) => {
    const [searchId, setSearchId] = useState('');

    const handleSearch = async () => {
        if (!searchId) {
            Alert.alert("Error", "Please enter a competition ID");
            return;
        }
        try {
            const response = await getCompetitionById(searchId);
            if (response) {
                onSearchComplete(response); // Call to pass the response back
            } else {
                Alert.alert("Error", "Competition not found");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Failed to fetch competition");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search Competition by ID"
                value={searchId}
                onChangeText={setSearchId}
            />
            <Button title="Search" onPress={handleSearch} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        borderRadius: 5,
    },
});

export default SearchCompetition;
