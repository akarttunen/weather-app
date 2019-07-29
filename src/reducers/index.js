import { combineReducers } from 'redux';
import WeatherForecastReducer from './reducer_weather_forecast';
import WeatherNowReducer from './reducer_weather_now';

const rootReducer = combineReducers({
  weatherForecast: WeatherForecastReducer,
  weatherNow: WeatherNowReducer
});

export default rootReducer;
