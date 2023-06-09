import Button  from '../Components/Button';
import AnalysisPage from './AnalysisPage';
import React, { useState, useEffect } from 'react';
import './TrendsPage.css';
//import { Line } from 'react-chartjs-2';
import { useLocation } from 'react-router-dom';
import Graph from '../Components/Graph';
import Table from '../Components/Table';
import logo from '../assets/spotify.png';
import { Link, useNavigate } from 'react-router-dom';


  const TrendsPage = () => {
    const data = useLocation().state; //pass this to graph and table to be displayed. 
    return (
      <>
       <div className="profile">
      <Link to="/">
        <img src={logo} alt="Spotify Logo" className="logo" />
        </Link>
        <h1 className="welcome-message">
        STAMP: Spotify Trend Analysis for Musical Professionals</h1>
        </div>
      
              <div className="case">
                  <h1>Trend Analysis</h1>
              <p className = "getstarted">Here are the trends</p>
              <div className= 'trend'>
      
              <div className='graphside'>
                <h2>
                  Graph
                </h2>
               <Graph data={data}/> 
      
              </div>
              <div className= 'tableside'>
                <h2>Table</h2>
                <Table data={data}/>
              </div>
              </div>
              {Button && <Button buttonStyle='btn--primary'to='/QueryUs'>New Trend</Button>}
              </div>

              </>
        )
      }
      export default TrendsPage;
