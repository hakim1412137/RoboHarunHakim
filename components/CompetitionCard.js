import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const CompetitionCard = ({ competition, onEdit, onDelete, onSearch, onViewDetails }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.id}>ID: {competition.id}</Text> {/* Displaying the ID */}
            <Text style={styles.title}>{competition.name}</Text>
            <Text style={styles.description}>{competition.description}</Text>
            <Text style={styles.price}>Price: {competition.price ? `$${competition.price.toFixed(2)}` : 'Price for Call'}</Text>
            <Text style={styles.date}>Due Date: {competition.dueDate ? new Date(competition.dueDate).toLocaleDateString() : 'N/A'}</Text>
            <View style={styles.buttonContainer}>
                {/*<Button title="search" onPress={onSearch} />*/}
                <Button title="Edit" onPress={onEdit} />
                <Button title="Delete" onPress={onDelete} color="red" />
                {/*<Button title="Register" onPress={onRegister} color="green" />*/}
                <Button title="View Details" onPress={onViewDetails} color="red" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 15,
        backgroundColor: '#f0f0f0',
        marginVertical: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    id: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        marginVertical: 5,
    },
    price: {
        fontWeight: 'bold',
        marginTop: 5,
    },
    date: {
        fontStyle: 'italic',
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default CompetitionCard;
