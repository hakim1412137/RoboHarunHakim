import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../components/Header';
import Menu from '../components/Menu';

const { width } = Dimensions.get('window');

const AndroidDevelopmentPage = ({ navigation }) => {
    return (
        <View style={styles.content}>
            <Header />
            <Menu navigation={navigation} />
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '40rem',
        backgroundColor: '#F9FBFE',
    },
    content: {
        paddingBottom: 40,
    },
    headerGradient: {
        paddingVertical: 35,
        paddingHorizontal: 25,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
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
