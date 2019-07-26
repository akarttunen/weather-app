const fetchWeatherForecast = (state = [], action) => {
  if (action.type === 'FETCH_WEATHER_FORECAST') {
    state = [ action.payload, ...state ];
  }
  return state;
};

export default fetchWeatherForecast;
