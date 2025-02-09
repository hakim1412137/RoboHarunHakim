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


// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// const CourseCard = ({ course, onViewDetails }) => {
//     return (
//         <View style={styles.card}>
//             {/* Course Title and Description */}
//             <View style={styles.header}>
//                 <Text style={styles.title}>{course.title}</Text>
//                 <Text style={styles.description}>{course.description}</Text>
//             </View>

//             {/* Course Level, Duration, and View Details Button */}
//             <View style={styles.footer}>
//                 <View style={styles.details}>
//                     <Text style={styles.level}>
//                         <Text style={styles.label}>Level:</Text> {course.level || 'N/A'}
//                     </Text>
//                     <Text style={styles.duration}>
//                         <Text style={styles.label}>Duration:</Text> {course.duration ? `${course.duration} hours` : 'N/A'}
//                     </Text>
//                 </View>

//                 <TouchableOpacity onPress={onViewDetails} style={styles.viewDetailsButton}>
//                     <Text style={styles.buttonText}>View Details</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     card: {
//         width: '100%', // Use 100% width for responsiveness
//         padding: 16,
//         backgroundColor: '#FFFFFF',
//         marginVertical: 8,
//         borderRadius: 8,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         elevation: 3, // For Android shadow
//     },
//     header: {
//         marginBottom: 12,
//     },
//     title: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#333',
//     },
//     description: {
//         fontSize: 14,
//         color: '#666',
//         marginTop: 4,
//     },
//     footer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     details: {
//         flex: 1,
//     },
//     level: {
//         fontSize: 14,
//         color: '#555',
//         fontStyle: 'italic',
//     },
//     duration: {
//         fontSize: 14,
//         color: '#555',
//         marginTop: 4,
//     },
//     label: {
//         fontWeight: 'bold',
//     },
//     viewDetailsButton: {
//         backgroundColor: '#4CAF50',
//         paddingVertical: 8,
//         paddingHorizontal: 16,
//         borderRadius: 8,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     buttonText: {
//         color: '#fff',
//         fontSize: 14,
//         fontWeight: 'bold',
//     },
// });

// export default CourseCard;



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
