import React, { useState } from 'react';

function Dropdown(props) {
  const [isOpen, setIsOpen] = useState(false);
  
  function handleToggle() {
    setIsOpen(!isOpen);
  }
  
  function handleOptionClick(option) {
    setIsOpen(false);
    props.onOptionClick(option);
  }
  
  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={handleToggle}>
        {props.selectedOption}
      </button>
      {isOpen &&
        <ul className="dropdown-options">
          {props.options.map(option => (
            <li key={option} onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      }
    </div>
  );
}

export default Dropdown;