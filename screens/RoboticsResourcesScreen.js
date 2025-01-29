// src/screens/RoboticsResourcesScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { getResources } from '../utils/api';

const RoboticsResourcesScreen = () => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResources = async () => {
            const data = await getResources();
            setResources(data);
            setLoading(false);
        };
        fetchResources();
    }, []);

    if (loading) return <Text>Loading resources...</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Robotics Education Resources</Text>
            <FlatList
                data={resources}
                keyExtractor={item => item.resourceId.toString()}
                renderItem={({ item }) => (
                    <View style={styles.resourceCard}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text>{item.type}</Text>
                        <Button title="View Resource" onPress={() => {/* Navigate to Resource Details */}} />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        marginBottom: 10,
    },
    resourceCard: {
        padding: 15,
        backgroundColor: '#f0f0f0',
        marginVertical: 10,
        borderRadius: 8,
    },
    title: {
        fontWeight: 'bold',
    },
});

export default RoboticsResourcesScreen;
