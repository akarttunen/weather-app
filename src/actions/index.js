import axios from 'axios';

const API_KEY = 'ba33cb119e0644c699781781734d0592';
const ROOT_URL = 'http://api.openweathermap.org/data/2.5/';

//export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeatherForecast(cityID) {
  const url = `${ROOT_URL}forecast?id=${cityID}&appid=${API_KEY}`;

  return function(dispatch) {
    axios
      .get(url)
      .then((response) => {
        dispatch({ type: 'FETCH_WEATHER_FORECAST', payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function fetchWeatherNow(cityID) {
  const url = `${ROOT_URL}weather?id=${cityID}&appid=${API_KEY}`;

  return function(dispatch) {
    axios
      .get(url)
      .then((response) => {
        dispatch({ type: 'FETCH_WEATHER_NOW', payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function fetchMultipleWeatherNow(cityIds) {
  const url = `${ROOT_URL}group?id=${cityIds.join()}&appid=${API_KEY}`;

  return function(dispatch) {
    axios
      .get(url)
      .then((response) => {
        dispatch({ type: 'FETCH_MULTIPLE_WEATHER', payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
