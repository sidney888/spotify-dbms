import React, { useState, useEffect } from 'react';
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

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);


  return (
    <>
    <h1>
      Input for Trend Analysis
    </h1>
    <p>
    In the Create Queries section, pick the frequency, metric, and type from the respective dropdown menus.
    <br/>The Create Conditions section can help narrow your search. Add conditions and comparisions with specific values. 

    </p>
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
          {button && <Button buttonStyle='btn--primary'to='/TrendsPage'>Create Trend</Button>}
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
    </>
  );
};

export default AnalysisPage;
