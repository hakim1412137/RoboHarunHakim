import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ResourceCard = ({ resource, onEdit, onDelete }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{resource.title}</Text>
            <Text>{resource.description}</Text>
            <Button title="Edit" onPress={onEdit} />
            <Button title="Delete" onPress={onDelete} color="red" />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ResourceCard;
