import React, { useState, useEffect } from "react";
import axios from "axios";

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
}

const WeatherComponent = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = "72bd4125242c0475a4f897487a204584";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=College%20Station,TX,USA&appid=${apiKey}&units=imperial`;

      try {
        const response = await axios.get(url);
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data", error);
      }
    };

    fetchWeather();
  }, []);

  if (!weather) return <div>Loading weather...</div>;

  return (
    <div>
      <h3>Current Weather in College Station, TX</h3>
      <p>Temperature: {weather.main.temp}°F</p>
    </div>
  );
};

export default WeatherComponent;
