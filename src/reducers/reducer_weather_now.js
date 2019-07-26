const fetchWeather = (state = [], action) => {
  if (action.type === 'FETCH_WEATHER_NOW') {
    state = [ action.payload, ...state ];
  }
  return state;
};

export default fetchWeather;
