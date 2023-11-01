import React from 'react';
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Popup from 'reactjs-popup';
import { useNavigate } from "react-router-dom";
import 'reactjs-popup/dist/index.css';

import './App.css';

const CustomerGUI = () => {

    const navigate = useNavigate();
    let order: string[] = [];
    let current_order: string[] = [];
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
        current_order.push(curr_size + " " + curr_item + " " + curr_type);

        console.log("Added new order item:", order.pop());
        console.log("Current order:", current_order);

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
            <h1> Piada Italian Street Food </h1>
            <p> Select items by pressing the buttons or hover them to see ingredients </p>
        </header>
        
        <h3> Pasta:
        <p> 
            <Popup trigger=
            {<button title="Pasta, parmesan alfredo, bruschetta tomatoes, pancetta (bacon), spinach, grated parmesan">
            Carbonara </button>}
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
            {<button title="Pasta, spicy diavolo sauce, bruschetta tomatoes, chopped green onions, grated parmesan">
            Diavolo </button>}
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
            {<button title="Pasta, parmesan alfredo, basil pesto, bruschetta tomatoes, grated parmesan">
            Basil Pesto </button>}
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
            {<button title="Pasta, housemade tomato sauce, grated parmesan">
            Marinara </button>}
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
            <button title="Italian-style street wrap with pancetta (bacon), arugula, mozzarella, fresh avocado, sweet corn & tomato, basil aioli" 
                    onClick={() => addorderitem("Avocado Piada")}> Avocado </button>
            <button title="Italian-style street wrap with pancetta (bacon), romaine, bruschetta tomatoes, creamy parmesan, basil aioli. Best with crispy chicken"
                    onClick={() => addorderitem("BLT Piada")}> BLT </button>
            <button title="Italian-style street wrap with spicy diavolo sauce, romaine, mozzarella, sweet peppers, spicy ranch"
                    onClick={() => addorderitem("Chefs Favorite Piada")}> Chef's Favorite </button>
            <button title="Italian-style street wrap with harissa grain blend, arugula, hummus, cucumber salad, pickled red onions, bruschetta tomatoes, feta, basil aioli"
                    onClick={() => addorderitem("Mediterranean Piada")}> Mediterranean </button>
        </p>
        </h3>

        <h3> Salad: 
        <p> 
            <Popup trigger=
            {<button title="Romaine, cabbage & kale blend, parmesan crisps, pancetta (bacon), bruschetta tomatoes, grated parmesan, Caesar dressing">
            Deluxe Ceasar </button>}
            position="bottom center" onOpen={() => makeorderitem(0, "Deluxe Ceasar Salad")}>
                <button onClick={() => makeorderitem(1, "SM")}> Small </button>
                <button onClick={() => makeorderitem(1, "REG")}> Regular </button>
                <br /> <br />
                <button onClick={() => addorderitem("")}> Add to order </button>
            </Popup>

            <Popup trigger=
            {<button title="Chopped greens, cabbage & kale blend, strawberries, feta, sweet corn & tomato, fresh avocado, glazed pecans, lemon-basil dressing">
            Farmer's Market </button>}
            position="bottom center" onOpen={() => makeorderitem(0, "Farmers Market Salad")}>
                <button onClick={() => makeorderitem(1, "SM")}> Small </button>
                <button onClick={() => makeorderitem(1, "REG")}> Regular </button>
                <br /> <br />
                <button onClick={() => addorderitem("")}> Add to order </button>
            </Popup>

            <Popup trigger=
            {<button title="Chopped greens, cabbage & kale blend, sweet corn & tomato, fresh avocado, pickled red onions, shredded parmesan, spiced almonds, balsamic glaze, creamy basil parmesan dressing">
            Avocado Chop </button>}
            position="bottom center" onOpen={() => makeorderitem(0, "Avocado Chop Salad")}>
                <button onClick={() => makeorderitem(1, "SM")}> Small </button>
                <button onClick={() => makeorderitem(1, "REG")}> Regular </button>
                <br /> <br />
                <button onClick={() => addorderitem("")}> Add to order </button>
            </Popup>

            <button title="Harissa grain blend, hummus, roasted sweet potatoes, sweet corn & tomato, roasted broccoli, cucumber salad, pickled red onions, yogurt harissa."
                    onClick={() => addorderitem("Power Bowl")}> Power Bowl </button>
        </p>
        </h3>
        
        <h3>  Current Order:
            {/* <ul> {order} </ul> */}
            <ul> {current_order} </ul>
            <br />
            <button onClick={addorder} > Pay </button>
        </h3>

    </div>
  );
}

export default CustomerGUI;
