// App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./screens/HomeScreen";
import ShopScreen from './screens/ShopScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from "./screens/SignUpScreen";
import MyAccountScreen from './screens/MyAccountScreen';
import AboutScreen from './screens/AboutScreen';
import CoursesScreen from "./screens/CoursesScreen";
import CourseDetailsScreen from "./screens/CourseDetailsScreen";
import ProductsScreen from "./screens/ProductScreen";
import CompetitionsScreen from "./screens/CompetitionsScreen";
import CompetitionDetailsScreen from "./screens/CompetitionDetailsScreen";
import CartScreen from "./screens/CartScreen";
import EventDetailsScreen from "./screens/EventDetailsScreen";
import ResourcesListScreen from "./screens/ResourcesListScreen";
import EventListScreen from "./screens/EventListScreen";
import SupportScreen from "./screens/SupportScreen";
import ResourceDetailsScreen from "./screens/ResourceDetailsScreen";
import CareersScreen from "./screens/CareersScreen";
import PartnerScreen from "./screens/PartnerScreen";
import {Text} from "react-native";
import ProductDetail from "./screens/ProductDetailScreen";
import {CartProvider} from "./context/CartContext";
import EditProductScreen from "./screens/EditProductScreen";
import VexRoboticsDetail from "./screens/VexRoboticsDetail";
import AddVexRobotics from "./screens/AddVexRobotics";
import VexRoboticsList from "./screens/VexRoboticsList";
import SignInScreen from "./screens/SignInScreen";
import {AuthProvider} from "./context/AuthContext";
import {UserProvider} from "./context/UserContext"; // New About Screen

const Stack = createStackNavigator();
  const App = () => {
        return (
                 <AuthProvider>
            <UserProvider>


            <CartProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="home">
                    <Stack.Screen name="home" component={HomeScreen}  options={{ headerShown: false }}/>
                                {/*<Stack.Screen name="About" component={AboutScreen} />*/}
                                 <Stack.Screen name="Shop" component={ShopScreen} />
                    <Stack.Screen name="AboutUs" component={AboutScreen} />
                    <Stack.Screen name="login" component={LoginScreen} />
                                 <Stack.Screen name="signup" component={SignUpScreen} />
                                 <Stack.Screen name="MyAccount" component={MyAccountScreen} />
                                 <Stack.Screen name="Courses" component={CoursesScreen} />
                                 <Stack.Screen name="CourseDetails1" component={CourseDetailsScreen} />
                                 <Stack.Screen name="Events" component={EventListScreen} />
                                 <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
                                 <Stack.Screen name="Resources" component={ResourcesListScreen} />
                                 <Stack.Screen name="ResourceDetails" component={ResourceDetailsScreen} />
                                 <Stack.Screen name="Products" component={ProductsScreen} />
                    <Stack.Screen name="ProductDetails" component={ProductDetail} />
                                 <Stack.Screen name="Cart" component={CartScreen} />
                    <Stack.Screen name="EditProduct" component={EditProductScreen} />
                    <Stack.Screen name="Competitions" component={CompetitionsScreen} />
                                 <Stack.Screen name="CompetitionDetails" component={CompetitionDetailsScreen} />
                    <Stack.Screen name="VexRobotics" component={VexRoboticsList} />
                    <Stack.Screen name="VexRobotDetail" component={VexRoboticsDetail} />
                    <Stack.Screen name="AddVexRobot" component={AddVexRobotics} />
                                 <Stack.Screen name="Careers" component={CareersScreen} />

                                 <Stack.Screen name="Partners" component={PartnerScreen} />
                                 <Stack.Screen name="Support" component={SupportScreen} />
                </Stack.Navigator>
            </NavigationContainer>
            </CartProvider>

                </UserProvider>
            </AuthProvider>
        );
    };

export default App;

/*<Stack.Screen name="Login" component={LoginScreen} />
<Stack.Screen
    name="Home"
    options={{ headerShown: false }}>
    {(props) => (
        <ProtectedRoute navigation={props.navigation}>
            <HomeScreen />
        </ProtectedRoute>
    )}
</Stack.Screen>*/

/*const App = () => {
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="About" component={AboutScreen} />
                <Stack.Screen name="Shop" component={ShopScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignUpScreen} />
                <Stack.Screen name="MyAccount" component={MyAccountScreen} />
                <Stack.Screen name="Courses" component={CoursesScreen} />
                <Stack.Screen name="CourseDetails" component={CourseDetailsScreen} />
                <Stack.Screen name="Events" component={EventListScreen} />
                <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
                <Stack.Screen name="Resources" component={ResourcesListScreen} />
                <Stack.Screen name="ResourceDetails" component={ResourceDetailsScreen} />
                <Stack.Screen name="Products" component={ProductsScreen} />
                <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
                <Stack.Screen name="Cart" component={CartScreen} />
                <Stack.Screen name="Competitions" component={CompetitionsScreen} />
                <Stack.Screen name="CompetitionDetails" component={CompetitionDetailsScreen} />
                <Stack.Screen name="Careers" component={CareersScreen} />
                <Stack.Screen name="Partners" component={PartnerScreen} />
                <Stack.Screen name="Support" component={SupportScreen} />
            </Stack.Navigator>
        </NavigationContainer>
};

export default App;*/


/*import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/

