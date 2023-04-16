import Chart from 'chart.js';
import React, {useRef, useEffect, useState} from 'react';

function Graph(props) {
  const [data, setData] = useState([]);

  const dataString ='';
  const dataArray =[];

  useEffect(() => {
    fetch()
    .then(response =>response.json)()
    .then (data=> {
        dataArray =JSON.parse(dataString);
        setData(dataArray);
    })
    .catch(error =>{
        console.error('Error fetching data', error);
    });
  }, []);

  return(
    <div>
        <h1> GRAPHHHH</h1>
        <Graph data ={data}></Graph>
    </div>
  )
  
  
  
  
  
}
export default Graph;
