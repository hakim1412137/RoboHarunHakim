import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

const ModalForm = ({ visible, onClose, initialData, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [email, setEmail] = useState(''); // Add email field
    const [phone, setPhone] = useState(''); // Add phone field
    const [error, setError] = useState('');

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setDescription(initialData.description);
            setLink(initialData.link);
            setEmail(initialData.email); // Initialize email
            setPhone(initialData.phone); // Initialize phone
        } else {
            setTitle('');
            setDescription('');
            setLink('');
            setEmail(''); // Reset email
            setPhone(''); // Reset phone
        }
    }, [initialData, visible]);

    const handleSubmit = () => {
        if (!title || !description || !link || !email || !phone) {
            setError('Please fill in all fields.');
            return;
        }
        onSubmit({ title, description, link, email, phone }); // Include email and phone
    };

    if (!visible) return null;

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Add/Update Support Requests</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TextInput
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
            />
            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
            />
            <TextInput
                placeholder="Link"
                value={link}
                onChangeText={setLink}
                style={styles.input}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
            />
            <TextInput
                placeholder="Phone"
                value={phone}
                onChangeText={setPhone}
                style={styles.input}
                keyboardType="phone-pad"
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

export default ModalForm;
