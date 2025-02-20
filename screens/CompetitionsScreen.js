import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Alert,
    TextInput,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity, Dimensions
} from 'react-native';
import {
    createCompetition,
    getAllCompetitions,
    updateCompetition,
    deleteCompetition,
    getCompetitionById
} from "../utils/api";
import Header from '../components/Header';
import Menu from '../components/Menu';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import {ImageBackground} from "expo-image";

const CompetitionsScreen = ({ navigation }) => {
    const [competitions, setCompetitions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredCompetitions, setFilteredCompetitions] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        dueDate: ''
    });
    const [editingId, setEditingId] = useState(null);
    const [searchId, setSearchId] = useState('');
    // Update the search handler
    const handleSearch = (query) => {
        setSearchQuery(query);
        const formattedQuery = query.toLowerCase();

        const filtered = competitions.filter(competition => {
            return competition.name.toLowerCase().includes(formattedQuery) ||
                competition.description.toLowerCase().includes(formattedQuery);
        });

        setFilteredCompetitions(filtered);
    };

    useEffect(() => {
        fetchCompetitions();
    }, []);

    const fetchCompetitions = async () => {
        setLoading(true);
        try {
            const { data } = await getAllCompetitions();
            setCompetitions(data);
            setFilteredCompetitions(data);

        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Failed to fetch competitions");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmission = async () => {
        if (!formData.name || !formData.description) {
            Alert.alert("Error", "Please fill in required fields");
            return;
        }

        const competitionData = {
            ...formData,
            price: formData.price ? parseFloat(formData.price) : null,
        };

        try {
            if (editingId) {
                await updateCompetition(editingId, competitionData);
                Alert.alert('Success', 'Competition updated successfully!');
            } else {
                await createCompetition(competitionData);
                Alert.alert('Success', 'Competition created successfully!');
            }
            clearForm();
            await fetchCompetitions();
        } catch (error) {
            console.error(error);
            Alert.alert('Error', error.response?.data?.message || 'Operation failed');
        }
    };

    const handleDelete = async (competitionId) => {
        try {
            await deleteCompetition(competitionId);
            await fetchCompetitions();
            Alert.alert('Success', 'Competition deleted successfully!');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Error deleting competition!');
        }
    };

    const handleEdit = (competition) => {
        setEditingId(competition.id);
        setFormData({
            name: competition.name,
            description: competition.description,
            price: competition.price?.toString() || '',
            dueDate: competition.dueDate || ''
        });
    };

    const clearForm = () => {
        setEditingId(null);
        setFormData({
            name: '',
            description: '',
            price: '',
            dueDate: ''
        });
    };

    return (

        <ScrollView style={styles.container}>
            <Header />
            <Menu navigation={navigation} />
            <ImageBackground
                source={require('../assets/images/111849.jpg')} // Replace with your image path
                style={styles.background} // Apply full screen styles
                resizeMode="cover" // Cover the entire background
            >

            <ScrollView contentContainerStyle={styles.content}>

                <View style={styles.searchContainer}>
                    <View style={styles.searchInputContainer}>
                        <Ionicons
                            name="search"
                            size={22}
                            color="#6200ee"
                            style={styles.searchIcon}
                        />
                        <TextInput
                            placeholder="Search competitions..."
                            placeholderTextColor="#888"
                            value={searchQuery}
                            onChangeText={handleSearch}
                            style={styles.searchInput}
                            clearButtonMode="while-editing"
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity
                                onPress={() => {
                                    setSearchQuery('');
                                    setFilteredCompetitions(competitions);
                                }}
                                style={styles.clearButton}
                            >
                                <Ionicons name="close-circle" size={20} color="#888" />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
                <View style={styles.formCard}>
                    <Text style={styles.formTitle}>
                        {editingId ? 'Edit Competition' : 'Create New Competition'}
                    </Text>

                    <View style={styles.inputGroup}>
                        <TextInput
                            style={styles.input}
                            placeholder="Competition Name"
                            value={formData.name}
                            onChangeText={(text) => setFormData({...formData, name: text})}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <TextInput
                            style={styles.input}
                            placeholder="Description"
                            value={formData.description}
                            onChangeText={(text) => setFormData({...formData, description: text})}
                            multiline
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <TextInput
                            style={styles.input}
                            placeholder="Price"
                            value={formData.price}
                            onChangeText={(text) => setFormData({...formData, price: text})}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <TextInput
                            style={styles.input}
                            placeholder="Due Date (YYYY-MM-DD)"
                            value={formData.dueDate}
                            onChangeText={(text) => setFormData({...formData, dueDate: text})}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleSubmission}
                    >
                        <Text style={styles.buttonText}>
                            {editingId ? 'Update Competition' : 'Create Competition'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Competitions List */}
                {loading ? (
                    <ActivityIndicator size="large" color="#6200ee" style={styles.loader} />
                ) : (
                    <FlatList
                        data={filteredCompetitions}
                        renderItem={({ item }) => (
                            <View style={styles.competitionCard}>
                                <View style={styles.cardHeader}>
                                    <Text style={styles.competitionTitle}>{item.name}</Text>
                                    <View style={styles.actions}>
                                        <TouchableOpacity
                                            onPress={() => handleEdit(item)}
                                            style={styles.iconButton}
                                        >
                                            <FontAwesome name="edit" size={20} color="#6200ee" />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => handleDelete(item.id)}
                                            style={styles.iconButton}
                                        >
                                            <MaterialIcons name="delete" size={24} color="#ff4444" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <Text style={styles.competitionDescription}>{item.description}</Text>
                                <View style={styles.cardFooter}>
                                    <Text style={styles.dueDate}>
                                        Due: {item.dueDate || 'N/A'}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.detailsButton}
                                        onPress={() => navigation.navigate("competitionDetails", {
                                            competitionId: item.id
                                        })}
                                    >
                                        <Text style={styles.detailsButtonText}>View Details</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        ListEmptyComponent={
                            <View style={styles.emptyState}>
                                <Ionicons name="trophy-outline" size={60} color="#ccc" />
                                <Text style={styles.emptyStateText}>No competitions found</Text>
                            </View>
                        }
                    />
                )}
            </ScrollView>
            </ImageBackground>
        </ScrollView>
    );
};
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
         // flex: 0.5,
      height: '40rem',
       // width: width * 0.5, // Half of screen height
        backgroundColor: '#444444',
    },
    content: {
      height: '40rem',
       width: width * 0.5, // Half of screen height

    },
    formCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        elevation: 3,
    },
    formTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 16,
        color: '#333',
    },
    inputGroup: {
        marginBottom: 12,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        paddingHorizontal: 12,
    },
    input: {
        height: 48,
        color: '#333',
        paddingVertical: 12,
    },
    submitButton: {
        backgroundColor: '#6200ee',
        borderRadius: 8,
        padding: 14,
        marginTop: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
    },
    competitionCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    competitionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        flex: 1,
    },
    actions: {
        flexDirection: 'row',
        gap: 12,
    },
    iconButton: {
        padding: 8,
    },
    competitionDescription: {
        color: '#666',
        marginBottom: 12,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dueDate: {
        color: '#666',
        fontSize: 14,
    },
    detailsButton: {
        backgroundColor: '#6200ee',
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    detailsButtonText: {
        color: 'white',
        fontWeight: '500',
    },
    loader: {
        marginVertical: 40,
    },searchContainer: {
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        paddingVertical: 5,
    },
    clearButton: {
        padding: 5,
        marginLeft: 10,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
    },
    emptyStateText: {
        color: '#888',
        fontSize: 16,
        marginTop: 10,
    },
});

export default CompetitionsScreen;
