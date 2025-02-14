import React, { useEffect, useState } from 'react';
import {View, FlatList, StyleSheet, Text, TouchableOpacity, ScrollView, Animated, Image} from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { createService, deleteService, getServices, updateService } from '../utils/api';
import Loader from '../components/Loader';
import ModalFormService from '../components/ModalFormService';
import ServiceCard from '../components/ServiceCard';
import Header from "../components/Header";
import Menu from "../components/Menu";
import ConfirmationModal from '../components/ConfirmationModal';
import {height} from "../utils/dimensions";

const ServiceScreen = ({ navigation }) => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [editData, setEditData] = useState(null);
    const [serviceIdToDelete, setServiceIdToDelete] = useState(null);
    const fadeAnim = useState(new Animated.Value(0))[0];

    useEffect(() => {
        fetchServices();
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
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
        try {
            if (editData) {
                await updateService(editData.id, service);
            } else {
                await createService(service);
            }
            fetchServices();
        } finally {
            setModalVisible(false);
            setEditData(null);
        }
    };

    const confirmDelete = (id) => {
        setServiceIdToDelete(id);
        setDeleteModalVisible(true);
    };

    const handleDelete = async () => {
        try {
            await deleteService(serviceIdToDelete);
            fetchServices();
        } finally {
            setDeleteModalVisible(false);
            setServiceIdToDelete(null);
        }
    };

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <Header />
            <Menu navigation={navigation} />
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/images/stem.jpg')}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.title}>Our Services</Text>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => setModalVisible(true)}
                    >
                        <AntDesign name="pluscircle" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

                {loading ? (
                    <Loader />
                ) : (
                    services.length > 0 ? (
                        <FlatList
                            scrollEnabled={false}
                            data={services}
                            renderItem={({ item }) => (
                                <ServiceCard
                                    service={item}
                                    onEdit={() => {
                                        setEditData(item);
                                        setModalVisible(true);
                                    }}
                                    onDelete={() => confirmDelete(item.id)}
                                />
                            )}
                            keyExtractor={(item) => item.id.toString()}
                            contentContainerStyle={styles.listContent}
                        />
                    ) : (
                        <View style={styles.emptyContainer}>
                            <MaterialIcons name="miscellaneous-services" size={60} color="#6200ee" />
                            <Text style={styles.emptyText}>No services available</Text>
                            <Text style={styles.emptySubText}>Tap the + button to add a new service</Text>
                        </View>
                    )
                )}
            </ScrollView>

            <ModalFormService
                visible={modalVisible}
                onClose={() => {
                    setModalVisible(false);
                    setEditData(null);
                }}
                initialData={editData}
                onSubmit={handleAddOrUpdate}
            />

            <ConfirmationModal
                visible={deleteModalVisible}
                onCancel={() => setDeleteModalVisible(false)}
                onConfirm={handleDelete}
                title="Confirm Delete"
                message="Are you sure you want to delete this service?"
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        height: '40rem',
        backgroundColor: '#f5f5f5',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 100,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
    },
    title: {
        fontSize: 28,
        fontWeight: '600',
        color: '#2d2d2d',
        fontFamily: 'Roboto-Medium',
    },
    addButton: {
        backgroundColor: '#6200ee',
        padding: 14,
        borderRadius: 50,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    listContent: {
        gap: 15,
    },
    imageContainer: {
        height: height * 0.25, // Set the height to 25% of the screen height
        width: '100%',
        position: 'relative', // Position for overlay
        overflow: 'hidden', // Ensure image does not overflow
        borderRadius: 12, // Optional: add border radius for rounded corners
    },
  /*  image: {
        width: '100%',
        height: '100%',
    },*/
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black overlay with 50% opacity
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    emptyText: {
        fontSize: 22,
        color: '#444',
        marginTop: 20,
        fontFamily: 'Roboto-Medium',
    },
    emptySubText: {
        fontSize: 16,
        color: '#666',
        marginTop: 10,
        textAlign: 'center',
        fontFamily: 'Roboto-Regular',
    },
});

export default ServiceScreen;

/*

import React, { useEffect, useState } from 'react';
import {View, FlatList, Button, StyleSheet, Text, Alert, TouchableOpacity, ScrollView} from 'react-native';
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
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >
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
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        height: '40rem',
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
 */

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
