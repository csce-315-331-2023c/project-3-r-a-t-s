import React, {useState, useEffect, useRef} from 'react';
import { useNavigate } from "react-router-dom";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import {MarkerF} from '@react-google-maps/api'

import { BsFillTelephoneFill, BsFillMapFill } from "react-icons/bs";
import { AiFillShop } from "react-icons/ai";
import { MdShelves, MdDeliveryDining, MdTableRestaurant } from "react-icons/md";
import { IoRestaurant } from "react-icons/io5";

import CashierLoginPopup from './HomeComponents/CashierLogin';
import { useManagerEmail } from './ManagerComponents/ManagerEmailTransfer';

import './App.css';
import WeatherComponent from './Components/Weather';
import WeatherCard from './Components/WeatherCard';

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
    const {setManagerEmail} = useManagerEmail();

    const handleLoginSuccessCashier = () => {
        navigate('CashierGUI');
        setCashierLogin(false);
    };

    // Set up a callback function to handle the authentication response
    const googleAuthenticationCallback = (event : MessageEvent) => {
        try {
            console.log('Received message:', event);
            if (event.data.event === 'google-auth-success') {
                // GitHub authentication successful, redirect to Manager GUI
                console.log('Google authentication success. Navigating to ManagerGUI...');
                setManagerEmail(event.data.email);
                console.log("Email Logged In:", event.data.email);
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
                <h1 style={{fontSize: "5vh"}}> 
                <img src="piada-icon.jpg" alt="Piada Icon of a Motor bike." className='icon' onClick={() => navigate('/')} /> &nbsp;
                   <b>PIADA</b>  Italian Street Food 
                <button onClick={() => handleGoogleLogin()} className='navigate-buttons'> Manager GUI</button>
                <button onClick={() => setCashierLogin(true)} className='navigate-buttons'> Cashier POS </button>
                {/* Login Popup */}
                {showCashierLogin && (
                    <CashierLoginPopup
                        message={'Cashier Login?'}
                        onClose={() => setCashierLogin(false)}
                        onLogin={handleLoginSuccessCashier}
                    />
                )}
                <button onClick={() => navigate('CustomerGUI')} className='navigate-buttons'> Customer Self-Service  </button>
                </h1>
            </div>

            <div>
            <div className='home-top-block'>
                <div>
                <h1 style={{
                    fontSize: "20vh",
                }}> <b> College Station </b></h1>
                </div>
                <div>
                <button onClick={() => navigate('MenuBoardGUI')}
                style={{
                    verticalAlign: "middle",
                    background: "black",
                    textAlign: "center",
                    borderRadius: "25px",
                    border: "5px solid white",
                    width: "15vw",
                    fontSize: "5vh",
                    marginTop: "2vh",
                    boxShadow: "5px 5px white",
                    color: 'white'
                }} 
                > View Menu </button> 
                </div>
            </div>

            <div className='home-bottom-block'>
            <div style={{
                width: "30vw",
                height: "40vh",
                fontSize: "3vh",
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
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={15}
                center={center}>
                <MarkerF position={center} />
            </GoogleMap>
            </div>

            <div style={{display: "table-cell"}}>
                <h3 style={{fontSize: "3vh", marginBottom: 0}}> <br /> 
                 <u>Store Hours:</u> <br />
                    Monday to Sunday:<br />
                     10:45am - 10:00pm
                </h3>
                <div>
                    <WeatherComponent />
                </div>
            </div>
            </div>
            </div>
        </div>

    )
}

export default Home;
