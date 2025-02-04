import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ClientCard = ({ client, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.card}>
            <Text style={styles.clientName}>{client.name}</Text> {/* Display client name */}
            <Text>{client.details}</Text> {/* Display additional details */}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 15,
        margin: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    clientName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ClientCard;
