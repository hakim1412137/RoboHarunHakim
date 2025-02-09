// AndroidDevelopmentPage.js
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
            {/* Add flex: 1 to ScrollView to ensure proper space allocation */}
            <ScrollView
                contentContainerStyle={styles.content}
                style={styles.scrollView}
            >
                <Text style={styles.title}>Android Development</Text>
                <Image
                    source={require('../assets/fish.jpg')}
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
    scrollView: {
        flex: 1, // Crucial for proper layout
    },
    content: {
        padding: 20,
        paddingBottom: 80, // Increase padding to account for footer height
    },
    // ... keep other styles the same ...
});

export default AndroidDevelopmentPage;

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
