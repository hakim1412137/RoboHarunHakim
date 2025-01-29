// components/CourseCard.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const CourseCard = ({ course, onViewDetails }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{course.title}</Text>
            <Text style={styles.description}>{course.description}</Text>
            <Text style={styles.level}>Level: {course.level || 'N/A'}</Text>
            <Text style={styles.duration}>Duration: {course.duration ? `${course.duration} hours` : 'N/A'}</Text>
            <Button title="View Details" onPress={onViewDetails} />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 15,
        backgroundColor: '#f0f0f0',
        marginVertical: 10,
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        marginVertical: 5,
    },
    level: {
        fontStyle: 'italic',
    },
    duration: {
        marginBottom: 10,
    },
});

export default CourseCard;

/*import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const CourseCard = ({ course, onPress }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{course.title}</Text>
            <Text>{course.description}</Text>
            <Button title="View Details" onPress={onPress} />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CourseCard;*/
