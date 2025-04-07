import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useGeolocation } from '../hooks/userLocation';
import { fetchWeatherByCoords } from '../api/WeatherApi';

import Header from '../components/Header';
import LocationPrompt from '../components/LocationPrompt';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorDisplay from '../components/ErrorDisplay';
import CurrentWeatherCard from '../components/CurrentWeatherCard';
import HourlyForecast from '../components/HourlyForecast';
import WeatherDetails from '../components/WeatherDetails';

export default function HomeScreen() {
  const { location, errorMsg, loading, getLocation } = useGeolocation();
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(null);

  const fetchWeather = async () => {
    if (!location) return;

    try {
      setWeatherLoading(true);
      setWeatherError(null);
      const data = await fetchWeatherByCoords(location.latitude, location.longitude);
      setWeatherData(data);
    } catch (error) {
      setWeatherError(error.message);
    } finally {
      setWeatherLoading(false);
    }
  };

  useEffect(() => {
    if (location) {
      fetchWeather();
    }
  }, [location]);

  // Déterminer quel contenu afficher
  const renderContent = () => {
    if (!location && !loading) {
      return <LocationPrompt onRequestLocation={getLocation} isLoading={loading} />;
    }

    if (loading) {
      return <LoadingIndicator message="Récupération de votre position..." />;
    }

    if (errorMsg) {
      return <ErrorDisplay errorMessage={errorMsg} onRetry={getLocation} />;
    }

    if (location && weatherLoading) {
      return <LoadingIndicator message="Récupération des données météo..." />;
    }

    if (weatherError) {
      return <ErrorDisplay errorMessage={weatherError} onRetry={fetchWeather} />;
    }

    if (weatherData) {
      return (
          <ScrollView
              style={styles.weatherContainer}
              contentContainerStyle={styles.weatherContent}
          >
            <CurrentWeatherCard weatherData={weatherData} />
            <HourlyForecast weatherData={weatherData} />
            <WeatherDetails weatherData={weatherData} />
          </ScrollView>
      );
    }

    return null;
  };

  return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <Header />
        <View style={styles.contentContainer}>
          {renderContent()}
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  contentContainer: {
    flex: 1,
    marginTop: 10,
  },
  weatherContainer: {
    flex: 1,
  },
  weatherContent: {
    padding: 16,
  },
});