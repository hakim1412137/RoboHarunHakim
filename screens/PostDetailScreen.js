// PostDetailScreen.js (With comment creation)
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { getPostById, postComment, getCommentsByPostId } from '../utils/api';

const PostDetailScreen = ({ route }) => {
    const { postId } = route.params;
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const postRes = await getPostById(postId);
                const commentsRes = await getCommentsByPostId(postId);
                setPost(postRes.data);
                setComments(commentsRes.data);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [postId]);

    const handleCommentSubmit = async () => {
        if (!newComment.trim()) return;

        try {
            const response = await postComment(postId, { content: newComment });
            setComments(prev => [response.data, ...prev]);
            setNewComment('');
        } catch (error) {
            console.error('Comment error:', error);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.description}>{post.description}</Text>
            <Text style={styles.content}>{post.content}</Text>

            {/* Comment Input */}
            <View style={styles.commentSection}>
                <TextInput
                    style={styles.commentInput}
                    placeholder="Write a comment..."
                    value={newComment}
                    onChangeText={setNewComment}
                    multiline
                />
                <TouchableOpacity
                    style={styles.commentButton}
                    onPress={handleCommentSubmit}
                >
                    <Text style={styles.buttonText}>Post Comment</Text>
                </TouchableOpacity>
            </View>

            {/* Comments List */}
            <FlatList
                data={comments}
                renderItem={({ item }) => (
                    <View style={styles.commentCard}>
                        <Text>{item.content}</Text>
                        <Text style={styles.commentAuthor}>By User #{item.userId}</Text>
                    </View>
                )}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    commentSection: {
        marginVertical: 20,
    },
    commentInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        minHeight: 100,
        marginBottom: 10,
    },
    commentButton: {
        backgroundColor: '#6C63FF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    commentCard: {
        backgroundColor: '#f8f9fa',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    commentAuthor: {
        color: '#666',
        fontSize: 12,
        marginTop: 5,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default PostDetailScreen;
/*import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Animated,
    Alert
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import {getCommentsByPostId, getPostById, createComment, postComment} from '../utils/api';
import { LinearGradient } from 'expo-linear-gradient';
import Header from "../components/Header";
import Menu from "../components/Menu";

const PostDetailScreen = ({ navigation }) => {
    const route = useRoute();
    const { id } = route.params;
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fadeAnim = useState(new Animated.Value(0))[0];

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const [postRes, commentsRes] = await Promise.all([
                    getPostById(id),
                    getCommentsByPostId(id)
                ]);

                setPost(postRes.data);
                setComments(commentsRes.data);

                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                }).start();
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [id]);

    const handleAddComment = async () => {
        if (!newComment.trim()) {
            Alert.alert('Error', 'Please write a comment before posting');
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await postComment({
                postId: id,
                content: newComment
            });

            setComments([response.data, ...comments]);
            setNewComment('');
        } catch (error) {
            console.error("Error adding comment:", error);
            Alert.alert("Error", "Failed to add comment");
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderComment = ({ item }) => (
        <Animated.View style={[styles.commentCard, { opacity: fadeAnim }]}>
            <View style={styles.commentHeader}>
                <LinearGradient
                    colors={['#6C63FF', '#4A47FF']}
                    style={styles.avatar}
                >
                    <Feather name="user" size={20} color="white" />
                </LinearGradient>
                <View>
                    <Text style={styles.commentAuthor}>User #{item.userId}</Text>
                    <Text style={styles.commentDate}>
                        {new Date(item.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </Text>
                </View>
            </View>
            <Text style={styles.commentContent}>{item.content}</Text>
        </Animated.View>
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />; // Show loading indicator
    }



    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <ScrollView>
                <Header></Header>
                <Menu navigation={navigation}></Menu>
                <View style={styles.commentForm}>
                    <TextInput
                        style={styles.commentInput}
                        placeholder="Write your comment..."
                        placeholderTextColor="#94a3b8"
                        value={newComment}
                        onChangeText={setNewComment}
                        multiline
                        editable={!isSubmitting}
                    />
                    <TouchableOpacity
                        style={styles.commentButton}
                        onPress={handleAddComment}
                        disabled={isSubmitting}
                    >
                        <LinearGradient
                            colors={['#6C63FF', '#4A47FF']}
                            style={styles.gradient}
                        >
                            {isSubmitting ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <>
                                    <Ionicons name="send" size={20} color="white" />
                                    <Text style={styles.commentButtonText}>Post Comment</Text>
                                </>
                            )}
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {/!* Comments Section *!/}
                <View style={styles.commentsSection}>
                    <Text style={styles.commentsTitle}>
                        <Ionicons name="chatbubbles" size={24} color="#6C63FF" />
                        Discussion ({comments.length})
                    </Text>

                    <FlatList
                        data={comments}
                        renderItem={renderComment}
                        keyExtractor={item => item.id.toString()}
                        scrollEnabled={false}
                        ListEmptyComponent={
                            <View style={styles.emptyComments}>
                                <Feather name="message-square" size={40} color="#CBD5E0" />
                                <Text style={styles.emptyText}>No comments yet</Text>
                                <Text style={styles.emptySubText}>Be the first to share your thoughts!</Text>
                            </View>
                        }
                    />
                </View>
            </ScrollView>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
    },
    loadingText: {
        marginTop: 16,
        color: '#6C63FF',
        fontSize: 16,
    },
    header: {
        padding: 24,
        paddingTop: 60,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 20,
        padding: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: 'white',
        marginTop: 30,
        lineHeight: 36,
    },
    postCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        margin: 20,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 5,
    },
    metaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        flexWrap: 'wrap',
    },
    dateText: {
        color: '#718096',
        fontSize: 14,
        marginLeft: 8,
        marginRight: 16,
    },
    commentCount: {
        color: '#718096',
        fontSize: 14,
        marginLeft: 8,
    },
    divider: {
        width: 1,
        height: 16,
        backgroundColor: '#CBD5E0',
        marginHorizontal: 12,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2D3748',
        marginBottom: 12,
        marginTop: 16,
    },
    description: {
        fontSize: 16,
        color: '#4A5568',
        lineHeight: 24,
        marginBottom: 16,
    },
    content: {
        fontSize: 16,
        color: '#4A5568',
        lineHeight: 24,
    },
    commentsSection: {
        backgroundColor: 'white',
        borderRadius: 20,
        margin: 20,
        padding: 24,
    },
    commentsTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: '#2D3748',
        marginBottom: 24,
        flexDirection: 'row',
        alignItems: 'center',
    },
    commentCard: {
        backgroundColor: '#F8FAFC',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
    },
    commentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    commentAuthor: {
        color: '#2D3748',
        fontSize: 14,
        fontWeight: '600',
    },
    commentDate: {
        color: '#A0AEC0',
        fontSize: 12,
        marginTop: 2,
    },
    commentContent: {
        fontSize: 14,
        color: '#4A5568',
        lineHeight: 22,
        marginBottom: 12,
    },
    replyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    replyText: {
        color: '#6C63FF',
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 6,
    },
    emptyComments: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    emptyText: {
        color: '#A0AEC0',
        fontSize: 16,
        marginTop: 12,
    },
    emptySubText: {
        color: '#CBD5E0',
        fontSize: 14,
        marginTop: 4,
    },
    errorHeader: {
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    errorTitle: {
        fontSize: 28,
        color: 'white',
        fontWeight: '700',
    },
    errorContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    errorText: {
        fontSize: 18,
        color: '#2D3748',
        textAlign: 'center',
        marginVertical: 20,
    },

    backButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginRight: 8,
    },
    commentForm: {
        backgroundColor: 'white',
        borderRadius: 20,
        margin: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    commentInput: {
        minHeight: 100,
        fontSize: 16,
        color: '#334155',
        padding: 15,
        borderRadius: 12,
        backgroundColor: '#f8fafc',
        textAlignVertical: 'top',
    },
    commentButton: {
        marginTop: 15,
        borderRadius: 12,
        overflow: 'hidden',
    },
    gradient: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    commentButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 10,
    },
});

export default PostDetailScreen;*/
/*
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getCommentsByPostId, getPostById } from '../utils/api';

const PostDetailScreen = ({ navigation }) => {
    const route = useRoute();
    const { id } = route.params;
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
/!*    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                // Load post first
                const postResponse = await getPostById(id);
                setPost(postResponse.data);

                // Then load comments
                const commentsResponse = await getCommentsByPostId(id);
                setComments(commentsResponse.data);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [id]);*!/

  useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            try {
                // Load post first
                const postResponse = await getPostById(id);
                if(isMounted) {
                    setPost(postResponse.data);
                    setLoading(false);
                }

                // Then load comments
                const commentsResponse = await getCommentsByPostId(id);
                if(isMounted) {
                    setComments(commentsResponse.data);
                    setCommentsLoading(false);
                }
            } catch (error) {
                console.error("Error:", error);
                if(isMounted) {
                    setLoading(false);
                    setCommentsLoading(false);
                }
            }
        };

        loadData();
        return () => { isMounted = false };
    }, [id]);

    const renderComment = ({ item }) => (
        <View style={styles.commentCard}>
            <View style={styles.commentHeader}>
                <Ionicons name="person-circle" size={24} color="#4a5568" />
                <Text style={styles.commentAuthor}>User #{item.userId}</Text>
            </View>
            <Text style={styles.commentContent}>{item.content}</Text>
            <Text style={styles.commentDate}>
                {new Date(item.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}
            </Text>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4299e1" />
            </View>
        );
    }

    if (!post) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Post not found!</Text>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="white" />
                    <Text style={styles.backButtonText}>Back to Posts</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="arrow-back" size={24} color="white" />
                <Text style={styles.backButtonText}>Back to Posts</Text>
            </TouchableOpacity>

            <View style={styles.postCard}>
                <Text style={styles.title}>{post.title}</Text>

                <View style={styles.metaContainer}>
                    <Ionicons name="time" size={16} color="#718096" />
                    <Text style={styles.dateText}>
                        Posted on {new Date(post.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                    </Text>
                </View>

                <Text style={styles.subtitle}>Description</Text>
                <Text style={styles.description}>{post.description}</Text>

                <Text style={styles.subtitle}>Content</Text>
                <Text style={styles.content}>{post.content}</Text>
            </View>

            <View style={styles.commentsSection}>
                <Text style={styles.commentsTitle}>
                    <Ionicons name="chatbubbles" size={24} color="#4299e1" />
                    Comments ({comments.length})
                </Text>

                <FlatList
                    data={comments}
                    renderItem={renderComment}
                    keyExtractor={item => item.id.toString()}
                    scrollEnabled={false}
                    ListEmptyComponent={
                        <Text style={styles.noComments}>No comments yet</Text>
                    }
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7fafc',
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4299e1',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginBottom: 20,
    },
    backButtonText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 8,
        fontWeight: '500',
    },
    postCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#2d3748',
        marginBottom: 12,
    },
    metaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    dateText: {
        color: '#718096',
        fontSize: 14,
        marginLeft: 8,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2d3748',
        marginBottom: 8,
        marginTop: 16,
    },
    description: {
        fontSize: 16,
        color: '#4a5568',
        lineHeight: 24,
        marginBottom: 12,
    },
    content: {
        fontSize: 16,
        color: '#4a5568',
        lineHeight: 24,
    },
    commentsSection: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
    },
    commentsTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2d3748',
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    commentCard: {
        backgroundColor: '#f7fafc',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
    },
    commentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    commentAuthor: {
        color: '#4a5568',
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 8,
    },
    commentContent: {
        fontSize: 14,
        color: '#4a5568',
        lineHeight: 20,
        marginBottom: 8,
    },
    commentDate: {
        fontSize: 12,
        color: '#a0aec0',
        textAlign: 'right',
    },
    noComments: {
        color: '#a0aec0',
        fontSize: 14,
        textAlign: 'center',
        paddingVertical: 16,
    },
    errorText: {
        fontSize: 18,
        color: '#e53e3e',
        textAlign: 'center',
        marginVertical: 20,
    },
});

export default PostDetailScreen;*/
/*
   useEffect(() => {
        const loadPost = async () => {
            setLoading(true);
            try {
                const [postResponse, commentsResponse] = await Promise.all([
                    getPostById(id),
                    getCommentsByPostId(id)
                ]);
                setPost(postResponse.data);
                setComments(commentsResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        loadPost();
    }, [id]);

useEffect(() => {
    let isMounted = true;
    setLoading(true);

    // Load post
    const loadPost = async () => {
        try {
            const response = await getPostById(id);
            if(isMounted) setPost(response.data);
        } catch (error) {
            console.error("Post load error:", error);
        }
    };

    // Load comments
    const loadComments = async () => {
        try {
            const response = await getCommentsByPostId(id);
            if(isMounted) setComments(response.data);
        } catch (error) {
            console.error("Comments load error:", error);
        }
    };

    // Run both in parallel
    Promise.all([loadPost(), loadComments()])
        .finally(() => {
            if(isMounted) setLoading(false);
        });

    return () => { isMounted = false };
}, [id]);
 */
// import React, { useEffect, useState } from 'react';
// import {View, Text, StyleSheet, ActivityIndicator, Button, FlatList, TouchableOpacity} from 'react-native';
// import { useRoute } from '@react-navigation/native';
// import {getCommentsByPostId, getPostById} from '../utils/api';
// import PostCard from "../components/PostCard"; // Function to fetch post data by ID
//
// const PostDetailScreen = ({ navigation }) => {
//     const route = useRoute();
//     const { id } = route.params; // Get the post ID from the route parameters
//     const [post, setPost] = useState(null);
//     const [comments, setComments] = useState(null);
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         const loadPost = async () => {
//             setLoading(true);
//             try {
//                 const comments = await getCommentsByPostId(id); // Fetch post details
//                 setComments(comments.data)
//                 const post = await getPostById(id);
//                 setPost(post.data); // Set the post data
//             } catch (error) {
//                 console.error("Error fetching post details:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//
//         loadPost(); // Call the load post function
//     }, [id]);
//
//     if (loading) {
//         return <ActivityIndicator size="large" color="#0000ff" />; // Show loading indicator
//     }
//
//     if (!post) {
//         return (
//             <View style={styles.container}>
//                 <Text style={styles.errorText}>Post not found!</Text>
//                 <Button title="Back to Posts" onPress={() => navigation.goBack()} />
//             </View>
//         );
//     }
//
//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>{post.title}</Text>
//             <Text style={styles.bodyText}>Description: {post.description}</Text>
//             <Text style={styles.bodyText}>Content: {post.content}</Text>
//             <Text style={styles.bodyText}>Posted On: {new Date(post.createdAt).toLocaleString()}</Text>
//             {/* Add more post details as necessary */}
//             <Button title="Back to Posts" onPress={() => navigation.goBack()} />
//
//             <FlatList
//                 data={comments}
//                 keyExtractor={(item) => item.id.toString()} // Unique key for each item
//                 renderItem={({ item }) =>
//                     <>
//                         <View>{item.content}</View>
//                         <View>{item.userId}</View>
//                         <View>{item.createdAt}</View>
//                     </>
//                 } // Render items using the defined function
//             />
//         </View>
//     );
// };
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         backgroundColor: '#fff',
//     },
//     title: {
//         fontSize: 26,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     bodyText: {
//         fontSize: 16,
//         marginBottom: 5,
//     },
//     errorText: {
//         fontSize: 18,
//         color: 'red',
//         textAlign: 'center',
//     },
// });
//
// export default PostDetailScreen;
