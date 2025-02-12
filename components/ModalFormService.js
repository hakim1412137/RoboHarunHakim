import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

const ModalFormService = ({ visible, onClose, initialData, onSubmit }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (initialData) {
            setName(initialData.title);
            setDescription(initialData.description);

        } else {
            setName('');
            setDescription('');

        }
    }, [initialData, visible]);

    const handleSubmit = () => {
        if (!name || !description ) {
            setError('Please fill in all fields.');
            return;
        }
        onSubmit({ name, description}); // Include email and phone
    };

    if (!visible) return null;

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Add/Update EthioRobo Services</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
            />

            <Button title="Submit" onPress={handleSubmit} />
            <Button title="Cancel" onPress={onClose} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    heading: {
        fontSize: 18,
        marginBottom: 10,
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

export default ModalFormService;
