import React, { useEffect, useState } from 'react';
import { View, FlatList, Button, StyleSheet, Text } from 'react-native';
import {createService, getServices, updateService} from "../utils/api";
import Loader from '../components/Loader';
import ModalForm from '../components/ModalForm';

const ServicesScreen = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [editData, setEditData] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await getServices();
                setServices(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const handleAddOrUpdate = async (service) => {
        if (editData) {
            // Update
            await updateService(editData.id, service);
        } else {
            // Create
            await createService(service);
        }
        setModalVisible(false);
        setEditData(null);
        fetchServices(); // Refresh service list
    };

    return (
        <View style={styles.container}>
            <Button title="Add Service" onPress={() => setModalVisible(true)} />
            {loading ? (
                <Loader />
            ) : (
                <FlatList
                    data={services}
                    renderItem={({ item }) => (
                        <ServiceCard
                            service={item}
                            onEdit={() => {
                                setEditData(item);
                                setModalVisible(true);
                            }}
                            onDelete={async () => {
                                await api.delete(`/services/${item.id}`);
                                fetchServices();
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

export default ServicesScreen;
