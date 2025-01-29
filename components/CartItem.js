import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const CartItem = ({ item, onRemove }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>${item.price}</Text>
            </View>
            <Button title="Remove" onPress={onRemove} color="red" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
    },
    image: {
        height: 80,
        width: 80,
        borderRadius: 10,
    },
    info: {
        flex: 1,
        marginLeft: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 14,
        color: '#4CAF50',
    },
});

export default CartItem;
