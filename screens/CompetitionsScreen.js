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

const CompetitionsScreen = () => {
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

    const handleRegister = async (competitionId) => {
        try {
            await registerForCompetition(competitionId);
            Alert.alert('Success', 'You have registered for the competition!');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Error registering for competition!');
        }
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
            <Text style={styles.title}>Competitions</Text>
            {/* Search input for competition ID */}
            <TextInput
                style={styles.input}
                placeholder="Search Competition by ID"
                value={searchId}
                onChangeText={setSearchId}
            />
            <Button title="Search" onPress={() => fetchCompetitionById(searchId)} />
{/*
            <SearchComponent onSearch={fetchCompetitionById} />
*/}

            {/* Search input for competition ID */}
            {/*<SearchCompetition onSearchComplete={handleSearchComplete} />*/}

            {/* Input fields for new competition data */}
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
                            onRegister={() => handleRegister(item.id)} // Register for the competition
                            // onRegister={() => navigation.navigate('CompetitionDetails', { competitionId: item.id })} // Replace or implement a registration function
                        />
                    )}
                    keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()} // Fallback if id is undefined

                    // keyExtractor={(item) => item.id.toString()}
                />
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '40rem',
        padding: 20,
        backgroundColor: '#fff',
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

export default CompetitionsScreen;
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
