import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useGeolocation } from '../hooks/userLocation';
import { fetchWeatherByCoords } from '../api/WeatherApi';
import WeatherIcon from "../components/WeatherIcon/WeatherIcon";

export default function App() {
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
      fetchWeather().then(r => console.log(r));
    }
  }, [location]);

  const getCurrentHour = () => {
    return new Date().getHours();
  };

  const formatHour = (isoString) => {
    const date = new Date(isoString);
    return date.getHours() + 'h';
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Météo Actuelle</Text>
      </View>

      {!location && !loading && (
        <View style={styles.locationPrompt}>
          <Text style={styles.promptText}>
            Pour consulter la météo, veuillez autoriser l'accès à votre position
          </Text>
          <TouchableOpacity 
            style={styles.locationButton} 
            onPress={getLocation}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Localiser</Text>
          </TouchableOpacity>
        </View>
      )}

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4285F4" />
          <Text style={styles.loadingText}>Récupération de votre position...</Text>
        </View>
      )}

      {errorMsg && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMsg}</Text>
          <TouchableOpacity 
            style={styles.retryButton} 
            onPress={getLocation}
          >
            <Text style={styles.buttonText}>Réessayer</Text>
          </TouchableOpacity>
        </View>
      )}

      {location && weatherLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4285F4" />
          <Text style={styles.loadingText}>Récupération des données météo...</Text>
        </View>
      )}

      {weatherError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{weatherError}</Text>
          <TouchableOpacity 
            style={styles.retryButton} 
            onPress={fetchWeather}
          >
            <Text style={styles.buttonText}>Réessayer</Text>
          </TouchableOpacity>
        </View>
      )}

      {weatherData && (
        <ScrollView style={styles.weatherContainer} contentContainerStyle={styles.weatherContent}>
          <View style={styles.currentWeather}>
            <View style={styles.weatherHeader}>
              <WeatherIcon weatherCode={weatherData.hourly.weather_code[getCurrentHour()]} />
              <Text style={styles.temperature}>
                {weatherData.hourly.temperature_2m[getCurrentHour()]}
                <Text style={styles.unit}>{weatherData.hourly_units.temperature_2m}</Text>
              </Text>
            </View>
            
            <Text style={styles.feelsLike}>
              Ressenti: {weatherData.hourly.apparent_temperature[getCurrentHour()]}
              {weatherData.hourly_units.apparent_temperature}
            </Text>
            
            <Text style={styles.humidity}>
              Humidité: {weatherData.hourly.relative_humidity_2m[getCurrentHour()]}
              {weatherData.hourly_units.relative_humidity_2m}
            </Text>
          </View>

          <View style={styles.forecast}>
            <Text style={styles.forecastTitle}>Prévisions horaires</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {weatherData.hourly.time.slice(getCurrentHour(), getCurrentHour() + 12).map((time, index) => {
                const actualIndex = getCurrentHour() + index;
                return (
                  <View key={time} style={styles.hourlyItem}>
                    <Text style={styles.hourlyTime}>{formatHour(time)}</Text>
                    <WeatherIcon weatherCode={weatherData.hourly.weather_code[actualIndex]} />
                    <Text style={styles.hourlyTemp}>
                      {weatherData.hourly.temperature_2m[actualIndex]}°
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>

          <View style={styles.locationInfo}>
            <Text style={styles.locationText}>
              Lat: {location.latitude.toFixed(4)}, Lon: {location.longitude.toFixed(4)}
            </Text>
            <TouchableOpacity 
              style={styles.refreshButton} 
              onPress={fetchWeather}
            >
              <Text style={styles.buttonText}>Actualiser</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#4285F4',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
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
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#555',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#e53935',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#4285F4',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  weatherContainer: {
    flex: 1,
  },
  weatherContent: {
    padding: 20,
  },
  currentWeather: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  weatherHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
  },
  unit: {
    fontSize: 24,
  },
  feelsLike: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
  humidity: {
    fontSize: 16,
    color: '#555',
  },
  forecast: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  forecastTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  hourlyItem: {
    alignItems: 'center',
    marginRight: 20,
    width: 60,
  },
  hourlyTime: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  hourlyTemp: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  locationInfo: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  locationText: {
    fontSize: 12,
    color: '#777',
  },
  refreshButton: {
    backgroundColor: '#4285F4',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
});