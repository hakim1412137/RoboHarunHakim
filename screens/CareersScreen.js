import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, ScrollView} from 'react-native';
import {getAllCareers} from "../utils/api";
import CareersPage from "./CareersPage";
import Menu from "../components/Menu";
import Header from "../components/Header"; // Replace with your API utility

const CareersScreen = ({ navigation }) => {
    const [careers, setCareers] = useState([]);
    const [loading, setLoading] = useState(true);
//createCareer,getCareerById,getAllCareers,deleteCareer,
    useEffect(() => {
        const fetchCareers = async () => {
            try {
                const response = await getAllCareers(); // Adjust the endpoint accordingly
                setCareers(response.data);
            } catch (error) {
                console.error(error);
                Alert.alert("Error", "Failed to fetch careers");
            } finally {
                setLoading(false);
            }
        };

        fetchCareers();
    }, []);

    const renderCareerItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text style={styles.link}>{item.application_link}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Header />
            <Menu navigation={navigation} />
            <ScrollView style={{ padding: 16, paddingHorizontal: 100, height: '40rem' }} showsVerticalScrollIndicator={false}>
                <Text style={styles.header}>Career Opportunities</Text>
                <Text style={{ textAlign: 'center', marginVertical: 10, fontSize: 14 }}>
                    Welcome to the Robotics Educational Center, dedicated to nurturing innovation and creativity in the field of robotics education.
                    Our mission is to empower the youth of Ethiopia by providing access to advanced educational resources and hands-on training in robotics and technology.
                </Text>
                <Text style={{ marginVertical: 10, fontWeight: 'bold', textAlign: 'center', fontSize: 16 }}>Background of the Company</Text>
                <Text style={{ fontSize: 14, textAlign: 'center' }}>
                    Founded in 2003, we have established ourselves as a leader in robotics education in Ethiopia, offering comprehensive training and resources to foster technological advancement.
                </Text>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <FlatList
                        data={careers}
                        contentContainerStyle={{  marginTop: 25 }}
                        renderItem={renderCareerItem}
                        keyExtractor={item => item.id.toString()}
                    />
                )}
            </ScrollView>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBF1E6',
        height: '40rem'
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'center'
    },
    card: {
        marginBottom: 15,
        padding: 15,
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

export default CareersScreen;
