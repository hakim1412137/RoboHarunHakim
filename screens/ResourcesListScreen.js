import React, { useEffect, useState } from 'react';
import { View, FlatList, Button, StyleSheet, Text } from 'react-native';
import ResourceCard from '../components/ResourceCard'; // Component to display resource details from above
import api from '../utils/api';
import Loader from '../components/Loader';
import ModalForm from '../components/ModalForm'; // For adding/editing resources

const ResourcesListScreen = () => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [editData, setEditData] = useState(null); // For editing existing resources

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await api.get('/resources'); // Fetch resources from the backend
                setResources(response.data);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    fetchResources();
}, []);

const handleAddOrUpdate = async (resource) => {
    if (editData) {
        await api.put(`/resources/${editData.id}`, resource);
    } else {
        await api.post('/resources', resource);
    }
    setModalVisible(false);
    setEditData(null);
    fetchResources(); // Refresh the resource list
};

return (
    <View style={styles.container}>
        <Text style={styles.title}>Educational Resources</Text>
        <Button title="Add Resource" onPress={() => setModalVisible(true)} />

        {loading ? (
            <Loader />
        ) : (
            <FlatList
                data={resources}
                renderItem={({ item }) => (
                    <ResourceCard
                        resource={item}
                        onEdit={() => {
                            setEditData(item);
                            setModalVisible(true);
                        }}
                        onDelete={async () => {
                            await api.delete(`/resources/${item.id}`);
                            fetchResources();
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default ResourcesListScreen;
