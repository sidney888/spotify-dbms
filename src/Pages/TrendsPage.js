import Button  from '../Components/Button';
import AnalysisPage from './AnalysisPage';
import React, { useState, useEffect } from 'react';
import './TrendsPage.css';
import Graph from '../Components/Graph';
import axios from "axios";
import { Table } from "react-table";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

const TrendsPage = () => {




    //BUTTON FUNCTIONALITY
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
  
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
  
    const showButton = () => {
      if (window.innerWidth <= 960) {
        setButton(false);
      } else {
        setButton(true);
      }
    };
  
    useEffect(() => {
      showButton();
    }, []);

    
    return (
        <div className="case">
            <h1>Trend Analysis</h1>
        <p className = "getstarted">Here are the trends</p>
        <div className= 'trend'>

        <div className='graphside'>
          <h2>
            Graph
          </h2>
          <Graph></Graph>
         

        </div>
        <div className= 'tableside'>
          <h2>Table</h2>

        </div>
        </div>
        {button && <Button buttonStyle='btn--primary'to='/QueryUs'>New Trend</Button>}
        </div>
    )
}
  
export default TrendsPage;