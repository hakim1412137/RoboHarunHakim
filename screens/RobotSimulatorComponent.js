// screens/RobotSimulatorComponent.js (continued)
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Picker } from 'react-native';
import api2 from '../utils/api2';

const RobotSimulatorComponent = () => {
const [command, setCommand] = useState('');
const [response, setResponse] = useState('');

const handleSimulate = async () => {
    const requestData = {
        command,
        duration: 5, // Set a default duration or allow user input
    };

    const result = await api2.simulateMovement(requestData);
    setResponse(result.feedback);
};

return (
    <View style={styles.container}>
        <Text style={styles.header}>Robot Simulator</Text>
        <Picker
            selectedValue={command}
            style={styles.input}
            onValueChange={(itemValue) => setCommand(itemValue)}
        >
            <Picker.Item label="Select Command" value="" />
            <Picker.Item label="Move Forward" value="move_forward" />
            <Picker.Item label="Move Backward" value="move_backward" />
            <Picker.Item label="Turn Left" value="turn_left" />
            <Picker.Item label="Turn Right" value="turn_right" />
        </Picker>
        <Button title="Simulate Movement" onPress={handleSimulate} />
        {response && <Text style={styles.result}>Response: {response}</Text>}
    </View>
);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 8,
    },
    result: {
        marginTop: 20,
        fontWeight: 'bold',
    },
});

export default RobotSimulatorComponent;
