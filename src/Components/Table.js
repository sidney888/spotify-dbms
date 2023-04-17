import React from 'react';

const data = JSON.parse('[[1965,3038],[1980,9653],[1960,1141],[1966,3313],[1970,5883],[1975,6352],[1969,5729],[1961,703],[1968,4970],[1973,5937],[1977,7187],[1967,3921],[1974,5381],[1976,6949],[1962,1197],[1971,5216],[1963,1402],[1964,1784],[1979,8634],[1978,8173],[1972,5562]]');


const Table = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>Year</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row[0]}</td>
            <td>{row[1]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
