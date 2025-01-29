import { View, StyleSheet, Animated } from 'react-native';
import { Card, Text } from 'react-native-paper';
import React, { useRef } from 'react';

const TimelineCard1 = ({ item, index }) => {
    const animatedValue = useRef(new Animated.Value(1)).current; // Use useRef for animated value

    const handleMouseEnter = () => {
        Animated.spring(animatedValue, {
            toValue: 1.1, // Scale up slightly
            useNativeDriver: true,
        }).start();
    };

    const handleMouseLeave = () => {
        Animated.spring(animatedValue, {
            toValue: 1, // Scale back down
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View
            style={{ transform: [{ scale: animatedValue }] }}
            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
        >
            <Card style={[styles.card, index % 2 !== 0 ? styles.leftCard : styles.rightCard]}>
                <Card.Content style={styles.cardContent}>
                    <Text style={styles.date}>{new Date(item.eventDate).toLocaleString()}</Text>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.subtitle}>{item.subtitle}</Text>
                    {item.description && <Text style={styles.description}>{item.description}</Text>}
                </Card.Content>
            </Card>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: "50%",
        position: 'relative',
    },
    leftCard: {
        marginRight: 10,
        backgroundColor: '#E0F7FA', // Light cyan for left cards
        borderColor: '#006064',
        borderWidth: 1,
        alignSelf: 'flex-start',
        borderRadius: 10,
    },
    rightCard: {
        marginLeft: 10,
        backgroundColor: '#FFA500', // Light orange for right cards
        borderColor: '#C2185B',
        borderWidth: 1,
        alignSelf: 'flex-end',
        borderRadius: 10,
    },
    cardContent: {
        alignItems: 'center', // Center content horizontally
        textAlign: 'center', // Center text
        paddingVertical: 10, // Add some vertical padding for better spacing
    },
    date: {
        fontWeight: 'bold',
        textAlign: 'center', // Center align date text
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center', // Center align title text
    },
    subtitle: {
        fontWeight: '600',
        textAlign: 'center', // Center align subtitle text
    },
    description: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center', // Center align description text
    },
});

export default  TimelineCard1;

