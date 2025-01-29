// screens/CommentsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TextInput } from 'react-native';
import Loader from '../components/Loader';
import { getCommentsByPostId, postComment } from "../utils/api";

const CommentsScreen = ({ route }) => {
    const { postId } = route.params;
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
            const data = await getCommentsByPostId(postId);
            setComments(data);
            setLoading(false);
        };
        fetchComments();
    }, [postId]);

    const handleAddComment = async () => {
        if (comment.trim()) {
            await postComment(postId, { content: comment });
            setComment(''); // Clear input
            // Refresh comments
            const updatedComments = await getCommentsByPostId(postId);
            setComments(updatedComments);
        }
    };

    if (loading) return <Loader />;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Comments</Text>
            <FlatList
                data={comments}
                keyExtractor={item => item.commentId.toString()}
                renderItem={({ item }) => (
                    <View style={styles.commentCard}>
                        <Text>{item.content}</Text>
                    </View>
                )}
            />
            <TextInput
                style={styles.input}
                placeholder="Add a comment..."
                value={comment}
                onChangeText={setComment}
            />

            <Button title="Submit Comment" onPress={handleAddComment} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        marginBottom: 10,
    },
    commentCard: {
        padding: 15,
        backgroundColor: '#f0f0f0',
        marginVertical: 10,
        borderRadius: 8,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 8,
    },
});

export default CommentsScreen;
