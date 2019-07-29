import React from 'react';
import { connect } from 'react-redux';
import idx from 'idx';
import * as R from 'ramda';

import { calCelsius } from '../utilities';
import SmallWeatherBox from './smallWeatherBox';

import './weather.styles.css';

const timeOptions = {
  hour: '2-digit',
  minute: '2-digit'
};

const Weather = (props) => {
  const value = parseInt(props.value);
  const firstLetterUp = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const weatherObj = R.find(R.propEq('id', value))(props.weatherNow);
  if (weatherObj === undefined) {
    return <p>Loading...</p>;
  } else {
    const date = new Date(weatherObj.dt * 1000);
    return (
      <div className="flex-container">
        <div className="card">
          <div className="cityContainer">
            <p className="cityName">{weatherObj.name}</p>
            <p className="weatherInfo">{firstLetterUp(weatherObj.weather[0].description)}</p>
          </div>
          <div className="weatherContainer">
            <img
              className="weatherIcon"
              src={`http://openweathermap.org/img/wn/${weatherObj.weather[0].icon}@2x.png`}
              alt="weather icon"
            />

            <div className="temp"> {calCelsius(weatherObj.main.temp)}&deg;C</div>
          </div>
          <div className="dateContainer">
            <p className="date">{date.toLocaleDateString([ 'fi-Fi' ])}</p>
            <p className="timeNow">{date.toLocaleTimeString([ 'fi-Fi' ], timeOptions)}</p>
          </div>
          <div className="detailsContainer">
            <div className="detail">
              Wind: {weatherObj.wind.speed} m/s<br />
              Humidity: {weatherObj.main.humidity}%<br />
              Precipitation(3 h): {idx(props, (_) => _.weatherObj.rain['3h']) || 0} mm
            </div>
          </div>
        </div>

        <div className="smallbox">
          <SmallWeatherBox timeId={0} value={value} />
          <SmallWeatherBox timeId={1} value={value} />
          <SmallWeatherBox timeId={2} value={value} />
          <SmallWeatherBox timeId={3} value={value} />
          <SmallWeatherBox timeId={4} value={value} />
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
