import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import LinearGradient from "react-native-linear-gradient";

const { width, height } = Dimensions.get("window");

const RoboticsScreen = () => {
    return (
        <View style={styles.container}>
            {/* Lottie Animation Background */}
            <LottieView
                source={require("../assets/animations/robotics-background.json")} // Path to your Lottie file
                autoPlay
                loop
                resizeMode="cover"
                style={styles.animation}
            />

            {/* Gradient Overlay */}
            <LinearGradient
                colors={["rgba(0, 0, 0, 0.8)", "rgba(0, 0, 0, 0.2)"]}
                style={styles.gradient}
            />

            {/* Content */}
            <View style={styles.content}>
                <Text style={styles.title}>Robotics Training</Text>
                <Text style={styles.subtitle}>Learn, Build, Innovate</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    animation: {
        position: "absolute",
        width: width,
        height: height,
    },
    gradient: {
        position: "absolute",
        width: width,
        height: height,
    },
    content: {
        zIndex: 1,
        alignItems: "center",
    },
    title: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#FFF",
        textShadowColor: "rgba(0, 0, 0, 0.5)",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
    },
    subtitle: {
        fontSize: 18,
        color: "#FFF",
        marginTop: 10,
        textShadowColor: "rgba(0, 0, 0, 0.5)",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
});

export default RoboticsScreen;
