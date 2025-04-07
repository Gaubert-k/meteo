import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const ErrorDisplay = ({ errorMessage, onRetry }) => {
    return (
        <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorMessage}</Text>
            <TouchableOpacity
                style={styles.retryButton}
                onPress={onRetry}
            >
                <Text style={styles.buttonText}>Réessayer</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        color: '#D32F2F',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    retryButton: {
        backgroundColor: '#4285F4',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ErrorDisplay;