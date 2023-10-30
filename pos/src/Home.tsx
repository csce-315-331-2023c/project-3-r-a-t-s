import React from 'react';
import { useNavigate } from "react-router-dom";

import './App.css';

const Home = () => {
    const navigate = useNavigate();

    const go_to_cashier = () => {
        navigate("\CashierGUI");
    }

    return(
        <div className="App">
            <h3> Log in Here: </h3>
            <button onClick={go_to_cashier}> Cashier GUI </button>
        </div>
    )
}

export default Home;

