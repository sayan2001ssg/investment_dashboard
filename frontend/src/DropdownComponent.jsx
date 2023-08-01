// DropdownComponent.js

import React, { useState } from 'react';
import Option1Page from './Option1Page';
import Option2Page from './Option2Page';
import { BrowserRouter as Router, Routes, Route, Link, Outlet, Navigate, useParams } from 'react-router-dom';
import './DropdownComponent.css';

const DropdownComponent = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const { uid } = useParams(); // Get the uid from the URL

  // Function to handle the dropdown option change
  const handleOptionChange = (event) => {
    const newSelectedOption = event.target.value;
    setSelectedOption(newSelectedOption);
  };

  return (
    <div>
      <h2 className='topper'>Portfolio</h2>
      <h3>Click To Add {uid}</h3>
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="">Select an option</option>
        <option value="option1">STOCKS</option>
        <option value="option2">MUTUAL FUNDS</option>
        {/* Add more options as needed */}
      </select>
      {selectedOption === 'option1' && <Option1Page uid={uid} />} {/* Pass uid to Option1Page */}
      {selectedOption === 'option2' && <Option2Page uid={uid} />} {/* Pass uid to Option2Page */}
    </div>
  );
};

export default DropdownComponent;
