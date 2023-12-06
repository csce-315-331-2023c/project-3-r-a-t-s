import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInputGroup,
  MDBRadio,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

/**
 * Represents the structure of weather data received from the OpenWeatherMap API.
 * @typedef {Object} WeatherData
 * @property {Object} main - Main weather information.
 * @property {number} main.temp - Temperature.
 * @property {number} main.feels_like - Feels like temperature.
 * @property {number} main.temp_min - Minimum temperature.
 * @property {number} main.temp_max - Maximum temperature.
 * @property {number} main.pressure - Atmospheric pressure.
 * @property {number} main.humidity - Humidity percentage.
 * @property {number} main.sea_level - Sea level pressure.
 * @property {number} main.grnd_level - Ground level pressure.
 * @property {Object[]} weather - Weather information array.
 * @property {number} weather[].id - Weather condition ID.
 * @property {string} weather[].main - Main weather condition.
 * @property {string} weather[].description - Weather condition description.
 * @property {string} weather[].icon - Weather condition icon ID.
 * @property {Object} wind - Wind information.
 * @property {number} wind.speed - Wind speed.
 * @property {number} wind.deg - Wind direction in degrees.
 * @property {number} wind.gust - Wind gust speed.
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
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
}

/**
 * Props for the WeatherCard component.
 * @typedef {Object} WeatherCardProps
 * @property {WeatherData} weatherData - Weather data to be displayed.
 */
interface WeatherCardProps {
  weatherData: WeatherData;
}

/**
 * Functional component for displaying weather information in a card.
 * @param {WeatherCardProps} props - The props containing weather data.
 * @returns {JSX.Element} The WeatherCard component.
 */
const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  const iconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;

  return (
    <section>
      <MDBContainer className=" py-2">
        <MDBRow className="justify-content-center align-items-center">
          <MDBCol md="6" lg="5" xl="4" style={{ width: '20vw', maxWidth: '100%' }}>
            <MDBCard style={{ width: '100%', border: "5px solid black", boxShadow: "10px 5px 5px black" }}>
              <MDBCardBody className="pt-4 pb-4 pl-0 pr-4" >
                <MDBTypography tag="h4" className="mb-1 sfw-normal">
                  <b><u>College Station, TX</u></b>
                </MDBTypography>
                <p className="mb-2" style={{fontSize: "5vh", }}>
                  {" "}
                  <strong>{weatherData.main.temp}°F</strong>
                </p>
                {/* <p>
                  Feels like: <strong>{weatherData.main.feels_like}°F</strong>
                </p>
                <p>
                  Humidity: <strong>{weatherData.main.humidity}%</strong>
                </p>
                <p>
                  Max: <strong>{weatherData.main.temp_max}°F</strong>, Min:{" "}
                  <strong>{weatherData.main.temp_min}°F</strong>
                </p> */}

                <div className="d-flex justify-content-center align-items-center">
                  <p className="mb-0 me-4" style={{fontSize: "3vh"}}> <b>{weatherData.weather[0].main}</b></p>
                  <img
                    src={iconUrl}
                    alt="Weather Icon"
                    style={{ width: "5vw" }}
                  />
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default WeatherCard;
