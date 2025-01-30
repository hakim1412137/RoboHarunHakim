// components/AddVexRobotics.js (continued)
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createVexRobotics } from '../utils/api';

const AddVexRobotics = ({ navigation }) => {
    const [platformName, setPlatformName] = useState('');
    const [targetAudience, setTargetAudience] = useState('');
    const [focus, setFocus] = useState('');
    const [components, setComponents] = useState('');
    const [programming, setProgramming] = useState('');
    const [curriculum, setCurriculum] = useState('');
    const [useCase, setUseCase] = useState('');

    const handleSubmit = async () => {
        const newPlatform = {
            platformName,
            targetAudience,
            focus,
            components,
            programming,
            curriculum,
            useCase
        };

        try {
            await createVexRobotics(newPlatform);
            Alert.alert("Success", "Platform added successfully!");
            navigation.navigate('VexRobotics'); // Navigate back to the main list view
        } catch (error) {
            Alert.alert("Error", "Failed to add platform.");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Platform Name"
                value={platformName}
                onChangeText={setPlatformName}
                style={styles.input}
                required
            />
            <TextInput
                placeholder="Target Audience"
                value={targetAudience}
                onChangeText={setTargetAudience}
                style={styles.input}
            />
            <TextInput
                placeholder="Focus"
                value={focus}
                onChangeText={setFocus}
                style={styles.input}
            />
            <TextInput
                placeholder="Components"
                value={components}
                onChangeText={setComponents}
                style={styles.input}
            />
            <TextInput
                placeholder="Programming"
                value={programming}
                onChangeText={setProgramming}
                style={styles.input}
            />
            <TextInput
                placeholder="Curriculum"
                value={curriculum}
                onChangeText={setCurriculum}
                style={styles.input}
            />
            <TextInput
                placeholder="Use Case"
                value={useCase}
                onChangeText={setUseCase}
                style={styles.input}
            />
            <Button title="Add Platform" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
});

export default AddVexRobotics;
