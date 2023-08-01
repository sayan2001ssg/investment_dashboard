//App.js

 

import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./Login";

import InvestmentView from "./InvestmentView"; // Import the InvestmentView component

import DropdownComponent from "./DropdownComponent";

import Register from "./Register";

import Option1Page from "./Option1Page";

import Option2Page from "./Option2Page";




const App = () => {

  return (

    <Router>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register/>} />

        <Route path="/investment-view/:uid" element={<InvestmentView />} />

        <Route path="/dropdown/:uid" element={<DropdownComponent />} />

        <Route path="/option1/:uid" element={<Option1Page />} />

        <Route path="/option2/:uid" element={<Option2Page />} />

      </Routes>

    </Router>

  );

};




export default App;



