// components/CourseCard.js
import React from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const CourseCard = ({ course, onViewDetails }) => {
    return (
        <View style={styles.card}>
            <LinearGradient
                colors={['#4CAF50', '#A4E5C3']} // Softer green gradient
                style={styles.gradientHeader}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                <Text style={styles.title}>{course.title}</Text>
                <Text style={styles.description}>{course.description}</Text>
            </LinearGradient>

            <View style={styles.content}>
                <View style={styles.metaContainer}>
                    <View style={styles.metaItem}>
                        <Ionicons name="school-outline" size={16} color="#444" />
                        <Text style={styles.metaText}>
                            {course.level || 'Beginner'}
                        </Text>
                    </View>
                    <View style={styles.metaItem}>
                        <Ionicons name="time-outline" size={16} color="#444" />
                        <Text style={styles.metaText}>
                            {course.duration ? `${course.duration}h` : 'Flexible'}
                        </Text>
                    </View>
                </View>

                <TouchableOpacity 
                    onPress={onViewDetails} 
                    style={styles.viewDetailsButton}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>Explore Course</Text>
                    <Ionicons name="arrow-forward" size={18} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 }, // Softer shadow
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
        overflow: 'hidden', // Prevents child overflow
    },
    gradientHeader: {
        padding: 18,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Electrolize_400Regular',
        color: '#FFFFFF',
        marginBottom: 6,
    },
    description: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.85)',
        lineHeight: 20,
    },
    content: {
        padding: 16,
    },
    metaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    metaText: {
        fontSize: 14,
        color: '#444',
        fontWeight: '500',
    },
    viewDetailsButton: {
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#4CAF50',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 18,
        gap: 8,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
});

export default CourseCard;

