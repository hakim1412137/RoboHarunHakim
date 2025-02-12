import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const SupportCard = ({ supportRequest, onEdit, onDelete }) => {
    return (
        <View style={styles.card}>
            <View style={styles.content}>
                <Text style={styles.title}>Request #{supportRequest.id}</Text>
                <Text style={styles.email}>{supportRequest.email}</Text>
                <Text style={styles.phone}>{supportRequest.phone}</Text>
                <Text style={styles.description}>{supportRequest.description}</Text>
                <Text style={styles.link}>{supportRequest.link}</Text>
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
        fontSize: 16,
        fontWeight: '600',
        color: '#2d2d2d',
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    phone: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: '#444',
        fontStyle: 'italic',
    },
    link: {
        fontSize: 14,
        color: '#6200ee',
        textDecorationLine: 'underline',
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

export default SupportCard;

/*import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const SupportCard = ({ supportRequest, onEdit, onDelete }) => {
    return (
        <View style={styles.card}>
            <View style={styles.content}>
                <Text style={styles.title}>Request #{supportRequest.id}</Text>
                <Text style={styles.email}>{supportRequest.email}</Text>
                <Text style={styles.phone}>{supportRequest.phone}</Text>
                <Text style={styles.description}>{supportRequest.description}</Text>
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
        fontSize: 16,
        fontWeight: '600',
        color: '#2d2d2d',
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    phone: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: '#444',
        fontStyle: 'italic',
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

export default SupportCard;*/

/*

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
*/
