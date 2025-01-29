import { View, StyleSheet, Animated } from 'react-native';
import { Card, Text } from 'react-native-paper';
import React, { useRef } from 'react';

const TimelineCard = ({ item, index }) => {

    const isLeft = index % 2 !== 0; // Odd for left
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
            <Card style={[styles.card, isLeft ? styles.leftCard : styles.rightCard]}>
                <Card.Content>
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
        position: 'relative'
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
        backgroundColor: '#FFA500', // Light pink for right cards
        borderColor: '#C2185B',
        borderWidth: 1,
        alignSelf: 'flex-end',
        borderRadius: 10,
    },
    date: {
        fontWeight: 'bold',
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    subtitle: {
        fontWeight: '600',
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
});

export default TimelineCard;