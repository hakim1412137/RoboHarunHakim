import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';
import Menu from '../components/Menu';

const WebsiteDevelopmentPage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Header />
            <Menu navigation={navigation} />

            <ScrollView
                contentContainerStyle={styles.content} 
                showsVerticalScrollIndicator={false}
            >
                {/* Title Section */}
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

                {/* Services Section */}
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

                {/* Technology Stack Section */}
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
            </ScrollView>
        </View>
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

export default WebsiteDevelopmentPage;


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
