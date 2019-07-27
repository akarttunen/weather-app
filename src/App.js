import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './App.css';

import { fetchWeatherForecast, fetchWeatherNow, fetchMultipleWeatherNow } from './actions';
import Weather from './components/weather';

const cityIds = [ 658225, 655195, 650225, 634964 ];

class App extends Component {
  constructor() {
    super();
    this.state = {
      value: 'all'
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate = () => {
    console.log(this.props);
  };

  handleChange(event) {
    this.setState({ value: event.target.value });

    if (event.target.value === 'all') {
      this.props.FetchMultipleWeatherNow(cityIds);
      console.log('pylly');
    } else {
      this.props.FetchWeatherForecast(event.target.value);
      this.props.FetchWeatherNow(event.target.value);
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
        <div className="wrapper">{value === 'kaikki' ? null : <Weather value={this.state.value} />}</div>
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
      FetchWeatherNow: fetchWeatherNow,
      FetchMultipleWeatherNow: fetchMultipleWeatherNow
    },
    dispatch
  );
}

export default connect(mapStateToProps, matchDispatchToProps)(App);
