// components/CourseCard.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CourseCard = ({ course, onViewDetails }) => {
    return (
        <View style={styles.card}>
            {/* Course Title and Description */}
            <View style={styles.header}>
                <Text style={styles.title}>{course.title}</Text>
                <Text style={styles.description}>{course.description}</Text>
            </View>

            {/* Course Level, Duration, and View Details Button */}
            <View style={styles.footer}>
                <View style={styles.details}>
                    <Text style={styles.level}>
                        <Text style={styles.label}>Level:</Text> {course.level || 'N/A'}
                    </Text>
                    <Text style={styles.duration}>
                        <Text style={styles.label}>Duration:</Text> {course.duration ? `${course.duration} hours` : 'N/A'}
                    </Text>
                </View>

                <TouchableOpacity onPress={onViewDetails} style={styles.viewDetailsButton}>
                    <Text style={styles.buttonText}>View Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '100%', // Use 100% width for responsiveness
        padding: 16,
        backgroundColor: '#ccffe1',
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // For Android shadow
    },
    header: {
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    details: {
        flex: 1,
    },
    level: {
        fontSize: 14,
        color: '#555',
        fontStyle: 'italic',
    },
    duration: {
        fontSize: 14,
        color: '#555',
        marginTop: 4,
    },
    label: {
        fontWeight: 'bold',
    },
    viewDetailsButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default CourseCard;



/*import React from 'react';
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
        width: '23rem',
        flex: 1,
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
import React from 'react';
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
