import React, { useState } from 'react';
import './Dropdown.css';

const Dropdown = ({ options, selectedOption, onOptionClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onOptionClick(option);
    toggleDropdown();
  };

  return (
    <div className="dropdown-container">
      <div className="dropdown-selected" onClick={toggleDropdown}>
        {selectedOption}
      </div>
      {isOpen && (
        <ul className="dropdown-options">
          {options.map((option) => (
            <li
              key={option}
              className={selectedOption === option ? 'selected' : ''}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
