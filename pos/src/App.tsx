import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Popup from 'reactjs-popup';
import { useNavigate } from "react-router-dom";
import 'reactjs-popup/dist/index.css';

import './App.css';

const App = () => {

  let order: string[] = [];
  let curr_item = "";
  let curr_size = "";
  let curr_type = "";

  const makeorderitem = (temp : number, item : string) => {
    if (temp == 0) {
      console.log("Choosing current item: ", item);
      curr_item = item;
    }
    else if (temp == 1) {
      console.log("Choosing a size: ", item);
      curr_size = item;
    }
    else if (temp == 2) {
      console.log("Choosing a type: ", item);
      curr_type = item;
    }
  }

  const addorderitem = () => {
    order.push(curr_size + " " + curr_item + " " + curr_type);
    console.log("Added new order item:", order.pop());

  }

  const addorder = () => {
    console.log("Adding new Order");

  }

  return (
    <div className="App">
      <header>
        <h1>
          PIADA 
        </h1>
        <p> Italian Street Food</p>
      </header>
        <p> 
            <Popup trigger=
                {<button> Carbonara </button>}
                position="bottom center">
                <button onClick={() => makeorderitem(1, "SM")}> Small </button>
                <button onClick={() => makeorderitem(1, "REG")}> Regular </button>
                <br />
                <button onClick={() => makeorderitem(2, "Penne")}> Penne </button>
                <button onClick={() => makeorderitem(2, "Spaghetti")}> Spaghetti </button>
                <br /> <br />
                <button onClick={addorderitem}> Add {curr_item = "Carbonara"} to order </button>
            </Popup>
        </p>


        <p>
          <button> Build Your Own </button>
        </p>


          <h3>  Current Order:
            <ul> {order} </ul>
            <br />
          <button onClick={addorder} > Pay </button>
          </h3>
        
    </div>
  );
}

export default App;

