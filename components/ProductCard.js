import { ImageBackground } from 'expo-image';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const ProductCard = ({ product, onAddToCart, onPress, onEdit, onDelete }) => {
    return (
        <View style={styles.container}>
            {/* Edit and Delete Buttons */}
            <View style={styles.actionButtons}>
                <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
                    <AntDesign name="edit" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete} style={styles.iconButton}>
                    <AntDesign name="delete" size={24} color="black" />
                </TouchableOpacity>
            </View>

            {/* Product Image */}
            <View style={styles.imageContainer}>
                <View style={styles.imageCard}>
                    <ImageBackground source={{ uri: product.image }} style={styles.image} />
                </View>
            </View>

            {/* Product Details */}
            <View style={styles.detailsContainer}>
                <View>
                    <Text style={styles.name}>{product.name}</Text>
                    <Text style={styles.description}>{product.description}</Text>
                    {/*<Text style={styles.price}>${product.price.toFixed(2)}</Text>*/}
                    <Text style={styles.price}>{product.price.toFixed(2)}</Text>

                </View>

                {/* Add to Cart and View Details Buttons */}
                <View style={styles.bottomButtons}>
                    <TouchableOpacity onPress={() => onAddToCart(product)} style={styles.addToCartButton}>
                        <Text style={styles.buttonText}>Add to Cart</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPress} style={styles.viewDetailsButton}>
                        <Text style={styles.buttonText}>View Details</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        aspectRatio: 3 / 1,
        height: '20rem',
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        position: 'relative',
        marginBottom: 16, // Add margin for spacing between cards
    },
    actionButtons: {
        position: 'absolute',
        top: 10,
        right: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        zIndex: 10,
    },
    iconButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0', // Light background for buttons
        borderRadius: 20, // Circular buttons
    },
    imageContainer: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    imageCard: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderRadius: 8,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    detailsContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
        paddingVertical: 20, // Reduced padding for better spacing
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Electrolize_400Regular',
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    price: {
        color: '#4CAF50',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
    },
    bottomButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 16, // Add margin for spacing
    },
    addToCartButton: {
        flex: 2,
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    viewDetailsButton: {
        flex: 1,
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Electrolize_400Regular',
    },
});

export default ProductCard;
