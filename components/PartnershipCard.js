import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const PartnershipCard = ({ partnership, onEdit, onDelete }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{partnership.title}</Text>
            <Text style={styles.description}>{partnership.description}</Text>
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default PartnershipCard;