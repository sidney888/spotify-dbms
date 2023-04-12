import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Switch } from "react-router-dom";
import logo from './assets/spotify.png';
import './App.css';
import './styles.css';
import Button from './Components/Button';
import AnalysisPage from './Pages/AnalysisPage';
import Home from './Pages/Home';
import TrendsPage from './Pages/TrendsPage';

class App extends Component {
  render() {
    return (
      <div>        
        <Router>
          <Routes>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "/QueryUs" element = {<AnalysisPage />} />
          <Route path ="/TrendsPage" element = {<TrendsPage />} />
          </Routes>
        </Router>
        </div>
      
    );
  }
}
export default App;
