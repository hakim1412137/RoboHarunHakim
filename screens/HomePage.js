import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableWithoutFeedback,
    Animated,
    Dimensions,
} from 'react-native';
import Menu from '../components/Menu_for_home_page';
import Footer from '../components/Footer';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground } from 'expo-image';

const { width, height } = Dimensions.get('window');

const HomePage = ({ navigation }) => {
    // Animated values for image scaling
    const scaleAnimations = useRef([
        new Animated.Value(1),
        new Animated.Value(1),
        new Animated.Value(1),
        new Animated.Value(1),
        new Animated.Value(1),
    ]).current;

    // State to track the height of the scaled-up image
    const [imageHeight, setImageHeight] = useState(0);

    // Function to handle image press (hover-like effect)
    const handleImagePressIn = (index) => {
        Animated.spring(scaleAnimations[index], {
            toValue: 1.2, // Scale up by 20%
            friction: 3, // Controls the bounciness
            useNativeDriver: true, // Better performance
        }).start();
    };

    // Function to handle image release
    const handleImagePressOut = (index) => {
        Animated.spring(scaleAnimations[index], {
            toValue: 1, // Return to original size
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    // Function to measure the size of the image container
    const handleImageLayout = (event, index) => {
        const { height } = event.nativeEvent.layout;
        setImageHeight(height); // Update the height state
    };

    // Section data
    const sections = [
        {
            image: require('../assets/blocks-switch-text-tile.jpg'),
            title: 'VEX IQ',
            text: 'VEX IQ is a beginner-friendly robotics system designed for students to explore STEM concepts...',
        },
        {
            image: require('../assets/VEXkits.jpg'),
            title: 'Classroom Bundles',
            text: 'Our Classroom Bundles provide educators with everything needed...',
        },
        {
            image: require('../assets/VXECTE.jpg'),
            title: 'Vex CTE',
            text: 'VEX CTE focuses on equipping students with industry-relevant skills...',
        },
        {
            image: require('../assets/VEX5.jpg'),
            title: 'VEX 5',
            text: 'VEX 5 is the next level of robotics innovation, offering advanced building components...',
        },
        {
            image: require('../assets/123classroombundles.jpg'),
            title: 'VEX KIT',
            text: 'Our VEX Kits include all the essential parts to start building and programming robots...',
        },
    ];

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: imageHeight * 0.2 }} // Adjust content size dynamically
        >
            {/* Hero Section */}
            <View style={styles.hero}>
                <ImageBackground
                    source={require('../assets/home-page-background-image-2.png')}
                    style={styles.heroBackground}
                >
                    <LinearGradient
                        colors={['rgba(0,0,0,0.8)', 'transparent']}
                        style={styles.heroOverlay}
                    />
                </ImageBackground>
                <Menu navigation={navigation} />
                <Text style={styles.heroTitle}>Welcome to Ethio Robotics Center!</Text>
                <Text style={styles.heroSubtitle}>
                    Discover an extensive collection of innovative educational tools...
                </Text>
            </View>

            {/* Sections with Animated Images */}
            {sections.map((section, index) => (
                <View key={index} style={styles.sectionContainer}>
                    <LinearGradient
                        colors={['#FFFAF0', '#FFF5E6']}
                        style={styles.gradientBackground}
                    >
                        <View style={styles.contentWrapper}>
                            <TouchableWithoutFeedback
                                onPressIn={() => handleImagePressIn(index)}
                                onPressOut={() => handleImagePressOut(index)}
                            >
                                <Animated.View
                                    style={[
                                        styles.imageContainer,
                                        { transform: [{ scale: scaleAnimations[index] }] },
                                    ]}
                                    onLayout={(event) => handleImageLayout(event, index)} // Measure layout changes
                                >
                                    <Image source={section.image} style={styles.image} />
                                </Animated.View>
                            </TouchableWithoutFeedback>

                            <View style={styles.textContainer}>
                                <Text style={styles.textTitle}>{section.title}</Text>
                                <Text style={styles.textDescription}>{section.text}</Text>
                            </View>
                        </View>
                    </LinearGradient>
                </View>
            ))}

            <Footer />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '40rem',
        backgroundColor: '#FFF5E6',
    },
    hero: {
        height: 500,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative', // Ensure proper layering
    },
    heroBackground: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: -1, // Ensure the background is behind other content
    },
    heroOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    heroTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Electrolize_400Regular',
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
        marginHorizontal: 20,
    },
    heroSubtitle: {
        fontSize: 18,
        color: 'white',
        width: '70%',
        textAlign: 'center',
        marginTop: 20,
        lineHeight: 24,
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    sectionContainer: {
        minHeight: 400,
        marginVertical: 20,
    },
    gradientBackground: {
        flex: 1,
        borderRadius: 15,
        marginHorizontal: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
    },
    contentWrapper: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1, // Ensure the image appears above other elements
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 30,
    },
    textTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        fontFamily: 'Electrolize_400Regular',
        color: '#2F4858',
        marginBottom: 15,
    },
    textDescription: {
        fontSize: 18,
        lineHeight: 24,
        color: '#4A4A4A',
        opacity: 0.9,
    },
});

export default HomePage;
