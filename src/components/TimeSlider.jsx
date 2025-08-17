import React from "react";
import "./TimeSlider.css";

const TimeSlider = ({ max, value, onChange }) => {
  if (max <= 0) return <p>No forecast steps available</p>;

  return (
    <div className="time-slider">
      <label>⏳ Select Hour:</label>
      <input 
        type="range" 
        min="0" 
        max={max} 
        value={value} 
        onChange={(e) => onChange(Number(e.target.value))} 
      />
      <p>Hour index: {value}</p>
    </div>
  );
};

export default TimeSlider;
