import React, { useRef } from 'react';
import { View, Image, StyleSheet, Animated, PanResponder } from 'react-native';

// Define the HomePageImages component
const HomePageImages = ({ item, index }) => {
    const translate = useRef(new Animated.ValueXY()).current; // Animation value for dragging
    const scale = useRef(new Animated.Value(1)).current; // Scale value for hover effect

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                // Animate scale on touch down (hover effect)
                Animated.spring(scale, {
                    toValue: 1.1, // Increase size by 10%
                    useNativeDriver: true,
                }).start();
            },
            onPanResponderMove: (event, gestureState) => {
                // Update the translation based on drag
                translate.setValue({ x: gestureState.dx, y: gestureState.dy });
            },
            onPanResponderRelease: () => {
                // Reset scale effect when released
                Animated.spring(scale, {
                    toValue: 1, // Reset scale
                    useNativeDriver: true,
                }).start();

                // Snap back to original position upon release (optional)
                Animated.spring(translate, {
                    toValue: { x: 0, y: 0 }, // Reset position
                    useNativeDriver: true,
                }).start();
            },
        })
    ).current;

    return (
        <View style={styles.container}>
            <Animated.View
                {...panResponder.panHandlers} // Attach the pan responder handlers
                style={[
                    styles.animatedContainer,
                    {
                        transform: [
                            { translateX: translate.x }, // Apply translation on x-axis
                            { translateY: translate.y }, // Apply translation on y-axis
                            { scale }, // Apply scale for hover effect
                        ],
                    },
                ]}
            >
                <Image
                    source={{ uri: item.uri }}
                    style={styles.image}
                />

            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 400, // Container width
        height: 400, // Container height
        overflow: 'visible',
    },
    animatedContainer: {
        width: 400,
        height: 400,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
        borderRadius: 200, // Optional: if you want circular appearance
        position: 'relative',
    },
    image: {
        width: 400,
        height: 400,
        resizeMode: 'contain',
        borderRadius: 200, // Optional: if you want circular appearance
    },
    descriptionText: {
        maxWidth: '100%',
        width: '100%',
        paddingHorizontal: '20%',
        textAlign: 'center',
        position: 'relative',
    },
});

export default HomePageImages;
