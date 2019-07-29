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
      value: 'all'
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount = () => {
    this.fetchData();
  };

  handleChange(event) {
    this.setState({ value: event.target.value });
    this.fetchData();
  }

  fetchData() {
    if (this.state.value === 'all') {
      this.props.FetchWeatherForecast('658225');
      this.props.FetchWeatherForecast('655195');
      this.props.FetchWeatherForecast('650225');
      this.props.FetchWeatherForecast('634964');
      this.props.FetchWeatherNow('658225');
      this.props.FetchWeatherNow('655195');
      this.props.FetchWeatherNow('650225');
      this.props.FetchWeatherNow('634964');
    } else {
      this.props.FetchWeatherForecast(this.state.value);
      this.props.FetchWeatherNow(this.state.value);
    }
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
            <option value="all">Kaikki</option>
            <option value="658225">Helsinki</option>
            <option value="655195">Jyväskylä</option>
            <option value="650225">Kuopio</option>
            <option value="634964">Tampere</option>
          </select>
        </div>
        <div className="wrapper">
          {value === 'all' ? (
            <div>
              <Weather value={'658225'} />
              <Weather value={'655195'} />
              <Weather value={'650225'} />
              <Weather value={'634964'} />
            </div>
          ) : (
            <Weather value={this.state.value} />
          )}
        </div>
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
  return bindActionCreators(
    {
      FetchWeatherForecast: fetchWeatherForecast,
      FetchWeatherNow: fetchWeatherNow
    },
    dispatch
  );
}

export default connect(mapStateToProps, matchDispatchToProps)(App);
