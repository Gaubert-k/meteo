import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import WeatherIcon from './WeatherIcon/WeatherIcon';
import { formatHour } from '../utils/dateUtils';

const HourlyForecast = ({ weatherData }) => {
    const hourlyData = weatherData.hourly;
    const timeSlots = hourlyData.time.slice(0, 24);

    return (
        <View style={styles.forecastContainer}>
            <Text style={styles.sectionTitle}>Prévisions horaires</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.scrollContainer}
            >
                {timeSlots.map((time, index) => (
                    <View key={index} style={styles.hourlyItem}>
                        <Text style={styles.hourText}>{formatHour(time)}</Text>
                        <WeatherIcon
                            weatherCode={hourlyData.weather_code[index]}
                            size="small"
                        />
                        <Text style={styles.hourlyTemp}>
                            {hourlyData.temperature_2m[index]}°
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    forecastContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#212121',
    },
    scrollContainer: {
        flexDirection: 'row',
    },
    hourlyItem: {
        alignItems: 'center',
        marginRight: 20,
        width: 60,
    },
    hourText: {
        fontSize: 14,
        color: '#757575',
        marginBottom: 8,
    },
    hourlyTemp: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#212121',
        marginTop: 8,
    },
});

export default HourlyForecast;