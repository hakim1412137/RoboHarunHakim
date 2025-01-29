// screens/ProfileScreen.js

import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { UserContext } from '../context/UserContext'; // Your User context for accessing user data
import api from '../utils/api'; // Your API utility for fetching data

const ProfileScreen = () => {
    const { user } = useContext(UserContext); // Get user information from context
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [orderHistory, setOrderHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                if (user) {
                    // Fetch enrolled courses only for members/admins
                    const courses = await api.getEnrolledCourses(user.id); // Adjust the endpoint accordingly
                    setEnrolledCourses(courses);

                    // Fetch order history for all users
                    const orders = await api.getOrderHistory(user.id); // Fetch order history for the user
                    setOrderHistory(orders);
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
                Alert.alert("Error", "Failed to load profile data.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [user]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Profile</Text>
            <Text>Username: {user?.username}</Text>
            <Text>Email: {user?.email}</Text>
            <Text>Your Role: {user?.role}</Text>

            {user?.role === 'admin' && (
                <Text style={styles.adminMessage}>As an admin, you can manage users and oversee operations.</Text>
            )}

            <Text style={styles.sectionHeader}>Your Enrolled Courses</Text>
            <FlatList
                data={enrolledCourses}
                keyExtractor={item => item.courseId.toString()}
                renderItem={({ item }) => (
                    <Text>{item.title}</Text>
                )}
                ListEmptyComponent={<Text>No enrolled courses found.</Text>} // Handle empty state
            />

            <Text style={styles.sectionHeader}>Order History</Text>
            <FlatList
                data={orderHistory}
                keyExtractor={item => item.orderId.toString()}
                renderItem={({ item }) => (
                    <Text>Order ID: {item.orderId}, Total: ${item.totalAmount}</Text>
                )}
                ListEmptyComponent={<Text>No order history found.</Text>} // Handle empty state
            />
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
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    adminMessage: {
        color: 'red',
        fontWeight: 'bold',
        marginTop: 10,
    },
});

export default ProfileScreen;
/*
import React, { useContext } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { UserContext } from '../context/UserContext';

const ProfileScreen = () => {
    const { user } = useContext(UserContext);
    const enrolledCourses = []; // Fetch enrolled courses for the user
    const orderHistory = []; // Fetch order history for the user

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Profile</Text>
            <Text>Username: {user?.username}</Text>
            <Text>Email: {user?.email}</Text>
            <Text>Your Role: {user?.role}</Text>

            <Text style={styles.sectionHeader}>Your Enrolled Courses</Text>
            <FlatList
                data={enrolledCourses}
                keyExtractor={item => item.courseId.toString()}
                renderItem={({ item }) => (
                    <Text>{item.title}</Text>
                )}
            />

            <Text style={styles.sectionHeader}>Order History</Text>
            <FlatList
                data={orderHistory}
                keyExtractor={item => item.orderId.toString()}
                renderItem={({ item }) => (
                    <Text>Order ID: {item.orderId}, Total: ${item.totalAmount}</Text>
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
    sectionHeader: {
        fontSize: 20,
        marginTop: 10,
    },
});

export default ProfileScreen;*/

// screens/ProfileScreen.js
/*
import React from 'react';
import { View, Text, Button } from 'react-native';
import { auth } from '../firebase';

const ProfileScreen = ({ navigation }) => {
    const user = auth().currentUser;

    const handleSignOut = () => {
        auth().signOut().then(() => {
            navigation.navigate('SignIn');
        });
    };

    return (
        <View>
            {user ? (
                <View>
                    <Text>Email: {user.email}</Text>
                    <Button title="Sign Out" onPress={handleSignOut} />
                </View>
            ) : (
                <Text>No user logged in</Text>
            )}
        </View>
    );
};

export default ProfileScreen;*/
