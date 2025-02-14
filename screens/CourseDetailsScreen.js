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
/*import React, {useContext, useEffect, useState} from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import Loader from '../components/Loader';
import {getCourseById, enrollInCourse, getUserDetails} from '../utils/api';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {UserContext, useUser} from "../context/UserContext";

const CourseDetailsScreen = ({ route, navigation }) => {
    const {user, setUser } = useContext(UserContext);

    const courseId = route.params.courseId;
    const [course, setCourse] = useState(null);
    const [enrollment, setEnrollment] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await getCourseById(courseId);
                console.log(response.data);
                setCourse(response.data);
            } catch (error) {
                console.error(error);
                Alert.alert('Error', 'Failed to fetch course details');
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [courseId]);

    const handleEnroll = async () => {
        try {

            const user1=  await AsyncStorage.getItem('user');
            const userId = JSON.parse(user1).id;
            console.log('fetchedUser:', user1);

            console.log('User and Course ID:', userId, courseId);
            const response = await enrollInCourse(userId, courseId);
            Alert.alert("Success", "You have been enrolled in the course!");
            console.log(response.data);
            setEnrollment(response.data);
            navigation.goBack();
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Failed to enroll in the course");
        }
    };

    if (loading) return <Loader />;

    return (
        <View style={styles.container}>
            {course ? (
                <>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{course.title}</Text>
                        <Text style={{ fontSize: 20 }}>ID: <Text style={{ fontWeight: 'bold' }}>{course.id}</Text></Text>
                    </View>
                    <Text>Created At: <Text style={{ fontWeight: 'bold' }}>{course.createdAt}</Text></Text>
                    <Text>Level: <Text style={{ fontWeight: 'bold' }}>{course.level}</Text></Text>
                    <View style={{ marginBottom: 10, marginTop: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 15 }}>{course.description}</Text>
                        <Text>Duration: <Text style={{ fontWeight: 'bold' }}>{course.duration}</Text></Text>
                    </View>
                    <Button title="Enroll Now" onPress={handleEnroll} />
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

export default CourseDetailsScreen;*/
// const userId = user.id; // Assuming `user` contains the logged-in user's details
//     if (!user) {
//         Alert.alert("Error", "Please login to enroll");
//         navigation.navigate('login');
//         return;
//     }
/*import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import Loader from '../components/Loader'; // Ensure this component exists
import { getCourseById, enrollInCourse } from '../utils/api';
import AsyncStorage from "@react-native-async-storage/async-storage"; // Add enrollInCourse function

const CourseDetailsScreen = ({ route, navigation }) => {
    const courseId = route.params.courseId; // Correctly retrieve course ID from params
    const [course, setCourse] = useState(null);
    const [enrollment, setEnrollment] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await getCourseById(courseId); // Fetch course details
                console.log(response.data)
                setCourse(response.data);
            } catch (error) {
                console.error(error);
                Alert.alert('Error', 'Failed to fetch course details');
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [courseId]);
    const handleEnroll = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId'); // Retrieve the logged-in user's ID
            const response= await enrollInCourse(userId, courseId); // Pass userId and courseId
            Alert.alert("Success", "You have been enrolled in the course!");
            console.log(response.data)
            setEnrollment(response.data);
            navigation.goBack();
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Failed to enroll in the course");
        }
    };*/
   /* const handleEnroll = async () => {
        try {
            await enrollInCourse(courseId); // Add your logic for enrolling in the course
            Alert.alert("Success", "You have been enrolled in the course!");
            // Example: navigate back or to another screen
            navigation.goBack();
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Failed to enroll in the course");
        }
    };

    if (loading) return <Loader />;

    return (
        <View style={styles.container}>
            {course ? (
                <>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{course.title}</Text>
                        <Text style={{ fontSize: 20 }}>ID: <Text style={{ fontWeight: 'bold' }}>{course.id}</Text></Text>
                    </View>
                    <Text>Created At: <Text style={{ fontWeight: 'bold' }}>{course.createdAt}</Text></Text>
                    <Text>Level: <Text style={{ fontWeight: 'bold' }}>{course.level}</Text></Text>
                    <View style={{ marginBottom: 10, marginTop: 10,  display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{fontSize: 15 }}>{course.description}</Text>
                        <Text>Duration: <Text style={{ fontWeight: 'bold' }}>{course.duration}</Text></Text>
                    </View>
                    <Button title="Enroll Now" onPress={handleEnroll} />
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
*/
/*
import React, { useEffect, useState } from 'react';
import {View, Text, Button, StyleSheet, ScrollView, Alert} from 'react-native';
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
                    <Button title="Enroll Now" onPress={() => {/!* Enrollment logic *!/}} />
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
*/


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
