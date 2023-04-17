// import Button  from '../Components/Button';
// import AnalysisPage from './AnalysisPage';
// import React, { useState, useEffect } from 'react';
// import './TrendsPage.css';
// import Graph from '../Components/Graph';
// import { Table } from "react-table";


 
// const TrendsPage = () => {
//   const [data, setData] = useState([]);
//   const xData = [1965, 1980, 1960, 1966, 1970, 1975, 1969, 1961, 1968, 1973, 1977, 1967, 1974, 1976, 1962, 1971, 1963, 1964, 1979, 1978, 1972];
//   const yData = [3038, 9653, 1141, 3313, 5883, 6352, 5729, 703, 4970, 5937, 7187, 3921, 5381, 6949, 1197, 5216, 1402, 1784, 8634, 8173, 5562];


//     //BUTTON FUNCTIONALITY
//     const [click, setClick] = useState(false);
//     const [button, setButton] = useState(true);
  
//     const handleClick = () => setClick(!click);
//     const closeMobileMenu = () => setClick(false);
  
//     const showButton = () => {
//       if (window.innerWidth <= 960) {
//         setButton(false);
//       } else {
//         setButton(true);
//       }
//     };
  
//     useEffect(() => {
//       showButton();
//     }, []);

    
//     return (
//         <div className="case">
//             <h1>Trend Analysis</h1>
//         <p className = "getstarted">Here are the trends</p>
//         <div className= 'trend'>

//         <div className='graphside'>
//           <h2>
//             Graph
//           </h2>
//           <Graph xData ={xData} yData={yData}/>
         

//         </div>
//         <div className= 'tableside'>
//           <h2>Table</h2>

//         </div>
//         </div>
//         {button && <Button buttonStyle='btn--primary'to='/QueryUs'>New Trend</Button>}
//         </div>
//     )
// }
// //export the selected query so when we graph we can get the name and metric for the query on the graph.

import Button  from '../Components/Button';
import AnalysisPage from './AnalysisPage';
import React, { useState, useEffect } from 'react';
import './TrendsPage.css';
import { Line } from 'react-chartjs-2';
import Graph from '../Components/Graph';


  const TrendsPage = () => {
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
      
              </div>
              </div>
              {Button && <Button buttonStyle='btn--primary'to='/QueryUs'>New Trend</Button>}
              </div>
        )
      }
      export default TrendsPage;