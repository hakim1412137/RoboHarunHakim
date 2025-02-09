import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated, Pressable } from 'react-native';
import { Card, Text } from 'react-native-paper';

const TimelineCard1 = ({ item, index }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Fade in animation on mount.
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  // Animation triggered when the card is hovered over.
  const animateIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 1.1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  // Animation triggered when the card is no longer hovered.
  const animateOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable onMouseEnter={animateIn} onMouseLeave={animateOut}>
      <Animated.View
        style={[
          styles.animatedView,
          {
            transform: [{ scale: scaleAnim }],
            opacity: fadeAnim,
          },
        ]}
      >
        <Card style={[styles.card, index % 2 !== 0 ? styles.leftCard : styles.rightCard]}>
          <Card.Content style={styles.cardContent}>
            <Text style={styles.date}>
              {new Date(item.eventDate).toLocaleString()}
            </Text>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
            {item.description && (
              <Text style={styles.description}>{item.description}</Text>
            )}
          </Card.Content>
        </Card>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  animatedView: {
    marginBottom: 30,
  },
  card: {
    width: '50%',
    borderRadius: 10,
    // Shadow for iOS.
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    // Elevation for Android.
    elevation: 3,
  },
  // Left cards: Light cyan with a darker cyan border.
  leftCard: {
    marginRight: 10,
    backgroundColor: '#E0F7FA',
    borderColor: '#006064',
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  // Right cards: Light amber with an amber border.
  rightCard: {
    marginLeft: 10,
    backgroundColor: '#FFF9C4',
    borderColor: '#FBC02D',
    borderWidth: 1,
    alignSelf: 'flex-end',
  },
  cardContent: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  date: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default TimelineCard1;

// import { View, StyleSheet, Animated } from 'react-native';
// import { Card, Text } from 'react-native-paper';
// import React, { useRef } from 'react';

// const TimelineCard1 = ({ item, index }) => {
//     const animatedValue = useRef(new Animated.Value(1)).current; // Use useRef for animated value

//     const handleMouseEnter = () => {
//         Animated.spring(animatedValue, {
//             toValue: 1.1, // Scale up slightly
//             useNativeDriver: true,
//         }).start();
//     };

//     const handleMouseLeave = () => {
//         Animated.spring(animatedValue, {
//             toValue: 1, // Scale back down
//             useNativeDriver: true,
//         }).start();
//     };

//     return (
//         <Animated.View
//             style={{ transform: [{ scale: animatedValue }], marginBottom: 30  }}
//             onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
//         >
//             <Card style={[styles.card, index % 2 !== 0 ? styles.leftCard : styles.rightCard]}>
//                 <Card.Content style={styles.cardContent}>
//                     <Text style={styles.date}>{new Date(item.eventDate).toLocaleString()}</Text>
//                     <Text style={styles.itemTitle}>{item.title}</Text>
//                     <Text style={styles.subtitle}>{item.subtitle}</Text>
//                     {item.description && <Text style={styles.description}>{item.description}</Text>}
//                 </Card.Content>
//             </Card>
//         </Animated.View>
//     );
// };

// const styles = StyleSheet.create({
//     card: {
//         width: "50%",
//         position: 'relative',
//     },
//     leftCard: {
//         marginRight: 10,
//         backgroundColor: '#E0F7FA', // Light cyan for left cards
//         borderColor: '#006064',
//         borderWidth: 1,
//         alignSelf: 'flex-start',
//         borderRadius: 10,
//     },
//     rightCard: {
//         marginLeft: 10,
//         backgroundColor: '#4CAF50', // Light orange for right cards
//         borderColor: '#C2185B',
//         borderWidth: 1,
//         alignSelf: 'flex-end',
//         borderRadius: 10,
//     },
//     cardContent: {
//         alignItems: 'center', // Center content horizontally
//         textAlign: 'center', // Center text
//         paddingVertical: 10, // Add some vertical padding for better spacing
//     },
//     date: {
//         fontWeight: 'bold',
//         textAlign: 'center', // Center align date text
//     },
//     itemTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         textAlign: 'center', // Center align title text
//     },
//     subtitle: {
//         fontWeight: '600',
//         textAlign: 'center', // Center align subtitle text
//     },
//     description: {
//         fontSize: 14,
//         color: '#666',
//         textAlign: 'center', // Center align description text
//     },
// });

// export default  TimelineCard1;

