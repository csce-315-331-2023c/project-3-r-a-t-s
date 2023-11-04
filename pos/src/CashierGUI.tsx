import React, { useState } from 'react';
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Popup from 'reactjs-popup';
import { useNavigate } from "react-router-dom";
import 'reactjs-popup/dist/index.css';
import './Cashier.css';
import axios, { AxiosResponse, AxiosError } from 'axios';

const CashierGUI = () => {

    const navigate = useNavigate();

    let curr_item = "";
    let curr_size = "";
    let curr_type = "";
    let order_total = 0;

    const [order, setOrder] = useState<string[]>([]);

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

    //Add Order Item Selected to Order Array
    // TODO: update order_total based on order item added
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

    // Add Order Array to Database
    const addorder = () => {
        console.log("Paying for Order");
        console.table(order);
        setOrder([]);
        // Create an object with order data to send to the Flask API
        const orderData = {
            items : order, 
        };

        // Set the Content-Type header to application/json
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        // Send a POST request to the Flask API
        // Run locally with .post('http://127.0.0.1:5000/place_order', orderData)
        axios
            .post(`https://pos-backend-3c6o.onrender.com/place_order`, orderData, config)
            .then((response) => {
                console.log(response.data); 
                // Handle the response from the Flask API
                if (response.data.message === "Order placed successfully") {
                    // Order placed successfully 
                    // console.log("Order placed :)"); 
                    // TODO : Add Code to Display confirmation message to user

                } else {
                    // Handle Errors
                    console.error("Unexpected response:", response.data);
                }
            })
            .catch((error : AxiosError) => {
                console.error(error); // Handle errors, e.g., show an error message to the user.
            });
    }

    const removeAll = () => {
        for (var i = 0; i < order.length; i++) {
            order.pop();
        }
        setOrder([]);
        console.log("Removed All Order Items.");
    }

    // TODO: Add customization back-end

    const goback = () => {
        navigate(-1);
    }

    return (
    <div className="Cashier">
        <header className='header'>
        <button onClick={goback} className='back-button'> Back </button>
            <h1 className='piada'>
            PIADA 
            </h1>
            <p className='street-food'> Italian Street Food</p>
        </header>
        
        <h2 className='order-panel'> <br /> <u>Current Order:</u>
            <ul className='display-order'>
            {order.map((order) => <li>{order}</li>)}
            </ul>
            <p className='order-total'>$ {order_total}</p>
            <button className='pay-button' onClick={addorder} > Pay </button>
            <button className='remove-button' onClick={removeAll}> Remove Items </button>
        </h2>
        
        <p className='main-panel'>
        <h3 className='column'> Pasta:
        <p> 
        <Popup trigger=
            {<button className='main-buttons'> Carbonara </button>} 
            position="right center" onOpen={() => makeorderitem(0, "Carbonara")}>
            <p className='basic-pop-up'>
            <button className='basic-option-buttons' onClick={() => makeorderitem(1, "SM") }> Small </button>
            <button className='basic-option-buttons'onClick={() => makeorderitem(1, "REG")}> Regular </button>
            <br />
            <button className='basic-option-buttons' onClick={() => makeorderitem(2, "Penne")}> Penne </button>
            <button className='basic-option-buttons' onClick={() => makeorderitem(2, "Spaghetti")}> Spaghetti </button>
            <br /> <br />
            <button onClick={() => addorderitem("")} className='add-to-order'> Add to order </button>
            </p>
        </Popup>

        <Popup trigger=
            {<button className='main-buttons'> Diavolo </button>}
            position="right center" onOpen={() => makeorderitem(0, "Diavolo")}>
            <p className='basic-pop-up'>
            <button onClick={() => makeorderitem(1, "SM")} className='basic-option-buttons'> Small </button>
            <button onClick={() => makeorderitem(1, "REG")} className='basic-option-buttons'> Regular </button>
            <br />
            <button onClick={() => makeorderitem(2, "Penne")} className='basic-option-buttons'> Penne </button>
            <button onClick={() => makeorderitem(2, "Spaghetti")} className='basic-option-buttons'> Spaghetti </button>
            <br /> <br />
            <button onClick={() => addorderitem("")} className='add-to-order'> Add to order </button>
            </p>
        </Popup>

        <Popup trigger=
            {<button className='main-buttons'> Basil Pesto </button>}
            position="right center" onOpen={() => makeorderitem(0, "Basil Pesto")}>
            <p className='basic-pop-up'>
            <button onClick={() => makeorderitem(1, "SM")} className='basic-option-buttons'> Small </button>
            <button onClick={() => makeorderitem(1, "REG")} className='basic-option-buttons'> Regular </button>
            <br />
            <button onClick={() => makeorderitem(2, "Penne")} className='basic-option-buttons'> Penne </button>
            <button onClick={() => makeorderitem(2, "Spaghetti")} className='basic-option-buttons'> Spaghetti </button>
            <br /> <br />
            <button onClick={() => addorderitem("")} className='add-to-order'> Add to order </button>
            </p>
        </Popup>

        <Popup trigger=
            {<button className='main-buttons'> Marinara </button>}
            position="right center" onOpen={() => makeorderitem(0, "Marinara")}>
            <p className='basic-pop-up'>
            <button onClick={() => makeorderitem(1, "SM")} className='basic-option-buttons'> Small </button>
            <button onClick={() => makeorderitem(1, "REG")} className='basic-option-buttons'> Regular </button>
            <br />
            <button onClick={() => makeorderitem(2, "Penne")} className='basic-option-buttons'> Penne </button>
            <button onClick={() => makeorderitem(2, "Spaghetti")} className='basic-option-buttons'> Spaghetti </button>
            <br /> <br />
            <button onClick={() => addorderitem("")} className='add-to-order'> Add to order </button>
            </p>
        </Popup>
        </p>
        </h3>

        <h3 className='column'>Piadas: 
            <p>
            <button className='main-buttons' onClick={() => addorderitem("Avocado Piada")}> Avocado </button>
            <button className='main-buttons' onClick={() => addorderitem("BLT Piada")}> BLT </button>
            <button className='main-buttons' onClick={() => addorderitem("Chefs Favorite Piada")}> Chef's Favorite </button>
            <button className='main-buttons' onClick={() => addorderitem("Mediterranean Piada")}> Mediterranean </button>
            </p>
        </h3>

        <h3 className='column'> Salad: 
        <p> 
          <Popup trigger=
              {<button className='main-buttons'> Deluxe Ceasar </button>}
            position="right center" onOpen={() => makeorderitem(0, "Deluxe Ceasar Salad")}>
            <p className='basic-pop-up'>
            <button onClick={() => makeorderitem(1, "SM")} className='basic-option-buttons'> Small </button>
            <button onClick={() => makeorderitem(1, "REG")} className='basic-option-buttons'> Regular </button>
            <br /> <br />
            <button onClick={() => addorderitem("")} className='add-to-order'> Add to order </button>
            </p>
          </Popup>

          <Popup trigger=
            {<button className='main-buttons'> Farmer's Market </button>}
            position="right center" onOpen={() => makeorderitem(0, "Farmers Market Salad")}>
            <p className='basic-pop-up'>
            <button onClick={() => makeorderitem(1, "SM")} className='basic-option-buttons'> Small </button>
            <button onClick={() => makeorderitem(1, "REG")} className='basic-option-buttons'> Regular </button>
            <br /> <br />
            <button onClick={() => addorderitem("")} className='add-to-order'> Add to order </button>
            </p>
          </Popup>

          <Popup trigger=
            {<button className='main-buttons'> Avocado Chop </button>}
            position="right center" onOpen={() => makeorderitem(0, "Avocado Chop Salad")}>
            <p className='basic-pop-up'>
            <button onClick={() => makeorderitem(1, "SM")} className='basic-option-buttons'> Small </button>
            <button onClick={() => makeorderitem(1, "REG")} className='basic-option-buttons'> Regular </button>
            <br /> <br />
            <button onClick={() => addorderitem("")} className='add-to-order'> Add to order </button>
            </p>
          </Popup>

          <button className='main-buttons' onClick={() => addorderitem("Power Bowl")}> Power Bowl </button>
      </p>
      </h3>
      

      <h3 className='column'> Other:
      <p>
        <Popup trigger=
            {<button className='main-buttons'> Build Your Own </button>} 
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
            {<button className='main-buttons'> Sides </button>} 
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
                  <button onClick={() => addorderitem("")} className='add-to-order'> Add to order </button>
              </Popup>
              </p>
              </p>
                
            }
        </Popup>

        <Popup trigger=
            {<button className='main-buttons'> Drinks </button>} 
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
                  <button onClick={() => addorderitem("Soft Drink")} className='add-to-order'> Add to order </button>
              </Popup>
              </p>
              </p>
            }
        </Popup>

        <Popup trigger=
            {<button className='main-buttons'> Kids </button>} 
            modal nested>
            {
                <p>
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
                </p>
            }
        </Popup>
      </p>
      </h3>
      </p>
    </div>
  );
}

export default CashierGUI;
