import { useState } from 'react';
import * as Location from 'expo-location';

export const useGeolocation = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    const getLocation = async () => {
        try {
            setLoading(true);
            setErrorMsg(null);

            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMsg('Permission de localisation refusée');
                return false;
            }

            const position = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Low,
                timeout: 15000
            });

            const locationData = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy,
                timestamp: position.timestamp
            };
            setLocation(locationData);
            return locationData;
        } catch (error) {
            setErrorMsg(`Erreur de géolocalisation: ${error.message}`);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        location,
        errorMsg,
        loading,
        getLocation
    };
};