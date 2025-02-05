import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { getAllPosts } from '../utils/api'; // Ensure this path is correct
import PostCard from '../components/PostCard'; // Your component that renders individual posts

const PostListScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await getAllPosts(); // Fetch all posts
                console.log("Fetched Posts Data: ", data); // Log to check fetched data
                setPosts(response.data); // Update state with fetched data
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts(); // Call to fetch post data
    }, []);

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('PostDetail', { id: item.id })}>
                <PostCard post={item} /> {/* Pass post data to the card component */}
            </TouchableOpacity>
        );
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />; // Show loading indicator
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Posts</Text>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id.toString()} // Unique key for each item
                renderItem={renderItem} // Render items using the defined function
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
        textAlign: 'center',
    },
});

export default PostListScreen;
