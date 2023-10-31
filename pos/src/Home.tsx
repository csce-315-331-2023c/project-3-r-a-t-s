import React from 'react';
import { useNavigate } from "react-router-dom";

import './App.css';

const Home = () => {
    const navigate = useNavigate();

    const go_to_gui = (file : string) => {
        navigate(file);
    }

    const go_to_customer = () => {
        navigate("\CustomerGUI");
    }

    return(
        <p>
            <div className="App">
                <h3> Log in Here: </h3>
                <button onClick={go_to_cashier}> Cashier GUI </button>
            </div>
            <div className="App">
                <h3> Click here if you're a customer: </h3>
                <button onClick={go_to_customer}> Customer GUI </button>
            </div>
        </p>
    )
}

export default Home;

