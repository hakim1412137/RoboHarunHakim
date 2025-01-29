import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getNotifications } from '../utils/api'; // This should work given the correct path
import { UserContext } from '../context/UserContext';
import Loader from '../components/Loader';

const NotificationsScreen = () => {
    const { user } = useContext(UserContext);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            if (user) {
                const { data } = await getNotifications(user.userId); // Fetch notifications (ensure proper response handling)
                setNotifications(data);
            }
           setLoading(false);
                   };
                   fetchNotifications();
               }, [user]);

    if (loading) return <Loader />; // Loader component during loading state

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Notifications</Text>
            <FlatList
                data={notifications}
                keyExtractor={item => item.id.toString()} // Adjust based on your notification structure
                renderItem={({ item }) => <Text>{item.message}</Text>} // Customize as needed
            />
        </View>
    );
};

// Styles here...
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    header: { fontSize: 24, fontWeight: 'bold' },
});

export default NotificationsScreen;
// screens/NotificationsScreen.js
/*import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getNotifications } from '../Utils/api';
import { UserContext } from '../context/UserContext';
import Loader from '../components/Loader';

const NotificationsScreen = () => {
    const { user } = useContext(UserContext);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            if (user) {
                const data = await getNotifications(user.userId); // Fetch notifications
                setNotifications(data);
            }
            setLoading(false);
        };
        fetchNotifications();
    }, [user]);

    if (loading) return <Loader />;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Notifications</Text>
            {notifications.length === 0 ? (
                <Text>No new notifications.</Text>
            ) : (
                <FlatList
                    data={notifications}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.notificationCard}>
                            <Text>{item.message}</Text>
                            <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleString()}</Text>
                        </View>
                    )}
                />
            )}
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
    notificationCard: {
        padding: 15,
        backgroundColor: '#f0f0f0',
        marginVertical: 10,
        borderRadius: 8,
    },
    timestamp: {
        fontSize: 12,
        color: 'gray',
    },
});

export default NotificationsScreen;*/
/*
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

function NotificationsScreen() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchNotifications().then(setNotifications);
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={notifications}
                renderItem={({ item }) => (
                    <View style={styles.notification}>
                        <Text style={styles.message}>{item.message}</Text>
                        <Text style={styles.time}>{new Date(item.scheduledTime).toLocaleString()}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    notification: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
    message: { fontSize: 16 },
    time: { fontSize: 12, color: '#666' },
});*/
