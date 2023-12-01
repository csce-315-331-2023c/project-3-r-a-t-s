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

interface WeatherCardProps {
  weatherData: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  const iconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;

  return (
    <section>
      <MDBContainer className=" py-2">
        <MDBRow className="justify-content-center align-items-center">
          <MDBCol md="6" lg="5" xl="4" style={{ width: '20vw', maxWidth: '100%' }}>
            <MDBCard className="shadow-0 border" style={{ width: '100%' }}>
              <MDBCardBody className="pt-4 pb-4 pl-0 pr-4">
                <MDBTypography tag="h4" className="mb-1 sfw-normal">
                  College Station, TX
                </MDBTypography>
                <p className="mb-2">
                  Current temperature:{" "}
                  <strong>{weatherData.main.temp}°F</strong>
                </p>
                <p>
                  Feels like: <strong>{weatherData.main.feels_like}°F</strong>
                </p>
                <p>
                  Humidity: <strong>{weatherData.main.humidity}%</strong>
                </p>
                <p>
                  Max: <strong>{weatherData.main.temp_max}°F</strong>, Min:{" "}
                  <strong>{weatherData.main.temp_min}°F</strong>
                </p>

                <div className="d-flex justify-content-center align-items-center">
                  <p className="mb-0 me-4">{weatherData.weather[0].main}</p>
                  <img
                    src={iconUrl}
                    alt="Weather Icon"
                    style={{ width: "3rem" }}
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
