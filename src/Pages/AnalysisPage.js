import React, { useState, useEffect } from 'react';
import Dropdown from '../Components/Dropdown';
import Button from '../Components/Button';
import './AnalysisPage.css';

class Query {
  static lastID = 0; //keeps track of queryIDs.


  constructor(frequency, metric, type, name) {
    this.name = name; //stores the name of the query as a string
    this.frequency = frequency; //stores the selected frequency from the dropdown
    this.metric = metric; //stores the selected metric from the dropdown.
    this.type = type; //stores selected type from dropdown
    this.queryID = ++Query.lastID; //This can be generated when the object is created.
  }
}

function AnalysisPage ({data}) {

  //Queries
  const [selectedFrequency, setSelectedFrequency] = useState('Select');
  const frequencies = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

  const [selectedQueryID, setSelectedQueryID] = useState(null);

  const [selectedMetric, setSelectedMetric] = useState('Select');
  const metrics = [
    'Average Danceability',
    'Average Energy',
    'Average Liveness',
    'Average Valence',
    'Volume',
  ];

  const [selectedType, setSelectedType] = useState('Select');
  const type = ['Tracks', 'Albums'];
  

  const [name, setName] = useState('')


  //Conditions
  const [conditions, setConditions] = useState([{ metrix: '', operator: '', value: '' }]);

  const addCondition = () => {
    setConditions([...conditions, { metrix: '', operator: '', value: '' }]);
  };

  const updateCondition = (index, field, value) => {
    const newConditions = [...conditions];
    newConditions[index][field] = value;
    setConditions(newConditions);
  };

  //Button (NAVIGATION)
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


  //List 
  const [list, setList] = useState([]);
  const handleAddItem = () => {
    const newQueryID = Query.lastID + 1; // generate new ID based on previous one
    const newQuery = new Query(selectedFrequency, selectedMetric, selectedType, name.name.toString(), newQueryID);
    Query.lastID = newQueryID; // update lastID to new ID
    setList([...list, newQuery]);
    setName({name: ''});
  };
  //when a query is selected.
  const handleSelectQuery = (Query) => {
    setSelectedQueryID(Query.queryID);
    setSelectedMetric(Query.metric);
    setSelectedFrequency(Query.frequency);
    setSelectedType(Query.type);
    
    setName({ name: Query.name });
  };

  const handleEditQuery = () => {
    const updatedList = list.map((query) => {
      if (query.queryID === selectedQueryID) {
        return new Query(selectedFrequency, selectedMetric, selectedType, name.name.toString(), selectedQueryID);
      } else {
        return query;
      }
    });
    setList(updatedList);
    setSelectedQueryID(null);
    setSelectedFrequency('');
    setSelectedMetric('');
    setSelectedType('');
    setName({ name: '' });
  };
  
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
          <div className='freq'>
            <h3>Frequency:   </h3>
          <Dropdown
            className="Frequency"
            selectedOption={selectedFrequency}
            options={frequencies}
            onOptionClick={(frequency) => setSelectedFrequency(frequency)}
          />
          </div>
          <div className='met'>
            <h3>Metric:   </h3>          
          <Dropdown
            className="Metric"
            selectedOption={selectedMetric}
            options={metrics}
            onOptionClick={(metric) => setSelectedMetric(metric)}
          />
          </div>
          <div className='typ'>
            <h3>Type:   </h3>
          <Dropdown
            className="Type"
            selectedOption={selectedType}
            options={type}
            onOptionClick={(queryType) => setSelectedType(queryType)}
          />
          </div>
          <div className='names'>
            <h3>Query Name: </h3>
          <input
          type="name"
          value={name.name || ''}
          onChange={(event) => {
            setName({ ...name, name: event.target.value });
          }}
          />
          </div>
          <button onClick={handleAddItem}>Add Query</button>
    
        </div>
        <div className='queries'>
  {list.map((query, index) => (
    <div key={query.queryID}>
      <p>
        {index + 1}: {query.name}, {query.type}, {query.frequency}
      </p>
      <button onClick={() => handleSelectQuery(query)}>Edit</button>
      <button onClick={() => handleEditQuery(query)}>
        Save Changes
      </button>
    </div>
  ))}
</div>
      </div>

      <div className="create-conditions">
        <h2>Create Conditions</h2>
        {conditions.map((condition, index) => (
          <div key={index} className="condition">
            <div className='met'>
              <h3>Metric:   </h3>
            <Dropdown
              className="Metric"
              selectedOption={condition.metrix}
              options={metrics}
              onOptionClick={(metric) => updateCondition(index, 'metric', metric)}
            />
            </div>
            <div className= 'operator'> 
            <h3>Comparison:   </h3>
            <Dropdown
              className="Operator"
              selectedOption={condition.operator}
              options={['>', '<', '=', '≠']}
              onOptionClick={(operator) => updateCondition(index, 'operator', operator)}
            />
            </div>
            <div className='input'>
              <h3>Value: </h3>
            <input
              type="num"
              placeholder="Value"
              value={condition.value}
              onChange={(e) => updateCondition(index, '', e.target.value)}
            />
            </div>
          </div>
        ))}
        <Button onClick={addCondition}>Add Condition</Button>
      </div>
    </div>
    </>
  );
};

export default AnalysisPage;
