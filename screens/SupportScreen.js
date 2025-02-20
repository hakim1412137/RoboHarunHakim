import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { createSupport, deleteSupport, getSupports, updateSupport } from '../utils/api';
import Loader from '../components/Loader';
import ModalForm from '../components/ModalForm';
import SupportCard from '../components/SupportCard';
import Header from "../components/Header";
import Menu from "../components/Menu";
import ConfirmationModal from '../components/ConfirmationModal';

const SupportScreen = ({ navigation }) => {
    const [supportRequests, setSupportRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [editData, setEditData] = useState(null);
    const [supportIdToDelete, setSupportIdToDelete] = useState(null);
    const fadeAnim = useState(new Animated.Value(0))[0];

    useEffect(() => {
        fetchSupportRequests();
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    }, []);

    const fetchSupportRequests = async () => {
        try {
            const response = await getSupports();
            setSupportRequests(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddOrUpdate = async (supportRequest) => {
        try {
            if (editData) {
                await updateSupport(editData.id, supportRequest);
            } else {
                await createSupport(supportRequest);
            }
            fetchSupportRequests();
        } finally {
            setModalVisible(false);
            setEditData(null);
        }
    };

    const confirmDelete = (id) => {
        setSupportIdToDelete(id);
        setDeleteModalVisible(true);
    };

    const handleDelete = async () => {
        try {
            await deleteSupport(supportIdToDelete);
            fetchSupportRequests();
        } finally {
            setDeleteModalVisible(false);
            setSupportIdToDelete(null);
        }
    };

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <Header />
            <Menu navigation={navigation} />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.title}>Support Requests</Text>
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
                    supportRequests.length > 0 ? (
                        <FlatList
                            scrollEnabled={false}
                            data={supportRequests}
                            renderItem={({ item }) => (
                                <SupportCard
                                    supportRequest={item}
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
                            <MaterialIcons name="support-agent" size={60} color="#6200ee" />
                            <Text style={styles.emptyText}>No support requests found</Text>
                            <Text style={styles.emptySubText}>Tap the + button to create a new request</Text>
                        </View>
                    )
                )}
            </ScrollView>

            <ModalForm
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
                message="Are you sure you want to delete this support request?"
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

export default SupportScreen;
