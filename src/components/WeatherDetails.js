import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { getCurrentHour } from '../utils/dateUtils';

const getRandomColor = () => {
    const colors = [
        '#FF6B6B', '#FF9E7A', '#FFDA8A', '#BFFF7F',
        '#7AFFBF', '#7ACDFF', '#B47AFF', '#FF7AD9'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};

const getEmoji = (code) => {
    const emojiMap = {
        0: '☀️', // Clear sky
        1: '🌤️', // Partly cloudy
        2: '⛅', // Cloudy
        3: '☁️', // Overcast
        45: '🌫️', // Fog
        48: '🌫️', // Depositing rime fog
        51: '🌧️', // Light drizzle
        53: '🌧️', // Moderate drizzle
        55: '🌧️', // Dense drizzle
        61: '🌦️', // Slight rain
        63: '🌧️', // Moderate rain
        65: '🌧️', // Heavy rain
        71: '❄️', // Slight snow
        73: '❄️', // Moderate snow
        75: '❄️', // Heavy snow
        80: '🌦️', // Slight rain showers
        81: '🌧️', // Moderate rain showers
        82: '🌧️', // Violent rain showers
        95: '⛈️', // Thunderstorm
        96: '⛈️', // Thunderstorm with slight hail
        99: '⛈️', // Thunderstorm with heavy hail
    };

    return emojiMap[code] || '🌈';
};

const getTempTitle = (temp) => {
    if (temp < 0) return "Gla Gla ! 🥶";
    if (temp < 10) return "Un peu frisquet ! 🧣";
    if (temp < 20) return "Ça va, ça vient ! 🙂";
    if (temp < 30) return "Mmm, agréable ! 😎";
    return "Canicule ! 🔥";
};

const getHumidityTitle = (humidity) => {
    if (humidity < 20) return "Sec comme le désert ! 🏜️";
    if (humidity < 40) return "Un peu sec ! 📄";
    if (humidity < 60) return "C'est correct ! 💧";
    if (humidity < 80) return "Assez humide ! 💦";
    return "C'est la mousson ! 🌊";
};

const WeatherDetails = ({ weatherData }) => {
    const currentHour = getCurrentHour();
    const temperature = weatherData.hourly.temperature_2m[currentHour];
    const humidity = weatherData.hourly.relative_humidity_2m[currentHour];
    const weatherCode = weatherData.hourly.weather_code[currentHour];
    const apparentTemp = weatherData.hourly.apparent_temperature[currentHour];

    return (
        <View style={styles.detailsContainer}>
            <Text style={styles.sectionTitle}>Détails 🤪</Text>

            <View style={styles.detailGrid}>
                <View style={[styles.detailItem, { backgroundColor: getRandomColor() }]}>
                    <Text style={styles.emojiIcon}>💦</Text>
                    <Text style={styles.detailLabel}>Humidité</Text>
                    <Text style={styles.detailValue}>
                        {humidity}
                        {weatherData.hourly_units.relative_humidity_2m}
                    </Text>
                    <Text style={styles.funDescription}>{getHumidityTitle(humidity)}</Text>
                </View>

                <View style={[styles.detailItem, { backgroundColor: getRandomColor() }]}>
                    <Text style={styles.emojiIcon}>🌡️</Text>
                    <Text style={styles.detailLabel}>T° ressentie</Text>
                    <Text style={styles.detailValue}>
                        {apparentTemp}
                        {weatherData.hourly_units.apparent_temperature}
                    </Text>
                    <Text style={styles.funDescription}>
                        {apparentTemp > temperature
                            ? "Plus chaud qu'on pense ! 🥵"
                            : "Plus froid qu'on croit ! 🥶"}
                    </Text>
                </View>

                <View style={[styles.detailItem, { backgroundColor: getRandomColor() }]}>
                    <Text style={styles.emojiIcon}>🌡️</Text>
                    <Text style={styles.detailLabel}>Température</Text>
                    <Text style={styles.detailValue}>
                        {temperature}
                        {weatherData.hourly_units.temperature_2m}
                    </Text>
                    <Text style={styles.funDescription}>{getTempTitle(temperature)}</Text>
                </View>

                <View style={[styles.detailItem, { backgroundColor: getRandomColor() }]}>
                    <Text style={styles.emojiIcon}>{getEmoji(weatherCode)}</Text>
                    <Text style={styles.detailLabel}>Ambiance</Text>
                    <Text style={styles.detailValue}>
                        {getEmoji(weatherCode)}
                    </Text>
                    <Text style={styles.funDescription}>Code: {weatherCode}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    detailsContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
        borderWidth: 2,
        borderColor: '#FFD700',
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#FF6B6B',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    detailGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    detailItem: {
        width: '48%',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    emojiIcon: {
        fontSize: 36,
        marginBottom: 8,
    },
    detailLabel: {
        fontSize: 16,
        color: '#FFFFFF',
        marginBottom: 6,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    detailValue: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 6,
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    funDescription: {
        fontSize: 14,
        color: '#FFFFFF',
        textAlign: 'center',
        fontStyle: 'italic',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
});

export default WeatherDetails;