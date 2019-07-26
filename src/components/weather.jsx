import React from 'react';
import { connect } from 'react-redux';
import idx from 'idx';

import { calCelsius } from '../utilities';
import SmallWeatherBox from './smallWeatherBox';

import './weather.styles.css';

const timeOptions = {
  hour: '2-digit',
  minute: '2-digit'
};

const Weather = (props) => {
  if (props.weatherNow.length === 0) {
    return <p>Loading...</p>;
  } else {
    console.log(props.weatherNow);
    const date = new Date(props.weatherNow[0].dt * 1000);

    return (
      <div className="flex-container">
        <div className="card">
          <div className="cityContainer">
            <p className="cityName">{props.weatherNow[0].name}</p>
            <p className="weatherInfo">{props.weatherNow[0].weather[0].description}</p>
          </div>
          <div className="weatherContainer">
            <img
              className="weatherIcon"
              src={`http://openweathermap.org/img/wn/${props.weatherNow[0].weather[0].icon}@2x.png`}
              alt="weather icon"
            />

            <div className="temp"> {calCelsius(props.weatherNow[0].main.temp)}&deg;C</div>
          </div>
          <div className="dateContainer">
            <p className="date">{date.toLocaleDateString([ 'fi-Fi' ])}</p>
            <p className="timeNow">{date.toLocaleTimeString([ 'fi-Fi' ], timeOptions)}</p>
          </div>
          <div className="detailsContainer">
            <p className="detail">Wind: {props.weatherNow[0].wind.speed} m/s</p>
            <p className="detail">Humidity: {props.weatherNow[0].main.humidity}%</p>
            <div className="detail">Precipitation(3 h): {idx(props, (_) => _.weatherNow[0].rain['3h']) || 0} mm</div>
          </div>
        </div>

        <div className="smallbox">
          <SmallWeatherBox timeId={0} />
          <SmallWeatherBox timeId={1} />
          <SmallWeatherBox timeId={2} />
          <SmallWeatherBox timeId={3} />
          <SmallWeatherBox timeId={4} />
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    weatherNow: state.weatherNow
  };
}

export default connect(mapStateToProps)(Weather);
