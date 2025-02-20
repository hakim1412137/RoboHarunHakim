
// screens/RegistrationScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
// import registrationService from '../services/registrationService';

const RegistrationScreen = () => {
    const [studentName, setStudentName] = useState('');
    const [email, setEmail] = useState('');
    const [branch, setBranch] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    const handleRegistration = async () => {
        const payload = {
            studentName, email, branch, paymentMethod
        };

        try {
            const response = await registrationService.registerStudent(payload);
            if (response.success) {
                Alert.alert("Success", "Registration successful!");
            } else {
                Alert.alert("Error", response.message);
            }
        } catch (error) {
            Alert.alert("Error", "An error occurred while processing your registration.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Register as a Student</Text>
            <TextInput style={styles.input} placeholder="Full Name" value={studentName} onChangeText={setStudentName} />
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="Select Branch (e.g., Robotics)" value={branch} onChangeText={setBranch} />
            <TextInput style={styles.input} placeholder="Payment Method (Card Info)" value={paymentMethod} onChangeText={setPaymentMethod} />
            <Button title="Register" onPress={handleRegistration} />
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
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
    },
});

export default RegistrationScreen;

