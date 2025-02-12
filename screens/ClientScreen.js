
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { getAllClients } from "../utils/api"; // Ensure this path points to your API calls
import ClientCard from "../components/ClientCard"; // Placeholder for your client card component
import Header from '../components/Header';
import Menu from '../components/Menu';
import {ImageBackground} from "expo-image";

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
                onPress={() => navigation.navigate('clientDetail', { id: item.id })} // Navigate to detail screen
            />
        );
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >
            <Header></Header>
            <Menu navigation={navigation}></Menu>
            <ImageBackground
                source={require('../assets/images/10511849.jpg')} // Replace with your image path
                style={styles.background} // Apply full screen styles
                resizeMode="cover" // Cover the entire background
            >
            <ScrollView style={{ padding: 20, paddingHorizontal: 200, height: '40rem' }} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Our Clients</Text>
                <FlatList
                    data={clients}
                    keyExtractor={(item) => item.id.toString()} // Key extractor function
                    renderItem={renderItem} // Render item using the defined function
                />
            </ScrollView>
            </ImageBackground>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        height: '40rem',
        backgroundColor: '#FBF1E6'
    },
    background: {
        flex: 1, // Allow ImageBackground to cover the full screen
        // height: '20rem',

        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
    },
    content: {
        padding: 20, // Add padding around the content
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: Transparent overlay for better text readability
        padding: 10,
        borderRadius: 5,
        alignItems: 'center', // Center the text
    },
    contentWrapper: {
        padding: 25,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        // color: '#2C3E50',

        color: 'white', // Text color
        textAlign: 'center',
        fontFamily: 'Electrolize_400Regular',
        marginBottom: 25,
        letterSpacing: 0.5,
    },
    // title: {
    //     fontSize: 24,
    //     marginBottom: 10,
    //     textAlign: 'center',
    // },
});

export default ClientScreen;


