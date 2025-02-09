import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { getAllPosts } from '../utils/api'; // Ensure this path is correct
import PostCard from '../components/PostCard';
import Header from "../components/Header";
import Menu from "../components/Menu";
import {parse} from "@babel/core"; // Your component that renders individual posts

const PostListScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await getAllPosts(0, 10); // Fetch all posts
                console.log("Fetched Posts Data: ", response.data); // Log to check fetched data

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
            <TouchableOpacity onPress={() => navigation.navigate('postDetail', { id: item.id })}>
                <PostCard post={item} /> {/* Pass post data to the card component */}
            </TouchableOpacity>
        );
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />; // Show loading indicator
    }

    return (
        <View style={styles.container}>
            <Header></Header>
            <Menu navigation={navigation}></Menu>
            <ScrollView style={{ height: '40rem', padding: 20, paddingHorizontal: 200 }}>
                <Text style={styles.title}>Posts</Text>
                <FlatList
                    data={posts}
                    keyExtractor={(item) => item.id.toString()} // Unique key for each item
                    renderItem={renderItem} // Render items using the defined function
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBF1E6'
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
        textAlign: 'center',
    },
});

export default PostListScreen;
