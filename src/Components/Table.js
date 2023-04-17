import React from 'react';
import './Table.css';

const Table = ({ data }) => {
  const dataArray = data;
  let xIndex, yIndex;
  
  //basically sorts the data to be put in the table same way as the graph.
  if (dataArray[0].length === 2) {
    // check if the input is in [year, value] format
    xIndex = 0;
    yIndex = 1;
    dataArray.sort((a, b) => a[0] - b[0]);
  } else {
    // assume the input is in [month, year, value] format
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

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {dataArray.map((item, index) => (
            <tr key={index}>
              <td>{item[xIndex]}</td>
              <td>{item[yIndex]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
