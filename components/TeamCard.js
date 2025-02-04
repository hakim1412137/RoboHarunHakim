import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TeamCard = ({ team, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.card}>
            <Text style={styles.name}>{team.name}</Text>
            <Text style={styles.role}>{team.role}</Text>
            <Text style={styles.email}>{team.email}</Text>
            <Text style={styles.details}>{team.details}</Text>
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
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    role: {
        fontSize: 16,
        fontStyle: 'italic',
    },
    email: {
        fontSize: 14,
        color: 'blue',
    },
    details: {
        fontSize: 14,
    },
});

export default TeamCard;
