import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, ScrollView, TextInput, TouchableOpacity, Dimensions, Image } from 'react-native';
import Loader from '../components/Loader';
import { getAllCourses } from '../utils/api';
import CourseCard from '../components/CourseCard';
import Header from "../components/Header";
import Menu from "../components/Menu";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import {ImageBackground} from "expo-image";

const { width } = Dimensions.get('window');

const CoursesScreen = ({ navigation }) => {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const response = await getAllCourses();
                setCourses(response.data);
                setFilteredCourses(response.data);
            } catch (error) {
                console.error(error);
                Alert.alert("Error", "Failed to fetch courses");
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handleSearch = (query) => {
        setSearch(query);
        setFilteredCourses(
            courses.filter(course =>
                course.title.toLowerCase().includes(query.toLowerCase())
            )
        );
    };

    if (loading) return <Loader />;

    const navigateToCourseDetails1 = (courseId) => {
        navigation.navigate('courseDetails', { courseId });
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Header />
            <Menu navigation={navigation} />
            <ImageBackground
                source={require('../assets/images/courseimg.jpg')} // Replace with your image path
                style={styles.background} // Apply full screen styles
                resizeMode="cover" // Cover the entire background
            >
            <View style={styles.content}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/images/ebookrobotics.jpg')}
                        style={styles.image}
                    />
                </View>
                <View style={styles.courseContainer}>
                    <LinearGradient
                        colors={['#FFFFFF', '#FBF1E6']}
                        style={styles.gradientHeader}
                    >
                        <Text style={styles.header}>Discover Courses</Text>
                        <View style={styles.searchContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Search courses..."
                                placeholderTextColor="#888"
                                onChangeText={handleSearch}
                                value={search}
                            />
                            <TouchableOpacity
                                style={styles.searchButton}
                                onPress={() => {}}
                                activeOpacity={0.7}
                            >
                                <Ionicons name="search" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>

                    <FlatList
                        data={filteredCourses}
                        contentContainerStyle={styles.coursesContainer}
                        numColumns={1}
                        scrollEnabled={true}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (
                            <CourseCard
                                course={item}
                                onViewDetails={() => navigateToCourseDetails1(item.id)}
                            />
                        )}
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Ionicons name="sad-outline" size={60} color="#888" />
                                <Text style={styles.emptyText}>No courses found</Text>
                            </View>
                        }
                    />
                </View>
            </View>
            </ImageBackground>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    content: {
        flexDirection: 'row',
    },
    imageContainer: {
        width: width * 0.5, // 50% of screen width
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        height: '40rem',
        // height: '20rem',
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
    },

    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: Transparent overlay for better text readability
        padding: 10,
        borderRadius: 5,
        alignItems: 'center', // Center the text
    },
/*    image: {
        width: '100%',
        height: '100%', // Ensure the image covers the container
        // resizeMode: 'cover',
    },*/
courseContainer: {
    height: '40rem',
        paddingBottom: 40,
},
gradientHeader: {
    paddingVertical: 30,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
},
header: {
    fontSize: 32,
        fontWeight: '800',
        color: '#2D3436',
        textAlign: 'center',
        marginBottom: 25,
        fontFamily: 'Electrolize_400Regular',
},
searchContainer: {
    flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
},
input: {
    flex: 1,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 12,
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
},
searchButton: {
    backgroundColor: '#00A86B',
        height: 50,
        width: 50,
        borderRadius: 12,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
},
coursesContainer: {
    paddingHorizontal: 15,
        display: 'flex',
        flexDirection: 'column',
        gap: 25,
},
emptyContainer: {
    flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
},
emptyText: {
    fontSize: 18,
        color: '#888',
        marginTop: 15,
        fontFamily: 'Arial',
},
});

export default CoursesScreen;
/*
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, ScrollView, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import Loader from '../components/Loader';
import { getAllCourses, getCourseById } from '../utils/api';
import CourseCard from '../components/CourseCard';
import Header from "../components/Header";
import Menu from "../components/Menu";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const CoursesScreen = ({ navigation }) => {
    // ... [Keep existing state and logic the same] ...
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const response = await getAllCourses();
                console.log(response)
                setCourses(response.data); // Assuming response.data contains the courses array
                setFilteredCourses(response.data)
            } catch (error) {
                console.error(error);
                Alert.alert("Error", "Failed to fetch courses");
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    async function fetchCourseById(courseId) {
        setLoading(true);
        try {
            let response = await getCourseById(courseId);
            setCourses([response.data]);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <Loader />;
    const navigateToCourseDetails1 = (courseId) => {
        navigation.navigate('courseDetails', { courseId });
    };

    const handleSearch = (query) => {
        setSearch(query);
        setFilteredCourses(
            courses.filter(course =>
                course.title.toLowerCase().includes(query.toLowerCase())
            )
        );
    };


    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >
            <Header />
            <Menu navigation={navigation} />

            <View contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} >
                <LinearGradient
                    colors={['#FFFFFF', '#FBF1E6']}
                    style={styles.gradientHeader}
                >
                    <Text style={styles.header}>Discover Courses</Text>
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Search courses..."
                            placeholderTextColor="#888"
                            onChangeText={handleSearch}
                            value={search}
                        />
                        <TouchableOpacity
                            style={styles.searchButton}
                            onPress={() => fetchCourseById(search)}
                            activeOpacity={0.7}
                        >
                            <Ionicons name="search" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>

                {loading ? (
                    <Loader />
                ) : (
                    <FlatList
                        data={filteredCourses}
                        contentContainerStyle={styles.coursesContainer}
                        numColumns={1}
                        scrollEnabled={true}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (
                            <CourseCard
                                course={item}
                                onViewDetails={() => navigateToCourseDetails1(item.id)}
                            />
                        )}
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Ionicons name="sad-outline" size={60} color="#888" />
                                <Text style={styles.emptyText}>No courses found</Text>
                            </View>
                        }
                    />
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        height: '40rem',
        backgroundColor: '#FFFFFF',
    },
    scrollContainer: {
        flex: 1,
        paddingBottom: 40,
    },
    gradientHeader: {
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    header: {
        fontSize: 32,
        fontWeight: '800',
        color: '#2D3436',
        textAlign: 'center',
        marginBottom: 25,
        fontFamily: 'Electrolize_400Regular'
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    input: {
        flex: 1,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 12,
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    searchButton: {
        backgroundColor: '#00A86B',
        height: 50,
        width: 50,
        borderRadius: 12,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    coursesContainer: {
        height: '40rem',
        paddingHorizontal: 15,
        display: 'flex',
        flexDirection: 'column',
        gap: 25
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
    },
    emptyText: {
        fontSize: 18,
        color: '#888',
        marginTop: 15,
        fontFamily: 'Arial',
    },
});

export default CoursesScreen;

 */


// import React, { useEffect, useState } from 'react';
// import {View, Text, FlatList, StyleSheet, Alert, ScrollView, TextInput, TouchableOpacity, Button} from 'react-native';
// import Loader from '../components/Loader'; // Ensure this component exists
// import {getAllCourses, getCourseById} from '../utils/api';
// import CourseCard from '../components/CourseCard';
// import Header from "../components/Header";
// import Menu from "../components/Menu"; // Ensure this path is correct

// const CoursesScreen = ({ navigation }) => {
//     const [courses, setCourses] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [search, setSearch] = useState("");

//     useEffect(() => {
//         const fetchCourses = async () => {
//             setLoading(true);
//             try {
//                 const response = await getAllCourses();
//                 setCourses(response.data); // Assuming response.data contains the courses array
//             } catch (error) {
//                 console.error(error);
//                 Alert.alert("Error", "Failed to fetch courses");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchCourses();
//     }, []);

//     async function fetchCourseById(courseId) {
//         setLoading(true);
//         try {
//             let response = await getCourseById(courseId);
//             setCourses([response.data]);
//         } catch (error) {
//             console.log(error);
//         } finally {
//             setLoading(false);
//         }
//     }

//     if (loading) return <Loader />;
//     const navigateToCourseDetails1 = (courseId) => {
//         navigation.navigate('courseDetails', { courseId });
//     };

//     return (
//         <ScrollView style={styles.container}>
//             <Header />
//             <Menu navigation={navigation} />
//             <View style={{ padding: 20, paddingHorizontal: 100  }}>
//                 <Text style={styles.header}>Available Courses</Text>
//                 <View style={styles.content}>
//                     <View style={{ display: 'flex', flexDirection: 'row', gap: 5, width: '100%', height: '3rem' ,justifyContent: 'center', alignItems: 'center' }}>
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Search Course"
//                             value={search}
//                             onChangeText={setSearch}
//                         />
//                         <TouchableOpacity onPress={() => fetchCourseById(search)} style={{ width: '15%', height: '100%', borderRadius: 10 , padding: 10, paddingHorizontal: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#4CAF50' }}>
//                             <Text style={{ fontStyle: 20, fontWeight: 'bold', color: 'white' }}>Search</Text>
//                         </TouchableOpacity>
//                     </View>
//                     <FlatList
//                         data={courses}
//                         // keyExtractor={item => item.id.toString()}
//                         contentContainerStyle={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 15, justifyContent: 'space-between' }}
//                         renderItem={({ item }) => (
//                             <CourseCard
//                                 course={item}
//                                 // onViewDetails={() => navigation.navigate('CourseDetails1', { id: item.id })} // Make sure this matches
//                                 onViewDetails={() => navigateToCourseDetails1(item.id)} // Make sure this matches
//                             />
//                         )}
//                         showsVerticalScrollIndicator={false} // Optional: hides the scroll indicator
//                     />
//                 </View>
//             </View>

//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         height: '40rem',
//         backgroundColor: '#FBF1E6',
//     },
//     header: {
//         fontSize: 24,
//         marginBottom: 10,
//         textAlign: 'center',
//     },
//     content: {
//         flex: 1, // Ensure it takes up the entire available space
//         paddingHorizontal: 16, // Optional: Padding for content
//     },
//     input: {
//         height: '100%',
//         width: '85%',
//         borderColor: '#ddd',
//         paddingHorizontal: 15,
//         borderWidth: 1,
//         borderRadius: 5,
// }
// });

// export default CoursesScreen;
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
