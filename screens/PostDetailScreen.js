import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getPostById } from '../utils/api'; // Function to fetch post data by ID

const PostDetailScreen = ({ navigation }) => {
    const route = useRoute();
    const { id } = route.params; // Get the post ID from the route parameters
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPost = async () => {
            setLoading(true);
            try {
                const response = await getPostById(id); // Fetch post details
                setPost(response.data); // Set the post data
            } catch (error) {
                console.error("Error fetching post details:", error);
            } finally {
                setLoading(false);
            }
        };

        loadPost(); // Call the load post function
    }, [id]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />; // Show loading indicator
    }

    if (!post) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Post not found!</Text>
                <Button title="Back to Posts" onPress={() => navigation.goBack()} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.bodyText}>Description: {post.description}</Text>
            <Text style={styles.bodyText}>Content: {post.content}</Text>
            <Text style={styles.bodyText}>Posted On: {new Date(post.postedOn).toLocaleString()}</Text>
            {/* Add more post details as necessary */}
            <Button title="Back to Posts" onPress={() => navigation.goBack()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    bodyText: {
        fontSize: 16,
        marginBottom: 5,
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    },
});

export default PostDetailScreen;
