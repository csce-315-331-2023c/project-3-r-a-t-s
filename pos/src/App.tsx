import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ManagerEmailProvider } from './ManagerComponents/ManagerEmailTransfer'; // Adjust the path based on your project structure
import './App.css';


import Home from "./Home";
import CashierGUI from "./CashierGUI";
import CustomerGUI from "./CustomerGUI";
import ManagerGUI from "./ManagerGUI";
import MenuBoardGUI from "./MenuBoardGUI";

const App = () => {
  
  return(
  <div>
    <header>
      <link href='https://fonts.googleapis.com/css?family=Lato:400,700' rel='stylesheet' type='text/css'/>
    </header>
  <ManagerEmailProvider>
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CashierGUI" element={<CashierGUI />} />
          <Route path="/CustomerGUI" element={<CustomerGUI />} />
          <Route path="/ManagerGUI" element={<ManagerGUI />} />
          <Route path="/MenuBoardGUI" element={<MenuBoardGUI />} />
        </Routes>
      </Router>
    </div>
  </ManagerEmailProvider>
  </div>
  )
}

export default App;

