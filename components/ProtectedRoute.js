import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext'; // Adjust the path as necessary

const ProtectedRoute = ({ children, navigation }) => {
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        // If the user is not authenticated, navigate to the login screen
        const checkAuth = () => {
            if (!isAuthenticated()) {
                navigation.navigate('Login');
            }
        };

        checkAuth();
    }, [isAuthenticated, navigation]); // Rerun effect if isAuthenticated changes

    // Display a loading indicator while checking authentication
    if (isAuthenticated() === null) {
        return (
            <View>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    // Render the protected child components if authenticated
    return <View>{children}</View>;
};

export default ProtectedRoute;
