import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './App.css';

import { fetchWeatherForecast, fetchWeatherNow } from './actions';
import Weather from './components/weather';

class App extends Component {
  constructor() {
    super();
    this.state = {
      value: 'kaikki'
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate = () => {
    console.log(this.props);
  };

  handleChange(event) {
    this.setState({ value: event.target.value });
    this.props.FetchWeatherForecast(event.target.value);
    this.props.FetchWeatherNow(event.target.value);
  }

  render() {
    const { value } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <p className="headerText">Säätutka</p>
        </header>
        <div className="selectDiv">
          <select className="custom-select" value={this.state.value} onChange={this.handleChange}>
            <option value="kaikki">Kaikki</option>
            <option value="658225">Helsinki</option>
            <option value="655195">Jyväskylä</option>
            <option value="650225">Kuopio</option>
            <option value="634964">Tampere</option>
          </select>
        </div>
        <div className="wrapper">{value === 'kaikki' ? null : <Weather />}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    weatherForecast: state.weatherForecast,
    weatherNow: state.weatherNow
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ FetchWeatherForecast: fetchWeatherForecast, FetchWeatherNow: fetchWeatherNow }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(App);
