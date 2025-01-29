import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import api from '../utils/api'; // Replace with your API utility

const PartnerScreen = () => {
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const response = await api.get('/partners'); // Adjust the endpoint accordingly
                setPartners(response);
            } catch (error) {
                console.error(error);
                Alert.alert("Error", "Failed to fetch partners");
            } finally {
                setLoading(false);
            }
        };

        fetchPartners();
    }, []);

    const renderPartnerItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.title}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text style={styles.link}>{item.website}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Our Partners</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={partners}
                    renderItem={renderPartnerItem}
                    keyExtractor={item => item.id.toString()}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    card: {
        marginBottom: 15,
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
});

export default PartnerScreen;
