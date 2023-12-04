import React, {useState} from "react";
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
                  <Route path="/" element={<Home />} />
                  <Route path="/CashierGUI" element={<CashierGUI />} />
                  <Route path="/CustomerGUI" element={<CustomerGUI />} />
                  <Route path="/ManagerGUI" element={<ManagerGUI />} />
                  <Route path="/MenuBoardGUI" element={<MenuBoardGUI />} />
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
