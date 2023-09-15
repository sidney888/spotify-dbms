import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';

const Graph = ({data}) => {
  //const dataString = '[[1965,3038],[1980,9653],[1960,1141],[1966,3313],[1970,5883],[1975,6352],[1969,5729],[1961,703],[1968,4970],[1973,5937],[1977,7187],[1967,3921],[1974,5381],[1976,6949],[1962,1197],[1971,5216],[1963,1402],[1964,1784],[1979,8634],[1978,8173],[1972,5562]]'

  //const dataArray = JSON.parse(dataString);
  const dataArray = data;
  let xLabel, xIndex, yIndex;
  const year_only = dataArray[0].length === 2;

  if (dataArray[0].length === 2) { // check if the input is in [year, value] format
    xLabel = 'Year';
    xIndex = 0;
    yIndex = 1;
    dataArray.sort((a, b) => a[0] - b[0]);
  } else { // assume the input is in [month, year, value] format
    xLabel = 'Month/Year';
    xIndex = 1;
    yIndex = 2;
    dataArray.sort((a, b) => {
      // compare year
      if (a[1] !== b[1]) {
        return a[1] - b[1];
      }
      // compare month if years are equal
      return a[0] - b[0];
    });
  }
  //labels depend on the input from the queries
  let labels;
  if(dataArray[0].length === 2){
    labels: dataArray.map((item) => item[xIndex].toString()) // use year or month/year as label depending on the format
  } else {
    labels: dataArray.map((item) => item.length === 3 ? `${item[0]}/${item[1]}` : item[1].toString())
  }

    data = {
    /*labels: dataArray.map((item) => {
      if(item.length === 2){
        return item[xIndex].toString(); // use year or month/year as label depending on the format
      } else {
        return item.length === 3 ? `${item[0]}/${item[1]}` : item[1].toString();
      }
    }),*/
    //labels: dataArray.map((item) => item[xIndex].toString()), // use year or month/year as label depending on the format
    datasets: [
      {
        label: 'My Trend Query',
        data: dataArray.map((item) => ({x: year_only ? `${item[0]}` : `${item[1]}-${item[0]}`, y: item[yIndex]})), // use value as data for all formats
        borderColor: 'green',
        fill: false,
      },
    ],
  };


  const canvasRef = useRef(null);
  const unit = year_only ? 'year' : 'month';
  //display the graph
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
	      scales: {
		      xAxis: {
			      type: 'time',
			      time: {
				      unit: unit
			      }
		      }
	      }
      }
    });
    return () => {
      chart.destroy();
    };
  }, [data]);

  return <canvas ref={canvasRef} />;
};

export default Graph;
