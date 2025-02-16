import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Dimensions, 
  ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { vexRoboticsById } from '../utils/api';
import { ImageBackground } from "expo-image";

const { width } = Dimensions.get('window');

const VexRoboticsDetail = ({ route, navigation }) => {
    const { id } = route.params;
    const [platform, setPlatform] = useState(null);

    useEffect(() => {
        const loadPlatform = async () => {
            const { data } = await vexRoboticsById(id);
            setPlatform(data);
        };
        loadPlatform();
    }, [id]);

    if (!platform) return (
        <LinearGradient colors={['#FFFFFF', '#F4F6F9']} style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#00C978" />
        </LinearGradient>
    );

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <ImageBackground
                source={require('../assets/images/VexRobo.jpg')}
                style={styles.heroImage}
                resizeMode="cover"
            >
                <LinearGradient
                    colors={['rgba(0,0,0,0.4)', 'transparent']}
                    style={styles.imageOverlay}
                />
            </ImageBackground>

            <View style={styles.detailsContainer}>
                <LinearGradient
                    colors={['#00A86B', '#00C978']}
                    style={styles.header}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <Text style={styles.title}>{platform.platformName}</Text>
                    <Text style={styles.subtitle}>{platform.targetAudience}</Text>
                </LinearGradient>

                <View style={styles.content}>
                    <DetailCard icon="school" title="Curriculum" value={platform.curriculum} />
                    <DetailCard icon="build" title="Components" value={platform.components} />
                    <DetailCard icon="code" title="Programming" value={platform.programming} />
                    <DetailCard icon="target" title="Focus Area" value={platform.focus} />
                    <DetailCard icon="cases" title="Use Cases" value={platform.useCase} />
                </View>
            </View>
        </ScrollView>
    );
};

const DetailCard = ({ icon, title, value }) => (
    <View style={styles.card}>
        <MaterialIcons name={icon} size={28} color="#00C978" />
        <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardText}>{value}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        height: '100vh',
        paddingBottom: 50,
        backgroundColor: '#F4F6F9',
        position: 'relative'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroImage: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    },
    imageOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    detailsContainer: {
        width: width * 0.5,
        paddingTop: 100
    },
    header: {
        padding: 24,
        marginTop: -40,
        borderBottomRightRadius: 40,
        borderTopRightRadius: 40,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: 'white',
        marginBottom: 8,
        textShadowColor: 'rgba(0,0,0,0.1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    subtitle: {
        fontSize: 18,
        color: 'rgba(255,255,255,0.95)',
        fontWeight: '500',
        letterSpacing: 0.3,
    },
    content: {
        padding: 24,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
    },
    cardContent: {
        flex: 1,
        marginLeft: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2D3436',
        marginBottom: 8,
        letterSpacing: 0.2,
    },
    cardText: {
        fontSize: 16,
        color: '#636e72',
        lineHeight: 24,
        letterSpacing: 0.15,
    },
});

export default VexRoboticsDetail;
// src/components/VexRoboticsDetail.js
// import React, { useEffect, useState } from 'react';
// import {View, Text, StyleSheet, ScrollView, Image, Dimensions, ActivityIndicator} from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { MaterialIcons } from '@expo/vector-icons';
// import { vexRoboticsById } from '../utils/api';
// import {ImageBackground} from "expo-image";

// const { width } = Dimensions.get('window');

// const VexRoboticsDetail = ({ route, navigation }) => {
//     const { id } = route.params;
//     const [platform, setPlatform] = useState(null);

//     useEffect(() => {
//         const loadPlatform = async () => {
//             const { data } = await vexRoboticsById(id);
//             setPlatform(data);
//         };
//         loadPlatform();
//     }, [id]);

//     if (!platform) return (
//         <LinearGradient colors={['#FFFFFF', '#F4F6F9']} style={styles.loadingContainer}>
//             <ActivityIndicator size="large" color="#00C978" />
//         </LinearGradient>
//     );

//     return (
//         <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//             <ImageBackground
//                 source={require('../assets/images/VexRobo.jpg')} // Hero image
//                 style={styles.heroImage}
//                 resizeMode="cover"
//             ></ImageBackground>

//             <View style={styles.detailsContainer}>
//                 <LinearGradient
//                     colors={['#00A86B', '#00C978']}
//                     style={styles.header}
//                 >
//                     <Text style={styles.title}>{platform.platformName}</Text>
//                     <Text style={styles.subtitle}>{platform.targetAudience}</Text>
//                 </LinearGradient>

//                 <View style={styles.content}>
//                     <DetailCard icon="school" title="Curriculum" value={platform.curriculum} />
//                     <DetailCard icon="build" title="Components" value={platform.components} />
//                     <DetailCard icon="code" title="Programming" value={platform.programming} />
//                     <DetailCard icon="target" title="Focus Area" value={platform.focus} />
//                     <DetailCard icon="cases" title="Use Cases" value={platform.useCase} />
//                 </View>
//             </View>
//         </ScrollView>
//     );
// };

// const DetailCard = ({ icon, title, value }) => (
//     <View style={styles.card}>
//         <MaterialIcons name={icon} size={28} color="#00C978" />
//         <View style={styles.cardContent}>
//             <Text style={styles.cardTitle}>{title}</Text>
//             <Text style={styles.cardText}>{value}</Text>
//         </View>
//     </View>
// );

// const styles = StyleSheet.create({
//     container: {
//          height: '40rem',
//         backgroundColor: '#F4F6F9',
//         position: 'relative'
//     },
//     detailsContainer: {
//         width: width * 0.5,
//         paddingTop: 100
//     },
//     loadingContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     heroImage: {
//         width: '100%',
//         height: '100%',
//         position: 'absolute',
//         top: 0
//     },
//     header: {
//         padding: 24,
//         marginTop: -40,
//         borderTopLeftRadius: 40,
//         borderTopRightRadius: 40,
//     },
//     title: {
//         fontSize: 32,
//         fontWeight: '800',
//         color: 'white',
//         marginBottom: 8,
//     },
//     subtitle: {
//         fontSize: 18,
//         color: 'rgba(255,255,255,0.9)',
//         fontWeight: '500',
//     },
//     content: {
//         padding: 24,


//     },
//     card: {
//         backgroundColor: 'white',
//         borderRadius: 20,
//         padding: 20,
//         marginBottom: 16,
//         flexDirection: 'row',
//         alignItems: 'center',
//         elevation: 4,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.1,
//         shadowRadius: 6,
//     },
//     cardContent: {
//         flex: 1,
//         marginLeft: 16,
//     },
//     cardTitle: {
//         fontSize: 18,
//         fontWeight: '700',
//         color: '#2D3436',
//         marginBottom: 8,
//     },
//     cardText: {
//         fontSize: 16,
//         color: '#636e72',
//         lineHeight: 24,
//     },
// });

// export default VexRoboticsDetail;

/*// components/VexRoboticsDetail.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {VexRoboticsById} from '../utils/api';

const VexRoboticsDetail = ({ route }) => {
    const { id } = route.params;
    const [platform, setPlatform] = useState(null);

    useEffect(() => {
        const loadPlatform = async () => {
            const data = await VexRoboticsById(id);
            setPlatform(data);
        };

        loadPlatform();
    }, [id]);

    if (!platform) return <Text>Loading...</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{platform.platformName}</Text>
            <Text>Target Audience: {platform.targetAudience}</Text>
            <Text>Focus: {platform.focus}</Text>
            <Text>Components: {platform.components}</Text>
            <Text>Programming: {platform.programming}</Text>
            <Text>Curriculum: {platform.curriculum}</Text>
            <Text>Use Case: {platform.useCase}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
    },
});

export default VexRoboticsDetail;*/
