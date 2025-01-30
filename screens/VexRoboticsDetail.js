// components/VexRoboticsDetail.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {VexRoboticsById} from '../utils/api';

const VexRoboticsDetail = ({ route }) => {
    const { id } = route.params;
    const [platform, setPlatform] = useState(null);

    useEffect(() => {
        const loadPlatform = async () => {
            const data = await VexRoboticsById(id);
            setPlatform(data);
        };

        loadPlatform();
    }, [id]);

    if (!platform) return <Text>Loading...</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{platform.platformName}</Text>
            <Text>Target Audience: {platform.targetAudience}</Text>
            <Text>Focus: {platform.focus}</Text>
            <Text>Components: {platform.components}</Text>
            <Text>Programming: {platform.programming}</Text>
            <Text>Curriculum: {platform.curriculum}</Text>
            <Text>Use Case: {platform.useCase}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
    },
});

export default VexRoboticsDetail;
