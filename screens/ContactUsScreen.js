// screens/ContactUsScreen.js (extended)
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Linking, StyleSheet } from 'react-native';
import email from 'react-native-email';
import Menu from "../components/Menu";
import Header from "../components/Header";

const ContactUsScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        const to = ['mabderhakim@gmail.com']; // Replace with your email address

        // Create the message body with real-time data
        const messageBody = `
        Name: ${name}
        Email: ${emailAddress}
        Message: ${message}
    `;

        email(to, {
            subject: `Contact Us: ${name}`,
            body: messageBody,

        }).then(() => {
            Alert.alert("Message Sent", "Thank you for reaching out! We will get back to you soon.");
            setName('');
            setEmailAddress('');
            setMessage('');
        }).catch(err => {
            console.error("Failed to send email:", err);
            Alert.alert("Error", "There was an issue sending your message. Please try again.");
        });
    };

    const openLink = (url) => {
        Linking.openURL(url).catch(err => console.error("Failed to open URL: ", err));
    };

    return (
        <View style={styles.container}>
            <Header />
            <Menu navigation={navigation} />
            <View style={{ padding: 20, paddingHorizontal: 200 }}>
                <Text style={styles.header}>Contact Us</Text>
                <Text style={styles.subheader}>You can reach us through our social media channels:</Text>
                <View style={styles.buttonContainer}>
                    <Button title="Facebook" onPress={() => openLink('https://www.facebook.com/YourPage')} />
                    <Button title="Twitter" onPress={() => openLink('https://twitter.com/YourProfile')} />
                    <Button title="LinkedIn" onPress={() => openLink('https://www.linkedin.com/company/YourCompany')} />
                    <Button title="Instagram" onPress={() => openLink('https://www.instagram.com/YourProfile')} />
                </View>
                <Text style={styles.subheader}>Or send us a message:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Your Name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Your Email"
                    value={emailAddress}
                    onChangeText={setEmailAddress}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Message"
                    multiline
                    numberOfLines={4}
                    value={message}
                    onChangeText={setMessage}
                />
                <Button title="Send Message" onPress={handleSendMessage} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBF1E6',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subheader: {
        fontSize: 18,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 8,
    },
    buttonContainer: {
        marginVertical: 10,
    },
});

export default ContactUsScreen;

/*
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Linking, Alert } from 'react-native';
import Menu from '../components/Menu';
import Header from '../components/Header';

const ContactUsScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        // Logic to send message (could connect to a backend service)
        Alert.alert("Message Sent", "Thank you for reaching out! We will get back to you soon.");
        setName('');
        setEmail('');
        setMessage('');
    };

    const openLink = (url) => {
        Linking.openURL(url).catch(err => console.error("Failed to open URL: ", err));
    };

    return (
        <View style={styles.container}>
            <Header></Header>
            <Menu navigation={navigation}></Menu>
            <View style={{ padding: 20, paddingHorizontal: 200 }}>
                <Text style={styles.header}>Contact Us</Text>
                <Text style={styles.subheader}>You can reach us through our social media channels:</Text>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Facebook"
                        onPress={() => openLink('https://www.facebook.com/YourPage')}
                    />
                    <Button
                        title="Twitter"
                        onPress={() => openLink('https://twitter.com/YourProfile')}
                    />
                    <Button
                        title="LinkedIn"
                        onPress={() => openLink('https://www.linkedin.com/company/YourCompany')}
                    />
                    <Button
                        title="Instagram"
                        onPress={() => openLink('https://www.instagram.com/YourProfile')}
                    />
                </View>
                <Text style={styles.subheader}>Or send us a message:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Your Name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Your Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Message"
                    multiline
                    numberOfLines={4}
                    value={message}
                    onChangeText={setMessage}
                />
                <Button title="Send Message" onPress={handleSendMessage} />
    
                </View>
       </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBF1E6',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subheader: {
        fontSize: 18,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 8,
    },
    buttonContainer: {
        marginVertical: 10,
    },
});

export default ContactUsScreen;
*/
