import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Ensure you have this package installed

const SearchComponent = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        if (searchQuery.trim()) {
            onSearch(searchQuery); // Call the parent function to perform the search action
            setSearchQuery(''); // Clear the input after search
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search..."
                placeholderTextColor="gray"
                value={searchQuery}
                onChangeText={text => setSearchQuery(text)}
            />
            <TouchableOpacity onPress={handleSearch} style={styles.button}>
                <FontAwesome name="search" size={20} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 5,
        color: '#000',
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SearchComponent;

/*// src/components/SearchComponent.js
import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import api from '../services/api'; // Import your API functions

const SearchComponent = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        const data = await api.search(query); // Call your search API
        setResults(data);
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search for products, courses, or posts..."
                value={query}
                onChangeText={setQuery}
            />
            <Button title="Search" onPress={handleSearch} />
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <FlatList
                    data={results}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.resultCard}>
                            <Text style={styles.title}>{item.type}: {item.title}</Text>
                            <Button
                                title="View"
                                onPress={() => {
                                    if (item.type === "Product") {
                                        navigation.navigate('ProductDetails', { productId: item.id });
                                    } else if (item.type === "Course") {
                                        navigation.navigate('CourseDetails', { courseId: item.id });
                                    } else if (item.type === "Post") {
                                        navigation.navigate('Comments', { postId: item.id });
                                    }
                                }}
                            />
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 8,
    },
    resultCard: {
        padding: 15,
        backgroundColor: '#f0f0f0',
        marginVertical: 10,
        borderRadius: 8,
    },
    title: {
        fontWeight: 'bold',
    },
});

export default SearchComponent;*/
/*
// src/components/SearchComponent.js
import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import api from '../services/api'; // Import your API functions

const SearchComponent = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        const data = await api.search(query); // Call your search API
        setResults(data);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search..."
                value={query}
                onChangeText={setQuery}
            />
            <Button title="Search" onPress={handleSearch} />
            <FlatList
                data={results}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.resultCard}>
                        <Text style={styles.title}>{item.type}: {item.title}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 8,
    },
    resultCard: {
        padding: 15,
        backgroundColor: '#f0f0f0',
        marginVertical: 10,
        borderRadius: 8,
    },
    title: {
        fontWeight: 'bold',
    },
});

export default SearchComponent;
 */
