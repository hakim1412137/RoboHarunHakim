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

/*import React, { useRef } from 'react';
import { View, Image, TouchableWithoutFeedback, StyleSheet, Animated, PanResponder } from 'react-native';

const HomePageImages = ({ item, index }) => {
    const pan = useRef(new Animated.ValueXY()).current; // Animated value for position

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                // When the user starts dragging
                pan.setOffset({
                    x: pan.x._value,
                    y: pan.y._value,
                });
                pan.setValue({ x: 0, y: 0 });
            },
            onPanResponderMove: Animated.event(
                [null, { dx: pan.x, dy: pan.y }],
                { useNativeDriver: false } // Use native driver for better performance
            ),
            onPanResponderRelease: () => {
                pan.flattenOffset(); // Flatten offset on release
            },
        })
    ).current;

    return (
        <TouchableWithoutFeedback>
            <Animated.View
                {...panResponder.panHandlers}
                style={[styles.animatedContainer, { transform: pan.getTranslateTransform() }]} // Transform according to pan value
            >
                <Image
                    source={{ uri: item.uri }}
                    style={[styles.image, { right: index * 200 }]} // Adjust position based on index
                />
                {/!* Uncomment if you want to display the description
        <Text style={styles.descriptionText}>{item.description}</Text> *!/}
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
/!*    imageContainer: {
        width: 400, // Container width
        height: 400, // Container height
        overflow: 'visible',
    },*!/
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

export default HomePageImages;*/

/*
export default HomePageImages;
*/

/*
import { View, Text, Button, StyleSheet, Animated, Image, FlatList, TouchableWithoutFeedback, Easing } from 'react-native';
import { useRef } from 'react';


export default function HomePageImages({ item, index }) {

  const translate = useRef(new Animated.Value(0)).current; // Animation value for moving the image

  let handleRobotPress = (robot) => {
    // Speech.speak(`${robot.name}: ${robot.description}`);

    // Animate the robot image on touch
    Animated.sequence([
      Animated.timing(translate, {
        toValue: -20, // Move up
        duration: 300,
        easing: Easing.sin,
        useNativeDriver: true,
      }),
      Animated.timing(translate, {
        toValue: 0, // Move back to original position
        duration: 300,
        easing: Easing.sin,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <TouchableWithoutFeedback>
      <Animated.View onMouseEnter={() => handleRobotPress(item)} style={[{ transform: [{ translateY: translate }], overflow: 'visible' }]}>
        <View style={{ width: 400, overflow: 'visible' }}>
          <Image
            source={{ uri: item.uri }}
            style={{
              width: 400, // specify width
              height: 400,
              resizeMode: 'contain', // adjusts how the image scales
              borderRadius: 200,
              position: 'relative',
              right: index * 200
            }}
          />
          {/!* <Text style={{ maxWidth: '100%', width: '100%', paddingInline: '20%', textAlign: 'center', position: 'relative', right: index * 200 }}>{item.description}</Text> *!/}
        </View>
      </Animated.View>
    </TouchableWithoutFeedback >
  );
}
*/
