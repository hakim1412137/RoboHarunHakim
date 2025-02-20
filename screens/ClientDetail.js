import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getClientById } from '../utils/api';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const ClientDetail = ({ navigation }) => {
    const route = useRoute();
    const { id } = route.params;
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadClient = async () => {
            setLoading(true);
            try {
                const response = await getClientById(id);
                setClient(response.data);
            } catch (error) {
                console.error("Error fetching client details:", error);
            } finally {
                setLoading(false);
            }
        };

        loadClient();
    }, [id]);

    if (loading) {
        return (
            <View style={[styles.container, styles.center]}>
                <ActivityIndicator size="large" color="#6C63FF" />
            </View>
        );
    }

    if (!client) {
        return (
            <View style={[styles.container, styles.center]}>
                <Ionicons name="sad-outline" size={60} color="#6C63FF" />
                <Text style={styles.errorText}>Client not found!</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.buttonText}>Back to Clients</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <LinearGradient
                colors={['#6C63FF', '#8A85FF']}
                style={styles.header}
            >
                <Text style={styles.title}>{client.name}</Text>
                <Text style={styles.subtitle}>Client Details</Text>
            </LinearGradient>

            <View style={styles.detailsCard}>
                <View style={styles.detailItem}>
                    <Ionicons name="mail-outline" size={24} color="#6C63FF" />
                    <View style={styles.detailText}>
                        <Text style={styles.detailLabel}>Email</Text>
                        <Text style={styles.detailValue}>{client.email}</Text>
                    </View>
                </View>

                <View style={styles.separator} />

                <View style={styles.detailItem}>
                    <Ionicons name="document-text-outline" size={24} color="#6C63FF" />
                    <View style={styles.detailText}>
                        <Text style={styles.detailLabel}>Details</Text>
                        <Text style={styles.detailValue}>{client.details}</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.buttonText}>Back to Clients</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#F5F5F5',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        paddingVertical: 40,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: 'white',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 18,
        color: 'rgba(255,255,255,0.8)',
    },
    detailsCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    detailText: {
        marginLeft: 15,
    },
    detailLabel: {
        fontSize: 14,
        color: '#888',
        marginBottom: 4,
    },
    detailValue: {
        fontSize: 16,
        color: '#444',
        fontWeight: '500',
    },
    separator: {
        height: 1,
        backgroundColor: '#EEE',
        marginVertical: 8,
    },
    button: {
        backgroundColor: '#6C63FF',
        borderRadius: 15,
        paddingVertical: 16,
        marginHorizontal: 20,
        marginTop: 30,
        marginBottom: 20,
        alignItems: 'center',
        shadowColor: '#6C63FF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    errorText: {
        fontSize: 20,
        color: '#444',
        marginVertical: 20,
        fontWeight: '500',
    },
});

export default ClientDetail;
