//ConfirmDialog: Used to confirm deletion actions.
import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

const ConfirmDialog = ({ visible, onConfirm, onCancel, message }) => {
    return (
        <Modal visible={visible} transparent={true}>
            <View style={styles.modalContainer}>
                <Text>{message}</Text>
                <Button title="Yes" onPress={onConfirm} />
                <Button title="No" onPress={onCancel} />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
});

export default ConfirmDialog;
