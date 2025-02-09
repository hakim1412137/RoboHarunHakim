import React, { useEffect, useState } from 'react';
import { View, FlatList, Button, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import {createService, deleteService, getServices, updateService} from '../utils/api';
import Loader from '../components/Loader';
import ModalForm from '../components/ModalForm';
import ServiceCard from '../components/ServiceCard';
import Header from "../components/Header";
import Menu from "../components/Menu";

const ServicesScreen = ({navigation} ) => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [editData, setEditData] = useState(null);

    useEffect(() => {
        fetchServices();
    }, []);

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

    const handleAddOrUpdate = async (service) => {
        if (editData) {
            await updateService(editData.id, service);
        } else {
            await createService(service);
        }
        setModalVisible(false);
        setEditData(null);
        fetchServices(); // Refresh service list
    };

    const handleDelete = async (id) => {
        Alert.alert(
            'Warning',
            'Are you sure you want to delete this service?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'OK',
                    onPress: async () => {
                        await deleteService(id);
                        fetchServices();
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <View style={styles.container}>
            <Header></Header>
            <Menu navigation={navigation}></Menu>
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.addButtonText}>Add Service</Text>
            </TouchableOpacity>
            {loading ? (
                <Loader />
            ) : (
                <>
                    {services.length > 0 ? (
                        <FlatList
                            data={services}
                            renderItem={({ item }) => (
                                <ServiceCard
                                    service={item}
                                    onEdit={() => {
                                        setEditData(item);
                                        setModalVisible(true);
                                    }}
                                    onDelete={() => handleDelete(item.id)}
                                />
                            )}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    ) : (
                        <Text style={styles.emptyText}>No services available. Please add one.</Text>
                    )}
                </>
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
        backgroundColor: '#f9f9f9',
    },
    addButton: {
        backgroundColor: '#6200ee',
        padding: 15,
borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
},
addButtonText: {
    color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
},
emptyText: {
    textAlign: 'center',
        fontSize: 18,
        marginTop: 50,
        color: '#666',
},
});

export default ServicesScreen;
/*

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
*/
