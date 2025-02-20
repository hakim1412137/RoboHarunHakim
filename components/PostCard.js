import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getCommentsByPostId } from '../utils/api'; // Ensure this API function exists

const PostCard = ({ post }) => {
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const fetchComments = async () => {
        if (!expanded) {
            setLoadingComments(true);
            try {
                const response = await getCommentsByPostId(post.id);
                setComments(response.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            } finally {
                setLoadingComments(false);
            }
        }
        setExpanded(!expanded); // Toggle expanded state
    };

    return (
        <View style={styles.card}>
            {/* Post Content */}
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.description}>{post.description}</Text>

            {/* Comments Section */}
            <TouchableOpacity onPress={fetchComments} style={styles.commentsToggle}>
                <Text style={styles.commentsToggleText}>
                    {expanded ? 'Hide Comments' : 'View Comments'}
                </Text>
                <Ionicons
                    name={expanded ? "chevron-up" : "chevron-down"}
                    size={20}
                    color="#4299e1"
                />
            </TouchableOpacity>

            {/* Expanded Comments */}
            {expanded && (
                <View style={styles.commentsContainer}>
                    {loadingComments ? (
                        <ActivityIndicator size="small" color="#4299e1" />
                    ) : comments.length > 0 ? (
                        comments.map((comment) => (
                            <View key={comment.id} style={styles.commentCard}>
                                <View style={styles.commentHeader}>
                                    <Ionicons name="person-circle" size={20} color="#4a5568" />
                                    <Text style={styles.commentAuthor}>User #{comment.userId}</Text>
                                </View>
                                <Text style={styles.commentContent}>{comment.content}</Text>
                                <Text style={styles.commentDate}>
                                    {new Date(comment.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noComments}>No comments yet</Text>
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#2d3748',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: '#4a5568',
        lineHeight: 20,
        marginBottom: 12,
    },
    commentsToggle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
    },
    commentsToggleText: {
        color: '#4299e1',
        fontSize: 14,
        fontWeight: '500',
    },
    commentsContainer: {
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
    },
    commentCard: {
        backgroundColor: '#f7fafc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
    },
    commentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    commentAuthor: {
        color: '#4a5568',
        fontSize: 12,
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
        paddingVertical: 8,
    },
});

export default PostCard;
