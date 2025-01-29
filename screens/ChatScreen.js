import React, { useEffect, useState, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import api from '../utils/api';

const ChatScreen = ({ route }) => {
    const { orderId } = route.params;
    const [messages, setMessages] = useState([]);
    const [userId] = useState('1'); // Assume hardcoded user ID for this example
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const user = await api.getUserById(userId); // Fetch user details
                if (user) {
                    setUserName(user.name); // Set user's name for sending messages
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUserDetails();
    }, [userId]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const initialMessages = await api.fetchMessages(orderId);
                setMessages(initialMessages.map(msg => ({
                    _id: msg.id,
                    text: msg.content,
                    createdAt: new Date(msg.createdAt),
                    user: {
                        _id: msg.userId, // Use ID from message data
                        name: userName, // Use fetched user's name
                    },
                })));
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, [orderId, userName]); // Depend on userName so we fetch messages after user name is available

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

        const messageData = {
            orderId,
            userId, // Replace with the actual user's ID
            content: messages[0].text, // Use the text of the first message
            createdAt: new Date(),
        };

        api.sendMessage(messageData)
            .then(response => {
                console.log("Message sent:", response);
            })
            .catch(error => {
                console.error("Failed to send message:", error);
            });
    }, [orderId]);

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: userId, // User's ID
                name: userName, // User's name for display
            }}
        />
    );
};

export default ChatScreen;

// Replace with dynamic user ID
/*

// screens/ChatScreen.js
import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from '../firebaseConfig';

const ChatScreen = ({ route }) => {
    const { orderId } = route.params;
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const messagesRef = firebase.firestore().collection('orders').doc(orderId).collection('messages');
        const unsubscribe = messagesRef.orderBy('createdAt', 'desc').onSnapshot(snapshot => {
            const messagesFirestore = snapshot.docs.map(doc => {
                const message = doc.data();
                return { ...message, createdAt: message.createdAt.toDate() };
            });
            setMessages(messagesFirestore);
        });
        return () => unsubscribe();
    }, []);

    const onSend = useCallback((messages = []) => {
        const messagesRef = firebase.firestore().collection('orders').doc(orderId).collection('messages');
        messages.forEach(message => {
            messagesRef.add({ ...message, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
        });
    }, []);

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
                name: 'Customer',
            }}
        />
    );
};

export default ChatScreen;
*/
