import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import CashierLoginPopup from './LoginComponents/CashierLogin';


import './App.css';

const Home = () => {
    const navigate = useNavigate();
    const [showCashierLogin, setCashierLogin] = useState(false);

    const handleLoginSuccess = () => {
        // Navigate after successful login
        navigate('CashierGUI');
        setCashierLogin(false);
    };

    return(
        <div className="App">

            <h3>Log in Here: </h3>
            <button onClick={() => setCashierLogin(true)}>Cashier GUI</button>

            {/* Login Popup */}
            {showCashierLogin && (
                <CashierLoginPopup
                    message={'Cashier Login?'}
                    onClose={() => setCashierLogin(false)}
                    onLogin={handleLoginSuccess}
                />
            )}
            <h3> Click here if you're a customer: </h3>
            <button onClick={() => navigate('CustomerGUI')}> Customer GUI </button>
            <h3> Click here if you're a Manager: </h3>
            <button onClick={() => navigate('ManagerGUI')}> Manager GUI </button>
        </div>
    )
}

export default Home;
