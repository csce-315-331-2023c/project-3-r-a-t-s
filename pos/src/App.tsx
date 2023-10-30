import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';

import Home from "./Home";
import CashierGUI from "./CashierGUI";


const App = () => {
  return(
  <div>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/CashierGUI" element={<CashierGUI />} />
      </Routes>
  </Router>
  </div>
  )
}

export default App;

