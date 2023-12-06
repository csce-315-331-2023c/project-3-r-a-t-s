/**
 * React component representing the home page.
 * @module Home
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.startListening - Function to start voice recognition.
 * @param {Function} props.stopListening - Function to stop voice recognition.
 * @param {string} props.recognizedText - Recognized text from voice input.
 * @returns {JSX.Element} The Home component.
 */
import React, {useState, useEffect, useRef} from 'react';
import { useNavigate } from "react-router-dom";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import {MarkerF}  from '@react-google-maps/api'

import { BsFillTelephoneFill, BsFillMapFill } from "react-icons/bs";
import { AiFillShop } from "react-icons/ai";
import { MdShelves, MdDeliveryDining, MdTableRestaurant } from "react-icons/md";
import { IoRestaurant } from "react-icons/io5";

import CashierLoginPopup from './HomeComponents/CashierLogin';
import { useManagerEmail } from './ManagerComponents/ManagerEmailTransfer';

import './App.css';
import WeatherComponent from './Components/Weather';
import WeatherCard from './Components/WeatherCard';
import GoogleTranslate from "./Components/GoogleTranslate";
import axios, {AxiosError} from 'axios';

/**
 * Style for the Google Map container.
 * @constant
 * @type {Object}
 */
const mapContainerStyle = {
    width: '40vw',
    height: '45vh',
    display: 'table-cell'
};

/**
 * Default center location for the map.
 * @constant
 * @type {Object}
 */
const center = {
    lat: 30.6242291,
    lng: -96.3397041449957, 
};


/**
 * Props for the Home component.
 * @typedef {Object} HomeProps
 * @property {Function} startListening - Function to start voice recognition.
 * @property {Function} stopListening - Function to stop voice recognition.
 * @property {string} recognizedText - Recognized text from voice input.
 */
interface HomeProps {
    startListening: () => void;
    stopListening: () => void;
    recognizedText: string;
}

/**
 * React functional component representing the home page.
 * @function Home
 * @param {HomeProps} props - The component props.
 * @returns {JSX.Element} The Home component.
 */
const Home : React.FC<HomeProps> = ( {startListening, stopListening, recognizedText}) => {
    const navigate = useNavigate();
    const [showCashierLogin, setCashierLogin] = useState(false);
    const googleLoginWindowRef = useRef<Window | null>(null);
    const {setManagerEmail} = useManagerEmail();
    const [isEmployee, setIsEmployee] = useState<string>('');
    /**
     * Handles voice commands based on recognized text.
     * @function handleVoiceCommand
     * @memberof Home
     * @inner
     * @returns {void}
     */
    const handleVoiceCommand = () => {
        if (recognizedText.toLowerCase().includes('menu') || recognizedText.toLowerCase() === 'click menu' ) {
            navigate('MenuBoardGUI');
        }

        if (recognizedText.toLowerCase().includes('customer')) {
            navigate('CustomerGUI');
        }

        if (recognizedText.toLowerCase().includes('cashier') || recognizedText.toLowerCase() === 'cashier pos') {
            setCashierLogin(true);
        }

        if (recognizedText.toLowerCase().includes('manager') || recognizedText.toLowerCase() === 'manager gui') {
            handleGoogleLogin();
        }
        
    };
    useEffect(() => {
        handleVoiceCommand();
    }, [recognizedText]);
    ////Ends HERE

    /**
     * Handles the successful login of the cashier.
     * Navigates to the CashierGUI and sets the login username.
     *
     * @function handleLoginSuccessCashier
     * @memberof Home
     * @param {string} username - The username of the logged-in cashier.
     * @returns {void}
     */
    const handleLoginSuccessCashier = (username: string) => {
        navigate('CashierGUI', {state : {LoginUsername : username}});
        setCashierLogin(false);
    };

    // const handleCheckEmployee = async () => {
    //     try {            
    //         if (isEmployee.trim().toLowerCase() === 'yes') {
    //             setCashierLogin(true);
    //         } else if (isEmployee.trim().toLowerCase() === 'no') {
    //             alert("Error: Employee Information Not Found!");
    //         } 
    //     } catch (error) {
    //         console.error("Error checking if user is an employee:", error);
    //     }
    // };
    // useEffect(() => {
    //     // Trigger handleCheckEmployee when isEmployee changes
    //     handleCheckEmployee();
    // }, [isEmployee]);


    /**
     * Checks if the logged-in user's email belongs to an employee.
     *
     * @async
     * @function check_if_employee
     * @memberof Home
     * @returns {Promise<void>}
     */  
     // const check_if_employee = async (email : string) => { 
    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     };
    //     //Send Post rquest to Flask API
    //     await axios
    //     //.post('http://127.0.0.1:5000/api/login_routes/check_if_employee', email, config)
    //     .post('https://pos-backend-3c6o.onrender.com/api/login_routes/check_if_employee', email, config)

    //     .then((response) => {
    //         setIsEmployee(response.data.isEmployee);
    //     })
    //     .catch((error) => {
    //         console.error('Error with Checking If User Is Employee:', error);
    //     });
    // };


    /**
     * Callback function to handle the authentication response from Google login.
     * Redirects to ManagerGUI upon successful authentication.
     *
     * @function googleAuthenticationCallback
     * @memberof Home
     * @param {MessageEvent} event - The message event containing authentication information.
     * @returns {void}
     */
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

   // const cashierGoogleAuthenticationCallback = (event: MessageEvent) => {
    //     try {
    //         console.log('Received message:', event);
    //         if (event.data.event === 'google-auth-success') {
    //             // Google authentication successful for cashier, show cashier login popup
    //             console.log('Cashier Google authentication success');
    //             check_if_employee(event.data.email);
    //         }
    //     } catch (error) {
    //         console.error('Error handling Cashier Google authentication:', error);
    //     }
    // };
    /**
     * Initiates the Google login process.
     * Opens a new window for Google authentication and attaches an event listener to handle the response.
     *
     * @async
     * @function handleGoogleLogin
     * @memberof Home
     * @returns {Promise<void>}
     */
    const handleGoogleLogin = async () => {
        // Open a new window for Google authentication
        googleLoginWindowRef.current = window.open('https://pos-backend-3c6o.onrender.com/login', '_blank');
        //googleLoginWindowRef.current = window.open('http://127.0.0.1:5000/login', '_blank');
        try {
            //Listen for messages from the Google login window
            window.addEventListener('message', googleAuthenticationCallback);
            console.log('Event listener attached: true');
        } catch (error) {
            console.error('Error attaching event listener:', error);
        }
    };
    // const handleCashierGoogleLogin = async () => {
    //     // Open a new window for Google authentication
    //     googleLoginWindowRef.current = window.open('https://pos-backend-3c6o.onrender.com/login', '_blank');
    //     try {
    //         // Listen for messages from the Google login window
    //         window.addEventListener('message', cashierGoogleAuthenticationCallback);
    //     } catch (error) {
    //         console.error('Error attaching event listener:', error);
    //     }
    // };

    /**
     * React effect hook for setting up and cleaning up event listeners.
     * Cleans up the 'message' event listener when the component unmounts.
     * @return {function} The cleanup function.
     */
    useEffect(() => {
        // Cleanup event listener when the component unmounts
        const cleanup = () => {
          window.removeEventListener('message', googleAuthenticationCallback);
          //window.removeEventListener('message', cashierGoogleAuthenticationCallback);
        };
        return cleanup;
    }, []);

    /**
     * Custom hook for loading the Google Maps script.
     * @typedef {Object} LoadScriptResult
     * @property {boolean} isLoaded - Indicates whether the Google Maps script is loaded.
     * @property {string|null} loadError - Error message if there's an issue loading the script.
     * @returns {LoadScriptResult} The result of the script loading.
     */
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyCXTwo6bsK6GtUP8sIAVSEnYuV44AeRFAg',
      });
    
      if (loadError) {
        /**
         * Rendered component when there is an error loading maps.
         * @returns {JSX.Element} The error message.
         */
        return <div>Error loading maps</div>;
      }
    
      if (!isLoaded) {
         /**
         * Rendered component while maps are being loaded.
         * @returns {JSX.Element} The loading message.
         */
        return <div>Loading maps</div>;
      }

    return(
        <div className='home'>
            <div className='home-top-bar'>
                <h1 style={{fontSize: "5vh"}}> 
                <img src="piada-icon.jpg" alt="Piada Icon of a Motor bike." className='icon' onClick={() => navigate('/')} /> &nbsp;
                   <b><u>PIADA</u></b> ~ Italian Street Food ~
                <button onClick={() => handleGoogleLogin()} className='navigate-buttons'> Manager GUI</button>
                <button onClick={() => setCashierLogin(true)} className='navigate-buttons'> Cashier POS </button>
                {/* Login Popup */}
                {showCashierLogin && (
                    <CashierLoginPopup
                        message={'Cashier Login?'}
                        onClose={() => setCashierLogin(false)}
                        onLogin={(username: string) => handleLoginSuccessCashier(username)}
                    />
                )}
                <button onClick={() => navigate('CustomerGUI')} className='navigate-buttons'> Customer Self-Service  </button>
                </h1>
            </div>

            <div>
            <div className='home-top-block'>
                <div>
                <h2 style={{
                    fontSize: "20vh",
                }}> <b> College Station </b></h2>
                </div>
                <div>

                <button onClick={() => { navigate('MenuBoardGUI') }}
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

            <div style={{display: "table-cell", width: "30vw"}}>
                <h3 style={{fontSize: "3vh", marginBottom: 0}}> <br /> 
                 <u>Store Hours:</u> <br />
                    Monday to Sunday:<br />
                     10:45am - 10:00pm
                </h3><br />
                <div >
                    <WeatherComponent />
                </div>
            </div>
            </div>
            </div>
        </div>

    )
}

export default Home;
