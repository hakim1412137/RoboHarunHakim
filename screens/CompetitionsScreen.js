import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Button,
    FlatList,
    StyleSheet,
    Alert,
    TextInput,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import CompetitionCard from '../components/CompetitionCard';
import {
    createCompetition,
    getAllCompetitions,
    updateCompetition,
    deleteCompetition,
    registerForCompetition,getCompetitionById
} from "../utils/api";
import SearchCompetition from "../components/SearchCompetition";
import SearchComponent from "../components/CompetitionCard"; // Ensure these API methods exist
import Header from '../components/Header';
import Menu from '../components/Menu';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import {colors} from "react-native-elements";


// import { colors } from '../theme/colors';

const CompetitionsScreen = ({ navigation }) => {
    const [competitions, setCompetitions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [searchId, setSearchId] = useState(''); // State for search input

    useEffect(() => {
        fetchCompetitions();
    }, []);

    const fetchCompetitions = async () => {
        setLoading(true);
        try {
            const response = await getAllCompetitions();
            setCompetitions(response.data);
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Failed to fetch competitions");
        } finally {
            setLoading(false);
        }
    };
    const fetchCompetitionById = async (searchId) => {
        console.log(searchId); // Log the response to verify it
        if (!searchId) {
            Alert.alert("Error", "Please enter a competition ID");
            return;
        }
        const competitionId = parseInt(searchId); // Convert to an integer if necessary
        if (isNaN(competitionId)) {
            Alert.alert("Error", "Please enter a valid numerical ID");
            return;
        }

        setLoading(true);
        try {
            const response = await getCompetitionById(searchId);
            if (response) {
                console.log(response); // Log the response to verify it
                setCompetitions([response.data]); // Set the single competition into the competitions array
            } else {
                Alert.alert("Error", "Competition not found");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Failed to fetch competition");
        } finally {
            setLoading(false);
        }
    };
    const handleSearchComplete = (competition) => {
        setCompetitions([competition]); // Replace the competition list with the found competition
    };

    const onViewDetails = (competitionId) => {
        navigation.navigate("competitionDetails", { competitionId })
    }

    const handleSubmission = async () => {
        const competitionData = {
            name,
            description,
            price: price ? parseFloat(price) : null,
            dueDate,
        };

        console.log(competitionData, editingId)

        try {
            if (editingId) {
                await updateCompetition(editingId, competitionData);
                Alert.alert('Success', 'Competition updated successfully!');
            } else {
                await createCompetition(competitionData);
                Alert.alert('Success', 'Competition created successfully!');
            }
            clearForm();
            fetchCompetitions();
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Error saving competition!');
        }
    };

    const handleDelete = async (competitionId) => {
        try {
            await deleteCompetition(competitionId);
            Alert.alert('Success', 'Competition deleted successfully!');
            fetchCompetitions();
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Error deleting competition!');
        }
    };

    const handleEdit = (competition) => {
        setEditingId(competition.id);
        setName(competition.name);
        setDescription(competition.description);
        setPrice(competition.price ? competition.price.toString() : '');
        setDueDate(competition.dueDate); // Ensure use proper field
    };

    const clearForm = () => {
        setEditingId(null);
        setName('');
        setDescription('');
        setPrice('');
        setDueDate('');
    };

    return (
        <View style={styles.container}>
            <Header />
            <Menu navigation={navigation} />

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.headerContainer}>
                    <Text style={styles.screenTitle}>Competitions Management</Text>
                    <TouchableOpacity
                        style={styles.searchButton}
                        onPress={() => fetchCompetitionById(searchId)}
                    >
                        <Ionicons name="search" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Search Input */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color={colors.primary} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search by Competition ID"
                        placeholderTextColor={colors.gray}
                        value={searchId}
                        onChangeText={setSearchId}
                    />
                </View>

                {/* Competition Form */}
                <View style={styles.formCard}>
                    <Text style={styles.formTitle}>
                        {editingId ? 'Edit Competition' : 'Create New Competition'}
                    </Text>

                    <View style={styles.inputGroup}>
                        <Ionicons name="trophy" size={20} color={colors.primary} style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Competition Name"
                            placeholderTextColor={colors.gray}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    {/* Repeat similar input groups for other fields */}

                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleSubmission}
                    >
                        <Text style={styles.buttonText}>
                            {editingId ? 'Update Competition' : 'Create Competition'}
                        </Text>
                        <MaterialIcons
                            name={editingId ? "update" : "add-circle"}
                            size={24}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>

                {/* Competitions List */}
                {loading ? (
                    <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
                ) : (
                    <FlatList
                        data={competitions}
                        renderItem={({ item }) => (
                            <View style={styles.competitionCard}>
                                <View style={styles.cardHeader}>
                                    <Ionicons name="trophy" size={24} color={colors.primary} />
                                    <Text style={styles.competitionTitle}>{item.name}</Text>
                                    <View style={styles.actions}>
                                        <TouchableOpacity onPress={() => handleEdit(item)}>
                                            <FontAwesome name="edit" size={20} color={colors.warning} style={styles.icon} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                            <MaterialIcons name="delete" size={24} color={colors.danger} style={styles.icon} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <Text style={styles.competitionDescription}>{item.description}</Text>
                                <View style={styles.cardFooter}>
                                    <Text style={styles.dueDate}>
                                        <Ionicons name="calendar" size={16} color={colors.gray} />
                                        {item.dueDate}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.detailsButton}
                                        onPress={() => onViewDetails(item.id)}
                                    >
                                        <Text style={styles.detailsButtonText}>View Details</Text>
                                        <MaterialIcons name="arrow-forward" size={20} color="white" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
                )}
            </ScrollView>
        </View>
    );
};


    colors.background = '#FBF1E6';     // Main background color for the app
colors.lightBackground =  '#FFFFFF';   // Light background color for sections, cards, etc.
colors.dark = '#333333';  // Dark color for text or backgrounds
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        padding: 16,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 8,
        marginBottom: 20,
        elevation: 2,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        color: colors.dark,
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
        color: colors.dark,
        marginBottom: 16,
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        backgroundColor: colors.lightBackground,
        borderRadius: 8,
        paddingHorizontal: 12,
    },
    input: {
        flex: 1,
        height: 48,
        color: colors.dark,
        paddingLeft: 8,
    },
    submitButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderRadius: 8,
        padding: 14,
        marginTop: 12,
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
        marginRight: 8,
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
        alignItems: 'center',
        marginBottom: 8,
    },
    competitionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 8,
        flex: 1,
    },
    actions: {
        flexDirection: 'row',
        gap: 12,
    },
    competitionDescription: {
        color: colors.gray,
        marginBottom: 12,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dueDate: {
        color: colors.gray,
        fontSize: 14,
    },
    detailsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.secondary,
        borderRadius: 6,
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    detailsButtonText: {
        color: 'white',
        marginRight: 6,
    },
    loader: {
        marginVertical: 40,
    },
    icon: {
        marginHorizontal: 4,
    },
});

export default CompetitionsScreen;
/*
import React, { useEffect, useState } from 'react';
import {View, Text, Button, FlatList, StyleSheet, Alert, TextInput, ActivityIndicator, ScrollView} from 'react-native';
import CompetitionCard from '../components/CompetitionCard';
import {
    createCompetition,
    getAllCompetitions,
    updateCompetition,
    deleteCompetition,
    registerForCompetition,getCompetitionById
} from "../utils/api";
import SearchCompetition from "../components/SearchCompetition";
import SearchComponent from "../components/CompetitionCard"; // Ensure these API methods exist
import Header from '../components/Header';
import Menu from '../components/Menu';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AsyncStoragec from "@react-native-async-storage/async-storage/src";

const CompetitionsScreen = ({ navigation }) => {
    const [competitions, setCompetitions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [searchId, setSearchId] = useState(''); // State for search input

    useEffect(() => {
        fetchCompetitions();
    }, []);

    const fetchCompetitions = async () => {
        setLoading(true);
        try {
            const response = await getAllCompetitions();
            setCompetitions(response.data);
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Failed to fetch competitions");
        } finally {
            setLoading(false);
        }
    };
    const fetchCompetitionById = async (searchId) => {
        console.log(searchId); // Log the response to verify it
      if (!searchId) {
            Alert.alert("Error", "Please enter a competition ID");
            return;
        }
        const competitionId = parseInt(searchId); // Convert to an integer if necessary
        if (isNaN(competitionId)) {
            Alert.alert("Error", "Please enter a valid numerical ID");
            return;
        }

        setLoading(true);
        try {
            const response = await getCompetitionById(searchId);
            if (response) {
                console.log(response); // Log the response to verify it
                setCompetitions([response.data]); // Set the single competition into the competitions array
            } else {
                Alert.alert("Error", "Competition not found");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Failed to fetch competition");
        } finally {
            setLoading(false);
        }
    };
    const handleSearchComplete = (competition) => {
        setCompetitions([competition]); // Replace the competition list with the found competition
    };

    const onViewDetails = (competitionId) => {
        navigation.navigate("competitionDetails", { competitionId })
    }

    const handleSubmission = async () => {
        const competitionData = {
            name,
            description,
            price: price ? parseFloat(price) : null,
            dueDate,
        };

        console.log(competitionData, editingId)

        try {
            if (editingId) {
                await updateCompetition(editingId, competitionData);
                Alert.alert('Success', 'Competition updated successfully!');
            } else {
                await createCompetition(competitionData);
                Alert.alert('Success', 'Competition created successfully!');
            }
            clearForm();
            fetchCompetitions();
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Error saving competition!');
        }
    };

    const handleDelete = async (competitionId) => {
        try {
            await deleteCompetition(competitionId);
            Alert.alert('Success', 'Competition deleted successfully!');
            fetchCompetitions();
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Error deleting competition!');
        }
    };

    const handleEdit = (competition) => {
        setEditingId(competition.id);
        setName(competition.name);
        setDescription(competition.description);
        setPrice(competition.price ? competition.price.toString() : '');
        setDueDate(competition.dueDate); // Ensure use proper field
    };

    const clearForm = () => {
        setEditingId(null);
        setName('');
        setDescription('');
        setPrice('');
        setDueDate('');
    };

    return (
        <ScrollView style={styles.container}>
            <Header></Header>
            <Menu navigation={navigation}></Menu>

            <View style={{ padding: 10, paddingHorizontal: 200 }}>
                <Text style={styles.title}>Competitions</Text>
                {/!* Search input for competition ID *!/}
                <TextInput
                    style={styles.input}
                    placeholder="Search Competition by ID"
                    value={searchId}
                    onChangeText={setSearchId}
                />
                <Button title="Search" onPress={() => fetchCompetitionById(searchId)} />
    {/!*
                <SearchComponent onSearch={fetchCompetitionById} />
    *!/}

                {/!* Search input for competition ID *!/}
                {/!*<SearchCompetition onSearchComplete={handleSearchComplete} />*!/}

                {/!* Input fields for new competition data *!/}
                <TextInput
                    style={styles.input}
                    placeholder="Competition Name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Description"
                    value={description}
                    onChangeText={setDescription}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Price (Leave empty for 'Call for price')"
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="numeric" // Numerical input for price
                />
                <TextInput
                    style={styles.input}
                    placeholder="Due Date (YYYY-MM-DD)"
                    value={dueDate}
                    onChangeText={setDueDate}
                />

                <Button title={editingId ? "Update Competition" : "Create Competition"} onPress={handleSubmission} />

                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <FlatList
                        data={competitions}
                        renderItem={({ item }) => (
                            <CompetitionCard
                                competition={item}
                                onEdit={() => handleEdit(item)}
                                onDelete={() => handleDelete(item.id)}
                                onViewDetails={() => onViewDetails(item.id)}
                                // onRegister={() => handleRegistration(item.id)} // Register for the competition
                                // onRegister={() => navigation.navigate('CompetitionDetails', { competitionId: item.id })} // Replace or implement a registration function
                            />
                        )}
                        keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()} // Fallback if id is undefined

                        // keyExtractor={(item) => item.id.toString()}
                    />
                )}

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '40rem',
        backgroundColor: '#FBF1E6',
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        borderRadius: 5,
    },
});

export default CompetitionsScreen;*/
/*import React, { useEffect, useState } from 'react';
import {View, Text, Button, FlatList, StyleSheet, Alert, TextInput, ActivityIndicator} from 'react-native';
import CompetitionCard from '../components/CompetitionCard';
import {
    registerForCompetition,
    createCompetition,
    getAllCompetitions,
    getCompetitionById,
    updateCompetition, deleteCompetition
} from "../utils/api"; // Service to manage competition data
const CompetitionsScreen = () => {
    const [competitions, setCompetitions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [website, setWebsite] = useState('');
    const [editingId, setEditingId] = useState(null); // Track which competition is being edited

    useEffect(() => {
        fetchCompetitions();
    }, []);

    const fetchCompetitions = async () => {
        setLoading(true);
        try {
            const response = await getAllCompetitions();
            setCompetitions(response.data); // Assuming response.data contains the competitions array
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Failed to fetch competitions");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        const competitionData = {
            name,
            description,
            price: price ? parseFloat(price) : null,
            dueDate,
            website,
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
            fetchCompetitions(); // Refresh the list after creation or update
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Error saving competition!');
        }
    };

    const handleDelete = async (competitionId) => {
        try {
            await deleteCompetition(competitionId);
            Alert.alert('Success', 'Competition deleted successfully!');
            fetchCompetitions(); // Refresh the list
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Error deleting competition!');
        }
    };

    const handleEdit = (competition) => {
        setEditingId(competition.id);
        setName(competition.name);
        setDescription(competition.description);
        setPrice(competition.price ? competition.price.toString() : '');
        setDueDate(competition.dueDate);
        setWebsite(competition.website);
    };

    const clearForm = () => {
        setEditingId(null);
        setName('');
        setDescription('');
        setPrice('');
        setDueDate('');
        setWebsite('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Competitions</Text>

            {/!* Input fields for new competition data *!/}
            <TextInput
                style={styles.input}
                placeholder="Competition Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Price (Leave empty for 'Call for price')"
                value={price}
                onChangeText={setPrice}
            />
            <TextInput
                style={styles.input}
                placeholder="Due Date (YYYY-MM-DD)"
                value={dueDate}
                onChangeText={setDueDate}
            />
            <TextInput
                style={styles.input}
                placeholder="Website URL"
                value={website}
                onChangeText={setWebsite}
            />

            <Button title={editingId ? "Update Competition" : "Create Competition"} onPress={handleSubmit} />

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={competitions}
                    renderItem={({ item }) => (
                        <CompetitionCard
                            competition={item}
                            onEdit={() => handleEdit(item)} // Call edit function
                            onDelete={() => handleDelete(item.id)} // Call delete function
                            onRegister={() => handleRegister(item.id)} // Register function
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
        </View>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
padding: 16,
},
title: {
fontSize: 24,
fontWeight: 'bold',
marginBottom: 20,
},
input: {
height: 40,
borderColor: '#ddd',
borderWidth: 1,
marginBottom: 12,
paddingHorizontal: 8,
},
});

export default CompetitionsScreen;*/
/*

import React, { useEffect, useState } from 'react';
import {View, Text, Button, FlatList, StyleSheet, Alert, TextInput, ActivityIndicator} from 'react-native';
import api from '../utils/api'; // Your API utility
import CompetitionCard from '../components/CompetitionCard';
import { registerForCompetition, createCompetition, getAllCompetitions, getCompetitionById } from "../utils/api"; // Service to manage competition data

const CompetitionsScreen = () => {
    const [competitions, setCompetitions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [website, setWebsite] = useState('');
    const [isCallForPrice, setIsCallForPrice] = useState(false); // For handling 'Call for price' option

    useEffect(() => {
        const fetchCompetitions = async () => {
            try {
                const response = await getAllCompetitions();
                setCompetitions(response);
            } catch (error) {
                console.error(error);
                Alert.alert("Error", "Failed to fetch competitions");
            } finally {
                setLoading(false);
            }
        };

        fetchCompetitions();
    }, []);



    const handleRegister = async (competitionId, userId) => {
        try {
            await registerForCompetition(competitionId, userId);
            Alert.alert('Success', 'Successfully registered for the competition!');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Registration failed!');
        }
    };

    const handleSubmit = async () => {
        const competitionData = { name, description, price: isCallForPrice ? null : parseFloat(price), dueDate, website };

        try {
            await registerForCompetition('/competitions', competitionData);
            Alert.alert('Success', 'Competition created successfully!');
            // Clear the form after submission
            setName(''); setDescription(''); setPrice(''); setDueDate(''); setWebsite(''); setIsCallForPrice(false);

            // Optionally, fetch competitions again to display the latest data
            const response = await getAllCompetitions();
            setCompetitions(response);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Error creating competition!');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Competitions</Text>
            <TextInput
                style={styles.input}
                placeholder="Competition Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Price (Leave empty for 'Call for price')"
                value={price}
                onChangeText={setPrice}
            />
            <Button
                title={isCallForPrice ? "Set Price" : "Call for Price"}
                onPress={() => setIsCallForPrice(!isCallForPrice)}
            />
            <TextInput
                style={styles.input}
                placeholder="Due Date (YYYY-MM-DD)"
                value={dueDate}
                onChangeText={setDueDate}
            />
            <TextInput
                style={styles.input}
                placeholder="Website URL"
                value={website}
                onChangeText={setWebsite}
            />
            <Button title="Submit Competition" onPress={handleSubmit} />

            {loading ? (
                <Text>Loading competitions...</Text>
            ) : (
                <FlatList
                    data={competitions}
                    renderItem={({ item }) => (
                        <CompetitionCard
                            competition={item}
                            onRegister={() => handleRegister(item.id, user.id)}
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});

export default CompetitionsScreen;
*/


/*import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Alert, TextInput, StyleSheet, Button } from 'react-native';
import api from '../utils/api'; // Your API utility
import CompetitionCard from '../components/CompetitionCard';
import { registerForCompetition, createCompetition, getAllCompetitions, getCompetitionById } from "../utils/api"; // Service to manage competition data

const CompetitionsScreen = () => {
    const [competitions, setCompetitions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [website, setWebsite] = useState('');
    const [isCallForPrice, setIsCallForPrice] = useState(false);

    // Fetch all competitions on mount
    useEffect(() => {
        const fetchCompetitions = async () => {
            setLoading(true);
            try {
                const response = await getAllCompetitions();
                setCompetitions(response.data); // Assuming response.data contains the competitions array
            } catch (error) {
                console.error(error);
                Alert.alert("Error", "Failed to fetch competitions");
            } finally {
                setLoading(false);
            }
        };

        fetchCompetitions();
    }, []);

    // Create a new competition
    const handleSubmit = async () => {
        const competitionData = {
            name,
            description,
            price: isCallForPrice ? null : parseFloat(price),
            dueDate,
            website,
        };

        try {
            await createCompetition(competitionData);
            Alert.alert('Success', 'Competition created successfully!');
            // Clear the form after submission
            setName('');
            setDescription('');
            setPrice('');
            setDueDate('');
            setWebsite('');
            setIsCallForPrice(false);

            // Refresh the competition list
            const response = await getAllCompetitions();
            setCompetitions(response.data);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Error creating competition!');
        }
    };

    // Delete a competition
    const handleDelete = async (competitionId) => {
        try {
            await deleteCompetition(competitionId);
            Alert.alert('Success', 'Competition deleted successfully!');

            // Refresh the competition list
            const response = await getAllCompetitions();
            setCompetitions(response.data);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Error deleting competition!');
        }
    };

    // Register for a competition
    const handleRegister = async (competitionId) => {
        const userId = 1; // Replace with actual user ID logic
        try {
            await registerForCompetition(competitionId, userId);
            Alert.alert('Success', 'Successfully registered for the competition!');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Registration failed!');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Competitions</Text>

            {*//* Input fields for new competition data *//*}
            <TextInput
                style={styles.input}
                placeholder="Competition Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Price (Leave empty for 'Call for price')"
                value={price}
                onChangeText={setPrice}
            />
            <Button
                title={isCallForPrice ? "Set Price" : "Call for Price"}
                onPress={() => setIsCallForPrice(!isCallForPrice)}
            />
            <TextInput
                style={styles.input}
                placeholder="Due Date (YYYY-MM-DD)"
                value={dueDate}
                onChangeText={setDueDate}
            />
            <TextInput
    style={styles.input}
                placeholder="Website URL"
                value={website}
                onChangeText={setWebsite}
            />
            <Button title="Create Competition" onPress={handleSubmit} />

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={competitions}
                    renderItem={({ item }) => (
                        <CompetitionCard
                            competition={item}
                            onEdit={() => console.log('Edit Competition')}
                            onDelete={() => handleDelete(item.id)} // Call delete function
                            onRegister={() => handleRegister(item.id)}
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});

export default CompetitionsScreen;*/

/*
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import api from '../utils/api'; // Your API utility
import CompetitionCard from '../components/CompetitionCard';
import competitionService from "../utils/api2"; // Component to display individual competition details

const CompetitionsScreen = () => {
    const [competitions, setCompetitions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompetitions = async () => {
            try {
                // const response = await api.get('/competitions');
                const response = await competitionService.getAllCompetitions();
                setCompetitions(response);
              //  setCompetitions(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompetitions();
    }, []);

    const handleRegister = async (competitionId) => {
        try {
            await api.post(`/competitions/${competitionId}/register`);
            alert('Successfully registered for the competition!');
        } catch (error) {
            console.error(error);
            alert('Registration failed!');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Competitions</Text>
            {loading ? (
                <Text>Loading competitions...</Text>
            ) : (
                <FlatList
                    data={competitions}
                    renderItem={({ item }) => (
                        <CompetitionCard
                            competition={item}
                            onRegister={() => handleRegister(item.id)}
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default CompetitionsScreen;*/
/*

// screens/CompetitionsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import competitionService from '../services/competitionService';
import Loader from '../components/Loader';

const CompetitionsScreen = () => {
    const [competitions, setCompetitions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompetitions = async () => {
            const data = await competitionService.getAllCompetitions();

            // const CompetitionsScreen = ({ navigation }) => {
            // const response = await api.get('/competitions'); // Adjust endpoint as necessary
            // setCompetitions(response.data);
            setCompetitions(data);
            setLoading(false);
        };
        fetchCompetitions();
    }, []);

    if (loading) return <Loader />;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Upcoming Competitions</Text>
            <FlatList
                data={competitions}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.competitionCard}>
                        <Text style={styles.title}>{item.name}</Text>
                        <Text>{item.description}</Text>
                        <Button
                            title="View Details"
                            onPress={() => navigation.navigate('CompetitionDetails', { competitionId: item.id })}
                        />
                    </View>
                )}
                // keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        marginBottom: 10,
    },
    competitionCard: {
        padding: 15,
        backgroundColor: '#f0f0f0',
        marginVertical: 10,
        borderRadius: 8,
    },
});

export default CompetitionsScreen;
*/
