// src/hooks/weatherSummaryGenerator.js
export function generateWeatherSummary(weatherData) {
  if (!weatherData) return "Weather information is currently unavailable.";

  // WeatherAPI structure
  const apiCurrent = weatherData.current;
  let main = "";
  let description = "";
  let temp, feels, humidity, wind;

  if (apiCurrent) {
    main = apiCurrent.condition?.text || "";
    description = apiCurrent.condition?.text || "";
    temp = apiCurrent.temp_c;
    feels = apiCurrent.feelslike_c;
    humidity = apiCurrent.humidity;
    wind = apiCurrent.wind_kph;
  }
  // OpenWeatherMap structure fallback
  else if (weatherData.weather) {
    main = weatherData.weather[0].main;
    description = weatherData.weather[0].description;
    temp = weatherData.main?.temp;
    feels = weatherData.main?.feels_like;
    humidity = weatherData.main?.humidity;
    wind = weatherData.wind?.speed;
  } else {
    return "Weather information is currently unavailable.";
  }

  let summary = "";

  // Professional descriptions
  if (main.includes("Rain")) summary = "Rainy conditions are expected — carrying an umbrella would be advisable.";
  else if (main.includes("Clear")) summary = "Clear skies with excellent visibility. Ideal weather for outdoor activities.";
  else if (main.includes("Cloud")) summary = "The sky is mostly cloudy with limited sunshine.";
  else if (main.includes("Snow")) summary = "Snowfall is likely. Please ensure warm clothing and take caution while traveling.";
  else if (main.includes("Thunder")) summary = "Thunderstorms are in the area — avoid outdoor exposure if possible.";
  else summary = `Current condition: ${description}.`;

  // Temperature
  if (temp !== undefined) {
    if (temp > 38) summary += ` The temperature is extremely high at ${temp}°C. Stay hydrated and avoid prolonged outdoor exposure.`;
    else if (temp > 30) summary += ` Warm conditions at ${temp}°C, which may feel slightly uncomfortable.`;
    else if (temp >= 22) summary += ` Pleasant conditions around ${temp}°C — comfortable for most activities.`;
    else if (temp >= 12) summary += ` Mildly cool at ${temp}°C. A light layer of clothing should suffice.`;
    else summary += ` Cold conditions at ${temp}°C. Warm clothing is recommended.`;
  }

  // Feels-like
  if (feels && Math.abs(feels - temp) > 2) summary += ` It feels closer to ${feels}°C due to atmospheric conditions.`;

  // Humidity
  if (humidity !== undefined) {
    if (humidity > 85) summary += " The humidity is very high, making the air feel heavy.";
    else if (humidity > 60) summary += " Moderate humidity levels may cause mild discomfort.";
    else if (humidity < 30) summary += " The air is quite dry — consider staying hydrated.";
  }

  // Wind
  if (wind !== undefined) {
    if (wind > 20) summary += " Strong winds are present; caution is advised for outdoor activities.";
    else if (wind > 10) summary += " Moderate winds may be noticeable but manageable.";
    else if (wind > 3) summary += " A light breeze is contributing to comfortable conditions.";
    else summary += " Calm atmosphere with little to no wind.";
  }

  summary += " Please plan your day accordingly and stay safe.";

  return summary;
}
