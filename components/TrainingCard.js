import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TrainingCard = ({ training }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{training.title}</Text>
            <Text style={styles.details}>Type: {training.trainingType}</Text>
            <Text style={styles.details}>Level: {training.difficultyLevel}</Text>
        </View>
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
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    details: {
        fontSize: 14,
    },
});

export default TrainingCard;
