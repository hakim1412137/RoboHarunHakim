// PostsScreen.js
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { getAllPosts, createPost, getCommentsByPostId, postComment } from '../utils/api';
import Header from "../components/Header";
import Menu from "../components/Menu";
import PostFormModal from '../components/PostFormModal';
import {UserContext} from '../context/UserContext';

const PostsScreen = ({ navigation }) => {
    const { user } = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [expandedPostId, setExpandedPostId] = useState(null);
    const [commentsByPostId, setCommentsByPostId] = useState({});
    const [newCommentByPostId, setNewCommentByPostId] = useState({});
    const [modalVisible, setModalVisible] = useState(false);

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
        } catch (error) {
            handleApiError(error, 'Failed to load posts');
        } finally {
            setLoading(false);
        }
    };

    const fetchCommentsForPost = async (postId) => {
        try {
            // Convert postId to number if needed
            const numericPostId = Number(postId);
            const response = await getCommentsByPostId(numericPostId);

            setCommentsByPostId(prev => ({
                ...prev,
                [postId]: response.data || []
            }));
        } catch (error) {
            if (error.response?.status === 404) {
                // Handle empty comments state
                setCommentsByPostId(prev => ({
                    ...prev,
                    [postId]: []
                }));
            } else {
                handleApiError(error, 'Failed to load comments');
            }
        }
    };

    const handleApiError = (error, defaultMessage) => {
        console.error(error);
        const message = error.response?.data?.message || defaultMessage;
        Alert.alert("Error", message);
    };

    useFocusEffect(
        useCallback(() => {
            fetchPosts(true);
        }, [])
    );

    const handleCreatePost = async (postData) => {
        try {
            if (!postData.title?.trim() || !postData.content?.trim()) {
                Alert.alert("Error", "Title and content are required");
                return;
            }

            const response = await createPost(postData);
            setPosts(prev => [response.data, ...prev]);
            setModalVisible(false);
        } catch (error) {
            handleApiError(error, 'Failed to create post');
        }
    };

    const handleCommentSubmit = async (postId, commentContent) => {
        try {
            if (!commentContent?.trim()) {
                Alert.alert("Error", "Comment cannot be empty");
                return;
            }

            // Add author information (replace 'currentUser' with your actual user state)
            const commentData = {
                content: commentContent,
                author: "currentUser" // Get this from your auth context
                // author: user.username // or user.name depending on your user object

            };

            const response = await postComment(postId, commentData);

            setCommentsByPostId(prev => ({
                ...prev,
                [postId]: [response.data, ...(prev[postId] || [])]
            }));

            setNewCommentByPostId(prev => ({
                ...prev,
                [postId]: ''
            }));
        } catch (error) {
            if (error.response?.status === 404) {
                Alert.alert("Error", "Post not found or comments disabled");
            } else {
                handleApiError(error, 'Failed to post comment');
            }
        }
    };


    const renderPost = ({ item }) => {
        const isExpanded = expandedPostId === item.id;
        const comments = commentsByPostId[item.id] || [];
        const newComment = newCommentByPostId[item.id] || '';

        return (
            <View style={styles.postCard}>
                <TouchableOpacity
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
                </TouchableOpacity>

                {isExpanded && (
                    <View style={styles.commentsContainer}>
                        {comments.length === 0 ? (
                            <Text style={styles.noCommentsText}>No comments yet</Text>
                        ) : (
                            <FlatList
                                data={comments}
                                keyExtractor={comment => comment.id.toString()}
                                renderItem={({ item: comment }) => (
                                    <View style={styles.commentCard}>
                                        <Text style={styles.commentText}>{comment.content}</Text>
                                        <Text style={styles.commentAuthor}>
                                            By {comment.author} {/* Display author name */}
                                        </Text>
                                    </View>
                                )}
                            />
                        )}

                        <View onStartShouldSetResponder={() => true}>
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
                    </View>
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Header />
            <Menu navigation={navigation} />

            <TouchableOpacity
                style={styles.createButton}
                onPress={() => setModalVisible(true)}
            >
                <LinearGradient
                    colors={['#6C63FF', '#4A47FF']}
                    style={styles.gradient}
                >
                    <Text style={styles.buttonText}>Create New Post</Text>
                    <Ionicons name="add-circle" size={24} color="white" />
                </LinearGradient>
            </TouchableOpacity>

            <PostFormModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleCreatePost}
            />

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
        // flex: 1,
        height: '40rem',
        backgroundColor: '#F8FAFC',
    },
    createButton: {
        borderRadius: 8,
        overflow: 'hidden',
        margin: 16,
        marginBottom: 20,
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
    noCommentsText: {
        color: '#718096',
        textAlign: 'center',
        marginVertical: 10,
    },
});

export default PostsScreen;


/*import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { getAllPosts, createPost, getCommentsByPostId, postComment } from '../utils/api';
import Header from "../components/Header";
import Menu from "../components/Menu";
import PostFormModal from '../components/PostFormModal';
import {UserContext} from '../context/UserContext';

const PostsScreen = ({ navigation }) => {
    const { user } = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [expandedPostId, setExpandedPostId] = useState(null);
    const [commentsByPostId, setCommentsByPostId] = useState({});
    const [newCommentByPostId, setNewCommentByPostId] = useState({});
    const [modalVisible, setModalVisible] = useState(false);

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
        } catch (error) {
            handleApiError(error, 'Failed to load posts');
        } finally {
            setLoading(false);
        }
    };

    const fetchCommentsForPost = async (postId, page = 0) => {
        try {
            const response = await getCommentsByPostId(postId, page, 5);
            setCommentsByPostId(prev => ({
                ...prev,
                [postId]: {
                    data: page === 0 ? response.data : [...(prev[postId]?.data || []), ...response.data],
                    page: page,
                    hasMore: response.data.length === 5
                }
            }));
        } catch (error) {
            if (error.response?.status === 404) {
                setCommentsByPostId(prev => ({
                    ...prev,
                    [postId]: { data: [], page: 0, hasMore: false }
                }));
            } else {
                handleApiError(error, 'Failed to load comments');
            }
        }
    };

    const handleApiError = (error, defaultMessage) => {
        console.error(error);
        const message = error.response?.data?.message || defaultMessage;
        Alert.alert("Error", message);
    };

    useFocusEffect(
        useCallback(() => {
            fetchPosts(true);
        }, [])
    );

    const handleCreatePost = async (postData) => {
        try {
            if (!postData.title?.trim() || !postData.content?.trim()) {
                Alert.alert("Error", "Title and content are required");
                return;
            }

            const response = await createPost(postData);
            setPosts(prev => [response.data, ...prev]);
            setModalVisible(false);
        } catch (error) {
            handleApiError(error, 'Failed to create post');
        }
    };

    // Unified comment fetcher with pagination
    const fetchComments = async (postId, page = 0) => {
        try {
            const response = await getCommentsByPostId(postId, page, 5);
            setCommentsByPostId(prev => ({
                ...prev,
                [postId]: {
                    data: page === 0 ? response.data : [...prev[postId].data, ...response.data],
                    page: page,
                    total: response.total,
                    hasMore: (page + 1) * 5 < response.total
                }
            }));
        } catch (error) {
            handleError(error, `Failed to load comments for post ${postId}`);
        }
    };

    // Optimistic comment submission with pagination awareness
    const handleCommentSubmit = async (postId, content) => {
        if (!content.trim() || !user) return;

        const tempComment = {
            id: `temp-${Date.now()}`,
            content,
            author: user.username,
            createdAt: new Date().toISOString()
        };

        // Optimistic update for first page
        setCommentsByPostId(prev => ({
            ...prev,
            [postId]: {
                ...prev[postId],
                data: [tempComment, ...prev[postId]?.data?.slice(0, 4) || []], // Keep only first page
                total: (prev[postId]?.total || 0) + 1,
                hasMore: prev[postId]?.hasMore ?? true
            }
        }));

        try {
            const response = await postComment(postId, { content, author: user.username });

            // Replace temp comment with actual data and refresh first page
            await fetchComments(postId, 0);

        } catch (error) {
            // Rollback optimistic update
            setCommentsByPostId(prev => ({
                ...prev,
                [postId]: {
                    ...prev[postId],
                    data: prev[postId].data.filter(c => c.id !== tempComment.id),
                    total: prev[postId].total - 1
                }
            }));
            handleError(error, 'Failed to post comment');
        }
    };

    // Enhanced post renderer with pagination controls
    const renderPost = ({ item }) => {
        const isExpanded = expandedPostId === item.id;
        const commentsData = commentsByPostId[item.id] || { data: [], page: 0, total: 0, hasMore: false };
        const newComment = newCommentByPostId[item.id] || '';

        return (
            <View style={styles.postCard}>
                <TouchableOpacity
                    onPress={() => togglePostExpansion(item.id)}
                >
                    <Text style={styles.postTitle}>{item.title}</Text>
                    <Text style={styles.postContent}>{item.content}</Text>
                    <Text style={styles.commentsCount}>
                        {commentsData.total} comments
                    </Text>
                </TouchableOpacity>

                {isExpanded && (
                    <View style={styles.commentsContainer}>
                        <FlatList
                            data={commentsData.data}
                            keyExtractor={comment => comment.id}
                            renderItem={({ item: comment }) => (
                                <View style={styles.commentCard}>
                                    <Text style={styles.commentText}>
                                        {comment.content}
                                    </Text>
                                    <Text style={styles.commentAuthor}>
                                        {comment.author} - {new Date(comment.createdAt).toLocaleDateString()}
                                    </Text>
                                </View>
                            )}
                            onEndReached={() => {
                                if (commentsData.hasMore) {
                                    fetchComments(item.id, commentsData.page + 1);
                                }
                            }}
                            onEndReachedThreshold={0.5}
                            ListFooterComponent={
                                commentsData.hasMore && <ActivityIndicator size="small" color="#6C63FF" />
                            }
                        />

                        <View style={styles.commentInputContainer}>
                            <TextInput
                                style={styles.commentInput}
                                placeholder="Write a comment..."
                                value={newComment}
                                onChangeText={text => setNewCommentByPostId(prev => ({
                                    ...prev,
                                    [item.id]: text
                                }))}
                                multiline
                                onSubmitEditing={() => handleCommentSubmit(item.id, newComment)}
                                blurOnSubmit={false}
                            />
                            <TouchableOpacity
                                style={styles.commentButton}
                                onPress={() => handleCommentSubmit(item.id, newComment)}
                            >
                                <Ionicons name="arrow-up-circle" size={28} color="#6C63FF" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        );
    };
    return (
        <View style={styles.container}>
            <Header />
            <Menu navigation={navigation} />

            <TouchableOpacity
                style={styles.createButton}
                onPress={() => setModalVisible(true)}
            >
                <LinearGradient
                    colors={['#6C63FF', '#4A47FF']}
                    style={styles.gradient}
                >
                    <Text style={styles.buttonText}>Create New Post</Text>
                    <Ionicons name="add-circle" size={24} color="white" />
                </LinearGradient>
            </TouchableOpacity>

            <PostFormModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleCreatePost}
            />

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
        // flex: 1,
        height: '40rem',

        backgroundColor: '#F8FAFC',
        padding: 16,
    },
    commentInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingTop: 10
    },

    createButton: {
        borderRadius: 8,
        overflow: 'hidden',
        margin: 16,
        marginBottom: 20,
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
    noCommentsText: {
        color: '#718096',
        textAlign: 'center',
        marginVertical: 10,
    },
});

export default PostsScreen;*/

/*import React, { useState, useEffect, useCallback } from 'react';
import {View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, TextInput} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { getAllPosts, createPost, getCommentsByPostId, postComment } from '../utils/api';
import Header from "../components/Header";
import Menu from "../components/Menu";
import PostFormModal from '../components/PostFormModal';

const PostsScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [expandedPostId, setExpandedPostId] = useState(null);
    const [commentsByPostId, setCommentsByPostId] = useState({});
    const [newCommentByPostId, setNewCommentByPostId] = useState({});
    const [modalVisible, setModalVisible] = useState(false);

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
        } catch (error) {
            handleApiError(error, 'Failed to load posts');
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
            if (error.response?.status === 404) {
                // Handle empty comments gracefully
                setCommentsByPostId(prev => ({
                    ...prev,
                    [postId]: []
                }));
            } else {
                handleApiError(error, 'Failed to load comments');
            }
        }
    };
    const handleApiError = (error, defaultMessage) => {
        console.error(error);
        const message = error.response?.data?.message || defaultMessage;
        Alert.alert("Error", message);
    };

    useFocusEffect(
        useCallback(() => {
            fetchPosts(true);
        }, [])
    );

    const handleCreatePost = async (postData) => {
        try {
            // Client-side validation
            if (!postData.title?.trim() || !postData.content?.trim()) {
                Alert.alert("Error", "Title and content are required");
                return;
            }

            if (postData.title.length > 100) {
                Alert.alert("Error", "Title must be less than 100 characters");
                return;
            }

            const response = await createPost(postData);
            setPosts(prev => [response.data, ...prev]);
            setModalVisible(false);
        } catch (error) {
            handleApiError(error, 'Failed to create post');
        }
    };

    const handleCommentSubmit = async (postId, commentContent) => {
        try {
            if (!commentContent?.trim()) {
                Alert.alert("Error", "Comment cannot be empty");
                return;
            }

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
            if (error.response?.status === 404) {
                Alert.alert("Error", "Post not found");
            } else {
                handleApiError(error, 'Failed to post comment');
            }
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

            <TouchableOpacity
                style={styles.createButton}
                onPress={() => setModalVisible(true)}
            >
                <LinearGradient
                    colors={['#6C63FF', '#4A47FF']}
                    style={styles.gradient}
                >
                    <Text style={styles.buttonText}>Create New Post</Text>
                    <Ionicons name="add-circle" size={24} color="white" />
                </LinearGradient>
            </TouchableOpacity>

            <PostFormModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleCreatePost}
            />

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
    createButton: {
        borderRadius: 8,
        overflow: 'hidden',
        margin: 16,
        marginBottom: 20,
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

export default PostsScreen;*/

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
