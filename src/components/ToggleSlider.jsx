import React from "react";
import "./ToggleSlider.css";

const ToggleSlider = ({ forecastType, setForecastType }) => {
  return (
    <div className="toggle-container">
      <button
        className={forecastType === "minutely" ? "active" : ""}
        onClick={() => setForecastType("minutely")}
      >
        Minutely
      </button>
      <button
        className={forecastType === "hourly" ? "active" : ""}
        onClick={() => setForecastType("hourly")}
      >
        Hourly
      </button>
    </div>
  );
};

export default ToggleSlider;
