import React, { useEffect, useState } from 'react';
import { View, FlatList, Button, StyleSheet } from 'react-native';
import SupportCard from '../components/SupportCard'; // Create a SupportCard component for display
import api from '../utils/api';
import Loader from '../components/Loader';
import ModalForm from '../components/ModalForm';

const SupportScreen = () => {
    const [supportRequests, setSupportRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [editData, setEditData] = useState(null);

    useEffect(() => {
        const fetchSupportRequests = async () => {
            try {
                const response = await api.get('/support-requests');
                setSupportRequests(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSupportRequests();
    }, []);

    const handleAddOrUpdate = async (supportRequest) => {
        if (editData) {
            // Update
            await api.put(`/support-requests/${editData.id}`, supportRequest);
        } else {
            // Create
            await api.post('/support-requests', supportRequest);
        }
        setModalVisible(false);
        setEditData(null);
        fetchSupportRequests(); // Refresh the support request list
    };

    return (
        <View style={styles.container}>
            <Button title="Create Support Request" onPress={() => setModalVisible(true)} />
            {loading ? (
                <Loader />
            ) : (
                <FlatList
                    data={supportRequests}
                    renderItem={({ item }) => (
                        <SupportCard
                            supportRequest={item}
                            onEdit={() => {
                                setEditData(item);
                                setModalVisible(true);
                            }}
                            onDelete={async () => {
                                await api.delete(`/support-requests/${item.id}`);
                                fetchSupportRequests();
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

export default SupportScreen;
