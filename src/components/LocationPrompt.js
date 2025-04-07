import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const LocationPrompt = ({ onRequestLocation, isLoading }) => {
    return (
        <View style={styles.locationPrompt}>
            <Text style={styles.promptText}>
                Pour consulter la météo, veuillez autoriser l'accès à votre position
            </Text>
            <TouchableOpacity
                style={styles.locationButton}
                onPress={onRequestLocation}
                disabled={isLoading}
            >
                <Text style={styles.buttonText}>Localiser</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    locationPrompt: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    promptText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: '#555',
    },
    locationButton: {
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

export default LocationPrompt;