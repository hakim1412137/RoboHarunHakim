// src/components/VexRoboticsList.js
import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, StyleSheet, ActivityIndicator, ScrollView} from 'react-native';
import { getAllVexRobotics } from "../utils/api"; // Ensure this path is correct
import VexRoboticsCard from "../components/VexRoboticsCard";
import Header from '../components/Header';
import Menu from '../components/Menu';

const VexRoboticsList = ({ navigation }) => {
    const [platforms, setPlatforms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPlatforms = async () => {
            setLoading(true);
            try {
                const data = await getAllVexRobotics();
                console.log("Fetched Data: ", data); // Log to check fetched data
                setPlatforms(data.data);
            } catch (error) {
                console.error("Error fetching platforms: ", error);
            } finally {
                setLoading(false);
            }
        };

        loadPlatforms(); // Call to fetch data
    }, []);

    const renderItem = ({ item }) => {
        return (
            <VexRoboticsCard
                platform={item} // Set platform data
                onPress={() => navigation.navigate('VexRobotDetail', { id: item.id })} // On press navigate to detail screen
            />
        );
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <ScrollView style={styles.container}>
            <Header></Header>
            <Menu navigation={navigation}></Menu>
            <View style={{ padding: 10, paddingHorizontal: 200 }}>
                <Text style={styles.title}>VEX Robotics Platforms</Text>
                <FlatList
                    data={platforms}
                    keyExtractor={(item) => item.id.toString()} // Key extractor function
                    renderItem={renderItem} // renderItem uses a separate function
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '40rem',
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
    },
});

export default VexRoboticsList;
/*
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { getAllVexRobotics } from "../utils/api"; // Make sure this path is correct
import VexRoboticsCard from "../components/VexRoboticsCard";

const VexRoboticsList = ({ navigation }) => {
    const [platforms, setPlatforms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPlatforms = async () => {
            setLoading(true);
            try {
                const response = await getAllVexRobotics(); // response contains data
                console.log("Fetched Data: ", response); // Log the complete response
                setPlatforms(response.data); // Access the data array here
            } catch (error) {
                console.error("Error fetching platforms: ", error);
            } finally {
                setLoading(false);
            }
        };

        loadPlatforms(); // Call to fetch data
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>VEX Robotics Platforms</Text>
            <FlatList
                data={platforms}
                keyExtractor={(item) => item.id.toString()} // Key extractor function
                renderItem={({ item }) => (
                    <VexRoboticsCard
                        platform={item} // Set platform data
                        onPress={() => navigation.navigate('VexRobotDetail', { id: item.id })} // On press navigate to detail screen
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
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
        textAlign: 'center',
    },
});

export default VexRoboticsList;
 */
/*// src/components/VexRoboticsList.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import {getAllVexRobotics} from "../utils/api";
import VexRoboticsCard from "../components/VexRoboticsCard";


const VexRoboticsList = ({ navigation }) => {
    const [platforms, setPlatforms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPlatforms = async () => {
            setLoading(true);
            try {
                const data = await getAllVexRobotics();
                console.log(data); // Log the fetched data

                setPlatforms(data);
            } catch (error) {
                console.error("Error fetching platforms: ", error);
            } finally {
                setLoading(false);
            }
        };

        loadPlatforms();
    }, []);

    const renderItem = ({ item }) => (
        <VexRoboticsCard
            platform={item}
            onPress={() => navigation.navigate('VexRobotDetail', { id: item.id })}
        />
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>VEX Robotics Platforms</Text>
            {platforms.length > 0 ? (
                <FlatList
                    data={platforms}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />
            ) : (
                <Text>No data available</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
        textAlign: 'center',
    },
});

export default VexRoboticsList;*/

/*// components/VexRoboticsList.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import {getAllVexRobotics} from "../utils/api";

const VexRoboticsList = ({ navigation }) => {
    const [platforms, setPlatforms] = useState([]);

    useEffect(() => {
        const loadPlatforms = async () => {
            const data = await getAllVexRobotics();
            setPlatforms(data);
        };

        loadPlatforms();
    }, []);

    return (
        <View>
            <Text style={styles.title}>VEX Robotics Platforms</Text>
            <FlatList
                data={platforms}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('VexRobotDetail', { id: item.id })}>
                        <Text style={styles.item}>{item.platformName}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        marginBottom: 10,
        textAlign: 'center',
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default VexRoboticsList;*/
