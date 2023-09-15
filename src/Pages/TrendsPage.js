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
    const [loading, setLoading] = useState(null);
    useEffect(() => {
	    setLoading("Loading...");
	    let numer = 0;
	    const idx = data[0].length - 1;
	    const data2 = (idx == 1) ? data : data.map((item) => [item[0]/12 + item[1], item[2]]);
	    console.log(data2);
	    const n = data2.length;
	    for (let i = 1; i < n; i++) {
		    for (let j = 0; j < i; j++) {
			    numer += Math.sign(data2[i][0] - data2[j][0]) * Math.sign(data2[i][1] - data2[j][1]);
		    }
	    }
	    setLoading(`Kendall rank correlation coefficient: ${numer / (n * (n - 1) / 2)}`);
    });
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
	      <p>{!loading ? "" : loading}</p>
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
