import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

const LoadingIndicator = ({ message = 'Chargement...' }) => {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4285F4" />
            <Text style={styles.loadingText}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#555',
    },
});

export default LoadingIndicator;