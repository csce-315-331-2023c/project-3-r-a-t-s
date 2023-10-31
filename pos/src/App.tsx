import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';

import Home from "./Home";
import CashierGUI from "./CashierGUI";
import CustomerGUI from "./CustomerGUI";
import Coostomer from './Coostomer';


const App = () => {
  return(
  <div>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/CashierGUI" element={<CashierGUI />} />
        <Route path="/CustomerGUI" element={<CustomerGUI />} />
        <Route path="/Coostomer" element={<Coostomer />} />
      </Routes>
  </Router>
  </div>
  )
}

export default App;

