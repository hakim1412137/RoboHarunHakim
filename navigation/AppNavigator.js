import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../screens/HomeScreen";
import AboutScreen from "../screens/AboutScreen";
import ShopScreen from "../screens/ShopScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignUpScreen";
import MyAccountScreen from "../screens/MyAccountScreen";
import CoursesScreen from "../screens/CoursesScreen";
import CourseDetailsScreen from "../screens/CourseDetailsScreen";
import EventListScreen from "../screens/EventListScreen";
import EventDetailsScreen from "../screens/EventDetailsScreen";
import ResourcesListScreen from "../screens/ResourcesListScreen";
import ProductsScreen from "../screens/ProductScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import CartScreen from "../screens/CartScreen";
import CompetitionsScreen from "../screens/CompetitionsScreen";
import CompetitionDetailsScreen from "../screens/CompetitionDetailsScreen";
import SupportScreen from "../screens/SupportScreen";
import UserContext from "../context/UserContext";
import CareersScreen from "../screens/CareersScreen";
import PartnerScreen from "../screens/PartnerScreen";
import ResourceDetailsScreen from "../screens/ResourceDetailsScreen";


const Stack = createStackNavigator();

const AppNavigator = () => {
       const { user } = useContext(UserContext); // Assuming AuthContext provides user role

        return (
            <NavigationContainer>
                    <Stack.Navigator initialRouteName="Home">
                            <Stack.Screen name="Home" component={HomeScreen} />
                            <Stack.Screen name="About" component={AboutScreen} />
                            <Stack.Screen name="Shop" component={ShopScreen} />

                            {/* Public access screens */}
                            <Stack.Screen name="Login" component={LoginScreen} />
                            <Stack.Screen name="Signup" component={SignupScreen} />

                            {/* Private access for logged-in members */}
                           {user && user.role === 'member' && (
                                <>
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
                                        <Stack.Screen name="Quizzes" component={QuizListScreen} />
                                        <Stack.Screen name="Feedback" component={FeedbackScreen} />
                                </>
                            )}

                            {/* Admin-specific screens */}
                            {user && user.role === 'admin' && (
                                <>
                                        <Stack.Screen name="Careers" component={CareersScreen} />
                                        <Stack.Screen name="Partners" component={PartnerScreen} />
                                        <Stack.Screen name="Support" component={SupportScreen} />
                                </>
                            )}
                    </Stack.Navigator>
            </NavigationContainer>
        );
};

export default AppNavigator;
