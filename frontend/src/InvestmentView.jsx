import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet, Navigate,useParams } from 'react-router-dom';
import StockTable from './StockTable';
import MutualFundsTable from './MutualFundsTable';
import InvestmentBarGraph from './InvestmentBarGraph';
import MutualFundsBarGraph from './MutualFundsBarGraph';
import './styles.css';
import Navigation from './Navigation';
import DropdownComponent from './DropdownComponent'; // Import the DropdownComponent

const InvestmentView = () => {
  const { uid } = useParams();
  const [selectedOption, setSelectedOption] = useState('stocks'); // Default value: 'stocks'
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="App">
      <Navigation setSelectedOption={setSelectedOption} showAddButton={true} uid={uid}/>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Outlet />
              {selectedOption === 'stocks' ? (
                <>
                  <div className="container">
                    <div className="column">
                      <InvestmentBarGraph uid={uid}/>
                    </div>
                    <div className="column">
                      <StockTable uid={uid}/>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="container">
                    <div className="column">
                      <MutualFundsBarGraph uid={uid}/>
                    </div>
                    <div className="column">
                      <MutualFundsTable uid={uid}/>
                    </div>
                  </div>
                </>
              )}
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default InvestmentView;