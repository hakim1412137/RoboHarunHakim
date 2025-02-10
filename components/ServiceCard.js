// ServiceCard.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ServiceCard = ({ service, onEdit, onDelete }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{service.name}</Text>
            <Text style={styles.description}>{service.description}</Text>
            <View style={styles.buttonContainer}>
                <Button title="Edit" onPress={onEdit} />
                <Button title="Delete" onPress={onDelete} color="#ff5c5c" />
            </View>
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
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default ServiceCard;

/*
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ServiceCard = ({ service, onEdit, onDelete }) => {
    return (
        <View style={styles.card}>
            <View style={styles.content}>
                <Text style={styles.title}>{service.name}</Text>
                <Text style={styles.description}>{service.description}</Text>
                {service.price && <Text style={styles.price}>${service.price}</Text>}
            </View>

            <View style={styles.actions}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={onEdit}
                >
                    <MaterialIcons name="edit" size={24} color="#6200ee" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={onDelete}
                >
                    <MaterialIcons name="delete" size={24} color="#ff4444" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    content: {
        flex: 1,
        marginRight: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2d2d2d',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        color: '#4CAF50',
    },
    actions: {
        flexDirection: 'row',
        gap: 12,
    },
    actionButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
    },
});

export default ServiceCard;
 */
