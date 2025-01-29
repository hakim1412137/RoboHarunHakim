
import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

const FormInput = ({ label, value, onChangeText, secureTextEntry }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    label: {
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 8,
        fontSize: 16,
    },
});

export default FormInput;
