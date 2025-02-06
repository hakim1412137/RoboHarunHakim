// screens/CourseDetailsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import Loader from '../components/Loader';
import { getCourseById, enrollInCourse } from '../utils/api';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useUser} from "../context/UserContext";

const CourseDetailsScreen = ({ route, navigation }) => {
    const { user } = useUser();

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
            // const userId = user.id; // Assuming `user` contains the logged-in user's details

          const userId = await AsyncStorage.getItem('userId');
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

export default CourseDetailsScreen;

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
