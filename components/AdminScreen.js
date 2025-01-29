import React, { useEffect, useState } from 'react';
import { View, FlatList, Button, StyleSheet } from 'react-native';
import ProductCard from './ProductCard';
import CompetitionCard from './CompetitionCard';
import ModalForm from './ModalForm';
import ConfirmDialog from './ConfirmDialog';
import getProducts from '../utils/api';
import getAllCompetitions from '../utils/api';
import Loader from './Loader';

const AdminScreen = () => {
    const [products, setProducts] = useState([]);
    const [competitions, setCompetitions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [editData, setEditData] = useState(null);
    const [itemToDelete, setItemToDelete] = useState(null);
    const isEditing = !!editData;

    useEffect(() => {
        fetchProducts();
        fetchCompetitions();
    }, []);

    const fetchProducts = async () => {
        try {
            //const response = await api.get('/products');
           const response = await getProducts();
            setProducts(response);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCompetitions = async () => {
        try {
         //   const response = await api.get('/competitions');
            const response = await getAllCompetitions();
            setCompetitions(response);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddOrUpdate = async (item) => {
        if (isEditing) {
            // Update
            await api.put(`/products/${editData.id}`, item);
        } else {
            // Create
            await api.post('/products', item);
        }
        setModalVisible(false);
        setEditData(null);
        fetchProducts();
    };

    const handleDelete = async () => {
        if (itemToDelete) {
            await api.delete(`/products/${itemToDelete.id}`);
            setConfirmVisible(false);
            fetchProducts();
        }
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <Loader />
            ) : (
                <FlatList
                    data={products}
                    renderItem={({ item }) => (
                        <ProductCard
                            product={item}
                            onEdit={() => {
                                setEditData(item);
                                setModalVisible(true);
                            }}
                            onDelete={() => {
                                setItemToDelete(item);
                                setConfirmVisible(true);
                            }}
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
            <Button title="Add Product" onPress={() => setModalVisible(true)} />
            <ModalForm
                visible={modalVisible}
                onClose={() => {
                    setModalVisible(false);
                    setEditData(null);
                }}
                initialData={editData}
                onSubmit={handleAddOrUpdate}
            />
            <ConfirmDialog
                visible={confirmVisible}
                onConfirm={handleDelete}
                onCancel={() => setConfirmVisible(false)}
                message="Are you sure you want to delete this product?"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});

export default AdminScreen;
