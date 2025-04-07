import { Text, StyleSheet } from "react-native";
import React from "react";
import PropTypes from "prop-types";

const WeatherIcon = ({ weatherCode }) => {
    const getWeatherIcon = (code) => {
        if (code <= 3) return '☀️';
        if (code <= 48) return '🌫️';
        if (code <= 67) return '🌧️';
        if (code <= 77) return '❄️';
        if (code <= 99) return '⛈️';
        return '🌈';
    };

    return <Text style={styles.weatherIcon}>{getWeatherIcon(weatherCode)}</Text>;
};

const styles = StyleSheet.create({
    weatherIcon: {
        fontSize: 50,
        marginRight: 15,
    }
});

WeatherIcon.propTypes = {
    weatherCode: PropTypes.number.isRequired
};

export default WeatherIcon;