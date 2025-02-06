import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { resetPassword } from '../utils/api';

const ResetPasswordScreen = ({ route, navigation }) => {
    const { token } = route.params;
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    const handleResetPassword = async () => {
        if (!newPassword) {
            setError('Please enter a new password.');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await resetPassword(token, newPassword);
            setSuccess('Your password has been reset successfully.');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Reset password failed:', error);
            setError('Failed to reset password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reset Password</Text>
            <TextInput
                style={styles.input}
                placeholder="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            {success ? <Text style={styles.successText}>{success}</Text> : null}
            {loading ? (
                <ActivityIndicator size="large" color="#007BFF" />
            ) : (
                <Button title="Reset Password" onPress={handleResetPassword} />
            )}
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
    input: {
        height: 55,
        borderColor: '#007BFF',
        borderWidth: 2,
        marginBottom: 15,
        paddingHorizontal: 15,
        fontSize: 18,
        width: '100%',
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    successText: {
        color: 'green',
        marginBottom: 10,
    },
});

export default ResetPasswordScreen;
