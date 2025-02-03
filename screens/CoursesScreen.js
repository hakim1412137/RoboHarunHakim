import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, StyleSheet, Alert, ScrollView, TextInput } from 'react-native';
import Loader from '../components/Loader'; // Ensure this component exists
import { getAllCourses } from '../utils/api';
import CourseCard from '../components/CourseCard'; // Ensure this path is correct

const CoursesScreen = ({ navigation }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const response = await getAllCourses();
                setCourses(response.data); // Assuming response.data contains the courses array
            } catch (error) {
                console.error(error);
                Alert.alert("Error", "Failed to fetch courses");
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) return <Loader />;
    const navigateToCourseDetails1 = (courseId) => {
        navigation.navigate('courseDetails', { courseId });
    };

    return (
        <ScrollView style={styles.container}>

            <Text style={styles.header}>Available Courses</Text>
            <View style={styles.content}>
                <TextInput
                    style={styles.input}
                    placeholder="Search Course"
                    value={search}
                    onChangeText={setSearch}
                />
                <FlatList
                    data={courses}
                    // keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <CourseCard
                            course={item}
                            // onViewDetails={() => navigation.navigate('CourseDetails1', { id: item.id })} // Make sure this matches
                             onViewDetails={() => navigateToCourseDetails1(item.id)} // Make sure this matches
                        />
                    )}
                    showsVerticalScrollIndicator={false} // Optional: hides the scroll indicator
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '40rem',
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        marginBottom: 10,
        textAlign: 'center',
    },
    content: {
        flex: 1, // Ensure it takes up the entire available space
        paddingHorizontal: 16, // Optional: Padding for content
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        borderRadius: 5,
}
});

export default CoursesScreen;
/*

// screens/CoursesScreen.js
import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, Button, StyleSheet, Alert, ScrollView} from 'react-native';
import Loader from '../components/Loader'; // Make sure you have a Loader component
import {getAllCourses} from '../utils/api';
import CourseCard from '../components/CourseCard'; // Ensure this path is correct


const CoursesScreen = ({ navigation }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const response = await getAllCourses();
                setCourses(response.data); // Assuming response.data contains the courses array
            } catch (error) {
                console.error(error);
                Alert.alert("Error", "Failed to fetch courses");
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) return <Loader />;

    return (

        <View style={styles.container}>
            <Text style={styles.header}>Available Courses</Text>
            <FlatList
                data={courses}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <CourseCard
                        course={item}
                        onViewDetails={() => navigation.navigate('CourseDetails', { id: item.id })} // Adjust according to your navigation setup
                    />
                )}
            />
        </View>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        marginBottom: 10,
    },
});

export default CoursesScreen;
*/


/*
// screens/CoursesScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import Loader from '../components/Loader';
import { getAllCourses } from '../utils/api';

const CoursesScreen = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            const data = await getAllCourses();
            setCourses(data);
            setLoading(false);
        };
        fetchCourses();
    }, []);

    if (loading) return <Loader />;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Available Courses</Text>
            <FlatList
                data={courses}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.courseCard}>
                        <Text>{item.title}</Text>
                        <Button title="View Details" onPress={() => navigation.navigate('CourseDetails', { id: item.id })} />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        marginBottom: 10,
    },
    courseCard: {
        padding: 15,
        backgroundColor: '#f0f0f0',
        marginVertical: 10,
        borderRadius: 8,
    },
});

export default CoursesScreen;
*/
