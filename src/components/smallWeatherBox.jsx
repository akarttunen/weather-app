import React from 'react';
import { connect } from 'react-redux';
import idx from 'idx';

import { calCelsius } from '../utilities';

import './smallWeatherBox.styles.css';

const timeOptions = {
  hour: '2-digit',
  minute: '2-digit'
};

const SmallWeatherBox = (props) => {
  const { timeId, value, weatherForecast } = props;

  const weatherObj = weatherForecast.find((x) => x.city.id === value);
  console.log(weatherObj);
  const boxClass = `box${timeId}`;
  if (weatherObj === undefined) {
    return null;
  } else {
    const date = new Date(weatherObj.list[timeId].dt * 1000);
    return (
      <div className={boxClass}>
        <p className="small-time">{date.toLocaleTimeString([ 'fi-Fi' ], timeOptions)}</p>
        <img
          className="small-icon"
          src={`http://openweathermap.org/img/wn/${weatherObj.list[timeId].weather[0].icon}@2x.png`}
          alt="weather icon"
        />
        <p className="small-temp">{calCelsius(weatherObj.list[timeId].main.temp)}&deg;C</p>
        <div className="small-details">
          <p className="small-wind">{weatherObj.list[timeId].wind.speed} m/s</p>
          <p className="small-humid">{weatherObj.list[timeId].main.humidity}%</p>
          <p className="small-precip">{idx(props, (_) => _.weatherObj.list[timeId].rain['3h']) || 0} mm</p>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    weatherForecast: state.weatherForecast
  };
}

export default connect(mapStateToProps)(SmallWeatherBox);
