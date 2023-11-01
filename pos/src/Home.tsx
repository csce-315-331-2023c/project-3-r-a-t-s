import React from 'react';
import { useNavigate } from "react-router-dom";

import './App.css';

const Home = () => {
    const navigate = useNavigate();

    return(
        <div>
            <p className="App">
                <h3> Log in Here: </h3>
                <button onClick={() => navigate('\CashierGUI')}> Cashier GUI </button>
                <h3> Click here if you're a customer: </h3>
                <button onClick={() => navigate('\CustomerGUI')}> Customer GUI </button>
            </p>
        </div>
    )
}

export default Home;
