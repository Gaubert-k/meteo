import axios from 'axios';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export const fetchWeatherByCoords = async (lat, lon) => {
    try {
        const response = await axios.get(`${BASE_URL}`, {
            params: {
                latitude: lat,
                longitude: lon,
                hourly: "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code",
                forecast_days: 1
            }
        });

        return response.data;
    } catch (error) {
        console.error('Erreur API:', error.message);
        throw new Error(error.response?.data?.reason || 'Erreur lors de la récupération des données météo');
    }
};
