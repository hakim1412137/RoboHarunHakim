// screens/PostsScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { getAllPosts, createPost, getCommentsByPostId, postComment } from '../utils/api';
import Header from "../components/Header";
import Menu from "../components/Menu";

const PostsScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: '', content: '' });
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [expandedPostId, setExpandedPostId] = useState(null);
    const [commentsByPostId, setCommentsByPostId] = useState({});
    const [newCommentByPostId, setNewCommentByPostId] = useState({});

    const fetchPosts = async (resetPage = false) => {
        try {
            setLoading(true);
            const currentPage = resetPage ? 1 : page;
            const response = await getAllPosts(currentPage, 10);
            if (resetPage) {
                setPosts(response.data);
                setPage(1);
            } else {
                setPosts(prev => [...prev, ...response.data]);
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchCommentsForPost = async (postId) => {
        try {
            const response = await getCommentsByPostId(postId);
            setCommentsByPostId(prev => ({
                ...prev,
                [postId]: response.data
            }));
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchPosts(true);
        }, [])
    );

    const handleCreatePost = async () => {
        if (!newPost.title || !newPost.content) {
            Alert.alert("Error", "Please fill in both fields");
            return;
        }

        try {
            const response = await createPost(newPost);
            setPosts(prev => [response.data, ...prev]);
            setNewPost({ title: '', content: '' });
        } catch (error) {
            Alert.alert("Error", "Failed to create post");
        }
    };

    const handleCommentSubmit = async (postId, commentContent) => {
        if (!commentContent.trim()) return;

        try {
            const response = await postComment(postId, { content: commentContent });
            setCommentsByPostId(prev => ({
                ...prev,
                [postId]: [response.data, ...(prev[postId] || [])]
            }));
            setNewCommentByPostId(prev => ({
                ...prev,
                [postId]: ''
            }));
        } catch (error) {
            console.error('Error posting comment:', error);
            Alert.alert('Error', 'Failed to post comment');
        }
    };

    const renderPost = ({ item }) => {
        const isExpanded = expandedPostId === item.id;
        const comments = commentsByPostId[item.id] || [];
        const newComment = newCommentByPostId[item.id] || '';

        return (
            <TouchableOpacity
                style={styles.postCard}
                onPress={() => {
                    if (isExpanded) {
                        setExpandedPostId(null);
                    } else {
                        setExpandedPostId(item.id);
                        if (!commentsByPostId[item.id]) {
                            fetchCommentsForPost(item.id);
                        }
                    }
                }}
            >
                <Text style={styles.postTitle}>{item.title}</Text>
                <Text style={styles.postContent}>{item.content}</Text>
                <Text style={styles.commentsCount}>
                    {comments.length} comments
                </Text>

                {isExpanded && (
                    <View style={styles.commentsContainer}>
                        <FlatList
                            data={comments}
                            keyExtractor={comment => comment.id.toString()}
                            renderItem={({ item: comment }) => (
                                <View style={styles.commentCard}>
                                    <Text style={styles.commentText}>{comment.content}</Text>
                                    <Text style={styles.commentAuthor}>By User #{comment.userId}</Text>
                                </View>
                            )}
                        />

                        <TextInput
                            style={styles.commentInput}
                            placeholder="Write a comment..."
                            value={newComment}
                            onChangeText={text => setNewCommentByPostId(prev => ({
                                ...prev,
                                [item.id]: text
                            }))}
                            multiline
                        />
                        <TouchableOpacity
                            style={styles.commentButton}
                            onPress={() => handleCommentSubmit(item.id, newComment)}
                        >
                            <Text style={styles.commentButtonText}>Post Comment</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Header />
            <Menu navigation={navigation} />
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

            <FlatList
                data={posts}
                keyExtractor={item => item.id.toString()}
                renderItem={renderPost}
                onEndReached={() => setPage(prev => prev + 1)}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    loading && <ActivityIndicator size="large" color="#6C63FF" />
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    // ... keep all existing styles from original PostsScreen ...
    container: {
        // flex: 1,
        height: '40rem',

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
    commentsContainer: {
        marginTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 15
    },
    commentCard: {
        backgroundColor: '#f8f9fa',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
    },
    commentText: {
        fontSize: 14,
        color: '#333',
    },
    commentAuthor: {
        fontSize: 12,
        color: '#666',
        marginTop: 4
    },
    commentInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginTop: 10,
        minHeight: 80,
        fontSize: 14,
    },
    commentButton: {
        backgroundColor: '#6C63FF',
        padding: 12,
        borderRadius: 8,
        marginTop: 10,
        alignItems: 'center'
    },
    commentButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14
    },
});

export default PostsScreen;
/*
// screens/PostsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { getAllPosts, createPost } from '../utils/api';

const PostsScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: '', content: '' });
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const fetchPosts = async (resetPage = false) => {
        try {
            setLoading(true);
            const currentPage = resetPage ? 1 : page;
            const response = await getAllPosts(currentPage, 10);
            if (resetPage) {
                setPosts(response.data);
                setPage(1);
            } else {
                setPosts(prev => [...prev, ...response.data]);
            }
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchPosts(true);
        }, [])
    );

    const handleCreatePost = async () => {
        if (!newPost.title || !newPost.content) {
            Alert.alert("Error", "Please fill in both fields");
            return;
        }

        try {
            const response = await createPost(newPost);
            setPosts(prev => [response.data, ...prev]);
            setNewPost({ title: '', content: '' });
        } catch (error) {
            Alert.alert("Error", "Failed to create post");
        }
    };

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

            <FlatList
                data={posts}
                keyExtractor={item => item.id.toString()}
                renderItem={renderPost}
                onEndReached={() => setPage(prev => prev + 1)}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    loading && <ActivityIndicator size="large" color="#6C63FF" />
                }
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

export default PostsScreen;*/

/*// PostsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { getAllPosts, createPost, postComment, getCommentsByPostId } from '../utils/api';

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
        } finally {
            setLoading(false);
        }
    };

    // Create new post
    const handleCreatePost = async () => {
        if (!newPost.title || !newPost.content) return;

        try {
            const response = await createPost(newPost);
            const commentsRes = await getCommentsByPostId(response.data.id);
            setPosts(prev => [{ ...response.data, comments: commentsRes.data }, ...prev]);
            setNewPost({ title: '', content: '' });
        } catch (error) {
            console.error(error);
        }
    };

    // Add comment to post
    const handleAddComment = async (postId, content) => {
        if (!content.trim()) return;

        try {
            const response = await postComment(postId, { content });
            setPosts(prev => prev.map(post =>
                post.id === postId
                    ? { ...post, comments: [response.data, ...post.comments] }
                    : post
            ));
        } catch (error) {
            console.error(error);
        }
    };

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
                {item.comments.length} comments
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/!* Create Post Form *!/}
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

            {/!* Posts List *!/}
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

export default PostsScreen;*/
/*
GET /posts - Get paginated posts

POST /posts - Create new post

POST /posts/:postId/comments - Add comment to post

GET /posts/:postId/comments - Get comments for post
 */
