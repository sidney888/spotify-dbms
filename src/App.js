import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Switch } from "react-router-dom";
import logo from './assets/spotify.png';
import './App.css';
import './styles.css';
import Button from './Button';
import AnalysisPage from './AnalysisPage';
import Home from './Home';

class App extends Component {
  render() {
    return (
      <div>        
        <Router>
          <Routes>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "/QueryUs" element = {<AnalysisPage />} />
          </Routes>
        </Router>
        </div>
      
    );
  }
}
export default App;
