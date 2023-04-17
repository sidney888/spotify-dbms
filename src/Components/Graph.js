import React from 'react';
import { Line } from 'react-chartjs-2';

const Graph = ({ xData, yData }) => {
  const state = {
    labels: xData,
    datasets: [
      {

        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: yData,
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: 'Graph Title',
      fontSize: 20,
    },
    legend: {
      display: true,
      position: 'right',
    },
    scales: {
      xAxes: [
        {
          type: 'linear',
          position: 'bottom',
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div>
      <Line data={state} options={{
          title: {
            display: true,
            text: 'TITLE',
            fontSize: 20
          },
          legend: {
            display: true,
            position: 'right'
          }
        }} />
    </div>
  );
};

export default Graph;
