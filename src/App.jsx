import React, { useState } from "react";
import "./App.css";
import ToggleSlider from "./components/ToggleSlider";
import MapView from "./components/MapContainer";

function App() {
  const [forecastType, setForecastType] = useState("minutely");

  return (
    <div>
      <ToggleSlider
        forecastType={forecastType}
        setForecastType={setForecastType}
      />
      <MapView forecastType={forecastType} />
    </div>
  );
}

export default App;
