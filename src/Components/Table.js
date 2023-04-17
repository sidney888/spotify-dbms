import React from 'react';
import './Table.css';

const Table = ({ data }) => {
  const dataArray = data;
  const year_only = dataArray[0].length === 2;
  
  //basically sorts the data to be put in the table same way as the graph.
  if (year_only) {
    // check if the input is in [year, value] format
    dataArray.sort((a, b) => a[0] - b[0]);
  } else {
    // assume the input is in [month, year, value] format
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
	    {year_only ? "" : <th>Month</th>}
            <th>Year</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {dataArray.map((item, index) => (
            <tr key={index}>
              <td>{item[0]}</td>
              <td>{item[1]}</td>
	      {year_only ? "" : <td>{item[2]}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
