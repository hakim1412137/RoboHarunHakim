import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

const ModalForm = ({ visible, onClose, initialData, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState(''); // For resources
    const [error, setError] = useState('');

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setDescription(initialData.description);
            setLink(initialData.link);
        } else {
            setTitle('');
            setDescription('');
            setLink('');
        }
    }, [initialData, visible]);

    const handleSubmit = () => {
        if (!title || !description || !link) {
            setError('Please fill in all fields.');
            return;
        }
        onSubmit({ title, description, link });
    };
if (!visible) return null; // Do not render if not visible
return (
    <View style={styles.container}>
        <Text style={styles.heading}>Add/Update Resource</Text>
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

/*//ModalForm: Used for creating and editing product entries.
import React, { useState, useEffect } from 'react';
import { Modal, View, Button, StyleSheet } from 'react-native';
import FormInput from './FormInput';

const ModalForm = ({ visible, onClose, initialData, onSubmit }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setDescription(initialData.description);
            setPrice(initialData.price);
        }
    }, [initialData]);

    const handleSubmit = () => {
        onSubmit({ name, description, price });
        onClose();
    };

    return (
        <Modal visible={visible} transparent={true}>
            <View style={styles.modalContainer}>
                <FormInput label="Name" value={name} onChangeText={setName} />
                <FormInput label="Description" value={description} onChangeText={setDescription} />
                <FormInput label="Price" value={price} onChangeText={setPrice} />
                <Button title="Submit" onPress={handleSubmit} />
                <Button title="Close" onPress={onClose} />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
});

export default ModalForm;*/
