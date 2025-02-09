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

export default PostDetailScreen;

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
