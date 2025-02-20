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
