import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "0c1184911d1d4636ac6115959251608"; 

export const useWeatherData = (lat, lon) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (!lat || !lon) return;

    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=1&aqi=no&alerts=no`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather:", error);
        setWeatherData({
          error: "Unable to fetch weather. Check your API key.",
        });
      }
    };

    fetchWeather();
  }, [lat, lon]);

  return weatherData;
};
