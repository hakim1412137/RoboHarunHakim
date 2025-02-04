import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { getAllClients } from "../utils/api"; // Ensure this path points to your API calls
import ClientCard from "../components/ClientCard"; // Placeholder for your client card component
import Header from '../components/Header';
import Menu from '../components/Menu';

const ClientScreen = ({ navigation }) => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadClients = async () => {
            setLoading(true);
            try {
                const response = await getAllClients(); // Fetch all clients
                console.log("Fetched Clients Data: ", response); // Log to check fetched data
                setClients(response.data); // Update state with fetched data
            } catch (error) {
                console.error("Error fetching clients: ", error);
            } finally {
                setLoading(false);
            }
        };

        loadClients(); // Call to fetch the client data
    }, []);

    const renderItem = ({ item }) => {
        return (
            <ClientCard
                client={item} // Pass client data to your ClientCard component
                onPress={() => navigation.navigate('ClientDetail', { id: item.id })} // Navigate to detail screen
            />
        );
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <ScrollView style={styles.container}>
            <Header></Header>
            <Menu navigation={navigation}></Menu>
            <View style={{ padding: 20, paddingHorizontal: 200 }}>
                <Text style={styles.title}>Our Clients</Text>
                <FlatList
                    data={clients}
                    keyExtractor={(item) => item.id.toString()} // Key extractor function
                    renderItem={renderItem} // Render item using the defined function
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
        textAlign: 'center',
    },
});

export default ClientScreen;
