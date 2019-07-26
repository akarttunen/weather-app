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
  const { timeId } = props;
  const boxClass = `box${timeId}`;
  //console.log(props.weatherForecast[0].list[timeId]);
  if (props.weatherForecast.length === 0) {
    return null;
  } else {
    const date = new Date(props.weatherForecast[0].list[timeId].dt * 1000);
    return (
      <div className={boxClass}>
        <p className="small-time">{date.toLocaleTimeString([ 'fi-Fi' ], timeOptions)}</p>
        <img
          className="small-icon"
          src={`http://openweathermap.org/img/wn/${props.weatherForecast[0].list[timeId].weather[0].icon}@2x.png`}
          alt="weather icon"
        />
        <p className="small-temp">{calCelsius(props.weatherForecast[0].list[timeId].main.temp)}&deg;C</p>
        <div className="small-details">
          <p className="small-wind">{props.weatherForecast[0].list[timeId].wind.speed} m/s</p>
          <p className="small-humid">{props.weatherForecast[0].list[timeId].main.humidity}%</p>
          <p className="small-precip">{idx(props, (_) => _.weatherForecast[0].list[timeId].rain['3h']) || 0} mm</p>
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
