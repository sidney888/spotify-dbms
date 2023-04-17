import Button  from '../Components/Button';
import AnalysisPage from './AnalysisPage';
import React, { useState, useEffect } from 'react';
import './TrendsPage.css';
import { Line } from 'react-chartjs-2';
import { useLocation } from 'react-router-dom';
import Graph from '../Components/Graph';
import Table from '../Components/Table';

  const TrendsPage = () => {
    const data = useLocation().state;
    return (
              <div className="case">
                  <h1>Trend Analysis</h1>
              <p className = "getstarted">Here are the trends</p>
              <div className= 'trend'>
      
              <div className='graphside'>
                <h2>
                  Graph
                </h2>
               <Graph />
      
              </div>
              <div className= 'tableside'>
                <h2>Table</h2>
                <Table />
              </div>
              </div>
              {Button && <Button buttonStyle='btn--primary'to='/QueryUs'>New Trend</Button>}
              </div>
        )
      }
      export default TrendsPage;
