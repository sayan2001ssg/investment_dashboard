import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ selectedOption, setSelectedOption, showAddButton,uid }) => {
const handleOptionChange = (event) => {
setSelectedOption(event.target.value);
};
  return (
    <div className="main-container">
      <div className="dropdown-container">
        <label htmlFor="investmentOption">Select Investment:</label>
        <select id="investmentOption" value={selectedOption} onChange={handleOptionChange}>
          <option value="stocks">Stocks</option>
          <option value="mutualFunds">Mutual Funds</option>
        </select>
        {showAddButton && ( // Show the "Add" button only when showAddButton prop is true
          <Link to={`/dropdown/${uid}`} className="add-button">
            Add
          </Link>
     
        )}
      </div>
    </div>
  );

};

export default Navigation;