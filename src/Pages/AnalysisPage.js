import React, { useState, useEffect } from 'react';
import Dropdown from '../Components/Dropdown';
import Button from '../Components/Button';
import { query_metrics_track, query_metrics_album, aggregate_metrics_track, aggregate_metrics_album, condition_metrics_track, condition_metrics_album } from '../assets/metrics.js';
import { Link } from 'react-router-dom';
import './AnalysisPage.css';

class Query {
  static lastID = 0; //keeps track of queryIDs.

  constructor(frequency, metric, type, name, queryID, conditions) {
    this.name = name; //stores the name of the query as a string
    this.frequency = frequency; //stores the selected frequency from the dropdown
    this.metric = metric; //stores the selected metric from the dropdown.
    this.type = type; //stores selected type from dropdown
    this.queryID = queryID || ++Query.lastID; //This can be generated when the object is created.
    this.conditions = conditions; //list of condition objects
  }


}

class Condition {
  constructor(cname, cmetric, operator, agg_function, agg_metric, cvalue, qID) {
    this.cname = cname;
    this.cmetric = cmetric;
    this.operator = operator;
    this.agg_function = agg_function;
    this.agg_metric = agg_metric;
    this.cvalue = cvalue;
    this.qID = qID;

  }
}

function AnalysisPage({ data }) {

  //Queries

  //set queryFrequency
  const [selectedFrequency, setSelectedFrequency] = useState('Select');
  const frequencies = ['Daily', 'Monthly', 'Yearly'];
  //set queryID
  const [selectedQueryID, setSelectedQueryID] = useState(null);
  const [selectedQuery, setSelectedQuery] = useState(null); // keeps track of the selected query. 
  //set query metric

  const type = ['Tracks', 'Albums']; //set query type
  const [selectedType, setSelectedType] = useState('Select');
  


  const [selectedMetric, setSelectedMetric] = useState('Select');
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    if(selectedType){
      if (selectedType === 'Tracks') {
        setMetrics(query_metrics_track);
      } else if (selectedType === 'Albums') {
        setMetrics(query_metrics_album);
      }
    }
    
  }, [selectedType]);

  
  
  //set query name
  const [name, setName] = useState('')

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

  const [errorMessage, setErrorMessage] = useState('');
  //List of queries 
  const [list, setList] = useState([]);
  const handleAddItem = () => {
    if (name.name == '') {
      setErrorMessage('Please name your query');
    } else {
      const newQueryID = Query.lastID + 1; // generate new ID based on previous one
      const newQuery = new Query(selectedFrequency, selectedMetric, selectedType, name.name.toString(), newQueryID);
      Query.lastID = newQueryID; // update lastID to new ID
      setList([...list, newQuery]);
      setName({ name: '' });
    }

  };
  //when a query is selected.
  const handleSelectQuery = (Query) => {
    setSelectedQueryID(Query.queryID);
    setSelectedMetric(Query.metric);
    setSelectedFrequency(Query.frequency);
    setSelectedType(Query.type);
    setSelectedQuery(Query);

    setName({ name: Query.name });
  };


  //when a query is edited
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



  //Conditions
  const [conditions, setConditions] = useState([]);
  const [cname, setcname] = useState('');

  const [selectedcmetric, setSelectedcmetric] = useState('Select');
  const [cmetrics, setcmetrics] = useState([]);

  const [selectedoperator, setSelectedOperator] = useState('Select');
  const operators = ['>', '<', '>=', '<=', '=', '!='];

  const [cvalue, setcvalue] = useState('');

  const [qID, setqID] = useState('');

  const [selected_agg_function, setSelected_agg_function] = useState('Select'); //drop down of either max, min
  const agg_functions = ['min', 'max'];

  const [selected_agg_metric, setSelected_agg_metric] = useState('Select');
  const [agg_metrics, setaggmetrics] = useState([]); //still need to update and make dropdown for.

  const handleAddCondition = () => {
    const newCondition = new Condition(cname.cname.toString(), selectedcmetric, selectedoperator, selected_agg_function, selected_agg_metric, cvalue, qID && qID.qID ? qID.qID.toString() : null);
    setConditions([...conditions, newCondition]); //adds a new condition to the list of conditions.
    if(!Array.isArray(selectedQuery.conditions)){
      selectedQuery.conditions = [];
    }
    selectedQuery.conditions.push(newCondition); //adds condition to the selected query list.
    setcname({cname: '' });
    //add this condition to the selected query condition list.
  };


  //organizing the correct metrics based on query type:
  
  useEffect(() => {
    if(selectedQuery){
      if (selectedQuery.type === 'Tracks') {
        setcmetrics(condition_metrics_track);
        setaggmetrics(aggregate_metrics_track);
      } else if (selectedQuery.type === 'Albums') {
        setcmetrics(condition_metrics_album);
        setaggmetrics(aggregate_metrics_album);
      }
    }
  }, [selectedQuery]);

  useEffect(() => {
    console.log('Currently selected query:', selectedQuery);
    console.log('Conditions: ', conditions);
  }, [selectedQuery, conditions]);

  function createTrend() {
	  const q = {queries: {}, analyze: selectedQuery.queryID};
	  for (const query of list) {
		  q.queries[query.queryID] = query;
	  }
	  fetch(`/api/analyze?q=${JSON.stringify(q)}`)
	  	.then((res) => res.json())
	  	.then((foobar) => console.log(foobar));
  }

  return (
    <>
      <h1>
        Input for Trend Analysis
      </h1>
      <p>
        In the Create Queries section, pick the frequency, metric, and type from the respective dropdown menus.
        <br />The Create Conditions section can help narrow your search. Add conditions and comparisions with specific values.
      </p>
      <div className="analysis-page">
        <div className="create-queries">
          <h2>Create Queries</h2>
          <div className="query-options">
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
            <div className='freq'>
              <h3>Frequency:   </h3>
              <Dropdown
                className="Frequency"
                selectedOption={selectedFrequency}
                options={frequencies}
                onOptionClick={(frequency) => setSelectedFrequency(frequency)}
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
            <div className='met'>
              <h3>Metric:   </h3>
              <Dropdown
                className="Metric"
                selectedOption={selectedMetric}
                options={metrics}
                onOptionClick={(metric) => setSelectedMetric(metric)}
              />
            </div>
            <button onClick={handleAddItem}>Add Query</button>

          </div>
          <div className='queries'>
            {list.map((query, index) => (
              <div key={query.queryID}>
                <p>
                  {index + 1}: {query.name}
                </p>
                <button onClick={() => handleSelectQuery(query)}>Edit</button>
                <button onClick={() => handleEditQuery(query)}>
                  Save Changes
                </button>
                <button
                  className={`query ${selectedQuery === query ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedQuery(query);
                  }}>Select Query</button>

              </div>
            ))}
          </div>
          <div>
      {/* Other content */}
      <Link to="/TrendsPage" className="trends-button" onClick={createTrend}>
        <button>Create Trend!</button>
      </Link>
    </div>
        </div>
        <div className="create-conditions">
          <h2>Create Conditions</h2>
          <div className="input_name">
            <h3>Name: </h3>
            <input
              type="string"
              placeholder="Name"
              value={cname.cname || ''}
              onChange={(event) => {
                setcname({ ...cname, cname: event.target.value });
              }}
            />
          </div>

          <div className="input_metric">
            <h3>Metric:</h3>
            <Dropdown
              className="Metric"
              selectedOption={selectedcmetric}
              options={cmetrics}
              onOptionClick={(cmetric) => setSelectedcmetric(cmetric)}
            />
          </div>
          <div className="input_operator">
            <h3>Comparison:</h3>
            <Dropdown
              className="Operator"
              selectedOption={selectedoperator}
              options={operators}
              onOptionClick={(operator) => setSelectedOperator(operator)}
            />
          </div>
          <div className="input_value">
            <h3>Value:</h3>
            <input
              type="num"
              placeholder="Value"
              value={cvalue || ''}
              onChange={(event) => {
                setcvalue(event.target.value);
              }}
            />
          </div>
          <div className="input_qid">
            <h3>Query to aggregate:</h3>
            <input
              placeholder="Query ID"
              value={qID.qID || ''}
              onChange={(event) => {
                setqID({...qID, qID: event.target.value});
              }}
            />
          </div>
          <div className="input_aggf">
            <h3>Aggregate Function:</h3>
            <Dropdown
              className="aggf"
              selectedOption={selected_agg_function}
              options={agg_functions}
              onOptionClick={(agg_function) => setSelected_agg_function(agg_function)}
            />
          </div>
          <div className="input_aggm">
            <h3>Aggregate Metric:</h3>
            <Dropdown
              className="aggm"
              selectedOption={selected_agg_metric}
              options={agg_metrics}
              onOptionClick={(agg_metric) => setSelected_agg_metric(agg_metric)}
            />
          </div>
          <Button onClick={handleAddCondition}>Add Condition</Button>

        </div>

      </div>
      <div className="created-conditions">
        <h2>Created Conditions</h2>
        <ol>
          {conditions.map((condition, index) => (
            <li key={index}>{condition.cname}</li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default AnalysisPage;
