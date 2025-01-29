// screens/CourseDetailsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Loader from '../components/Loader'; // Make sure this component exists
import { getCourseById } from '../utils/api'; // Ensure this function is defined properly

const CourseDetailsScreen = ({ route }) => {
    const { courseId } = route.params; // Receive course ID from params
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const data = await getCourseById(courseId); // Fetch course details
                setCourse(data);
            } catch (error) {
                console.error(error);
                Alert.alert('Error', 'Failed to fetch course details');
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [courseId]);

    if (loading) return <Loader />;

    return (
        <View style={styles.container}>
            {course ? (
                <>
                    <Text style={styles.title}>{course.title}</Text>
                    <Text>{course.description}</Text>
                    <Button title="Enroll Now" onPress={() => {/* Enrollment logic */}} />
                </>
            ) : (
                <Text>No course found.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default CourseDetailsScreen;


/*// screens/CourseDetailsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Loader from '../components/Loader';
import { getCourseById } from "../utils/api";

const CourseDetailsScreen = ({ route }) => {
    const { courseId } = route.params;
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            const data = await getCourseById(courseId);
            setCourse(data);
            setLoading(false);
        };
        fetchCourse();
    }, [courseId]);

    if (loading) return <Loader />;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{course.title}</Text>
            <Text>{course.description}</Text>
            <Button title="Enroll Now" onPress={() => {/!* Enrollment logic *!/}} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default CourseDetailsScreen;*/
