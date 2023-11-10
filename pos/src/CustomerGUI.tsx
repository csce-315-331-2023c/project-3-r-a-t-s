import React, { useState } from 'react';
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Popup from 'reactjs-popup';
import { useNavigate } from "react-router-dom";
import 'reactjs-popup/dist/index.css';

import './App.css';

const CustomerGUI = () => {

    const navigate = useNavigate();

    const [order, setOrder] = useState<string[]>([]);

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
            setOrder(order.concat(curr_size + " " + curr_item + " " + curr_type)); 
            console.log("Added new order item:", item);
        }
        else {
            setOrder(order.concat(item)); 
            console.log("Added new order item:", item);
        }
        curr_size = "";
        curr_item = "";
        curr_type = "";

    }

    //"https://pos-backend-3c6o.onrender.com/api/place_order"
    const addorder = async (): Promise<void> => {
        console.log("Paying for Order");
        console.log("order: ", order);
        // Add back-end to update database
        const response = await fetch(
            "http://127.0.0.1:5000/api/place_order",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                'X-Client-Type': 'customer'
              },
              body: JSON.stringify({
                items: order,
              }),
            }
          );
      
          const data = await response.json();
          console.log(data);
    }
    

    const removeAll = () => {
        for (var i = 0; i < order.length; i++) {
            order.pop();
        }
        setOrder([]);
        console.log("Removed All Order Items.");
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
        
    <h3> Other:
      <p>
        <Popup trigger=
            {<button> Build Your Own </button>} 
            modal nested>
            {
                <p>
                <h2> Build Your Own</h2>

                <Popup trigger=
                {<button> Pasta </button>} 
                modal nested>
                {
                    <p>
                        <h2>Custom Pasta</h2>
                        <h3>
                            Size:
                            <p>
                                <button> Small </button>
                                <button> Regular </button>  
                            </p>
                        </h3>
                        <h3>
                            Pasta:
                            <p>
                                <button> Spaghetti </button>
                                <button> Penne </button>
                            </p>
                        </h3>
                        <h3> Protein: 
                            <p>
                                <button> Italian Sausage </button>
                                <button> Grilled Chicken </button>
                                <button> Crispy Chicken </button>
                                <button> Hot Fried Chicken </button>
                                <button> Grilled Chicken </button>
                                <button> Grass-Fed Meatballs </button>
                                <button> Calamari & Hot Peppers</button>
                                <button> Grilled Salmon </button>
                            </p>
                        </h3>
                        <h3>
                            Pasta Sauces:
                            <p>
                                <button> Marinara </button>
                                <button> Alfredo </button>
                                <button> Diavolo </button>
                                <button> Basil Pesto </button>
                            </p>
                        </h3>
                        <h3> 
                            Toppings:
                            <p>
                                <button> Cucumbers </button>
                                <button> Cucumber Salad </button>
                                <button> Bruschetta Tomatoes </button>
                                <button> Pickled Red Onions </button>
                                <button> Romaine </button>
                                <button> Arugula </button>
                                <button> Spinach </button>
                                <button> Chopped Greens </button>
                                <button> Roasted Sweet Potato </button>
                                <button> Hummus </button>
                                <button> Feta </button>
                                <button> Mozzarella </button>
                                <button> Parmesan </button>
                                <button> Sweet & Spicy Peppers</button>
                                <button> Strawberries </button>
                                <button> Glazed Pecans </button>
                                <button> Pancetta(Bacon)</button>
                                <button> Roasted Broccoli </button>
                                <button> Sweet Corn & Tomato</button>
                                <button> Avocado </button>
                            </p>
                        </h3>
                    </p>
                }
                </Popup>
                <Popup trigger=
                {<button> Piada </button>} 
                modal nested>
                {
                    <p>
                        <h2> Custom Piada </h2>
                        <h3> Protein: 
                            <p>
                                <button> Italian Sausage </button>
                                <button> Grilled Chicken </button>
                                <button> Crispy Chicken </button>
                                <button> Hot Fried Chicken </button>
                                <button> Grilled Chicken </button>
                                <button> Grass-Fed Meatballs </button>
                                <button> Calamari & Hot Peppers</button>
                                <button> Grilled Salmon </button>
                            </p>
                        </h3>
                        <h3>
                            Piada Sauces:
                            <p>
                                <button> Marinara </button>
                                <button> Alfredo </button>
                                <button> Diavolo </button>
                                <button> Basil Pesto </button>
                            </p>
                        </h3> 
                        <h3> 
                            Toppings:
                            <p>
                                <button> Cucumbers </button>
                                <button> Cucumber Salad </button>
                                <button> Bruschetta Tomatoes </button>
                                <button> Pickled Red Onions </button>
                                <button> Romaine </button>
                                <button> Arugula </button>
                                <button> Spinach </button>
                                <button> Chopped Greens </button>
                                <button> Roasted Sweet Potato </button>
                                <button> Hummus </button>
                                <button> Feta </button>
                                <button> Mozzarella </button>
                                <button> Parmesan </button>
                                <button> Sweet & Spicy Peppers</button>
                                <button> Strawberries </button>
                                <button> Glazed Pecans </button>
                                <button> Bacon </button>
                                <button> Roasted Broccoli </button>
                                <button> Sweet Corn & Tomato</button>
                                <button> Avocado </button>
                            </p>
                        </h3>
                    </p>
                }
                </Popup>
                <Popup trigger=
                {<button> Salad </button>} 
                modal nested>
                {
                    <p>
                        <h2> Custom Salad </h2>
                        <h3>
                            Size:
                            <p>
                                <button> Small </button>
                                <button> Regular </button>  
                            </p>
                        </h3>
                        <h3>
                            Salad Dressings:
                            <p>
                                <button> Creamy Parmesan </button>
                                <button> Lemon Basil </button>
                                <button> Classic Caesar </button>
                                <button> Creamy Basil Parmesan </button>
                                <button> Oil & Vinegar </button>
                                <button> Spicy Ranch </button>
                                <button> Yogurt Harissa </button>
                            </p>
                        </h3>
                        <h3> 
                            Toppings:
                            <p>
                                <button> Cucumbers </button>
                                <button> Cucumber Salad </button>
                                <button> Bruschetta Tomatoes </button>
                                <button> Pickled Red Onions </button>
                                <button> Romaine </button>
                                <button> Arugula </button>
                                <button> Spinach </button>
                                <button> Chopped Greens </button>
                                <button> Roasted Sweet Potato </button>
                                <button> Hummus </button>
                                <button> Feta </button>
                                <button> Mozzarella </button>
                                <button> Parmesan </button>
                                <button> Sweet & Spicy Peppers</button>
                                <button> Strawberries </button>
                                <button> Glazed Pecans </button>
                                <button> Pancetta(Bacon)</button>
                                <button> Roasted Broccoli </button>
                                <button> Sweet Corn & Tomato</button>
                                <button> Avocado </button>
                            </p>
                        </h3>
                    </p>
                }
                </Popup>
                </p>
            }
        </Popup>

        <Popup trigger=
            {<button> Sides </button>} 
            modal nested>
            {
              <p>
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
              </p>
                
            }
        </Popup>

        <Popup trigger=
            {<button> Drinks </button>} 
            modal nested>
            {
                <p>
                <h2> Drinks </h2>
                <p>
                <button onClick={() => addorderitem("Blackberry Hibiscus Lemonade")}> Blackberry Hibiscus Lemonade </button>
                <button onClick={() => addorderitem("Orange Soda")}> Orange Soda </button>
                <button onClick={() => addorderitem("Berry Soda")}> Berry Soda </button>
                <button onClick={() => addorderitem("Peach Tea")}> Peach Tea </button>
                <button onClick={() => addorderitem("Lemon Tea")}> Lemon Tea </button>
                <button onClick={() => addorderitem("Acqua Panna Spring Water")}> Acqua Panna Spring Water </button>
                <button onClick={() => addorderitem("San Pellegrino Sparkling Water")}> San Pellegrino Sparkling Water </button>
                <Popup trigger=
                  {<button> Soft Drink </button>}
                  position="bottom center">
                  <button onClick={() => makeorderitem(1, "REG")}> Regular </button>
                  <button onClick={() => makeorderitem(1, "LG")}> Large </button>
                  <br /> <br />
                  <button onClick={() => addorderitem("Soft Drink")}> Add to order </button>
              </Popup>
              </p>
              </p>
            }
        </Popup>

        <Popup trigger=
            {<button> Kids </button>} 
            modal nested>
            {
                <div>
                    <h2> Kids Menu </h2>
                    <Popup trigger=
                    {<button> Kids Pasta  </button>}
                    position="bottom center" >
                    <button > Grilled Chicken </button>
                    <button > Crispy Chicken </button>
                    <button > Steak </button>

                    <button > Spaghetti </button>
                    <button > Penne </button>
                    <button > Add to Order </button>

                    </Popup>

                    <Popup trigger=
                    {<button> Kids Meatballs  </button>}
                    position="bottom center" >
                    <button > Spaghetti </button>
                    <button > Penne </button>
                    <button > Add to Order </button>
                    </Popup>
                    
                    <button onClick={() => addorderitem("Kids Chicken Fingers")}> Chicken Fingers </button>

                    <br /><br />
                    <h3> Drinks: </h3>
                    <button onClick={() => addorderitem("Kids Low-Fat Milk")}> Low-Fat Milk </button>
                    <button onClick={() => addorderitem("Kids Chocolate Milk")}> Chocolate Milk </button>
                    <button onClick={() => addorderitem("Kids Apple Juice")}> Apple Juice </button>
                </div>
            }
        </Popup>
      </p>
      </h3>

      <h3>  
      {" "}
        Current Order:
        <ul>
          {order.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
            <button onClick={addorder} > Pay </button>
            <button onClick={removeAll}> Remove Items </button>
        </h3>

    </div>
  );
}

export default CustomerGUI;
