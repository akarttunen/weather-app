import { combineReducers } from 'redux';
import WeatherForecastReducer from './reducer_weather_forecast';
import WeatherNowReducer from './reducer_weather_now';
import MultipleWeatherReducer from './reducer_multiple_weather';

const rootReducer = combineReducers({
  weatherForecast: WeatherForecastReducer,
  weatherNow: WeatherNowReducer,
  multipleWeather: MultipleWeatherReducer
});

export default rootReducer;
