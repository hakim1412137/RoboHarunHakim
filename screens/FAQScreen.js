import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FAQScreen = () => {
    const faqs = [
        { question: 'How to track my order?', answer: 'You can track your order using the tracking screen.' },
        { question: 'How to contact support?', answer: 'You can contact support via chat, email, or phone.' },
    ];

    return (
        <View style={styles.container}>
            {faqs.map((faq, index) => (
                <View key={index} style={styles.faq}>
                    <Text style={styles.question}>{faq.question}</Text>
                    <Text>{faq.answer}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    faq: {
        marginBottom: 20,
    },
    question: {
        fontWeight: 'bold',
    },
});

export default FAQScreen;
