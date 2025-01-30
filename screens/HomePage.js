// src/pages/HomePage.js
import React from 'react';
// import { Image } from 'expo-image';
import {View, Text, FlatList, Image, ImageBackground} from 'react-native';
import styles from '../components/HomePageStyles'; // Import the styles
import HomePageImages from '../components/HomePageImages';
const EnjoyAIImage = require('../assets/EnjoyAI.jpg'); // Adjust the path according to your file structure

const robotImages = [
    { id: '1', uri: 'https://tse1.mm.bing.net/th?id=OIP.TVOEkx2eJmtKjIQjuFO4CwHaHa&pid=Api', name: 'Robot 1', description: 'This is an educational robot used in many classrooms.' },
    { id: '3', uri: 'https://tse4.mm.bing.net/th?id=OIP.hTK5qXnJjWk5jIWfEFJJOwHaHa&pid=Api', name: 'Robot 3', description: 'A humanoid robot designed for friendly interaction.' },
];
/*const robotImages = [
    { id: '1', uri: '../assets/robot1.jpg', name: 'Robot 1', description: 'This is an educational robot used in many classrooms.' },
    { id: '3', uri: '../assets/robot2.jpg', name: 'Robot 2', description: 'A humanoid robot designed for friendly interaction.' },
];*/
const robotImages1 = [
    { id: '1', uri: require('../assets/robot1.jpg'), name: 'Robot 1', description: 'This is an educational robot used in many classrooms.' },
    { id: '3', uri: require('../assets/robot2.jpg'), name: 'Robot 2', description: 'A humanoid robot designed for friendly interaction.' },
];
/*
const exampleImage =  require('../assets/robot1.jpg');
const exampleImageUri = Image.resolveAssetSource(exampleImage).uri;
 */
const HomePage = () => {
    const dataList = [ // Realistic dataList for Robotics Education Shopping Center
        { id: '1', title: 'LEGO Mindstorms EV3', description: 'A versatile robotics kit for building, programming, and controlling robots.' },
        { id: '2', title: 'VEX Robotics Kit', description: 'An educational kit for building programmable robots and enhancing STEM skills.' },
        { id: '3', title: 'Ozobot Bit', description: 'A small robot that follows color codes and enhances creative programming.' },
        { id: '4', title: 'Sphero Mini', description: 'A robotic ball that you can control using your smartphone or tablet.' },
        { id: '5', title: 'Arduino Starter Kit', description: 'Includes an Arduino board and components to create interactive projects.' },
    ];

    return (


        <View style={styles.mainContainer}>
            <ImageBackground
                source={EnjoyAIImage}
                style={styles.container}
                imageStyle={{ opacity: 0.5 }} // Optional: change the opacity of the image
            >
            <View style={styles.textContent}>
                <View>
                    <Text style={styles.title}>Welcome to the Robotics Education & Shopping Center!</Text>
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
         {/*   <View style={styles.imageContent}>
                <FlatList
                    data={robotImages}
                    horizontal
                    style={{ alignSelf: 'center', overflow: 'visible' }}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <HomePageImages item={item} index={index} />
                    )}
                />
            </View>*/}
             </View>

    );
};

export default HomePage;


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

