// components/CourseCard.js
import React from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';

const CourseCard = ({ course, onViewDetails }) => {
    return (
        <View style={styles.card}>
            <View style={{ width: '100%' }}>
                <Text style={styles.title}>{course.title}</Text>
                <Text style={styles.description}>{course.description}</Text>
            </View>

            <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                    <Text style={styles.level}><Text style={{ fontWeight: 'bold' }}>Level:</Text> {course.level || 'N/A'}</Text>
                    <Text style={styles.duration}><Text style={{ fontWeight: 'bold' }}>Duration:</Text> {course.duration ? `${course.duration} hours` : 'N/A'}</Text>
                </View>

                <TouchableOpacity onPress={onViewDetails} style={{ borderRadius: 10, backgroundColor: '#4CAF50', display: 'flex', padding: 10, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 14 }}>View Details</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '22rem',
        height: '11rem',
        padding: 15,
        backgroundColor: '#ccffe1',
        marginVertical: 10,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    description: {
        fontWeight: '500',
        marginVertical: 5,
    },
    level: {
        fontStyle: 'italic',
    }
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
