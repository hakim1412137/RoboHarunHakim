import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const SupportCard = ({ supportRequest, onEdit, onDelete }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>Support Request #{supportRequest.id}</Text>
            <Text style={styles.email}>Email: {supportRequest.email}</Text>
            <Text style={styles.phone}>Phone: {supportRequest.phone}</Text>
            <Text style={styles.description}>Description: {supportRequest.description}</Text>
            <View style={styles.buttonContainer}>
                <Button title="Edit" onPress={onEdit} />
                <Button title="Delete" onPress={onDelete} color="red" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f9f9f9',
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
        elevation: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    email: {
        marginTop: 4,
        fontSize: 14,
    },
    phone: {
        marginTop: 4,
        fontSize: 14,
    },
    description: {
        marginTop: 4,
        fontSize: 14,
        color: '#555',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
});

export default SupportCard;
