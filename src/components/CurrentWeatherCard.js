import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WeatherIcon from './WeatherIcon/WeatherIcon';
import { getCurrentHour } from '../utils/dateUtils';

const CurrentWeatherCard = ({ weatherData }) => {
    const currentHour = getCurrentHour();

    return (
        <View style={styles.currentWeather}>
            <View style={styles.weatherHeader}>
                <WeatherIcon weatherCode={weatherData.hourly.weather_code[currentHour]} />
                <Text style={styles.temperature}>
                    {weatherData.hourly.temperature_2m[currentHour]}
                    <Text style={styles.unit}>{weatherData.hourly_units.temperature_2m}</Text>
                </Text>
            </View>

            <Text style={styles.feelsLike}>
                Ressenti: {weatherData.hourly.apparent_temperature[currentHour]}
                {weatherData.hourly_units.apparent_temperature}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    currentWeather: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    weatherHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    temperature: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#212121',
    },
    unit: {
        fontSize: 24,
        color: '#757575',
    },
    feelsLike: {
        fontSize: 16,
        color: '#757575',
    },
});

export default CurrentWeatherCard;