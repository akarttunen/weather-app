const fetchMultipleWeather = (state = [], action) => {
  if (action.type === 'FETCH_MULTIPLE_WEATHER') {
    state = [ action.payload, ...state ];
  }
  return state;
};

export default fetchMultipleWeather;
