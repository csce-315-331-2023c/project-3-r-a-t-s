import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "./WeatherCard";

/**
 * Represents the structure of weather data received from the OpenWeatherMap API.
 */
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
  },
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[],
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
}

/**
 * Functional component for displaying weather information.
 */
const WeatherComponent = () => {
  /**
   * State variable to store the weather data.
   * @type {WeatherData | null}
   */
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    /**
     * Fetches weather data from the OpenWeatherMap API.
     */
    const fetchWeather = async () => {
      const apiKey = "72bd4125242c0475a4f897487a204584";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=College%20Station,TX,USA&appid=${apiKey}&units=imperial`;

      try {
        const response = await axios.get(url);
        setWeather(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching weather data", error);
      }
    };

    fetchWeather();
  }, []);

  // If weather data is not available, display a loading message
  if (!weather) return <div>Loading weather...</div>;
  
  // Render WeatherCard component with weather data
  return <WeatherCard weatherData={weather} />;

  // return (
  //   <div>
  //     <p>Icon: {weather.weather.icon}</p>
  //     <p>Temperature: {weather.main.temp}°F</p>
  //     <p>Feels like: {weather.main.feels_like}°F</p>
  //     <p>Humidity: {weather.main.humidity}%</p>
  //     <p>Wind Speed: {weather.wind.speed}</p>
  //   </div>
  // );
};

export default WeatherComponent;
