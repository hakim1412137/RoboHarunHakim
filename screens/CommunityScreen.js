import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
/*
import communityService from '../services/communityService';
*/
import Loader from '../components/Loader';

const CommunityScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            const data = await communityService.getAllPosts();
            setPosts(data);
            setLoading(false);
        };
        fetchPosts();
    }, []);

    if (loading) return <Loader />;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Community Posts</Text>
            <FlatList
                data={posts}
                keyExtractor={item => item.postId.toString()}
                renderItem={({ item }) => (
                    <View style={styles.postCard}>
                        <Text style={styles.postTitle}>{item.title}</Text>
                        <Text>{item.content}</Text>
                        <Button
                            title="View Comments"
                            onPress={() => navigation.navigate('Comments', { postId: item.postId })}
                        />
                    </View>
                )}
            />
            <Button
                title="Create New Post"
                onPress={() => navigation.navigate('CreatePost')}
            />
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
    postCard: {
        padding: 15,
        backgroundColor: '#f0f0f0',
        marginVertical: 10,
        borderRadius: 8,
    },
    postTitle: {
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default CommunityScreen;

