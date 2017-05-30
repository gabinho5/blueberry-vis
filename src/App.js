import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ChartsContainer from './components/ChartsContainer';
import {StyleRoot} from 'radium';

class App extends Component {
  render() {
    return (
      <StyleRoot>
        <div className="App">
          <ChartsContainer/>
        </div>
      </StyleRoot>
    );
  }
}

export default App;
