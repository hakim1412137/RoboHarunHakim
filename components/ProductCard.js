
import { ImageBackground } from 'expo-image';
import React from 'react';
import { View, Text, Button, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const ProductCard = ({ product, onAddToCart ,onPress, onEdit, onDelete }) => {
    return (
        <View style={{ aspectRatio: 3 / 1, height: '20rem', display: 'flex', flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 8, position: 'relative' }}>

            <View style={{ position: 'absolute', top: 10, right: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5, zIndex: 10  }}>
                <TouchableHighlight onPress={onEdit} style={{ width: 40, height: 40, padding: 5, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <AntDesign name="edit" size={24} color="black" />
                </TouchableHighlight>
                <TouchableHighlight onPress={onDelete} style={{ width: 40, height: 40, padding: 5, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <AntDesign name="delete" size={24} color="black" />
                </TouchableHighlight>
            </View>

            <View style={{ width: '50%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <View style={styles.imageCard}>
                    <ImageBackground source={{ uri: product.image }} style={styles.image} />
                </View>
            </View>
            <View style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', paddingHorizontal: 20, paddingVertical: 50 }}>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'Electrolize_400Regular'  }}>{product.name}</Text>
                    <Text style={styles.description}>{product.description}</Text>
                    <Text style={{ color: '#4CAF50', fontSize: 16, fontWeight: 'bold' }}>${product.price.toFixed(2)}</Text> 
                </View>

                {/*<Text style={styles.price}>${product.price}</Text>*/}
                {/*<Text style={styles.stock}>{product.inStock ? 'In stock' : 'Out of stock'}</Text>*/}
                {/*<Button title="Add to Cart" onPress={() => onAddToCart(product)} disabled={!product.inStock} />*/}
                {/* <Button title="Edit" onPress={onEdit} /> */}
                {/* <Button title="View Details" onPress={onPress} /> */}

                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: 6 }}>
                    <TouchableOpacity style={{ flex: 2 }} onPress={() => onAddToCart(product)}>
                        <Text style={{ color: '#4CAF50', fontSize: 16, fontWeight: 'bold', fontFamily: 'Electrolize_400Regular' }}>Add to Cart</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1 }} onPress={onPress}>
                        <Text style={{ color: '#4CAF50', fontSize: 16, fontWeight: 'bold', fontFamily: 'Electrolize_400Regular' }}>View Details</Text>
                    </TouchableOpacity>
                    {/* <Button title="Add to Cart" onPress={() => onAddToCart(product)} /> */}
                </View>

                {/* <Button title="Delete" onPress={onDelete} color="red" /> */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        height: 'auto',
        aspectRatio: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 16,
    },
    image: {
        height: '100%',
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
    imageContainer: { width: '50%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' },
    imageCard: {
        backgroundColor: '#FFFFFF',
        height: '70%',
        aspectRatio: 1,
        borderRadius: 8,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3, // Shadow for Android
    },
    buttonContainer: { backgroundColor: 'white', paddingVertical: 13, paddingHorizontal: 14, borderRadius: 10 },
    buttonText: { color: '#4CAF50', fontSize: 16, fontWeight: 'bold', fontFamily: 'Electrolize_400Regular' }
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
