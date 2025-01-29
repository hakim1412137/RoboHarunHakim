import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Button, Easing } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from '../components/Menu';
import AboutScreen from "./AboutScreen"; // About Us page
import CareersPage from './CareersPage';
import OurTeamPage from './OurTeamPage';
import OurClientsPage from './OurClientsPage';
import ServicesPage from './ServicesPage';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import ProductScreen from "./ProductScreen";
// import ProductDetailsScreen from "./ProductDetailsScreen";
import HomePage from "./HomePage";
import CourseDetailsScreen from "./CourseDetailsScreen";
import CoursesScreen from "./CoursesScreen";
import ProductDetailScreen from "./ProductDetailScreen";
import EditProductScreen from "./EditProductScreen";
import CompetitionsScreen from "./CompetitionsScreen";
import CompetitionDetailsScreen from "./CompetitionDetailsScreen";
import EventDetailsScreen from "./EventDetailsScreen";
import EventListScreen from "./EventListScreen";
import AndroidDevelopmentPage from "./AndroidDevelopmentPage";
import JoinUsScreen from "./JoinUsScreen";
import ServicesScreen from "./ServicesScreen";
import SupportScreen from "./SupportScreen";
import WebsiteDevelopmentPage from "./WebsiteDevelopmentPage";
import RoboticsTrainingPage from "./RoboticsTrainingPage";

const HomeScreen = () => {
    const [currentPage, setCurrentPage] = useState('home');
    const [expanded, setExpanded] = useState(false);
    const [position, setPosition] = useState({ x: 100, y: 100 });

    const toggleExpanded = () => setExpanded(prev => !prev);

    const renderContent = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage />;
            case 'aboutUs':
                return <AboutScreen />;
            case 'careers':
                return <CareersPage />;
            case 'ourTeam':
                return <OurTeamPage />;
            case 'ourClients':
                return <OurClientsPage />;
           /* case 'services':
                return <ServicesPage />;*/
            case 'RoboticsTrainingPage':
                return <RoboticsTrainingPage />;
            case 'AndroidDevelopmentPage':
                return <AndroidDevelopmentPage />;
            case 'WebsiteDevelopmentPage':
                return <WebsiteDevelopmentPage />;
            case 'ServicesScreen':
                return <ServicesScreen />;
            case 'SupportScreen':
                return <SupportScreen />;
            case 'JoinUsScreen':
                return <JoinUsScreen />;
            case 'signin':
                return <SignInScreen />;
            case 'signup':
                return <SignUpScreen />;
            case 'Products':
                return <ProductScreen />;
            case 'ProductDetails':
                return <ProductDetailScreen />;
              case 'Courses':
                 return <CoursesScreen />;
              case 'CourseDetails':
                 return <CourseDetailsScreen />;
              case 'EditProduct':
                   return <EditProductScreen />;
              case 'CompetitionDetails':
              return <CompetitionDetailsScreen />;
              case 'Competitions':
              return <CompetitionsScreen />;
              case 'EventDetails':
              return <EventDetailsScreen />;
              case 'Events':
              return <EventListScreen />;
            default:
                return <Text style={styles.title}>Welcome to the Educational Robotics Center!</Text>;
        }
    };

    return (
        <View style={styles.container}>
            <Header setCurrentPage={setCurrentPage} />
            <Menu setCurrentPage={setCurrentPage} toggleExpanded={toggleExpanded} setPosition={setPosition} expanded={expanded} />
            {expanded && <AboutUsPopup position={position} setCurrentPage={setCurrentPage} />}
            <View style={styles.content}>
                {renderContent()}
            </View>
            <Footer />
        </View>
    );
};

function AboutUsPopup({ position, setCurrentPage }) {
    const slideAnim = useRef(new Animated.Value(-10)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();

        Animated.timing(opacityAnim, {
            toValue: 1, // Set to 1 for full opacity
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <View style={{ position: 'absolute', top: position.y, left: position.x, zIndex: 100 }}>
            <Animated.View
                style={{
                    width: 200, // Set width as needed
                    padding: 15,
                    borderWidth: 2,
                    opacity: opacityAnim,
                    transform: [{ translateY: slideAnim }]
                }}
            >
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, //flex: 1 to allow the container to fill the available screen space.
        position: 'relative', // Ensure this is positioned relative

    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        margin: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submenuItem: {
        fontSize: 16,
        paddingVertical: 10,
        textAlign: 'center',
        color: '#555',
    },
    divider: {
        width: '100%',       // Full width of the container
        height: 1,           // Thickness of the divider
        backgroundColor: '#000',  // Divider color (black)
        marginVertical: 10,  // Spacing around the divider
    },
});

export default HomeScreen;



/*
import React, { useRef } from 'react';
import { View, Text, StyleSheet, Button, Animated, FlatList, TouchableWithoutFeedback, Image } from 'react-native';
import * as Speech from 'expo-speech';

const robotImages = [
    { id: '1', uri: { uri: 'https://tse1.mm.bing.net/th?id=OIP.TVOEkx2eJmtKjIQjuFO4CwHaHa&pid=Api' }, name: 'Robot 1', description: 'This is an educational robot used in many classrooms.' },
    { id: '2', uri: { uri: 'https://tse2.mm.bing.net/th?id=OIP.jTE__cmysmzZ0II90oD0PwHaLI&pid=Api' }, name: 'Robot 2', description: 'This robot helps teach programming to students.' },
    { id: '3', uri: { uri: 'https://tse4.mm.bing.net/th?id=OIP.hTK5qXnJjWk5jIWfEFJJOwHaHa&pid=Api' }, name: 'Robot 3', description: 'A humanoid robot designed for friendly interaction.' },
];

const HomeScreen = ({ navigation }) => {
    const translate = useRef(new Animated.Value(0)).current; // Animation value for moving the image

    const handleRobotPress = (robot) => {
        Speech.speak(`${robot.name}: ${robot.description}`);

        Animated.sequence([
            Animated.timing(translate, {
                toValue: -30,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(translate, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Robotic Educational and Shopping Center!</Text>
            <Text style={styles.subtitle}>Learn with our Robots!</Text>

            <FlatList
                data={robotImages}
                horizontal
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableWithoutFeedback onPress={() => handleRobotPress(item)}>
                        <Animated.View style={{ transform: [{ translateY: translate }] }}>
                            <Image
                                source={item.uri} // Use the correct source for images
                                style={styles.robotImage}
                            />
                        </Animated.View>
                    </TouchableWithoutFeedback>
                )}
            />

            <Button title="View about" onPress={() => navigation.navigate('About')} />
            <Button title="View Courses" onPress={() => navigation.navigate('Courses')} />
            <Button title="View Competitions" onPress={() => navigation.navigate('Competitions')} />
            <Button title="View Resources" onPress={() => navigation.navigate('Resources')} />
            <Button title="Events" onPress={() => navigation.navigate('Events')} />
            <Button title="Login" onPress={() => navigation.navigate('Login')} />*!/
            <Button title="Sign Up" onPress={() => navigation.navigate('Signup')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 20,
    },
    robotImage: {
        width: 100,
        height: 100,
        marginHorizontal: 10,
    },
});

export default HomeScreen;

*/
/*// HomeScreen.js

import React, { useRef, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Animated, Image, FlatList, TouchableWithoutFeedback, Easing } from 'react-native';
import * as Speech from 'expo-speech';

*//*const robotImages = [
    { id: '1', uri: 'https://cdn.pixabay.com/photo/2017/08/30/07/44/robot-2696578_1280.png', name: 'Robot 1', description: 'This is an educational robot used in many classrooms.' },
    { id: '2', uri: 'https://cdn.pixabay.com/photo/2017/01/06/16/17/robot-1950703_1280.png', name: 'Robot 2', description: 'This robot helps teach programming to students.' },
    { id: '3', uri: 'https://cdn.pixabay.com/photo/2018/01/15/07/03/robot-3080807_1280.jpg', name: 'Robot 3', description: 'A humanoid robot designed for friendly interaction.' },
];*//*
const robotImages = [
    {
        id: '1',
        uri: 'https://images.unsplash.com/photo-1609820004233-af7a3f846210',
        name: 'Robot 1',
        description: 'This is an educational robot used in many classrooms.'
    },
    {
        id: '2',
        uri: 'https://images.unsplash.com/photo-1518981595014-5f24c1a127cf',
        name: 'Robot 2',
        description: 'This robot helps teach programming to students.'
    },
    {
        id: '3',
        uri: 'https://images.unsplash.com/photo-1534640697675-dde8f3bf2311',
        name: 'Robot 3',
        description: 'A humanoid robot designed for friendly interaction.'
    },
];
const HomeScreen = () => {
    const translate = useRef(new Animated.Value(0)).current; // Animation value for moving the image

    const handleRobotPress = (robot) => {
        Speech.speak(`${robot.name}: ${robot.description}`);

        // Animate the robot image on touch
        Animated.sequence([
            Animated.timing(translate, {
                toValue: -30, // Move up
                duration: 300,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
            Animated.timing(translate, {
                toValue: 0, // Move back to original position
                duration: 300,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
        ]).start();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Robotics Education</Text>
            <Text style={styles.subtitle}>Learn with our Robots!</Text>

            {/!* Animated Robots Section *!/}
            <FlatList
                data={robotImages}
                horizontal
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableWithoutFeedback onPress={() => handleRobotPress(item)}>
                        <Animated.View style={{ transform: [{ translateY: translate }] }}>
                            <Image
                                source={{ uri: item.uri }}
                                style={styles.robotImage}
                            />
                        </Animated.View>
                    </TouchableWithoutFeedback>
                )}
            />

            {/!* Navigation Buttons *!/}
            <Text style={styles.title}>Welcome to the Robotic Educational and Shopping Center!</Text>
          {*//*  <Button title="View Courses" onPress={() => navigation.navigate('Courses')} />
            <Button title="View Competitions" onPress={() => navigation.navigate('Competitions')} />
            <Button title="View Resources" onPress={() => navigation.navigate('Resources')} />
            <Button title="Events" onPress={() => navigation.navigate('Events')} />
            <Button title="Shop Now" onPress={() => navigation.navigate('Shop')} />
            <Button title="Login" onPress={() => navigation.navigate('Login')} />
            <Button title="Sign Up" onPress={() => navigation.navigate('Signup')} />
*//*}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '600',
        marginVertical: 10,
    },
    robotImage: {
        width: 100,
        height: 100,
        marginHorizontal: 10,
    },
});

export default HomeScreen;*/

/*
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Robotic Shop!</Text>
            <Button title="Shop Now" onPress={() => navigation.navigate('Shop')} />
            <Button title="View Competitions" onPress={() => navigation.navigate('Competitions')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
 */
/*import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { getTimelineEvents } from '../utils/api'; // Adjust path to your api.js

const HomeScreen = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTimelineData = async () => {
            setLoading(true);
            try {
                const response = await getTimelineEvents(); // Fetch events
                setEvents(response.data); // Set events state
            } catch (error) {
                console.error('Error fetching timeline data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTimelineData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Robotics Education Platform!</Text>

            <Text style={styles.subtitle}>History of Ewenet Communication</Text>
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <FlatList
                    data={events}
                    renderItem={({ item }) => (
                        <View style={styles.timelineItem}>
                            <Text style={styles.date}>{item.eventDate}</Text>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                            <Text>{item.subtitle}</Text>
                            {item.description && <Text style={styles.description}>{item.description}</Text>}
                        </View>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}

            <Button title="Shop Now" onPress={() => {/!* Logic to navigate to shop *!/}} />
            <Button title="Login" onPress={() => {/!* Logic to navigate to login *!/}} />
            <Button title="Sign Up" onPress={() => {/!* Logic to navigate to sign up *!/}} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '600',
        marginVertical: 10,
    },
    timelineList: {
        marginVertical: 20,
    },
    timelineItem: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
    },
    date: {
        fontWeight: 'bold',
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
});

export default HomeScreen;*/


/*/!*
---------------------------------------------------------------------------
import { getTimelineEvents } from '../utils/api'; // Adjust path to your api.js

const HomeScreen = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTimelineData = async () => {
            setLoading(true);
            try {
                const response = await getTimelineEvents(); // Fetch events
                setEvents(response.data); // Set events state
            } catch (error) {
                console.error('Error fetching timeline data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTimelineData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Robotics Education Platform!</Text>

            <Text style={styles.subtitle}>History of Ewenet Communication</Text>
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <FlatList
                    data={events}
                    renderItem={({ item }) => (
                        <View style={styles.timelineItem}>
                            <Text style={styles.date}>{item.eventDate}</Text>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                            <Text>{item.subtitle}</Text>
                            {item.description && <Text style={styles.description}>{item.description}</Text>}
                        </View>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}

----------------------------------------------------------------------------
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, StyleSheet, Animated, Image, FlatList, Alert, TouchableOpacity } from 'react-native';
import * as Speech from 'expo-speech'; // For voice commands or descriptions

const robotImages = [
    { id: '1', uri: 'https://example.com/robot1.png', name: 'Robot 1', description: 'This is Robot 1.' }, // Replace with actual image URLs
    { id: '2', uri: 'https://example.com/robot2.png', name: 'Robot 2', description: 'This is Robot 2.' },
    { id: '3', uri: 'https://example.com/robot3.png', name: 'Robot 3', description: 'This is Robot 3.' },
];

const HomeScreen = () => {
    const translateX = useRef(new Animated.Value(0)).current; // Initialize animated value
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const moveRobots = () => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(translateX, {
                        toValue: 200, // Move 200 units to the right
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(translateX, {
                        toValue: 0, // Move back to the original position
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        };

        moveRobots();
    }, [translateX]);

    const handleRobotPress = (robot) => {
        Speech.speak(`${robot.name}: ${robot.description}`); // Read out the robot's name and description
        Alert.alert(robot.name, robot.description); // Show an alert with details
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Robotics Education Platform!</Text>
            <Text style={styles.subtitle}>Learning Robotics is Fun!</Text>

            {/!* Animated Robots Section *!/}
<FlatList
    data={robotImages}
    horizontal
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
        <Animated.View style={{ transform: [{ translateX }] }}>
            <TouchableOpacity onPress={() => handleRobotPress(item)}>
                <Image
                    source={{ uri: item.uri }} // Replace with actual image link
                    style={styles.robotImage}
                />
            </TouchableOpacity>
        </Animated.View>
    )}
/>

{/!* Navigation Buttons *!/}
<Button title="View Courses" onPress={() => {/!* Logic to navigate to Courses *!/}} />
<Button title="View Resources" onPress={() => {/!* Logic to navigate to Resources *!/}} />
</View>
);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '600',
        marginVertical: 10,
    },
    robotImage: {
        width: 100,
        height: 100,
        marginHorizontal: 10,
    },
});

export default HomeScreen;


/*import React, { useState } from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import Header from '../components/Header'; // Ensure paths are correct
import Footer from '../components/Footer';
import Menu from '../components/Menu'; // Main menu for Home
import CareersPage from './CareersPage'; // Import Careers page
import OurTeamPage from './OurTeamPage'; // Import Our Team page
import OurClientsPage from './OurClientsPage'; // Import Our Clients page
import ServicesPage from './ServicesPage'; // Import Services page
import WebsiteDevelopmentPage from './WebsiteDevelopmentPage'; // Import Website Development page
import AndroidDevelopmentPage from './AndroidDevelopmentPage'; // Import Android Development page
import RoboticsTrainingPage from './RoboticsTrainingPage'; // Import Robotics Training page
import RoboticsMaintenancePage from './RoboticsMaintenancePage';
import AboutUsPage from "./AboutUsPage";
import HomePage from "./HomePage";
import SearchComponent from "../components/SearchComponent";
import ProductScreen from "./ProductScreen";
import ProductDetailsScreen from "./ProductDetailsScreen";
import AddProduct from "./AddProduct";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail"; // Import Robotics Maintenance page
// Sample data for demonstration
const dataList = [
    { id: '1', title: 'Robotics Training' },
    { id: '2', title: 'Website Development' },
    { id: '3', title: 'Android Development' },
    { id: '4', title: 'Robotics Maintenance' },
    { id: '5', title: 'About Us' },
    // Add more items as needed
];
const HomeScreen = () => {
    const [currentPage, setCurrentPage] = useState('home'); // State to manage current page
    const [filteredList, setFilteredList] = useState(dataList); // State for filtered items

    const renderContent = () => {
        switch (currentPage) {
            case 'home':
                // return <Text style={styles.title}>Welcome to the Educational Robotics App!</Text>;
              //  return <HomePage />; // Pass down the setCurrentPage prop

                 return (
                <View>
                    <Text style={styles.title}>Welcome to the Educational Robotics App!</Text>
                    <FlatList
                        data={filteredList}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <Text style={styles.listItem}>{item.title}</Text>
                        )}
                    />
                </View>
            );


            case 'aboutUs':
                // return <AboutUsPage setCurrentPage={setCurrentPage} />; // Pass down the setCurrentPage prop
                return <AboutUsPage />; // Pass down the setCurrentPage prop

            case 'careers':
                return <CareersPage />;
            case 'ourTeam':
                return <OurTeamPage />;
            case 'ourClients':
                return <OurClientsPage />;
            case 'services':
                return <ServicesPage />;
            case 'websiteDevelopment':
                return <WebsiteDevelopmentPage />;
            case 'androidDevelopment':
                return <AndroidDevelopmentPage />;
            case 'roboticsTraining':
                return <RoboticsTrainingPage />;
            case 'roboticsMaintenance':
                return <RoboticsMaintenancePage />;
            case 'Products':
                return <ProductScreen />;
            case 'ProductDetails':
                return <ProductDetailsScreen />;
            case 'AddProducts':
                return <AddProduct />;
            case 'ProductLists':
                return <ProductList />;
            case 'ProductDetails1':
                return <ProductDetail />;
            default:
                return <Text style={styles.title}>Welcome to the Educational Robotics App!</Text>;
        }
    };
    const handleSearch = (query) => {
        if (query) {
            const filteredData = dataList.filter(item =>
                item.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredList(filteredData); // Update state with the filtered result
        } else {
            setFilteredList(dataList); // Reset list when the query is empty
        }
    };
    return (
        <View style={styles.container}>
            <Header />
            <Menu setCurrentPage={setCurrentPage} /> {/!* Render the Menu here for navigation *!/}
            <SearchComponent onSearch={handleSearch} /> {/!* Implement search functionality *!/}

            <View style={styles.content}>
                {renderContent()} {/!* Render the current page content *!/}
            </View>
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        margin: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;*/
/*

// HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header'; // Ensure paths are correct
import Footer from '../components/Footer';
import Menu from '../components/Menu'; // Import your Menu component

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Header />
            <Menu /> {/!* Render the Menu here for navigation *!/}
            <View style={styles.content}>
                <Text style={styles.title}>Welcome to the Educational Robotics App!</Text>
            </View>
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        margin: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;
*/

/*// HomeScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header'; // Ensure paths are correct
import Footer from '../components/Footer';
import Menu from '../components/Menu'; // Import your Menu component
import AboutUsPage from './AboutUsPage'; // Import the About Us component

const HomeScreen = () => {
    const [currentPage, setCurrentPage] = useState('home'); // State to manage current page

    const renderContent = () => {
        switch (currentPage) {
            case 'home':
                return <Text style={styles.title}>Welcome to the Educational Robotics App!</Text>;
            case 'aboutUs':
                return <Text style={styles.title}>About Us Content Goes Here!</Text>; // Replace with About Us content
            case 'careers':
                return <Text style={styles.title}>Career Content Goes Here!</Text>; // Replace with Career content
            case 'ourTeam':
                return <Text style={styles.title}>Our Team Content Goes Here!</Text>; // Replace with team content
            case 'ourClients':
                return <Text style={styles.title}>Our Clients Content Goes Here!</Text>; // Replace with clients content
            case 'roboticsTraining':
                return <Text style={styles.title}>Robotics Training Content Goes Here!</Text>; // Replace with content
            case 'softwareDevelopment':
                return <Text style={styles.title}>Software Development Content Goes Here!</Text>; // Replace with content
            case 'websiteDevelopment':
                return <Text style={styles.title}>Website Development Content Goes Here!</Text>; // Replace with content
            case 'roboticsMaintenance':
                return <Text style={styles.title}>Robotics Maintenance Content Goes Here!</Text>; // Replace with content
            case 'portfolio':
                return <Text style={styles.title}>Portfolio Content Goes Here!</Text>; // Replace with portfolio content
            case 'news':
                return <Text style={styles.title}>News Content Goes Here!</Text>; // Replace with news content
            case 'contactUs':
                return <Text style={styles.title}>Contact Us Content Goes Here!</Text>; // Replace with contact us content
            default:
                return <Text style={styles.title}>Welcome to the Educational Robotics App!</Text>;
        }
    };

    return (
        <View style={styles.container}>
            <Header />
            <Menu setCurrentPage={setCurrentPage} /> {/!* Pass down the function to change the current page *!/}
            <View style={styles.content}>
                {renderContent()} {/!* Render the current page content *!/}
            </View>
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        margin: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;*/

/*// HomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Header from "./Header";
import Menu from "./Menu";
import Footer from "./Footer";

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Header />
            <Menu navigation={navigation} />

            {/!*<Menu />  Render the Menu here *!/}
            {/!*<View style={styles.content}>*!/}
            {/!*    <Text style={styles.title}>Welcome to the Educational Robotics App!</Text>*!/}
            {/!*</View>*!/}
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default HomeScreen;*/

/*import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer'; // Assuming you have a separate Footer component
import Menu from '../components/Menu'; // Assuming you have a Menu component

const HomeScreen = () => (
    <View style={styles.container}>
        <Header />
        <Menu />
        {/!* Other content can go here *!/}
        <Footer /> {/!* Include the footer at the bottom *!/}
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
});

export default HomeScreen;*/


/*
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import Header from '../components/Header'; // Ensure paths are correct
import Footer from '../components/Footer';
import Menu from '../components/Menu'; // Main menu for Home
import CareersPage from './CareersPage'; // Import Careers page
import OurTeamPage from './OurTeamPage'; // Import Our Team page
import OurClientsPage from './OurClientsPage'; // Import Our Clients page
import ServicesPage from './ServicesPage'; // Import Services page
import WebsiteDevelopmentPage from './WebsiteDevelopmentPage'; // Import Website Development page
import AndroidDevelopmentPage from './AndroidDevelopmentPage'; // Import Android Development page
import RoboticsTrainingPage from './RoboticsTrainingPage'; // Import Robotics Training page
import RoboticsMaintenancePage from './RoboticsMaintenancePage';
import AboutUsPage from "./AboutUsPage";
import HomePage from "./HomePage";
import ProductScreen from "./ProductScreen";
import ProductDetailsScreen from "./ProductDetailsScreen"; // Import Robotics Maintenance page
import SignInScreen from './SignInScreen'
import SignUpScreen from './SignUpScreen'
import Services from './Services'
import AboutScreen from "./AboutScreen";

const HomeScreen = () => {
    const [currentPage, setCurrentPage] = useState('home');

    let [expanded, setExpanded] = useState(false);
    let [position, setPosition] = useState({ x: 100, y: 100 })

    function toggleExpanded() {
        setExpanded(!expanded)
    }

    const renderContent = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage />;
            case 'aboutUs':
                return <AboutScreen />; // Pass down the setCurrentPage prop
       /!*     case 'About':
                return <AboutScreen />; // Pass down the setCurrentPage prop *!/
            case 'careers':
                return <CareersPage />;
            case 'ourTeam':
                return <OurTeamPage />;
            case 'ourClients':
                return <OurClientsPage />;
            case 'services':
                return <ServicesPage />;
            case 'signin':
                return <SignInScreen />
            case 'signup':
                return <SignUpScreen />
            case 'news':
                return <Services />
            case 'websiteDevelopment':
                return <WebsiteDevelopmentPage />;
            case 'androidDevelopment':
                return <AndroidDevelopmentPage />;
            case 'roboticsTraining':
                return <RoboticsTrainingPage />;
            case 'roboticsMaintenance':
                return <RoboticsMaintenancePage />;
            case 'Products':
                return <ProductScreen />;
            case 'ProductDetails':
                return <ProductDetailsScreen />;
            default:
                return <Text style={styles.title}>Welcome to the Educational Robotics App!</Text>;
        }
    };

    return (
        <View style={styles.container}>
            <Header setCurrentPage={setCurrentPage} />
            <Menu setCurrentPage={setCurrentPage} toggleExpanded={toggleExpanded} setPoistion={setPosition} expanded={expanded} /> {/!* Render the Menu here for navigation *!/}

            {expanded && (<AboutUsPopup position={position} setCurrentPage={setCurrentPage} />)}

            <View style={styles.content}>
                {renderContent()} {/!* Render the current page content *!/}
            </View>
            <Footer />
        </View>
    );
};

{/!* <TouchableOpacity onPress={() => setExpanded(!expanded)}> *!/ }
{/!*   <Text style={styles.menuItem}>About Us {expanded ? '-' : '+'}</Text> *!/ }
{/!* </TouchableOpacity> *!/ }

function AboutUsPopup({ position,setCurrentPage }) {
    const slideAnim = useRef(new Animated.Value(-10)).current; // Start from above the screen
    const opacityAnim = useRef(new Animated.Value(0)).current; // Start from above the screen

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();

        Animated.timing(opacityAnim, {
            toValue: 100,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();

        console.log("Hello")
    }, []);

    return (
        <View style={{ position: 'absolute', top: position.x, left: position.y, zIndex: 100 }}>
            <Animated.View style={{ width: '100%', height: '100%', padding: 15, borderWidth: 2, opacity: opacityAnim, transform: [{ translateY: slideAnim }] }}>
                <View style={{ display: 'flex', flexDirection: 'col', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => setCurrentPage('aboutUs')}>
                        <Text style={styles.submenuItem}>About Us</Text>
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity onPress={() => setCurrentPage('careers')}>
                        <Text style={styles.submenuItem}>Careers</Text>
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity onPress={() => setCurrentPage('ourTeam')}>
                        <Text style={styles.submenuItem}>Our Team</Text>
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity onPress={() => setCurrentPage('ourClients')}>
                        <Text style={styles.submenuItem}>Our Clients</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        margin: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    robotImage: {
        width: 200, // specify width
        height: 200, // specify height
        resizeMode: 'contain', // adjusts how the image scales
    },
    divider: {
        width: '100%',       // Full width of the container
        height: 1,           // Thickness of the divider
        backgroundColor: '#000',  // Divider color (black)
        marginVertical: 10,  // Spacing around the divider
    },
});

export default HomeScreen;
*/


/*
// Sample data for demonstration
const dataList = [
    { id: '1', title: 'Robotics Training' },
    { id: '2', title: 'Website Development' },
    { id: '3', title: 'Android Development' },
    { id: '4', title: 'Robotics Maintenance' },
    { id: '5', title: 'About Us' },
];

*/

/*const robotImages = [
    { id: '1', uri: {'./assets/robot1.jpg'}, name: 'Robot 1', description: 'This is an educational robot used in many classrooms.' },
    { id: '2', uri: require('./assets/robot2.jpg'), name: 'Robot 2', description: 'This robot helps teach programming to students.' },
    { id: '3', uri: require('./assets/robot3.jpg'), name: 'Robot 3', description: 'A humanoid robot designed for friendly interaction.' },
];*/

/*
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, StyleSheet, Animated, Image, FlatList, Alert, TouchableOpacity } from 'react-native';
import * as Speech from 'expo-speech'; // For voice commands or descriptions

// Sample robotic images for children with real URLs
const robotImages = [
    { id: '1', uri: 'https://cdn.pixabay.com/photo/2017/08/30/07/44/robot-2696578_1280.png', name: 'Robot 1', description: 'This is an educational robot used in many classrooms.' },
    { id: '2', uri: 'https://cdn.pixabay.com/photo/2017/01/06/16/17/robot-1950703_1280.png', name: 'Robot 2', description: 'This robot helps teach programming to students.' },
    { id: '3', uri: 'https://cdn.pixabay.com/photo/2018/01/15/07/03/robot-3080807_1280.jpg', name: 'Robot 3', description: 'A humanoid robot designed for friendly interaction.' },
];

const HomeScreen = () => {
    const translateX = useRef(new Animated.Value(0)).current; // Initialize animated value

    useEffect(() => {
        const moveRobots = () => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(translateX, {
                        toValue: 200, // Move 200 units to the right
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(translateX, {
                        toValue: 0, // Move back to the original position
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        };

        moveRobots(); // Start the animation
    }, [translateX]);

    const handleRobotPress = (robot) => {
        Speech.speak(`${robot.name}: ${robot.description}`); // Read out the robot's name and description
        Alert.alert(robot.name, robot.description); // Show an alert with details
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Robotics Education Platform!</Text>
            <Text style={styles.subtitle}>Learning Robotics is Fun!</Text>

            {/!* Animated Robots Section *!/}
<FlatList
    data={robotImages}
    horizontal
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
        <Animated.View style={{ transform: [{ translateX }] }}>
            <TouchableOpacity onPress={() => handleRobotPress(item)}>
                <Image
                    source={{ uri: item.uri }} // Using real image links
                    style={styles.robotImage}
                />
            </TouchableOpacity>
        </Animated.View>
    )}
/>

{/!* Navigation Buttons *!/}
<Button title="View Courses" onPress={() => {/!* Logic to navigate to Courses *!/}} />
<Button title="View Resources" onPress={() => {/!* Logic to navigate to Resources *!/}} />
<Button title="About Ewenet Communication" onPress={() => {/!* Logic to navigate to About Screen *!/}} />
</View>
);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '600',
        marginVertical: 10,
    },
    robotImage: {
        width: 100,
        height: 100,
        marginHorizontal: 10,
    },
});

export default HomeScreen;*/
