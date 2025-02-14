import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';
import Menu from '../components/Menu';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const WebsiteDevelopmentPage = ({ navigation }) => {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Header />
            <Menu navigation={navigation} />

            <View style={styles.content}>
                {/* Title Section */}
                <LinearGradient
                    colors={['#00C897', '#018D6A']}
                    style={styles.headerGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <Text style={styles.title}>Website Development</Text>
                    <Text style={styles.subtitle}>
                        Crafting Digital Excellence Through Innovative Web Solutions
                    </Text>
                </LinearGradient>

                {/* Services Section */}
                <View style={[styles.card, styles.cardElevated]}>
                    <View style={styles.cardHeader}>
                        <MaterialIcons name="web-asset" size={24} color="#018D6A" />
                        <Text style={styles.cardTitle}>Our Services</Text>
                    </View>
                    {[
                        "Full-Stack Web Development using Java Spring Boot",
                        "Responsive Frontend Development with React Native",
                        "Database Management with PostgreSQL",
                        "RESTful API Development",
                        "E-Commerce Solutions and Integration",
                        "UI/UX Design for Enhanced User Experience"
                    ].map((item, index) => (
                        <View key={index} style={styles.listItem}>
                            <MaterialIcons name="check-circle" size={18} color="#00C897" />
                            <Text style={styles.listText}>{item}</Text>
                        </View>
                    ))}
                </View>

                {/* Technology Stack Section */}
                <View style={[styles.card, styles.cardElevated]}>
                    <View style={styles.cardHeader}>
                        <MaterialIcons name="code" size={24} color="#018D6A" />
                        <Text style={styles.cardTitle}>Technology Stack</Text>
                    </View>
                    {[
                        "Backend: Java, Spring Boot, Node.js",
                        "Frontend: React.js, React Native, HTML5, CSS3",
                        "Database: PostgreSQL, MySQL",
                        "DevOps: Docker, Kubernetes, CI/CD",
                        "Version Control: Git, GitHub",
                        "Cloud Services: AWS, Azure, Google Cloud"
                    ].map((item, index) => (
                        <View key={index} style={styles.listItem}>
                            <MaterialIcons name="data-usage" size={18} color="#00C897" />
                            <Text style={styles.listText}>{item}</Text>
                        </View>
                    ))}
                </View>

                {/* Process Section */}
                <View style={[styles.processCard, styles.cardElevated]}>
                    <Text style={styles.processTitle}>Our Development Process</Text>
                    <View style={styles.processSteps}>
                        {[
                            {icon: 'search', title: 'Discovery', color: '#FF6B6B'},
                            {icon: 'design-services', title: 'Design', color: '#4ECDC4'},
                            {icon: 'code', title: 'Development', color: '#45B7D1'},
                            {icon: 'rocket-launch', title: 'Launch', color: '#00C897'},
                        ].map((step, index) => (
                            <View key={index} style={styles.processStep}>
                                <View style={[styles.processIcon, {backgroundColor: step.color}]}>
                                    <MaterialIcons name={step.icon} size={24} color="white" />
                                </View>
                                <Text style={styles.processStepTitle}>{step.title}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.quoteContainer}>
                    <Text style={styles.quoteText}>
                        "We don't just build websites, we build digital experiences that drive results."
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '40rem',
        backgroundColor: '#F9FBFE',
    },
    content: {
        padding: 20,
        paddingBottom: 40,
    },
    headerGradient: {
        paddingVertical: 35,
        paddingHorizontal: 25,
        borderRadius: 20,
        marginBottom: 25,
        shadowColor: '#018D6A',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 15,
        elevation: 8,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#FFF',
        textAlign: 'center',
        textShadowColor: 'rgba(0,0,0,0.1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 18,
        color: '#F0FDF9',
        textAlign: 'center',
        lineHeight: 24,
        fontWeight: '500',
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 18,
        padding: 25,
        marginBottom: 20,
    },
    cardElevated: {
        shadowColor: '#4A5568',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#F0F4F8',
        paddingBottom: 15,
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1A365D',
        marginLeft: 12,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginVertical: 8,
    },
    listText: {
        fontSize: 16,
        color: '#2D3748',
        marginLeft: 12,
        lineHeight: 24,
        flexShrink: 1,
    },
    processCard: {
        backgroundColor: '#FFF',
        borderRadius: 18,
        padding: 25,
        marginBottom: 20,
        alignItems: 'center',
    },
    processTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1A365D',
        marginBottom: 25,
    },
    processSteps: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    processStep: {
        alignItems: 'center',
        width: width / 4 - 30,
    },
    processIcon: {
        width: 50,
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    processStepTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4A5568',
        textAlign: 'center',
    },
    quoteContainer: {
        marginTop: 25,
        padding: 20,
        backgroundColor: '#E3F9F5',
        borderRadius: 15,
        borderLeftWidth: 5,
        borderLeftColor: '#00C897',
    },
    quoteText: {
        fontSize: 18,
        fontStyle: 'italic',
        color: '#2D3748',
        lineHeight: 28,
        fontWeight: '500',
    },
});

export default WebsiteDevelopmentPage;

/*import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';
import Menu from '../components/Menu';

const WebsiteDevelopmentPage = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}  showsVerticalScrollIndicator={false}>
            <Header />
            <Menu navigation={navigation} />

            <View
                contentContainerStyle={styles.content} 
                showsVerticalScrollIndicator={false}
            >
                {/!* Title Section *!/}
                <LinearGradient 
                    colors={['#00A86B', '#00C978']}
                    style={styles.headerGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <Text style={styles.title}>Website Development</Text>
                    <Text style={styles.subtitle}>
                        Build high-quality, scalable, and beautiful websites.
                    </Text>
                </LinearGradient>

                {/!* Services Section *!/}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Our Services Include:</Text>
                    {[
                        "Full-Stack Web Development using Java Spring Boot",
                        "Responsive Frontend Development with React Native",
                        "Database Management with PostgreSQL",
                        "RESTful API Development",
                        "E-Commerce Solutions and Integration",
                        "UI/UX Design for Enhanced User Experience"
                    ].map((item, index) => (
                        <Text key={index} style={styles.listItem}>✅ {item}</Text>
                    ))}
                </View>

                {/!* Technology Stack Section *!/}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Technology Stack:</Text>
                    {[
                        "Backend: Java, Spring Boot, Node.js",
                        "Frontend: React.js, React Native, HTML, CSS",
                        "Database: PostgreSQL, MySQL",
                        "DevOps: Docker, Kubernetes, CI/CD",
                        "Version Control: Git, GitHub",
                        "Cloud Services: AWS, Azure, Google Cloud"
                    ].map((item, index) => (
                        <Text key={index} style={styles.listItem}>💻 {item}</Text>
                    ))}
                </View>

                <Text style={styles.footerText}>
                    Our dedicated team is here to help you achieve your goals by creating robust, scalable,
                    and efficient applications.
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        height: '25rem',
        backgroundColor: '#F4F6F9',
    },
    content: {
        height: '40rem',
        padding: 20,
        paddingBottom: 100,
    },
    headerGradient: {
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderRadius: 15,
        marginBottom: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 6,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
        marginTop: 5,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 20,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 4,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    listItem: {
        fontSize: 16,
        color: '#555',
        marginVertical: 4,
    },
    footerText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
        marginTop: 20,
        fontWeight: '500',
    },
});

export default WebsiteDevelopmentPage;*/


// import React from 'react';
// import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import Menu from '../components/Menu';

// const WebsiteDevelopmentPage = ({ navigation }) => {
//     return (
//         <View style={styles.container}>
//             <Header />
//             <Menu navigation={navigation} />
//             <ScrollView
//                 contentContainerStyle={styles.content}
//                 style={styles.scrollView}
//             >
//                 <Text style={styles.title}>Website Development</Text>
//                 <Text style={styles.bodyText}>
//                     Our website development service focuses on building responsive and user-friendly websites
//                     tailored to meet your needs. We ensure that your online presence is impactful.
//                 </Text>

//                 <Text style={styles.subTitle}>Our Services Include:</Text>
//                 <Text style={styles.listItem}>
//                     - Full-Stack Web Development using Java Spring Boot
//                 </Text>
//                 <Text style={styles.listItem}>
//                     - Responsive Frontend Development with React Native
//                 </Text>
//                 <Text style={styles.listItem}>
//                     - Database Management with PostgreSQL
//                 </Text>
//                 <Text style={styles.listItem}>
//                     - RESTful API Development
//                 </Text>
//                 <Text style={styles.listItem}>
//                     - E-Commerce Solutions and Integration
//                 </Text>
//                 <Text style={styles.listItem}>
//                     - UI/UX Design for Enhanced User Experience
//                 </Text>

//                 <Text style={styles.subTitle}>Technology Stack:</Text>
//                 <Text style={styles.listItem}>
//                     1. Backend: Java, Spring Boot, Node.js
//                 </Text>
//                 <Text style={styles.listItem}>
//                     2. Frontend: React.js, React Native, HTML, CSS
//                 </Text>
//                 <Text style={styles.listItem}>
//                     3. Database: PostgreSQL, MySQL
//                 </Text>
//                 <Text style={styles.listItem}>
//                     4. DevOps: Docker, Kubernetes, CI/CD
//                 </Text>
//                 <Text style={styles.listItem}>
//                     5. Version Control: Git, GitHub
//                 </Text>
//                 <Text style={styles.listItem}>
//                     6. Cloud Services: AWS, Azure, Google Cloud
//                 </Text>

//                 <Text style={styles.bodyText}>
//                     Our dedicated team is here to help you achieve your goals by creating robust, scalable,
//                     and efficient applications.
//                 </Text>
//             </ScrollView>
//             <Footer />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#FBF1E6',
//     },
//     scrollView: {
//         flex: 1, // Crucial for proper space allocation
//     },
//     content: {
//         padding: 20,
//         paddingBottom: 80, // Matches footer height
//     },
//     title: {
//         fontSize: 28,
//         textAlign: 'center',
//         marginVertical: 20,
//         fontWeight: 'bold',
//     },
//     subTitle: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginTop: 20,
//         textAlign: 'center',
//     },
//     bodyText: {
//         fontSize: 16,
//         textAlign: 'center',
//         marginVertical: 10,
//         paddingHorizontal: 15,
//     },
//     listItem: {
//         fontSize: 16,
//         textAlign: 'left',
//         marginVertical: 5,
//         paddingLeft: 20,
//     },
// });

// export default WebsiteDevelopmentPage;

/*// WebsiteDevelopmentPage.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MenuForServices from '../components/MenuForServices'; // Adjust path
import Menu from '../components/Menu';

const WebsiteDevelopmentPage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Header></Header>
            <Menu navigation={navigation}></Menu>
            <View style={styles.content}>
                <Text style={styles.title}>Website Development</Text>
                <Text style={styles.bodyText}>
                    Our website development service focuses on building responsive and user-friendly websites
                    tailored to meet your needs. We ensure that your online presence is impactful.
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBF1E6'
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        margin: 20,
    },
    bodyText: {
        fontSize: 16,
        textAlign: 'center',
        padding: 20,
    },
});

export default WebsiteDevelopmentPage;*/
