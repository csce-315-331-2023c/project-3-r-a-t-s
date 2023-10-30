import React from 'react';
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Popup from 'reactjs-popup';
import { useNavigate } from "react-router-dom";
import 'reactjs-popup/dist/index.css';

import './App.css';

const CashierGUI = () => {

    const navigate = useNavigate();
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

    const addorderitem = (item : string) => {
        if (item === "") {
        order.push(curr_size + " " + curr_item + " " + curr_type);  
        console.log("Added new order item:", order.pop());

        curr_size = "";
        curr_item = "";
        curr_type = "";
        }
        else {
        order.push(item);  
        console.log("Added new order item:", order.pop());
        }
        
    }

    const addorder = () => {
        console.log("Paying for Order");
        // Add back-end to update database
    }

    const goback = () => {
        navigate(-1);
    }

    return (
    <div className="App">
        <button onClick={goback}> Back </button>

        <header>
            <h1>
            PIADA 
            </h1>
            <p> Italian Street Food</p>
        </header>
        
        <h3> Pasta:
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
            <button onClick={() => addorderitem("")}> Add to order </button>
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
            <button onClick={() => addorderitem("")}> Add to order </button>
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
            <button onClick={() => addorderitem("")}> Add to order </button>
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
            <button onClick={() => addorderitem("")}> Add to order </button>
        </Popup>
        </p>
        </h3>

        <h3>Piadas 
            <p>
            <button onClick={() => addorderitem("Avocado Piada")}> Avocado </button>
            <button onClick={() => addorderitem("BLT Piada")}> BLT </button>
            <button onClick={() => addorderitem("Chefs Favorite Piada")}> Chef's Favorite </button>
            <button onClick={() => addorderitem("Mediterranean Piada")}> Mediterranean </button>
            </p>
        </h3>

        <h3> Salad: 
        <p> 
          <Popup trigger=
              {<button> Deluxe Ceasar </button>}
              position="bottom center" onOpen={() => makeorderitem(0, "Deluxe Ceasar Salad")}>
              <button onClick={() => makeorderitem(1, "SM")}> Small </button>
              <button onClick={() => makeorderitem(1, "REG")}> Regular </button>
              <br /> <br />
              <button onClick={() => addorderitem("")}> Add to order </button>
          </Popup>

          <Popup trigger=
              {<button> Farmer's Market </button>}
              position="bottom center" onOpen={() => makeorderitem(0, "Farmers Market Salad")}>
              <button onClick={() => makeorderitem(1, "SM")}> Small </button>
              <button onClick={() => makeorderitem(1, "REG")}> Regular </button>
              <br /> <br />
              <button onClick={() => addorderitem("")}> Add to order </button>
          </Popup>

          <Popup trigger=
              {<button> Avocado Chop </button>}
              position="bottom center" onOpen={() => makeorderitem(0, "Avocado Chop Salad")}>
              <button onClick={() => makeorderitem(1, "SM")}> Small </button>
              <button onClick={() => makeorderitem(1, "REG")}> Regular </button>
              <br /> <br />
              <button onClick={() => addorderitem("")}> Add to order </button>
          </Popup>

          <button onClick={() => addorderitem("Power Bowl")}> Power Bowl </button>
      </p>
      </h3>

      <h3> Other:
      <p>
        <Popup trigger=
            {<button> Build Your Own </button>} 
            modal nested>
            {
            }
        </Popup>

        <Popup trigger=
            {<button> Sides </button>} 
            modal nested>
            {
              <div>
                <h2> Street Sides</h2>
              <p>
                <button onClick={() => addorderitem("Sweet Corn Salad")}> Sweet Corn Salad </button>
                <button onClick={() => addorderitem("Garlic Dough")}> Garlic Dough </button>
                <button onClick={() => addorderitem("Meatballs")}> Meatballs </button>
                <button onClick={() => addorderitem("Pepperoni Piada Stick")}> Pepperoni Piada Stick </button>
                <button onClick={() => addorderitem("Cup of Lobster Bisque")}> Lobster Bisque </button>
                <button onClick={() => addorderitem("Chocolate Brownie")}> Sweet Street Chocolate Brownie </button>
                <Popup trigger=
                  {<button> Sweet Treet Cookie </button>}
                  position="bottom center">
                  <button onClick={() => addorderitem("Chocolate Chunk Cookie")}> Chocolate Chunk Cookie </button>
                  <button onClick={() => addorderitem("Salted Caramel Cookie")}> Salted Caramel Cookie </button>
                  <br /> <br />
                  <button onClick={() => addorderitem("")}> Add to order </button>
              </Popup>


              </p>
              </div>
                
            }
        </Popup>

        <Popup trigger=
            {<button> Drinks </button>} 
            modal nested>
            {
                
            }
        </Popup>

        <Popup trigger=
            {<button> Kids </button>} 
            modal nested>
            {
                
            }
        </Popup>
      </p>
      </h3>
    
      <h3>  Current Order:
        <ul> {order} </ul>
        <br />
        <button onClick={addorder} > Pay </button>
      </h3>

    </div>
  );
}

export default CashierGUI;

