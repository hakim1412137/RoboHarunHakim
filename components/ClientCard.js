
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ClientCard = ({ client, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.card}>
            <View style={styles.cardContent}>
                <View style={styles.avatarContainer}>
                    <Icon name="person" size={28} color="#6E45E2" />
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{client.name}</Text>
                    <Text style={styles.company}>{client.company}</Text>
                    <Text style={styles.email}>{client.email}</Text>
                </View>
                <Icon name="chevron-right" size={24} color="#95a5a6" />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatarContainer: {
        backgroundColor: 'rgba(110, 69, 226, 0.1)',
        borderRadius: 12,
        padding: 12,
        marginRight: 15
    },
    infoContainer: {
        flex: 1
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 4
    },
    company: {
        fontSize: 14,
        color: '#3498db',
        marginBottom: 2
    },
    email: {
        fontSize: 12,
        color: '#95a5a6'
    }
});

export default ClientCard;

