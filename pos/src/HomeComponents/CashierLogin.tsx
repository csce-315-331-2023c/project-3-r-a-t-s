import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css' ;
import { IoMdCloseCircleOutline } from "react-icons/io";

interface LoginPopupProps {
    message: string;
    onClose: () => void;
    onLogin: () => void;
}

const CashierLoginPopup: React.FC<LoginPopupProps> = ({ message, onClose, onLogin }) => {
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [LoginState, setLoginState] = useState('');
    const [CashierName, setCashierName] = useState('');

    const handleLogin = () => {
        const requestData = {
            username: Username,
            password: Password, 
          };
          const config = {
            headers: {
              'Contest-Type': 'application/json',
            },
          };
          //Send Post rquest to Flask API
          axios
            .post('http://127.0.0.1:5000/api/login_routes/check_cashier_login', requestData, config)
            //.post(`https://pos-backend-3c6o.onrender.com/api/login_routes/check_cashier_login`, requestData, config)
            .then((response) => {
                console.log(response.data.message)
                switch (response.data.message) {
                    case 'Cashier Login Successful':
                        setLoginState('Successful');
                        setCashierName(response.data.name_of_user)
                        setTimeout(() => {
                            onLogin(); // Navigate after a delay
                        }, 2000);
                        break;
                    case 'Cashier Login Unsuccessful':
                        setLoginState('Failed');
                        break;
                }
            })
            .catch((error) => {
              console.error('Error with Confirming Log In Information:', error);
        });
    };

    return (
        <div style={{height: "100vh", width: "100vw", position: "absolute", backgroundColor: "rgba(0, 0, 0, .9)", zIndex: 1000}}>
            <div className="CashierLoginPopup">
                <div className="CashierPopupClose"><IoMdCloseCircleOutline onClick={onClose}/></div>
                <h4><b><u>Cashier Login</u></b></h4>
                    {LoginState === 'Successful' && (
                        <div className="WelcomeMessage">Welcome, {CashierName}!</div>
                    )}
                    {LoginState === 'Failed' && (
                        <div className="ErrorMessage">Login Unsuccessful. Please Try Again.</div>
                    )}                
                    <div className="CashierForm">                    
                        UserID:
                        <div className="CashierLogin">
                                <input type="text" value={Username} placeholder="Enter UserID" onChange={(e) => setUsername(e.target.value)} />
                        </div>    
                        Password:
                        <div className="CashierLogin">
                                <input type="password" value={Password} placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        
                        <div className="CashierLogin-btn">
                            <button onClick={handleLogin}>Login</button>
                    </div>    
                </div>
            </div>
        </div>
    );
};

export default CashierLoginPopup;