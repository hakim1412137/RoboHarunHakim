import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { getAllPosts, createPost, getCommentsByPostId } from '../utils/api';

const PostsScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: '', content: '' });
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    // Fetch posts with comments
    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await getAllPosts(page, 10);
            const postsWithComments = await Promise.all(
                response.data.map(async post => {
                    const commentsRes = await getCommentsByPostId(post.id);
                    return { ...post, comments: commentsRes.data };
                })
            );
            setPosts(prev => page === 1 ? postsWithComments : [...prev, ...postsWithComments]);
        } catch (error) {
            Alert.alert("Error", "Failed to load posts");
        } finally {
            setLoading(false);
        }
    };

    // Create new post
    const handleCreatePost = async () => {
        if (!newPost.title || !newPost.content) {
            Alert.alert("Error", "Please fill in both title and content");
            return;
        }

        try {
            const response = await createPost(newPost);
            const commentsRes = await getCommentsByPostId(response.data.id);
            setPosts(prev => [{ ...response.data, comments: commentsRes.data }, ...prev]);
            setNewPost({ title: '', content: '' });
            Alert.alert("Success", "Post created successfully!");
        } catch (error) {
            Alert.alert("Error", "Failed to create post");
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', fetchPosts);
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        fetchPosts();
    }, [page]);

    const renderPost = ({ item }) => (
        <TouchableOpacity
            style={styles.postCard}
            onPress={() => navigation.navigate('postDetail', { postId: item.id })}
        >
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postContent}>{item.content}</Text>
            <Text style={styles.commentsCount}>
                {item.comments?.length || 0} comments
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Create Post Form */}
            <View style={styles.createPostContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Post Title"
                    value={newPost.title}
                    onChangeText={text => setNewPost(prev => ({ ...prev, title: text }))}
                />
                <TextInput
                    style={[styles.input, styles.contentInput]}
                    placeholder="Post Content"
                    multiline
                    value={newPost.content}
                    onChangeText={text => setNewPost(prev => ({ ...prev, content: text }))}
                />
                <TouchableOpacity
                    style={styles.createButton}
                    onPress={handleCreatePost}
                >
                    <LinearGradient
                        colors={['#6C63FF', '#4A47FF']}
                        style={styles.gradient}
                    >
                        <Text style={styles.buttonText}>Create Post</Text>
                        <Ionicons name="add-circle" size={24} color="white" />
                    </LinearGradient>
                </TouchableOpacity>
            </View>

            {/* Posts List */}
            <FlatList
                data={posts}
                keyExtractor={item => item.id.toString()}
                renderItem={renderPost}
                ListFooterComponent={
                    loading && <ActivityIndicator size="large" color="#6C63FF" />
                }
                onEndReached={() => setPage(prev => prev + 1)}
                onEndReachedThreshold={0.5}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
        padding: 16,
    },
    createPostContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        fontSize: 16,
    },
    contentInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    createButton: {
        borderRadius: 8,
        overflow: 'hidden',
        marginTop: 10,
    },
    gradient: {
        padding: 14,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginRight: 8,
    },
    postCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 2,
    },
    postTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2D3748',
        marginBottom: 8,
    },
    postContent: {
        fontSize: 14,
        color: '#4A5568',
        lineHeight: 20,
        marginBottom: 8,
    },
    commentsCount: {
        color: '#718096',
        fontSize: 12,
    },
});

export default PostsScreen;
/*
GET /posts - Get paginated posts

POST /posts - Create new post

POST /posts/:postId/comments - Add comment to post

GET /posts/:postId/comments - Get comments for post
 */
