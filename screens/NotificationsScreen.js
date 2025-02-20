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
