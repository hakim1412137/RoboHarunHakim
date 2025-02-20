import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchComponent = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (text) => {
        setQuery(text);
        onSearch(text);
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Search products..."
                value={query}
                onChangeText={handleSearch}
                style={styles.input}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
});

export default SearchComponent;
