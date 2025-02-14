import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../components/Header';
import Menu from '../components/Menu';

const { width } = Dimensions.get('window');

const AndroidDevelopmentPage = ({ navigation }) => {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Header />
            <Menu navigation={navigation} />

            <View style={styles.content}>
                {/* Header Section */}
                <LinearGradient
                    colors={['#0066CC', '#0099FF']}
                    style={styles.headerGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <Text style={styles.title}>Android Development</Text>
                    <Text style={styles.subtitle}>
                        Crafting Premium Mobile Experiences with Cutting-Edge Technology
                    </Text>
                </LinearGradient>

                {/* Hero Image */}
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/images/app-development.jpg')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                {/* Services Section */}
                <View style={[styles.card, styles.cardElevated]}>
                    <View style={styles.cardHeader}>
                        <MaterialIcons name="android" size={24} color="#0066CC" />
                        <Text style={styles.cardTitle}>Our Services</Text>
                    </View>
                    {[
                        "Custom Android Application Development",
                        "App UI/UX Design for Optimal User Experience",
                        "Integration of APIs and Third-Party Services",
                        "Testing and Quality Assurance",
                        "App Maintenance and Upgrades",
                        "Support for Latest Android Features and Tools"
                    ].map((item, index) => (
                        <View key={index} style={styles.listItem}>
                            <MaterialIcons name="check-circle" size={18} color="#0099FF" />
                            <Text style={styles.listText}>{item}</Text>
                        </View>
                    ))}
                </View>

                {/* Tech Stack Section */}
                <View style={[styles.card, styles.cardElevated]}>
                    <View style={styles.cardHeader}>
                        <MaterialIcons name="code" size={24} color="#0066CC" />
                        <Text style={styles.cardTitle}>Technology Stack</Text>
                    </View>
                    {[
                        "Languages: Kotlin, Java, C++",
                        "Frameworks: Android SDK, Jetpack Compose",
                        "Tools: Android Studio, Firebase, Gradle",
                        "Architecture: MVVM, Clean Architecture",
                        "Testing: Espresso, JUnit, Mockito",
                        "CI/CD: Jenkins, GitHub Actions"
                    ].map((item, index) => (
                        <View key={index} style={styles.listItem}>
                            <MaterialIcons name="developer-board" size={18} color="#0099FF" />
                            <Text style={styles.listText}>{item}</Text>
                        </View>
                    ))}
                </View>

                {/* Development Process */}
                <View style={[styles.processCard, styles.cardElevated]}>
                    <Text style={styles.processTitle}>Our Development Process</Text>
                    <View style={styles.processSteps}>
                        {[
                            {icon: 'design-services', title: 'Design', color: '#4ECDC4'},
                            {icon: 'code', title: 'Develop', color: '#45B7D1'},
                            {icon: 'bug-report', title: 'Test', color: '#FF6B6B'},
                            {icon: 'rocket-launch', title: 'Launch', color: '#00C897'},
                        ].map((step, index) => (
                            <View key={index} style={styles.processStep}>
                                <View style={[styles.processIcon, {backgroundColor: step.color}]}>
                                    <MaterialIcons name={step.icon} size={24} color="white" />
                                </View>
                                <Text style={styles.processStepTitle}>{step.title}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Quote Section */}
                <View style={styles.quoteContainer}>
                    <Text style={styles.quoteText}>
                        "We transform ideas into seamless Android experiences that users love."
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '40rem',
        backgroundColor: '#F9FBFE',
    },
    content: {
        padding: 20,
        paddingBottom: 40,
    },
    headerGradient: {
        paddingVertical: 35,
        paddingHorizontal: 25,
        borderRadius: 20,
        marginBottom: 25,
        shadowColor: '#0066CC',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 15,
        elevation: 8,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#FFF',
        textAlign: 'center',
        textShadowColor: 'rgba(0,0,0,0.1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 18,
        color: '#E3F2FD',
        textAlign: 'center',
        lineHeight: 24,
        fontWeight: '500',
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 25,
        overflow: 'hidden', // Ensure the image doesn't overflow the border radius
        borderRadius: 18, // Apply border radius to the container as well
        backgroundColor: '#F0F8FF', // Optional: Add a background color for aesthetic purposes
    },
    image: {
        width: '100%', // Full width of the container
        height: 300, // Increased height for a larger image
        borderRadius: 18, // Maintain rounded corners
        shadowColor: '#0066CC', // Color of the shadow
        shadowOffset: { width: 0, height: 6 }, // Shadow offset
        shadowOpacity: 0.2, // Increased opacity for a more prominent shadow
        shadowRadius: 15, // Slightly larger shadow radius for more diffusion
        elevation: 10, // Higher elevation for a more pronounced shadow effect
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 18,
        padding: 25,
        marginBottom: 20,
    },
    cardElevated: {
        shadowColor: '#4A5568',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#F0F4F8',
        paddingBottom: 15,
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1A365D',
        marginLeft: 12,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginVertical: 8,
    },
    listText: {
        fontSize: 16,
        color: '#2D3748',
        marginLeft: 12,
        lineHeight: 24,
        flexShrink: 1,
    },
    processCard: {
        backgroundColor: '#FFF',
        borderRadius: 18,
        padding: 25,
        marginBottom: 20,
        alignItems: 'center',
    },
    processTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1A365D',
        marginBottom: 25,
    },
    processSteps: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    processStep: {
        alignItems: 'center',
        width: width / 4 - 30,
    },
    processIcon: {
        width: 50,
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    processStepTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4A5568',
        textAlign: 'center',
    },
    quoteContainer: {
        marginTop: 25,
        padding: 20,
        backgroundColor: '#E3F2FD',
        borderRadius: 15,
        borderLeftWidth: 5,
        borderLeftColor: '#0066CC',
    },
    quoteText: {
        fontSize: 18,
        fontStyle: 'italic',
        color: '#2D3748',
        lineHeight: 28,
        fontWeight: '500',
    },
});

export default AndroidDevelopmentPage;
/*// AndroidDevelopmentPage.js

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from '../components/Menu';

const AndroidDevelopmentPage = ({ navigation }) => {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Header />
            <Menu navigation={navigation} />

            <View
                contentContainerStyle={styles.content} 
                showsVerticalScrollIndicator={false}
            >
                {/!* Header Section *!/}
                <LinearGradient 
                    colors={['#007AFF', '#00AEEF']}
                    style={styles.headerGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <Text style={styles.title}>Android Development</Text>
                    <Text style={styles.subtitle}>
                        Build feature-rich Android apps with cutting-edge technologies.
                    </Text>
                </LinearGradient>

                {/!* Image Section *!/}
                <View style={styles.imageContainer}>
                    <Image
                        // source={{ uri: 'https://img.freepik.com/premium-vector/app-development-with-outline-element-yellow_90099-291.jpg?w=1380' }}
                        source={require('../assets/images/app-development.jpg')} // Replace with your image path
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>

                {/!* Services Section *!/}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Our Services Include:</Text>
                    {[
                        "Custom Android Application Development",
                        "App UI/UX Design for Optimal User Experience",
                        "Integration of APIs and Third-Party Services",
                        "Testing and Quality Assurance",
                        "App Maintenance and Upgrades",
                        "Support for Latest Android Features and Tools"
                    ].map((item, index) => (
                        <Text key={index} style={styles.listItem}>📱 {item}</Text>
                    ))}
                </View>

                <Text style={styles.footerText}>
                    Our dedicated team is committed to providing a seamless and engaging mobile experience for your users.
                </Text>
            </View >
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        height: '40rem',
        backgroundColor: '#F4F6F9',
    },
    content: {
        height: '40rem',
        padding: 20,
        paddingBottom: 100,
    },
    headerGradient: {
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderRadius: 15,
        marginBottom: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 6,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
        marginTop: 5,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 20,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 4,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    listItem: {
        fontSize: 16,
        color: '#555',
        marginVertical: 4,
    },
    footerText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
        marginTop: 20,
        fontWeight: '500',
    },
});

export default AndroidDevelopmentPage;*/

// import React from 'react';
// import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import Menu from '../components/Menu';

// const AndroidDevelopmentPage = ({ navigation }) => {
//     return (
//         <View style={styles.container}>
//             <Header />
//             <Menu navigation={navigation} />
//             {/* Add flex: 1 to ScrollView to ensure proper space allocation */}
//             <ScrollView
//                 contentContainerStyle={styles.content}
//                 style={styles.scrollView}
//             >
//                 <Text style={styles.title}>Android Development</Text>
//                 <Image
//                     source={require('../assets/fish.jpg')}
//                     style={styles.image}
//                     resizeMode="contain"
//                 />
//                 <Text style={styles.bodyText}>
//                     Our Android development service offers custom solutions to bring your app ideas to life.
//                     We focus on creating robust and scalable applications tailored to your target audience.
//                 </Text>

//                 <Text style={styles.subTitle}>Our Services Include:</Text>
//                 <Text style={styles.listItem}>• Custom Android Application Development</Text>
//                 <Text style={styles.listItem}>• App UI/UX Design for Optimal User Experience</Text>
//                 <Text style={styles.listItem}>• Integration of APIs and Third-Party Services</Text>
//                 <Text style={styles.listItem}>• Testing and Quality Assurance</Text>
//                 <Text style={styles.listItem}>• App Maintenance and Upgrades</Text>
//                 <Text style={styles.listItem}>• Support for Latest Android Features and Tools</Text>

//                 <Text style={styles.bodyText}>
//                     Our dedicated team is committed to providing a seamless and engaging mobile experience for your users.
//                 </Text>
//             </ScrollView>
//             <Footer />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#FBF1E6',
//     },
//     scrollView: {
//         flex: 1, // Crucial for proper layout
//     },
//     content: {
//         padding: 20,
//         paddingBottom: 80, // Increase padding to account for footer height
//     },
//     // ... keep other styles the same ...
// });

// export default AndroidDevelopmentPage;

/*
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from '../components/Menu';

const AndroidDevelopmentPage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Header />
            <Menu navigation={navigation} />
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Android Development</Text>
                <Image
                    source={require('../assets/fish.jpg')} // Ensure to add your image path here
                    style={styles.image}
                    resizeMode="contain"
                />
                <Text style={styles.bodyText}>
                    Our Android development service offers custom solutions to bring your app ideas to life.
                    We focus on creating robust and scalable applications tailored to your target audience.
                </Text>

                <Text style={styles.subTitle}>Our Services Include:</Text>
                <Text style={styles.listItem}>• Custom Android Application Development</Text>
                <Text style={styles.listItem}>• App UI/UX Design for Optimal User Experience</Text>
                <Text style={styles.listItem}>• Integration of APIs and Third-Party Services</Text>
                <Text style={styles.listItem}>• Testing and Quality Assurance</Text>
                <Text style={styles.listItem}>• App Maintenance and Upgrades</Text>
                <Text style={styles.listItem}>• Support for Latest Android Features and Tools</Text>

                <Text style={styles.bodyText}>
                    Our dedicated team is committed to providing a seamless and engaging mobile experience for your users.
                </Text>
            </ScrollView>
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBF1E6',
    },
    content: {
        padding: 20,
        paddingBottom: 40,
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        marginVertical: 20,
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 20,
    },
    bodyText: {
        fontSize: 16,
        textAlign: 'center',
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    subTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
    },
    listItem: {
        fontSize: 16,
        textAlign: 'left',
        paddingLeft: 20,
        marginVertical: 5,
    },
});

export default AndroidDevelopmentPage;
*/

/*import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MenuForServices from '../components/MenuForServices'; // Adjust path
import Menu from '../components/Menu';

const AndroidDevelopmentPage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Header></Header>
            <Menu navigation={navigation}></Menu>
            <View style={styles.content}>
                <Text style={styles.title}>Android Development</Text>
                <Text style={styles.bodyText}>
                    Our Android development service offers custom solutions to bring your app ideas to life.
                    We focus on creating robust and scalable applications tailored to your target audience.
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBF1E6'
    },
    content: {
        padding: 20,
        paddingHorizontal: 200
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        margin: 20,
    },
    bodyText: {
        fontSize: 16,
        textAlign: 'center',
        padding: 20,
    },
});

export default AndroidDevelopmentPage;*/
