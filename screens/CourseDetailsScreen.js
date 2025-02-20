// screens/CourseDetailsScreen.js

import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Loader from '../components/Loader';
import { getCourseById, enrollInCourse } from '../utils/api';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/UserContext";
import Icon from 'react-native-vector-icons/MaterialIcons';

const CourseDetailsScreen = ({ route, navigation }) => {
    const { user } = useContext(UserContext);
    const { courseId } = route.params;
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const { data } = await getCourseById(courseId);
                setCourse(data);
            } catch (error) {
                console.error('Fetch course error:', error);
                Alert.alert('Error', 'Failed to load course details');
            } finally {
                setLoading(false);
            }
        };

        fetchCourseDetails();
    }, [courseId]);

    const handleEnrollment = async () => {
        try {
            const userData = await AsyncStorage.getItem('user');
            const { id: userId } = JSON.parse(userData);

            const { data } = await enrollInCourse(userId, courseId);
            Alert.alert("Success", "Enrollment successful!");
            navigation.goBack();
        } catch (error) {
            console.error('Enrollment error:', error);
            Alert.alert("Error", error.response?.data?.message || "Enrollment failed");
        }
    };

    if (loading) return <Loader />;

    return (
        <View style={styles.container}>
            {course ? (
                <>
                    <View style={styles.header}>
                        <Text style={styles.title}>{course.title}</Text>
                        <Text style={styles.courseId}>ID: {course.id}</Text>
                    </View>

                    <View style={styles.detailsContainer}>
                        <View style={styles.metaContainer}>
                            <Text style={styles.detailText}>
                                <Icon name="date-range" size={16} color="#666" />
                                Created: {new Date(course.createdAt).toLocaleDateString()}
                            </Text>

                            <Text style={styles.detailText}>
                                <Icon name="school" size={16} color="#666" />
                                Level: {course.level}
                            </Text>
                        </View>

                        <Text style={styles.description}>{course.description}</Text>

                        <View style={styles.durationContainer}>
                            <Text style={styles.duration}>
                                <Icon name="timer" size={16} color="#666" />
                                Duration: {course.duration} hours
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.enrollButton}
                        onPress={handleEnrollment}
                    >
                        <Text style={styles.enrollButtonText}>
                            <Icon name="assignment" size={18} color="white" /> Enroll Now
                        </Text>
                    </TouchableOpacity>
                </>
            ) : (
                <Text style={styles.notFoundText}>Course details not available</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 3,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#2c3e50',
        flex: 2,
    },
    courseId: {
        fontSize: 16,
        color: '#7f8c8d',
        fontWeight: '500',
    },
    detailsContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        elevation: 2,
    },
    metaContainer: {
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ecf0f1',
        paddingBottom: 15,
    },
    detailText: {
        fontSize: 16,
        color: '#34495e',
        marginVertical: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#7f8c8d',
        marginBottom: 20,
    },
    durationContainer: {
        borderTopWidth: 1,
        borderTopColor: '#ecf0f1',
        paddingTop: 15,
    },
    duration: {
        fontSize: 16,
        fontWeight: '600',
        color: '#27ae60',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5
    },
    enrollButton: {
        backgroundColor: '#6C63FF',
        borderRadius: 8,
        padding: 16,
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    enrollButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: 5
    },
    notFoundText: {
        fontSize: 18,
        color: '#e74c3c',
        textAlign: 'center',
        marginTop: 50,
    },
});

export default CourseDetailsScreen;
