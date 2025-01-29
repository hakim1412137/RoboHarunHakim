import React, { useEffect, useState } from 'react';
import {View, Text, Button, StyleSheet, ActivityIndicator, Alert, Linking} from 'react-native';
import api from '../utils/api'; // Replace with your API utility

const ResourceDetailsScreen = ({ route }) => {
    const { resourceId } = route.params; // Assuming resourceId is passed from the previous screen
    const [resource, setResource] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResourceDetails = async () => {
            try {
                const resourceData = await api.getResourceById(resourceId); // Fetch specific resource details
                setResource(resourceData);
            } catch (error) {
                console.error(error);
                Alert.alert("Error", "Failed to fetch resource details");
            } finally {
                setLoading(false); // Set loading to false once data is fetched
            }
        };

        fetchResourceDetails();
    }, [resourceId]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (!resource) {
        return (
            <View style={styles.container}>
                <Text>No resource found.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{resource.title}</Text>
            <Text style={styles.description}>{resource.description}</Text>
            <Text style={styles.link}>Link: {resource.link}</Text>
            <Button title="Open Resource Link" onPress={() => Linking.openURL(resource.link)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginVertical: 10,
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
        marginBottom: 10,
    },
});

export default ResourceDetailsScreen;
