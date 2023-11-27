import React, {useState, useEffect, useRef} from 'react';
import { useNavigate } from "react-router-dom";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import {MarkerF} from '@react-google-maps/api'

import { BsFillTelephoneFill, BsFillMapFill } from "react-icons/bs";
import { AiFillShop } from "react-icons/ai";
import { MdShelves, MdDeliveryDining, MdTableRestaurant } from "react-icons/md";
import { IoRestaurant } from "react-icons/io5";

import CashierLoginPopup from './LoginComponents/CashierLogin';
// import axios, {AxiosError} from 'axios';

import './App.css';

const mapContainerStyle = {
    width: '40vw',
    height: '45vh',
    display: 'table-cell'
};

const center = {
    lat: 30.6242291,
    lng: -96.3397041449957, 
};


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

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyCXTwo6bsK6GtUP8sIAVSEnYuV44AeRFAg',
      });
    
      if (loadError) {
        return <div>Error loading maps</div>;
      }
    
      if (!isLoaded) {
        return <div>Loading maps</div>;
      }

    return(
        <div className='home'>
            <div className='home-top-bar'>
                <h1> 
                <img src="piada-icon.jpg" alt="Piada Icon of a Motor bike." className='icon' onClick={() => navigate('/')}/> &nbsp;
                   <b>PIADA</b>  Italian Street Food 
                <button onClick={() => navigate('ManagerGUI')} className='navigate-buttons'> Manager GUI</button>
                <button onClick={() => navigate('CashierGUI')} className='navigate-buttons'> Cashier POS </button>
                <button onClick={() => navigate('CustomerGUI')} className='navigate-buttons'> Customer Self-Service  </button>
                </h1>
            </div>

            <div>
            <div className='home-top-block'>
                <h1 style={{
                    fontSize: "150px",
                    opacity: "100%"
                }}> <b> College Station </b></h1>

                <button onClick={() => navigate('MenuBoardGUI')}
                style={{
                    verticalAlign: "middle",
                    textAlign: "center",
                    borderRadius: "25px",
                    border: "2px solid #FFFFFF",
                    width: "250px",
                    fontSize: "40px",
                    marginTop: "-15vh"
                }} 
                > View Menu </button> 
            </div>

            <div className='home-bottom-block'>
            <div style={{
                width: "30vw",
                height: "40vh",
                fontSize: "25px",
                display: "table-cell",
            }}> <br />

                <BsFillMapFill/> &nbsp; <a style={{color: "black"}}
                href="https://www.google.com/maps/dir/?api=1&destination=1025%20University%20Dr.,%20Suite%20109,%20College%20Station,%20TX%2077845">
                1025 University Dr., Suite 109, 
                <br />College Station, TX 77845
                </a> <br /> <br />
                <BsFillTelephoneFill /> &nbsp; (979) 307-7611    <br />
                <AiFillShop /> &nbsp; Curbside Pick-up    <br />
                <MdShelves /> &nbsp; Grab & Go Shelves <br />
                <IoRestaurant /> &nbsp; Dine In <br />
                <MdDeliveryDining /> &nbsp; Third-Party Delivery <br />
                <MdTableRestaurant /> &nbsp; Counter Pick-up
            </div>

            <div>
            {/* <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={15}
                center={center}>
                <MarkerF position={center} />
            </GoogleMap> */}
            </div>

            <div style={{display: "table-cell"}}>
                <h3 style={{}}> <br /> 
                 <u>Store Hours:</u> 
                    <ul style={{
                        listStyleType: "none",
                        width: "30vw",
                        height: "40vh"

                        }}>
                            <br />
                        <li>Monday 10:45am-10:00pm</li>
                        <li>Tuesday 10:45am-10:00pm</li>
                        <li>Wednesday 10:45am-10:00pm</li>
                        <li>Thursday 10:45am-10:00pm</li>
                        <li>Friday 10:45am-10:00pm</li>
                        <li>Saturday 10:45am-10:00pm</li>
                        <li>Sunday 10:45am-10:00pm</li>
                    </ul>
                </h3>
            </div>
            </div>
            </div>
         

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
        </div>

    )
}

export default Home;
