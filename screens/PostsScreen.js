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
