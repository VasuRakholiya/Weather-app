import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

const WeatherMarker = ({ position, weatherData, forecastType, selectedIndex }) => {
  if (!weatherData) return null;

  let iconUrl = "";
  let popupData = {};

  if (forecastType === "hourly" && weatherData.list) {
    const item = weatherData.list[selectedIndex] || weatherData.list[0];
    iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
    popupData = {
      title: new Date(item.dt * 1000).toLocaleTimeString(),
      description: item.weather[0].description,
      temp: `${item.main.temp}°C`
    };
  } else if (forecastType === "minutely" && weatherData.weather) {
    iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    popupData = {
      title: weatherData.name || "Unknown Location",
      description: weatherData.weather[0].description,
      temp: `${weatherData.main.temp}°C`
    };
  } else {
    return null;
  }

  const weatherIcon = new L.Icon({
    iconUrl,
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -50],
  });

  return (
    <Marker position={position} icon={weatherIcon}>
      <Popup>
        <div>
          <h4>{popupData.title}</h4>
          <p>{popupData.description}</p>
          <p>Temp: {popupData.temp}</p>
        </div>
      </Popup>
    </Marker>
  );
};

export default WeatherMarker;
