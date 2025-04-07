import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

const Header = () => {
    return (
        <View style={styles.header}>
            <StatusBar backgroundColor="#4A90E2" barStyle="light-content" />
            <Text style={styles.title}>                        Météo AEROW                        </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        paddingVertical: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4A90E2',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        letterSpacing: 1,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
});

export default Header;