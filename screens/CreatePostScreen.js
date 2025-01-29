// screens/CreatePostScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { createCommunityPost } from "../utils/api";

const CreatePostScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async () => {
        const newPost = { title, content };
        await createCommunityPost(newPost);
        navigation.navigate('Community'); // Navigate back to community screen
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Create a New Post</Text>
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Content"
                multiline
                numberOfLines={4}
                value={content}
                onChangeText={setContent}
            />
            <Button title="Submit Post" onPress={handleSubmit} />
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
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 8,
    },
});

export default CreatePostScreen;
