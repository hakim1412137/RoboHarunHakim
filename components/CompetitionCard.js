import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const CompetitionCard = ({ competition, onEdit, onDelete }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{competition.title}</Text>
            <Text style={styles.description}>{competition.description}</Text>
            <Text style={styles.date}>Date: {competition.date}</Text>
            <View style={styles.buttonContainer}>
                <Button title="Edit" onPress={onEdit} />
                <Button title="Delete" onPress={onDelete} color="red" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        marginVertical: 8,
    },
    date: {
        fontStyle: 'italic',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default CompetitionCard;