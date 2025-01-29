
import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const ProductCard = ({ product, onAddToCart ,onPress, onEdit, onDelete }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.description}>{product.description}</Text>
            {/*<Text style={styles.price}>${product.price}</Text>*/}
            <Text style={styles.price}>${product.price.toFixed(2)}</Text> 
            <Text style={styles.stock}>{product.inStock ? 'In stock' : 'Out of stock'}</Text>
            <Button title="Add to Cart" onPress={() => onAddToCart(product)} disabled={!product.inStock} />
            <Button title="View Details" onPress={onPress} />
            <Button title="Edit" onPress={onEdit} />
            <Button title="Delete" onPress={onDelete} color="red" />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        margin: 10,
        padding: 16,
    },
    image: {
        height: 100,
        width: '100%',
        borderRadius: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        marginVertical: 4,
    },
    price: {
        fontSize: 16,
        color: '#4CAF50',
    },
});

export default ProductCard;
/*

//ProductCard: Display individual product details and buttons for edit/delete.
import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

const ProductCard = ({ product, onAddToCart }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            <Text style={styles.stock}>{product.inStock ? 'In stock' : 'Out of stock'}</Text>
            <Button title="Add to Cart" onPress={() => onAddToCart(product)} disabled={!product.inStock} />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 16,
        margin: 10,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        width: 150, // Set to a fixed width for consistency
    },
    productImage: {
        width: '100%',
        height: 100,
        borderRadius: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    price: {
        fontSize: 14,
        color: '#4CAF50', // Green color for price
    },
    stock: {
        fontSize: 12,
        color: 'red', // Red color for out of stock
    },
});

export default ProductCard;
*/

/*
import React from 'react';
import { View, Text, Image, Button } from 'react-native';

const ProductCard = ({ product, onAddToCart }) => {
    return (
        <View style={{ margin: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 10 }}>
            <Image source={{ uri: product.image }} style={{ height: 100, width: '100%' }} />
            <Text>{product.name}</Text>
            <Text>${product.price}</Text>
            <Button title="Add to Cart" onPress={() => onAddToCart(product)} />
        </View>
    );
};

export default ProductCard;
 */
