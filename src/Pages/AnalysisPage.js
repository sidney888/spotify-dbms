import React, { useState } from 'react';
import Dropdown from '../Components/Dropdown';
import Button from '../Components/Button';
import './AnalysisPage.css';

const AnalysisPage = () => {
  const [selectedOption, setSelectedOption] = useState('Frequency');
  const options = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

  const [selectedMetric, setSelectedMetric] = useState('Metric');
  const metrics = [
    'Average Danceability',
    'Average Energy',
    'Average Liveness',
    'Average Valence',
    'Volume',
  ];

  const [selectedType, setSelectedType] = useState('Query Type');
  const type = ['Tracks', 'Albums'];

  const [conditions, setConditions] = useState([{ metric: '', operator: '', value: '' }]);

  const addCondition = () => {
    setConditions([...conditions, { metric: '', operator: '', value: '' }]);
  };

  const updateCondition = (index, field, value) => {
    const newConditions = [...conditions];
    newConditions[index][field] = value;
    setConditions(newConditions);
  };

  return (
    <div className="analysis-page">
      <div className="create-queries">
        <h2>Create Queries</h2>
        <div className="query-options">
          <Dropdown
            className="Frequency"
            selectedOption={selectedOption}
            options={options}
            onOptionClick={(option) => setSelectedOption(option)}
          />
          <Dropdown
            className="Metric"
            selectedOption={selectedMetric}
            options={metrics}
            onOptionClick={(metric) => setSelectedMetric(metric)}
          />
          <Dropdown
            className="Type"
            selectedOption={selectedType}
            options={type}
            onOptionClick={(queryType) => setSelectedType(queryType)}
          />
          <Button to="TrendsPage">Create Analysis</Button>
        </div>
      </div>

      <div className="create-conditions">
        <h2>Create Conditions</h2>
        {conditions.map((condition, index) => (
          <div key={index} className="condition">
            <Dropdown
              className="Metric"
              selectedOption={condition.metric}
              options={metrics}
              onOptionClick={(metric) => updateCondition(index, 'metric', metric)}
            />
            <Dropdown
              className="Operator"
              selectedOption={condition.operator}
              options={['>', '<', '=', '≠']}
              onOptionClick={(operator) => updateCondition(index, 'operator', operator)}
            />
            <input
              type="text"
              placeholder="Value"
              value={condition.value}
              onChange={(e) => updateCondition(index, 'value', e.target.value)}
            />
          </div>
        ))}
        <Button onClick={addCondition}>Add Condition</Button>
      </div>
    </div>
  );
};

export default AnalysisPage;
