import React from 'react';
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Popup from 'reactjs-popup';
//import { useNavigate } from "react-router-dom";
import 'reactjs-popup/dist/index.css';

import './App.css';

const App = () => {

  let order: string[] = [];
  let curr_item = "";
  let curr_size = "";
  let curr_type = "";

  const makeorderitem = (temp : number, item : string) => {
    if (temp === 0) {
      console.log("Choosing current item: ", item);
      curr_item = item;
    }
    else if (temp === 1) {
      console.log("Choosing a size: ", item);
      curr_size = item;
    }
    else if (temp === 2) {
      console.log("Choosing a type: ", item);
      curr_type = item;
    }
  }

  const addorderitem = () => {
    order.push(curr_size + " " + curr_item + " " + curr_type);  
    console.log("Added new order item:", order.pop());

    curr_size = "";
    curr_item = "";
    curr_type = "";
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
      
      <h3> Pasta: </h3>
      <p> 
        <Popup trigger=
            {<button> Carbonara </button>}
            position="bottom center" onOpen={() => makeorderitem(0, "Carbonara")}>
            <button onClick={() => makeorderitem(1, "SM")}> Small </button>
            <button onClick={() => makeorderitem(1, "REG")}> Regular </button>
            <br />
            <button onClick={() => makeorderitem(2, "Penne")}> Penne </button>
            <button onClick={() => makeorderitem(2, "Spaghetti")}> Spaghetti </button>
            <br /> <br />
            <button onClick={addorderitem}> Add to order </button>
        </Popup>

        <Popup trigger=
            {<button> Diavolo </button>}
            position="bottom center" onOpen={() => makeorderitem(0, "Diavolo")}>
            <button onClick={() => makeorderitem(1, "SM")}> Small </button>
            <button onClick={() => makeorderitem(1, "REG")}> Regular </button>
            <br />
            <button onClick={() => makeorderitem(2, "Penne")}> Penne </button>
            <button onClick={() => makeorderitem(2, "Spaghetti")}> Spaghetti </button>
            <br /> <br />
            <button onClick={addorderitem}> Add to order </button>
        </Popup>

        <Popup trigger=
            {<button> Basil Pesto </button>}
            position="bottom center" onOpen={() => makeorderitem(0, "Basil Pesto")}>
            <button onClick={() => makeorderitem(1, "SM")}> Small </button>
            <button onClick={() => makeorderitem(1, "REG")}> Regular </button>
            <br />
            <button onClick={() => makeorderitem(2, "Penne")}> Penne </button>
            <button onClick={() => makeorderitem(2, "Spaghetti")}> Spaghetti </button>
            <br /> <br />
            <button onClick={addorderitem}> Add to order </button>
        </Popup>

        <Popup trigger=
            {<button> Marinara </button>}
            position="bottom center" onOpen={() => makeorderitem(0, "Marinara")}>
            <button onClick={() => makeorderitem(1, "SM")}> Small </button>
            <button onClick={() => makeorderitem(1, "REG")}> Regular </button>
            <br />
            <button onClick={() => makeorderitem(2, "Penne")}> Penne </button>
            <button onClick={() => makeorderitem(2, "Spaghetti")}> Spaghetti </button>
            <br /> <br />
            <button onClick={addorderitem}> Add to order </button>
        </Popup>
      </p>

      <h3> Salad: </h3>
      <p> 
          <Popup trigger=
              {<button> Deluxe Ceasar </button>}
              position="bottom center" onOpen={() => makeorderitem(0, "Deluxe Ceasar Salad")}>
              <button onClick={() => makeorderitem(1, "SM")}> Small </button>
              <button onClick={() => makeorderitem(1, "REG")}> Regular </button>
              <br /> <br />
              <button onClick={addorderitem}> Add to order </button>
          </Popup>

          <Popup trigger=
              {<button> Farmer's Market </button>}
              position="bottom center" onOpen={() => makeorderitem(0, "Farmer's Market Salad")}>
              <button onClick={() => makeorderitem(1, "SM")}> Small </button>
              <button onClick={() => makeorderitem(1, "REG")}> Regular </button>
              <br /> <br />
              <button onClick={addorderitem}> Add to order </button>
          </Popup>

          <Popup trigger=
              {<button> Avocado Chop </button>}
              position="bottom center" onOpen={() => makeorderitem(0, "Avocado Chop Salad")}>
              <button onClick={() => makeorderitem(1, "SM")}> Small </button>
              <button onClick={() => makeorderitem(1, "REG")}> Regular </button>
              <br /> <br />
              <button onClick={addorderitem}> Add to order </button>
          </Popup>

          <Popup trigger=
              {<button> Power Bowl </button>}
              position="bottom center" onOpen={() => makeorderitem(0, "Power Bowl")}>
              <button onClick={addorderitem}> Add to order </button>
          </Popup>
      </p>

      <p>
        <Popup trigger=
            {<button> Click to open modal </button>} 
            modal nested>
            {
                
            }
        </Popup>
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

