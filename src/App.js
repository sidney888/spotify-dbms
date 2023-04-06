import React, { Component } from 'react';
import logo from './assets/spotify.png';
import './App.css';
import './styles.css';
class App extends Component {
  render() {
    return (
      <div className="App">
        <img src={logo} alt="Spotify Logo" className="logo" />
        <h1 className="welcome-message">Welcome to CIS4301 DataBases Project</h1>
      </div>
    );
  }
}




export default App;
