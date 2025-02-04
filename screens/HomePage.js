import React from 'react';
import {View, Text, FlatList, Image, ImageBackground, StyleSheet, ScrollView} from 'react-native';
import VEXkitsImage from '../assets/VEXkits.jpg'; // Path to VEX Kits Image

const robotImages1 = [
    { id: '1', uri: require('../assets/VEX5.jpg') , description: 'VEX5 5'},
    { id: '2', uri: require('../assets/VXECTE.jpg'),  description: 'VEX CTE'},
    { id: '4', uri: require('../assets/VEXIQ.jpg'), description: 'VEX IQ' },
    { id: '3', uri: require('../assets/123classroombundles.jpg'), description: '123 Classroom Bundles' },
    { id: '5', uri: require('../assets/blocks-switch-text-tile.jpg'), description: 'Code Blocks' },
    { id: '6', uri: require('../assets/VEXkits.jpg'), description: 'VEX Kits' },
 ];
/*const robotImages1 = [
    { id: '1', uri: require('../assets/robot1.jpg'), description: 'This is an educational robot used in many classrooms.' },
    { id: '2', uri: require('../assets/robot2.jpg'), description: 'A humanoid robot designed for friendly interaction.' },
];*/

const HomePage = () => {
    const dataList = [
        { id: '1', title: 'VEX V5', description: 'Offers a powerful robotics platform with more advanced mechanical, electrical, and programming capabilities.' },
        { id: '2', title: 'VEX Robotics Kit', description: 'An educational kit for building programmable robots and enhancing STEM skills.' },
        { id: '3', title: 'VEX IQ', description: 'VEXcode IQ to program the robot. It can be programmed with block-based coding or Python.' },
        { id: '4', title: 'Sphero Mini', description: 'A robotic ball that you can control using your smartphone or tablet.' },
        { id: '5', title: 'Arduino Starter Kit', description: 'Includes an Arduino board and components to create interactive projects.' },
    ];

    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.textContent}>
                <Text style={styles.title}>Welcome to Ethio Robotics Center!</Text>
                <Text style={styles.subtitle}>Explore a wide range of educational robots and accessories.</Text>
                <FlatList
                    data={dataList}
                    contentContainerStyle={styles.list}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.listItemContainer}>
                            <Text style={styles.listItem}>{item.title}</Text>
                            <Text style={styles.listDescription}>{item.description}</Text>
                        </View>
                    )}
                />
            </View>

            <Text style={styles.title}>VEX Kits</Text>
            <View style={styles.imageContent}>
                <FlatList
                    data={robotImages1}
                    horizontal
                    contentContainerStyle={{ display: 'flex', justifyContent: 'center', overflow: 'visible', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: 15 }}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.robotCard}>
                            <Image source={item.uri} style={styles.robotImage} />
                            <Text style={styles.robotName}>{item.name}</Text>
                            <Text style={styles.robotDescription}>{item.description}</Text>
                        </View>
                    )}
                />
            </View>
        </ScrollView>
    );
};

// Styles

const styles = StyleSheet.create({
    mainContainer: {
        height: '40rem',
        padding: 35,
        backgroundColor: '#FBF1E6'
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#FFFAFA', // Light color (e.g., Snow)
    },
    textContent: {
        marginBottom: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#4CAF50', // Bright blue color for visibility
        textAlign: 'center', // Align title to the left
    },
    subtitle: {
        fontSize: 15,
        color: '#4CAF50', // Bright blue color for visibility
        marginBottom: 20,
        opacity: '0.8',
        textAlign: 'center',
    },
    list: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: '3rem',
      justifyContent: 'center',
      alignItems: 'center'
    },
    listItemContainer: {
        flexDirection: 'column', // Stack title and description
        paddingVertical: 10,
    },
    listItem: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#000000', // Use '#000000' for black color
    },
    listDescription: {
        fontSize: 14,
        color: '#000000', // Use '#000000' for black color
            marginLeft: 0,    // No margin needed to align the description properly under the title
            paddingTop: 5,    // Add some space above the description for better readability
    },
    imageContent: {
        padding: 20,
        width: '100%',
    },
    robotCard: {
        alignItems: 'center',
            marginRight: 10,
            backgroundColor: '#FFFFFF', // Card background color for clearer visibility
            borderRadius: 8,
            padding: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 3, // Shadow for Android
    },
    robotImage: {
        width: 120,
            height: 120,
            borderRadius: 8,
    },
    robotName: {
        fontWeight: 'bold',
            marginTop: 5,
    },
    robotDescription: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#555',
        textAlign: 'center',
    },
    newImagesContainer: {
        alignItems: 'center',
            marginTop: 20,
    },
    vexKitsImage: {
        width: 200, // Set the width of the VEX Kits image to make it smaller
            height: 200, // Set a specific height for the kits image
            borderRadius: 14,
            marginTop: 12, // Space above the image
    },
});

export default HomePage;

/*

import React from 'react';
import { View, Text, FlatList, Image, ImageBackground, StyleSheet } from 'react-native';
import VEXkitsImage from '../assets/123classroombundles.jpg'; // Path to VEX Kits Image
import vexcodeImage from '../assets/vexcode.jpg'; // Path to VEX Code Image

const robotImages1 = [
    { id: '1', uri: require('../assets/robot1.jpg'), description: 'This is an educational robot used in many classrooms.' },
    { id: '2', uri: require('../assets/robot2.jpg'),description: 'A humanoid robot designed for friendly interaction.' },
];

const HomePage = () => {
    const dataList = [
        { id: '1', title: 'LEGO Mindstorms EV3', description: 'A versatile robotics kit for building, programming, and controlling robots.' },
        { id: '2', title: 'VEX Robotics Kit', description: 'An educational kit for building programmable robots and enhancing STEM skills.' },
        { id: '3', title: 'Ozobot Bit', description: 'A small robot that follows color codes and enhances creative programming.' },
        { id: '4', title: 'Sphero Mini', description: 'A robotic ball that you can control using your smartphone or tablet.' },
        { id: '5', title: 'Arduino Starter Kit', description: 'Includes an Arduino board and components to create interactive projects.' },
    ];

    return (
        <View style={styles.mainContainer}>
            <ImageBackground
                source={vexcodeImage}
                style={styles.backgroundImage}
                imageStyle={{ opacity: 0.3 }} // Adjust opacity for brightness effect
            >
                <View style={styles.textContent}>
                    <Text style={styles.title}>Welcome to Ethio Robo Robotics Center!</Text>
                    <Text style={styles.subtitle}>Explore a wide range of educational robots and accessories.</Text>
                    <FlatList
                        data={dataList}
                        style={styles.list}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.listItemContainer}>
                                <View style={styles.bulletPoint} />
                                <Text style={styles.listItem}>{item.title}</Text>
                                <Text style={styles.listDescription}>{item.description}</Text>
                            </View>
                        )}
                    />
                </View>
            </ImageBackground>

            <View style={styles.imageContent}>
                <Text style={styles.title}>Featured Robots</Text>
                <FlatList
                    data={robotImages1}
                    horizontal
                    style={{ alignSelf: 'center', overflow: 'visible' }}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.robotCard}>
                            <Image source={item.uri} style={styles.robotImage} />
                            <Text style={styles.robotName}>{item.name}</Text>
                            <Text style={styles.robotDescription}>{item.description}</Text>
                        </View>
                    )}
                />
            </View>

            {/!* New Section for VEX Kits Image *!/}
            <View style={styles.newImagesContainer}>
                <Text style={styles.title}>VEX Kits</Text>
                <Image source={VEXkitsImage} style={styles.vexKitsImage} />
            </View>
        </View>
    );
};

// Styles

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    textContent: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0000FF', // Bright blue color for visibility
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#0000FF', // Bright blue color for visibility
        textAlign: 'center',
        marginBottom: 10,
    },
    listItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    bulletPoint: {
        width: 10,
        height: 10,
        backgroundColor: 'black',
        borderRadius: 5,
        marginRight: 10,
    },

listItem: {
    flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0000FF', // Bright blue color for list items
},
listDescription: {
    fontSize: 14,
        color: '#FFFFFF',  // Color for the description text to make it visible against VEX Code image
        marginLeft: 10,
},
imageContent: {
    padding: 20,
},
robotCard: {
    alignItems: 'center',
        marginRight: 10,
        backgroundColor: '#FFFFFF', // Card background color for clearer visibility
        borderRadius: 8,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3, // Shadow for Android
},
robotImage: {
    width: 120,
        height: 120,
        borderRadius: 8,
},
robotName: {
    fontWeight: 'bold',
        marginTop: 5,
},
robotDescription: {
    fontSize: 12,
        color: '#555',
        textAlign: 'center',
},
newImagesContainer: {
    alignItems: 'center',
        marginTop: 20,
},
vexKitsImage: {
    width: 150, // Adjust to make it smaller
        height: 150, // Set specific height for visibility
        borderRadius: 8,
        marginTop: 10, // Space above the image
},
});

export default HomePage;
*/

/*import React from 'react';
import { View, Text, FlatList, Image, ImageBackground, StyleSheet } from 'react-native';
import VEXkitsImage from '../assets/123classroombundles.jpg'; // Path to VEX Kits Image
import vexcodeImage from '../assets/vexcode.jpg'; // Path to VEX Code Image

const robotImages1 = [
    { id: '1', uri: require('../assets/robot1.jpg'), name: 'Robot 1', description: 'This is an educational robot used in many classrooms.' },
    { id: '2', uri: require('../assets/robot2.jpg'), name: 'Robot 2', description: 'A humanoid robot designed for friendly interaction.' },
];

const HomePage = () => {
    const dataList = [
        { id: '1', title: 'LEGO Mindstorms EV3', description: 'A versatile robotics kit for building, programming, and controlling robots.' },
        { id: '2', title: 'VEX Robotics Kit', description: 'An educational kit for building programmable robots and enhancing STEM skills.' },
        { id: '3', title: 'Ozobot Bit', description: 'A small robot that follows color codes and enhances creative programming.' },
        { id: '4', title: 'Sphero Mini', description: 'A robotic ball that you can control using your smartphone or tablet.' },
        { id: '5', title: 'Arduino Starter Kit', description: 'Includes an Arduino board and components to create interactive projects.' },
    ];

    return (
        <View style={styles.mainContainer}>
            <ImageBackground
                source={vexcodeImage}
                style={styles.backgroundImage}
                imageStyle={{ opacity: 0.3 }} // Adjust opacity for brightness effect
            >
                <View style={styles.textContent}>
                    <Text style={styles.title}>Welcome to Ethio Robo Robotics Center!</Text>
                    <Text style={styles.subtitle}>Explore a wide range of educational robots and accessories.</Text>
                    <FlatList
                        data={dataList}
                        style={styles.list}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.listItemContainer}>
                                <View style={styles.bulletPoint} />
                                <Text style={styles.listItem}>{item.title}</Text>
                                <Text style={styles.listDescription}>{item.description}</Text>
                            </View>
                        )}
                    />
                </View>
            </ImageBackground>

            <View style={styles.imageContent}>
                <Text style={styles.title}>Featured Robots</Text>
                <FlatList
                    data={robotImages1}
                    horizontal
                    style={{ alignSelf: 'center', overflow: 'visible' }}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.robotCard}>
                            <Image source={item.uri} style={styles.robotImage} />
                            <Text style={styles.robotName}>{item.name}</Text>
                            <Text style={styles.robotDescription}>{item.description}</Text>
                        </View>
                    )}
                />
            </View>

            {/!* New Section for VEX Kits Image *!/}
            <View style={styles.newImagesContainer}>
                <Text style={styles.title}>VEX Kits</Text>
                <Image source={VEXkitsImage} style={styles.vexKitsImage} />
            </View>
        </View>
    );
};

// Styles

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    textContent: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 10,
    },
    listItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    bulletPoint: {
        width: 10,
        height: 10,
        backgroundColor: 'black',
        borderRadius: 5,
        marginRight: 10,
    },

listItem: {
    flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
},
listDescription: {
    fontSize: 14,
        color: '#ffffff', // Color for the description text
        marginLeft: 10,
},
imageContent: {
    padding: 20,
},
robotCard: {
    alignItems: 'center',
        marginRight: 10,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
},
robotImage: {
    width: 120,
        height: 120,
        borderRadius: 8,
},
robotName: {
    fontWeight: 'bold',
        marginTop: 5,
},
robotDescription: {
    fontSize: 12,
        color: '#555',
        textAlign: 'center',
},
newImagesContainer: {
    alignItems: 'center',
        marginTop: 20,
},
vexKitsImage: {
    width: '100%', // Use full width
        height: 200, // Set a specific height for the kits image
        borderRadius: 8,
},
});

export default HomePage;*/

/*// src/pages/HomePage.js
import React from 'react';
// import { Image } from 'expo-image';
import {View, Text, FlatList, Image, ImageBackground} from 'react-native';
import styles from '../components/HomePageStyles'; // Import the styles
import HomePageImages from '../components/HomePageImages';
const EnjoyAIImage = require('../assets/EnjoyAI.jpg'); // Adjust the path according to your file structure
const vexcodeImage = require('../assets/vexcode.jpg'); // Adjust the path according to your file structure
const VEXkitsImage = require('../assets/VEXkits.jpg'); // Adjust the path according to your file structure

const robotImages = [
    { id: '1', uri: 'https://tse1.mm.bing.net/th?id=OIP.TVOEkx2eJmtKjIQjuFO4CwHaHa&pid=Api', name: 'Robot 1', description: 'This is an educational robot used in many classrooms.' },
    { id: '3', uri: 'https://tse4.mm.bing.net/th?id=OIP.hTK5qXnJjWk5jIWfEFJJOwHaHa&pid=Api', name: 'Robot 3', description: 'A humanoid robot designed for friendly interaction.' },
];
/!*const robotImages = [
    { id: '1', uri: '../assets/robot1.jpg', name: 'Robot 1', description: 'This is an educational robot used in many classrooms.' },
    { id: '3', uri: '../assets/robot2.jpg', name: 'Robot 2', description: 'A humanoid robot designed for friendly interaction.' },
];*!/
const robotImages1 = [
    { id: '1', uri: require('../assets/robot1.jpg'), name: 'Robot 1', description: 'This is an educational robot used in many classrooms.' },
    { id: '3', uri: require('../assets/robot2.jpg'), name: 'Robot 2', description: 'A humanoid robot designed for friendly interaction.' },
];
/!*
const exampleImage =  require('../assets/robot1.jpg');
const exampleImageUri = Image.resolveAssetSource(exampleImage).uri;
 *!/
const HomePage = () => {
    const dataList = [ // Realistic dataList for Robotics Education Shopping Center
        { id: '1', title: 'LEGO Mindstorms EV3', description: 'A versatile robotics kit for building, programming, and controlling robots.' },
        { id: '2', title: 'VEX Robotics Kit', description: 'An educational kit for building programmable robots and enhancing STEM skills.' },
        { id: '3', title: 'Ozobot Bit', description: 'A small robot that follows color codes and enhances creative programming.' },
        { id: '4', title: 'Sphero Mini', description: 'A robotic ball that you can control using your smartphone or tablet.' },
        { id: '5', title: 'Arduino Starter Kit', description: 'Includes an Arduino board and components to create interactive projects.' },
    ];
    const backgroundImage = { uri: 'https://www.vexrobotics.com/Content/Images/Product/555-0022-202_v5_product_web_v1.jpg' }; // Replace with the desired image URL

    return (


        <View style={styles.mainContainer}>
            {/!*<ImageBackground source={backgroundImage} style={styles.background} imageStyle={styles.image}>*!/}


            <ImageBackground
                source={VEXkitsImage}
                style={styles.container}
                imageStyle={{ opacity: 0.5 }} // Optional: change the opacity of the image
            >
            <View style={styles.textContent}>
                <View>
                    <Text style={styles.title}>Welcome to Ethio Robo Robotics Center!</Text>
                    <Text style={styles.subtitle}>Explore a wide range of educational robots and accessories.</Text>
                    <FlatList
                        data={dataList}
                        style={{ paddingVertical: 20 }}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: 10, height: 10, backgroundColor: 'black', borderRadius: 5, marginRight: 10 }} />
                                <Text style={styles.listItem}>{item.title}: {item.description}</Text>
                            </View>
                        )}
                    />


                </View>
            </View>
            </ImageBackground>  <View style={styles.imageContent}>
              <FlatList
                        data={robotImages1}
                        horizontal
                        style={{ alignSelf: 'center', overflow: 'visible' }}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View>
                                <Image source={item.uri} style={{ width: 200, height: 200 }} />
                                <Text>{item.name}</Text>
                                <Text>{item.description}</Text>
                            </View>
                        )}
                    />
                  </View>
         {/!*   <View style={styles.imageContent}>
                <FlatList
                    data={robotImages}
                    horizontal
                    style={{ alignSelf: 'center', overflow: 'visible' }}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <HomePageImages item={item} index={index} />
                    )}
                />
            </View>*!/}
             </View>

    );
};

export default HomePage;*/


/*// src/pages/HomePage.js
import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, Animated, Image, FlatList, TouchableWithoutFeedback, Easing } from 'react-native';
import { ListItem } from 'react-native-elements';
import HomePageImages from '../components/HomePageImages';

const robotImages = [
    { id: '1', uri: 'https://tse1.mm.bing.net/th?id=OIP.TVOEkx2eJmtKjIQjuFO4CwHaHa&pid=Api', url: '../assets/robot.jpg', name: 'Robot 1', description: 'This is an educational robot used in many classrooms.' },
    // { id: '2', uri: 'https://tse2.mm.bing.net/th?id=OIP.jTE__cmysmzZ0II90oD0PwHaLI&pid=Api', url: '../assets/robot2.jpg', name: 'Robot 2', description: 'This robot helps teach programming to students.' },
    { id: '3', uri: 'https://tse4.mm.bing.net/th?id=OIP.hTK5qXnJjWk5jIWfEFJJOwHaHa&pid=Api', url: '../assets/robot3.jpg', name: 'Robot 3', description: 'A humanoid robot designed for friendly interaction.' },
];

const HomePage = () => {

    return (
        <View style={styles.mainContainer}>
            <View style={styles.textContent}>
                <View>
                    <Text style={styles.title}>Welcome to the Educational Robotics App!</Text>
                    <FlatList
                        data={dataList}
                        style={{ paddingBlock: 20 }}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={{ display: 'flex', gap: '1rem', flexDirection: 'row' }}>
                                <View style={{ width: '0.5rem', height: '0.5rem', backgroundColor: 'black', borderRadius: '50%', alignSelf: 'center' }}></View>
                                <Text style={styles.listItem}>{item.title}</Text>
                            </View>
                        )}
                    />
                </View>
            </View>

            <View style={styles.imageContent}>
                <FlatList
                    data={robotImages}
                    horizontal
                    style={{ alignSelf: 'center', position: 'relative', left: '20%', overflow: 'visible' }}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <HomePageImages item={item} index={index} />
                    )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        backgroundColor: '#ffebbf'
    },
    textContent: {
        flex: 1,
        flexShrink: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContent: {
        flex: 1,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    title: {
        fontSize: 30,
        fontWeight: 800,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listItem: {
        fontSize: 20,
        paddingBottom: 10
    }

});

export default HomePage;*/

/*
import { Image } from 'react-native';
import styles from '../components/HomePageStyles'; // Import the styles
import HomePageImages from '../components/HomePageImages';

// Function to load images
const loadImages = async () => {
    const exampleImage = await import('../assets/robot1.jpg');
    const exampleImageUri = Image.resolveAssetSource(exampleImage).uri;

    // Define your robot images array
    const robotImages = [
        { id: '1', uri: exampleImageUri, name: 'Robot 1', description: 'This is an educational robot used in many classrooms.' },
        { id: '3', uri: 'https://tse4.mm.bing.net/th?id=OIP.hTK5qXnJjWk5jIWfEFJJOwHaHa&pid=Api', name: 'Robot 3', description: 'A humanoid robot designed for friendly interaction.' },
    ];

    // Return or use robotImages as needed
    return robotImages;
};

// Example usage of loadImages
const initialize = async () => {
    const images = await loadImages();
    console.log(images); // Use or set state with images
};

// Call the initialize function to load images
initialize();
 */

