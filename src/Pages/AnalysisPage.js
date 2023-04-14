import React, { useState } from 'react';
import Dropdown from "../Components/Dropdown";
import Button from '../Components/Button';

const AnalysisPage = () => {
  const [selectedOption, setSelectedOption] = useState('Frequency');
  const options = ['Daily', 'Weekly', 'Monthly', 'Yearly'];
  const [selectedMetric, setSelectedMetric] = useState('Metric');
  const metrics = ['Average Dancability', 'Average Energy', 'Average Liveness', 'Average Valence', 'Volume'];
  const [selectedType, setSelectedType] = useState('Query Type');
  const type = ['Tracks', 'Albums'];
  
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleMetricClick = (metric) => {
    setSelectedMetric(metric);
  };
  
  return (
    <div className="analysis">
      <h1 className="input">Input for Trend Analysis</h1>
      <p className="welcome-paragraph">
        From the Dropdown menu, adjust the trend question you would like to be analyzed, then click “Create Analysis” to view your trend.
      </p>
      <Dropdown className="Frequency"
        selectedOption={selectedOption}
        options={options}
        onOptionClick={handleOptionClick}
      />  
      <Dropdown className="Metric"
        selectedOption={selectedMetric}
        options={metrics}
        onOptionClick={handleMetricClick}
      /> 
      <Dropdown className="Type"
        selectedOption={selectedType}
        options={type}
        onOptionClick={(option) => setSelectedType(option)}
      /> 
      <Button to="TrendsPage">Create Analysis</Button>
    </div>
  )
}

export default AnalysisPage;
