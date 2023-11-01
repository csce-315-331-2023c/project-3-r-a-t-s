import React from 'react';
import { useNavigate } from "react-router-dom";

import './App.css';

const Home = () => {
    const navigate = useNavigate();

    const go_to_gui = (file : string) => {
        navigate(file);
    }

    const change_page = (page : string) => {
        navigate(page);
    }

    return(
        <p>
            <div className="App">
                <h3> Log in Here: </h3>
                {/* <button onClick={()=>'\CashierGUI'}> Cashier GUI </button> */}
                <button onClick={()=>navigate('/CashierGUI')}> Cashier GUI </button>
            </div>
            <div className="App">
                <h3> Click here if you're a customer: </h3>
                {/* <button onClick={()=>'\CustomerGUI'}> Customer GUI </button> */}
                <button onClick={()=>navigate('/CustomerGUI')}> Customer GUI </button>
            </div>
        </p>
    )
}

export default Home;
