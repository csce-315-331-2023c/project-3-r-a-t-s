import React, {useState, useEffect, useRef} from 'react';
import { useNavigate } from "react-router-dom";
import CashierLoginPopup from './LoginComponents/CashierLogin';
import axios, {AxiosError} from 'axios';
import './App.css';

const Home : React.FC = () => {
    const navigate = useNavigate();
    const [showCashierLogin, setCashierLogin] = useState(false);
    const googleLoginWindowRef = useRef<Window | null>(null);

    const handleLoginSuccessCashier = () => {
        navigate('CashierGUI');
        setCashierLogin(false);
    };

    // Set up a callback function to handle the authentication response
    const googleAuthenticationCallback = (event : MessageEvent) => {
        try {
            console.log('Received message:', event);
            if (event.data === 'google-auth-success') {
                // GitHub authentication successful, redirect to Manager GUI
                console.log('Google authentication success. Navigating to ManagerGUI...');
                navigate('ManagerGUI');
            }
        } catch (error) {
            console.error('Error handling Google authentication:', error);
        }
    };

    const handleGoogleLogin = async () => {
        // Open a new window for Google authentication
        googleLoginWindowRef.current = window.open('http://127.0.0.1:5000/login', '_blank');
        // Attempt to add the event listener
        try {
            //Listen for messages from the Google login window
            window.addEventListener('message', googleAuthenticationCallback);
            console.log('Event listener attached: true');
        } catch (error) {
            console.error('Error attaching event listener:', error);
        }
    };

    useEffect(() => {
        // Cleanup event listener when the component unmounts
        const cleanup = () => {
          window.removeEventListener('message', googleAuthenticationCallback);
        };
    
        return cleanup;
      }, []);

    return(
        <div className="App">

            <h3>Log in Here: </h3>
            <button onClick={() => setCashierLogin(true)}>Cashier GUI</button>

            {/* Login Popup */}
            {showCashierLogin && (
                <CashierLoginPopup
                    message={'Cashier Login?'}
                    onClose={() => setCashierLogin(false)}
                    onLogin={handleLoginSuccessCashier}
                />
            )}
            <h3> Click here if you're a customer: </h3>
            <button onClick={() => navigate('CustomerGUI')}> Customer GUI </button>

            <h3> Click here if you're a Manager: </h3>
            <button onClick={handleGoogleLogin}> Manager GUI </button>
        </div>
    )
}

export default Home;
