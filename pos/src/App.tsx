import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ManagerEmailProvider } from "./ManagerComponents/ManagerEmailTransfer"; // Adjust the path based on your project structure
import "./App.css";

import Home from "./Home";
import CashierGUI from "./CashierGUI";
import CustomerGUI from "./CustomerGUI";
import ManagerGUI from "./ManagerGUI";
import MenuBoardGUI from "./MenuBoardGUI";
import GoogleTranslate from "./Components/GoogleTranslate";
import UseScript from "./Components/UseScript";
import TextSizeAdjuster from "./Components/TextAdjuster";
import { ScaleProvider } from "./Components/ScaleContext";
import ScaleWrapper from "./Components/ScaleWrapper";
import FontSizeAdjuster from "./Components/FontSizeAdjuster";
import { FontSizeProvider } from "./Components/FontSizeContext";
import { FaAngleDown } from "react-icons/fa";

const App = () => {
    //Speech API
    const [listening, setListening] = useState(false);
    const [recognizedText, setRecognizedText] = useState('');
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setRecognizedText(transcript);
    };
    recognition.onend = () => {
      setListening(false);
    };
    const startListening = () => {
        recognition.start();
        setListening(true);
    };
    const stopListening = () => {
        recognition.stop();
        setListening(false);
    };
    //Speech API Ends Here
    useEffect(() => {
      // Add logic to handle voice command
      if (listening) {
        // Use recognizedText as needed
        console.log('Recognized Text:', recognizedText);
  
        // Add more logic based on recognized text
      }
    }, [recognizedText, listening]);
  

  const [open, setOpen] = useState(false);
  return (
    <div>
      <ScaleProvider>
        <ScaleWrapper>
          <header>
            <link
              href="https://fonts.googleapis.com/css?family=Lato:400,700"
              rel="stylesheet"
              type="text/css"
            />
          </header>
          {open ? 
            <div style={{
              margin: "8vh 0vw 0vh 68vw",
              position: "absolute",
              zIndex: "1000",
              backgroundColor: "rgb(35,31,32,255)",
              height: "30vh",
              width: "30vw",
              border: "3px solid white",
              boxShadow: "10px 10px 5px black",
              fontSize: "3vh"}}>
            <GoogleTranslate />
            <TextSizeAdjuster />
            {/* Added For Speech API  */}
            <div className='SpeechButtons'>
                <button className='SpeechStart-btn' onClick={startListening} disabled={listening}>
                Start Voice Command
                </button>
                <button className='SpeechStop-btn' onClick={stopListening} disabled={!listening}>
                Stop Voice Command
                </button>
                {/* <p>Recognized Text: {recognizedText}</p> */}
            </div>

            <button onClick={() => setOpen(false)} style={{width:"20vw", margin: "2vh 0vw 0vh 5vw"}}><b>^ Close</b></button>
            </div>
            :
            <button style={{
              margin: "8vh 0vw 0vh 75vw",
              position: "absolute",
              zIndex: "1000",
              backgroundColor: "",
              width: "15vw",
              border: '5px solid black',
              fontSize: "3vh"
            
            }} onClick={() => setOpen(true)}>
              <FaAngleDown />&nbsp;<b>Accessibility</b>
            </button>
          }

          <ManagerEmailProvider>
            <div>
              <Router>
                <Routes>
                  <Route path="/" element={<Home startListening={startListening} stopListening={stopListening} recognizedText={recognizedText} />} />                  
                  <Route path="/CashierGUI" element={<CashierGUI />} />
                  <Route path="/CustomerGUI" element={<CustomerGUI startListening={startListening} stopListening={stopListening} recognizedText={recognizedText}/>} />
                  <Route path="/ManagerGUI" element={<ManagerGUI />} />
                  <Route path="/MenuBoardGUI" element={<MenuBoardGUI startListening={startListening} stopListening={stopListening} recognizedText={recognizedText}/>} />
                </Routes>
              </Router>
            </div>
          </ManagerEmailProvider>
        </ScaleWrapper>
      </ScaleProvider>
    </div>
  );
};

export default App;
