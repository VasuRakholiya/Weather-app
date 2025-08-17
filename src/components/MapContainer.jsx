import React, { useState } from "react";
import { MapContainer as LeafletMap, TileLayer, Marker, useMapEvents } from "react-leaflet";
import WeatherInfo from "./WeatherInfo";
import { useWeatherData } from "../hooks/useWeatherData";
import "leaflet/dist/leaflet.css";

const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

const MapContainer = ({ forecastType }) => { // <-- receive as prop
  const [latLon, setLatLon] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const weatherData = useWeatherData(latLon?.lat, latLon?.lon);

  const handleMapClick = (lat, lon) => {
    setLatLon({ lat, lon });
    setSelectedIndex(0); // Reset slider when user clicks new location
  };

  return (
    <div className="app-container">
      <LeafletMap center={[20.5937, 78.9629]} zoom={5} className="leaflet-container">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <MapClickHandler onMapClick={handleMapClick} />
        {latLon && <Marker position={[latLon.lat, latLon.lon]} />}
      </LeafletMap>

      {/* Weather info panel */}
      <WeatherInfo
        weatherData={weatherData}
        forecastType={forecastType} // use prop here
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
    </div>
  );
};

export default MapContainer;
