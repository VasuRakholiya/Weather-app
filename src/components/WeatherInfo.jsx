import React from "react";
import TimeSlider from "./TimeSlider";
import "./WeatherInfo.css";
import { generateWeatherSummary } from "../hooks/localAIService";

const WeatherInfo = ({ weatherData, forecastType, selectedIndex, setSelectedIndex }) => {
  if (!weatherData) {
    return (
      <div className="weather-panel">
        <h3>Weather Information</h3>
        <p>Click on the map to see weather details.</p>
      </div>
    );
  }

  if (weatherData.error) {
    return (
      <div className="weather-panel">
        <h3>Error</h3>
        <p>{weatherData.error}</p>
      </div>
    );
  }

  // Determine the forecast array based on forecastType
  const forecastArray = weatherData?.forecast?.forecastday?.[0]?.hour || [];
  const forecast =
    forecastType === "hourly"
      ? forecastArray[selectedIndex] || forecastArray[0]
      : weatherData.current;

  // Generate summary string
  const summaryString = generateWeatherSummary(weatherData);

  // Split summary into lines by periods
  const summaryLines = summaryString.split(". ").filter(line => line.trim() !== "");

  return (
    <div className="weather-panel">
      <h3>{weatherData.location?.name || "Weather"}</h3>

      {forecast ? (
        <div className="weather-details">
          <p>🕒 {forecast.time || forecast?.time_epoch || "Current"}</p>
          <p>🌡 Temp: {forecast.temp_c}°C</p>
          <p>☁ {forecast.condition?.text || forecast?.condition?.text}</p>
          <p>💧 Humidity: {forecast.humidity}%</p>
          <p>💨 Wind: {forecast.wind_kph} kph</p>
        </div>
      ) : (
        <p>Loading forecast...</p>
      )}

      {/* Show slider only for hourly */}
      {forecastType === "hourly" && forecastArray.length > 1 && (
        <TimeSlider
          max={forecastArray.length - 1}
          value={selectedIndex}
          onChange={setSelectedIndex}
        />
      )}

      {/* Weather summary below slider or info */}
      <div className="weather-summary">
        <h4>Weather Summary</h4>
        {summaryLines.map((line, index) => (
          <p key={index} className="summary-line">💡{line.trim()}.
          <br/ >
          <br/ >
          </p>
        ))}
      </div>
    </div>
  );
};

export default WeatherInfo;
