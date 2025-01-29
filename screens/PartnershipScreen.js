import React, { useEffect, useState } from 'react';
import { View, FlatList, Button, StyleSheet } from 'react-native';
import PartnershipCard from '../components/PartnershipCard'; // Create a PartnershipCard component for display
import getPartnership from '../utils/api';
import Loader from '../components/Loader';
import ModalForm from '../components/ModalForm';

const PartnershipScreen = () => {
    const [partnerships, setPartnerships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [editData, setEditData] = useState(null);

    useEffect(() => {
        const fetchPartnerships = async () => {
            try {
              const response = await getPartnership(); // Fetch notifications
            //    const response = await api.get('/partnerships');
                setPartnerships(response);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPartnerships();
    }, []);

    const handleAddOrUpdate = async (partnership) => {
        if (editData) {
            // Update
            await api.put(`/partnerships/${editData.id}`, partnership);
        } else {
            // Create
            await api.post('/partnerships', partnership);
        }
        setModalVisible(false);
        setEditData(null);
        fetchPartnerships();
    };

    return (
        <View style={styles.container}>
            <Button title="Add Partnership" onPress={() => setModalVisible(true)} />
            {loading ? (
                <Loader />
            ) : (
                <FlatList
                    data={partnerships}
                    renderItem={({ item }) => (
                        <PartnershipCard
                            partnership={item}
                            onEdit={() => {
                                setEditData(item);
                                setModalVisible(true);
                            }}
                            onDelete={async () => {
                                await api.delete(`/partnerships/${item.id}`);
                                fetchPartnerships();
                            }}
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
            <ModalForm
                visible={modalVisible}
                onClose={() => {
                    setModalVisible(false);
                    setEditData(null);
                }}
                initialData={editData}
                onSubmit={handleAddOrUpdate}
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

export default PartnershipScreen;
