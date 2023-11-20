import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { useNavigate } from "react-router-dom";
import 'reactjs-popup/dist/index.css';
import axios, {AxiosError} from 'axios';

const CustomerGUI = () => {

    const navigate = useNavigate();

    const [BYO_Panel, Set_BYO_Panel] = useState([<div> </div>]);    // used to set what displays in BYO panel

    let curr_item = "";
    let curr_size = "";
    let curr_type = "";

    const [order, setOrder] = useState<string[]>([]);
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
    const [prices, setPrices] = useState<number[]>([]);

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
    const addorderitem = (item : string) => {
        if (item === "") {
            setOrder(order.concat(curr_size + " " + curr_item + " " + curr_type)); 
            updatePrice((curr_size + " " + curr_item + " " + curr_type).trim());
            console.log("Added new order item:", curr_size + " " + curr_item + " " + curr_type);
        }
        else {
            setOrder(order.concat(item)); 
            updatePrice(item);
            console.log("Added new order item:", item);
        }
        curr_size = "";
        curr_item = "";
        curr_type = "";
    }
    // Add Custom Item to Order Array
    const addBYOToOrder = (item : string) => {  
        if (item === "") {
            setOrder(order.concat(curr_size + " " + curr_item + " " + curr_type)); 
            console.log("Added new order item:", item);
        }
        else {
            setOrder(order.concat(item)); 
            console.log("Added new order item:", item);
        }
        let ingredients = "";
        if (selectedIngredients.length > 0) {
            ingredients += `${selectedIngredients.join(', ')}`;
            console.log("Added BYO Ingredients:", ingredients);
            setSelectedIngredients([]); // Clear selected ingredients
        }  
        main_panel();   // exits to main BYO panel after adding BYO item to order
    }

    const handleIngredientSelection = (ingredient : string) => {
        setSelectedIngredients((prevIngredients) => [...prevIngredients, ingredient]);
        console.log("Added new selected ingredient", ingredient);
    }

    // Add Order Array to Database
    const addorder = () => {
        console.log("Paying for Order");
        console.table(order);
        // Create an object with order data to send to the Flask API
        const orderData = {
            items : order, 
        };

        // Set the Content-Type header to application/json
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'cashier'
            },
        };
        // Send a POST request to the Flask API
        // Run locally with .post('http://127.0.0.1:5000/place_order', orderData)
        axios
            //.post('http://127.0.0.1:5000/api/cashier/place_order', orderData, config)
            .post(`https://pos-backend-3c6o.onrender.com/api/cashier/place_order`, orderData, config)
            .then((response) => {
                // Handle the response from the Flask API
                console.log(response.data); 
                if (response.data.message === "Order placed successfully (From Backend)") {
                } else {
                    console.error("Unexpected response:", response.data);
                }
            })
            .catch((error : AxiosError) => {
                console.error(error); 
            });
        setOrder([]);
        setPrices([]);
    }

    // Call to add price of a new Menu Item added to the order to the total order amount
    const updatePrice = (item : string) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'cashier'
            },
        };
        axios
          .post('http://127.0.0.1:5000/api/cashier/get_price', item, config)
          // .post(`https://pos-backend-3c6o.onrender.com/api/manager_reports/get_product_report`, requestDates, config)
          .then((response) => {
            console.log(response.data.price);
            setPrices([...prices,parseFloat(response.data.price)]);
          })
          .catch((error) => {
            console.error('Failed to get Price: ', error);
          });
      };    

    const removeAll = () => {
        for (var i = 0; i < order.length; i++) {
            order.pop();
        }
        setOrder([]);
        setPrices([]);
        console.log("Removed All Order Items.");
    }

    // TODO: Add customization back-end

    const goback = () => {
        navigate(-1);
    }


    const main_panel = () => {
        Set_BYO_Panel([
        <div>
        <h2> <u>Build Your Own </u></h2>
        <button onClick={pasta_panel}> Pasta </button>
        <button  onClick={piada_panel}> Piada </button>
        <button  onClick={salad_panel}> Salad </button> 
        </div>
        ]);
    }

    useEffect(() => {
        main_panel();
    }, [])

    const pasta_panel = () => {
        Set_BYO_Panel([
            <div>
                <button onClick={main_panel} style={{
                    justifyContent: "flex-end", display: "flex", marginLeft: "10px", marginTop: "10px",
                    }}> 
                Back </button> 
                <h2> 
                    <u >Custom Pasta</u>
                </h2>
                <br />
                <div>
                <h3>
                    Size: &nbsp;
                        <button onClick={() => makeorderitem(1, "SM Custom Pasta")}> Small </button> &nbsp;
                        <button onClick={() => makeorderitem(1, "REG Custom Pasta")}> Regular </button> 
                        &nbsp;&nbsp; 
                    Pasta: &nbsp;
                        <button onClick={() => makeorderitem(2, "Spaghetti")}> Spaghetti </button> &nbsp;
                        <button onClick={() => makeorderitem(2, "Penne")}> Penne </button>
                </h3>
                </div>
                <h3> Protein: 
                    <p>
                        <button onClick={() => handleIngredientSelection('Italian Sausage')}> Italian Sausage </button>
                        <button onClick={() => handleIngredientSelection('Grilled Chicken')}> Grilled Chicken </button>
                        <button onClick={() => handleIngredientSelection('Crispy Chicken')}> Crispy Chicken </button>
                        <button onClick={() => handleIngredientSelection('Hot Friend Chicken')}> Hot Fried Chicken </button>
                        <button onClick={() => handleIngredientSelection('Grilled Chicken')}> Grilled Chicken </button>
                        <button onClick={() => handleIngredientSelection('Meatballs')}> Grass-Fed Meatballs </button>
                        <button onClick={() => handleIngredientSelection('Calamari & Hot Peppers')}> Calamari & Hot Peppers</button>
                        <button onClick={() => handleIngredientSelection('Grilled Salmon')}> Grilled Salmon </button>
                    </p>
                </h3>
                <h3>
                    Pasta Sauces:
                    <p>
                        <button onClick={() => handleIngredientSelection('Tomato Sauce')}> Marinara </button>
                        <button onClick={() => handleIngredientSelection('Alfredo Sauce')}> Alfredo </button>
                        <button onClick={() => handleIngredientSelection('Diavolo Sauce')}> Diavolo </button>
                        <button onClick={() => handleIngredientSelection('Basil Pesto Sauce')}> Basil Pesto </button>
                    </p>
                </h3>
                <h3> 
                    Toppings:
                    <p>
                        <button onClick={() => handleIngredientSelection('Cucumbers')}> Cucumbers </button>
                        <button onClick={() => handleIngredientSelection('Cucumber Salad')}> Cucumber Salad </button>
                        <button onClick={() => handleIngredientSelection('Bruschetta Tomatoes')}> Bruschetta Tomatoes </button>
                        <button onClick={() => handleIngredientSelection('Pickled Red Onions')}> Pickled Red Onions </button>
                        <button onClick={() => handleIngredientSelection('Romaine')}> Romaine </button>
                        <button onClick={() => handleIngredientSelection('Arugula')}> Arugula </button>
                        <button onClick={() => handleIngredientSelection('Spinach')}> Spinach </button>
                        <button onClick={() => handleIngredientSelection('Chopped Greens')}> Chopped Greens </button>
                        <button onClick={() => handleIngredientSelection('Sweet Potatoes')}> Roasted Sweet Potato </button>
                        <button onClick={() => handleIngredientSelection('Hummus')}> Hummus </button>
                        <button onClick={() => handleIngredientSelection('Feta')}> Feta </button>
                        <button onClick={() => handleIngredientSelection('Mozzarella')}> Mozzarella </button>
                        <button onClick={() => handleIngredientSelection('Parmesan')}> Parmesan </button>
                        <button onClick={() => handleIngredientSelection('Sweet & Spicy Peppers')}> Sweet & Spicy Peppers</button>
                        <button onClick={() => handleIngredientSelection('Strawberries')}> Strawberries </button>
                        <button onClick={() => handleIngredientSelection('Glazed Pecans')}> Glazed Pecans </button>
                        <button onClick={() => handleIngredientSelection('Bacon')}> Pancetta(Bacon)</button>
                        <button onClick={() => handleIngredientSelection('Broccoli')}> Roasted Broccoli </button>
                        <button onClick={() => handleIngredientSelection('Sweet Corn & Tomato')}> Sweet Corn & Tomato</button>
                        <button onClick={() => handleIngredientSelection('Avocado')}> Avocado </button>
                    </p>
                </h3>
                <br />
                <p>Display Selected Items here: </p>
                <button onClick={() => addBYOToOrder("")} > Add to order </button>
                <br />
            </div>
        ]);
    }

    const piada_panel = () => {
        Set_BYO_Panel([
            <div>
                <button onClick={main_panel} style={{
                    justifyContent: "flex-end", display: "flex", marginLeft: "10px", marginTop: "10px",
                    }}> 
                Back </button> 
                <h2> <u> Custom Piada </u></h2>
                <h3> 
                    Protein: 
                    <p >
                        <button onClick={() => handleIngredientSelection('Italian Sausage')}> Italian Sausage </button>
                        <button onClick={() => handleIngredientSelection('Grilled Chicken')}> Grilled Chicken </button>
                        <button onClick={() => handleIngredientSelection('Crispy Chicken')}> Crispy Chicken </button>
                        <button onClick={() => handleIngredientSelection('Hot Friend Chicken')}> Hot Fried Chicken </button>
                        <button onClick={() => handleIngredientSelection('Grilled Chicken')}> Grilled Chicken </button>
                        <button onClick={() => handleIngredientSelection('Meatballs')}> Grass-Fed Meatballs </button>
                        <button onClick={() => handleIngredientSelection('Calamari & Hot Peppers')}> Calamari & Hot Peppers</button>
                        <button onClick={() => handleIngredientSelection('Grilled Salmon')}> Grilled Salmon </button>
                    </p>
                </h3>
                <h3>
                    Pasta Sauces:
                    <p>
                        <button onClick={() => handleIngredientSelection('Tomato Sauce')}> Marinara </button>
                        <button onClick={() => handleIngredientSelection('Alfredo Sauce')}> Alfredo </button>
                        <button onClick={() => handleIngredientSelection('Diavolo Sauce')}> Diavolo </button>
                        <button onClick={() => handleIngredientSelection('Basil Pesto Sauce')}> Basil Pesto </button>
                    </p>
                </h3>
                <h3> 
                    Toppings:
                    <p>
                        <button onClick={() => handleIngredientSelection('Cucumbers')}> Cucumbers </button>
                        <button onClick={() => handleIngredientSelection('Cucumber Salad')}> Cucumber Salad </button>
                        <button onClick={() => handleIngredientSelection('Bruschetta Tomatoes')}> Bruschetta Tomatoes </button>
                        <button onClick={() => handleIngredientSelection('Pickled Red Onions')}> Pickled Red Onions </button>
                        <button onClick={() => handleIngredientSelection('Romaine')}> Romaine </button>
                        <button onClick={() => handleIngredientSelection('Arugula')}> Arugula </button>
                        <button onClick={() => handleIngredientSelection('Spinach')}> Spinach </button>
                        <button onClick={() => handleIngredientSelection('Chopped Greens')}> Chopped Greens </button>
                        <button onClick={() => handleIngredientSelection('Sweet Potatoes')}> Roasted Sweet Potato </button>
                        <button onClick={() => handleIngredientSelection('Hummus')}> Hummus </button>
                        <button onClick={() => handleIngredientSelection('Feta')}> Feta </button>
                        <button onClick={() => handleIngredientSelection('Mozzarella')}> Mozzarella </button>
                        <button onClick={() => handleIngredientSelection('Parmesan')}> Parmesan </button>
                        <button onClick={() => handleIngredientSelection('Sweet & Spicy Peppers')}> Sweet & Spicy Peppers</button>
                        <button onClick={() => handleIngredientSelection('Strawberries')}> Strawberries </button>
                        <button onClick={() => handleIngredientSelection('Glazed Pecans')}> Glazed Pecans </button>
                        <button onClick={() => handleIngredientSelection('Bacon')}> Pancetta(Bacon)</button>
                        <button onClick={() => handleIngredientSelection('Broccoli')}> Roasted Broccoli </button>
                        <button onClick={() => handleIngredientSelection('Sweet Corn & Tomato')}> Sweet Corn & Tomato</button>
                        <button onClick={() => handleIngredientSelection('Avocado')}> Avocado </button>
                    </p>
                </h3>
                <p>Display Selected Items here: </p>
                <button onClick={() => addBYOToOrder("")} >
                    Add to order
                </button>
            </div>
        ]);
    }

    const salad_panel = () => {
        Set_BYO_Panel([
        <div>
            <button onClick={main_panel} style={{
                    justifyContent: "flex-end", display: "flex", marginLeft: "10px", marginTop: "10px",
                    }}> Back </button>
            <h2> <u>Custom Salad</u> </h2>
            <h3>
                Size:
                <p>
                    <button> Small </button>
                    <button> Regular </button>  
                </p>
            </h3>
            <h3> Protein: 
                <p>
                    <button onClick={() => handleIngredientSelection('Italian Sausage')}> Italian Sausage </button>
                    <button onClick={() => handleIngredientSelection('Grilled Chicken')}> Grilled Chicken </button>
                    <button onClick={() => handleIngredientSelection('Crispy Chicken')}> Crispy Chicken </button>
                    <button onClick={() => handleIngredientSelection('Hot Friend Chicken')}> Hot Fried Chicken </button>
                    <button onClick={() => handleIngredientSelection('Grilled Chicken')}> Grilled Chicken </button>
                    <button onClick={() => handleIngredientSelection('Meatballs')}> Grass-Fed Meatballs </button>
                    <button onClick={() => handleIngredientSelection('Calamari & Hot Peppers')}> Calamari & Hot Peppers</button>
                    <button onClick={() => handleIngredientSelection('Grilled Salmon')}> Grilled Salmon </button>
                </p>
            </h3>
            <h3>
                Salad Dressings:
                <p>
                    <button onClick={() => handleIngredientSelection('Creamy Parmesan Sauce')}> Creamy Parmesan </button>
                    <button onClick={() => handleIngredientSelection('Lemon Basil Dressing')}> Lemon Basil </button>
                    <button onClick={() => handleIngredientSelection('Classic Ceasar Dressing')}> Classic Caesar </button>
                    <button onClick={() => handleIngredientSelection('Basil Parmesan Dressing')}> Creamy Basil Parmesan </button>
                    <button onClick={() => handleIngredientSelection('Oil & Vinegar Dressing')}> Oil & Vinegar </button>
                    <button onClick={() => handleIngredientSelection('Spicy Ranch Dressing')}> Spicy Ranch </button>
                    <button onClick={() => handleIngredientSelection('Yogurt Harissa Dressing')}> Yogurt Harissa </button>
                </p>
            </h3>
            <h3> 
                Toppings:
                <p>
                    <button onClick={() => handleIngredientSelection('Cucumbers')}> Cucumbers </button>
                    <button onClick={() => handleIngredientSelection('Cucumber Salad')}> Cucumber Salad </button>
                    <button onClick={() => handleIngredientSelection('Bruschetta Tomatoes')}> Bruschetta Tomatoes </button>
                    <button onClick={() => handleIngredientSelection('Pickled Red Onions')}> Pickled Red Onions </button>
                    <button onClick={() => handleIngredientSelection('Romaine')}> Romaine </button>
                    <button onClick={() => handleIngredientSelection('Arugula')}> Arugula </button>
                    <button onClick={() => handleIngredientSelection('Spinach')}> Spinach </button>
                    <button onClick={() => handleIngredientSelection('Chopped Greens')}> Chopped Greens </button>
                    <button onClick={() => handleIngredientSelection('Sweet Potatoes')}> Roasted Sweet Potato </button>
                    <button onClick={() => handleIngredientSelection('Hummus')}> Hummus </button>
                    <button onClick={() => handleIngredientSelection('Feta')}> Feta </button>
                    <button onClick={() => handleIngredientSelection('Mozzarella')}> Mozzarella </button>
                    <button onClick={() => handleIngredientSelection('Parmesan')}> Parmesan </button>
                    <button onClick={() => handleIngredientSelection('Sweet & Spicy Peppers')}> Sweet & Spicy Peppers</button>
                    <button onClick={() => handleIngredientSelection('Strawberries')}> Strawberries </button>
                    <button onClick={() => handleIngredientSelection('Glazed Pecans')}> Glazed Pecans </button>
                    <button onClick={() => handleIngredientSelection('Bacon')}> Pancetta(Bacon)</button>
                    <button onClick={() => handleIngredientSelection('Broccoli')}> Roasted Broccoli </button>
                    <button onClick={() => handleIngredientSelection('Sweet Corn & Tomato')}> Sweet Corn & Tomato</button>
                    <button onClick={() => handleIngredientSelection('Avocado')}> Avocado </button>
                </p>
            </h3>
            <p>Display Selected Items here: </p>
            <button onClick={() => addBYOToOrder("")} >
                Add to order
            </button>
        </div>
        ]);
    }

    return (
    <div>
        <h2>
        <div>
            <table className="table table-dark" style={{width:"400px"}}>
            <thead>
                  <tr>
                    <th> # </th>
                    <th> Name </th>
                    <th> Price($) </th>
                  </tr>
                </thead>
                <tbody>
                  {order.map((order, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{order}</td>
                      <td>{prices.at(index)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            <button onClick={addorder} > <u>Pay</u>: 
            ${prices.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toFixed(2)}</button>
            <button onClick={removeAll}> Remove Items </button>
        </h2> 

        <header>
        <button onClick={goback} > Back </button>
            <h1>
            PIADA 
            </h1>
            <p> Italian Street Food</p>
        </header>
        
        <div>
        <h3> Pasta:
        <p> 
        <Popup trigger=
            {<button > Carbonara </button>} 
            position="right center" onOpen={() => makeorderitem(0, "Carbonara")}>
            <p >
            <button  onClick={() => makeorderitem(1, "SM") }> Small </button>
            <button onClick={() => makeorderitem(1, "REG")}> Regular </button>
            <br />
            <button  onClick={() => makeorderitem(2, "Penne")}> Penne </button>
            <button  onClick={() => makeorderitem(2, "Spaghetti")}> Spaghetti </button>
            <br /> 
            <button onClick={() => addorderitem("")} > Add to order </button>
         </p>
        </Popup>

        <Popup trigger=
            {<button > Diavolo </button>}
            position="right center" onOpen={() => makeorderitem(0, "Diavolo")}>
            <p >
            <button onClick={() => makeorderitem(1, "SM")} > Small </button>
            <button onClick={() => makeorderitem(1, "REG")} > Regular </button>
            <br />
            <button onClick={() => makeorderitem(2, "Penne")} > Penne </button>
            <button onClick={() => makeorderitem(2, "Spaghetti")} > Spaghetti </button>
            <br /> 
            <button onClick={() => addorderitem("")} > Add to order </button>
            </p>
        </Popup>

        <Popup trigger=
            {<button > Basil Pesto </button>}
            position="right center" onOpen={() => makeorderitem(0, "Basil Pesto")}>
            <p >
            <button onClick={() => makeorderitem(1, "SM")} > Small </button>
            <button onClick={() => makeorderitem(1, "REG")} > Regular </button>
            <br />
            <button onClick={() => makeorderitem(2, "Penne")} > Penne </button>
            <button onClick={() => makeorderitem(2, "Spaghetti")} > Spaghetti </button>
            <br /> 
            <button onClick={() => addorderitem("")} > Add to order </button>
            </p>
        </Popup>

        <Popup trigger=
            {<button > Marinara </button>}
            position="right center" onOpen={() => makeorderitem(0, "Marinara")}>
            <p >
            <button onClick={() => makeorderitem(1, "SM")} > Small </button>
            <button onClick={() => makeorderitem(1, "REG")} > Regular </button>
            <br />
            <button onClick={() => makeorderitem(2, "Penne")} > Penne </button>
            <button onClick={() => makeorderitem(2, "Spaghetti")} > Spaghetti </button>
            <br /> 
            <button onClick={() => addorderitem("")} > Add to order </button>
            </p>
        </Popup>
        </p>
        </h3>

        <h3 >Piadas: 
            <p>
            <button  onClick={() => addorderitem("Avocado Piada")}> Avocado </button>
            <button  onClick={() => addorderitem("BLT Piada")}> BLT </button>
            <button  onClick={() => addorderitem("Chefs Favorite Piada")}> Chef's Favorite </button>
            <button  onClick={() => addorderitem("Mediterranean Piada")}> Mediterranean </button>
            </p>
        </h3>

        <h3 > Salad: 
        <p> 
          <Popup trigger=
              {<button > Deluxe Ceasar </button>}
            position="right center" onOpen={() => makeorderitem(0, "Deluxe Ceasar Salad")}>
            <p >
            <button onClick={() => makeorderitem(1, "SM")} > Small </button>
            <button onClick={() => makeorderitem(1, "REG")} > Regular </button>
            <br /> 
            <button onClick={() => addorderitem("")} > Add to order </button>
            </p>
          </Popup>

          <Popup trigger=
            {<button > Farmer's Market </button>}
            position="right center" onOpen={() => makeorderitem(0, "Farmers Market Salad")}>
            <p >
            <button onClick={() => makeorderitem(1, "SM")} > Small </button>
            <button onClick={() => makeorderitem(1, "REG")} > Regular </button>
            <br /> 
            <button onClick={() => addorderitem("")} > Add to order </button>
            </p>
          </Popup>

          <Popup trigger=
            {<button > Avocado Chop </button>}
            position="right center" onOpen={() => makeorderitem(0, "Avocado Chop Salad")}>
            <p >
            <button onClick={() => makeorderitem(1, "SM")} > Small </button>
            <button onClick={() => makeorderitem(1, "REG")} > Regular </button>
            <br /> 
            <button onClick={() => addorderitem("")} > Add to order </button>
            </p>
          </Popup>

          <button  onClick={() => addorderitem("Power Bowl")}> Power Bowl </button>
      </p>
      </h3>
      

      <h3 > Other:
      <div>
        <Popup contentStyle={{width: "1200px"}} trigger=
            {<button > Build Your Own </button>} 
            modal nested onClose={main_panel}>
            {
                <div >
                <p>{BYO_Panel}</p>
                </div>
            }
        </Popup>

        <Popup trigger=
            {<button > Sides </button>} 
            modal nested >
            {
              <div>
                <h2 > Street Sides
                <p>
                <button onClick={() => addorderitem("Sweet Corn Salad")} > Sweet Corn Salad </button>
                <button onClick={() => addorderitem("Garlic Dough")} > Garlic Dough </button>
                <button onClick={() => addorderitem("Meatballs")} > Meatballs </button>
                <button onClick={() => addorderitem("Pepperoni Piada Stick")} > Pepperoni Piada Stick </button>
                <button onClick={() => addorderitem("Cup of Lobster Bisque")} > Lobster Bisque </button>
                <button onClick={() => addorderitem("Chocolate Brownie")} > Sweet Street Chocolate Brownie </button>
                <button onClick={() => addorderitem("Chocolate Chunk Cookie")} > Chocolate Chunk Cookie </button>
                <button onClick={() => addorderitem("Salted Caramel Cookie")} > Salted Caramel Cookie </button>
              </p>
              </h2>
              </div>  
            }
        </Popup>

        <Popup trigger=
            {<button > Drinks </button>} 
            modal nested>
            {
                <div >
                <h2> Drinks </h2>
                <p>
                <button onClick={() => addorderitem("Blackberry Hibiscus Lemonade")} > Blackberry Hibiscus Lemonade </button>
                <button onClick={() => addorderitem("Orange Soda")} > Orange Soda </button>
                <button onClick={() => addorderitem("Berry Soda")} > Berry Soda </button>
                <button onClick={() => addorderitem("Peach Tea")} > Peach Tea </button>
                <button onClick={() => addorderitem("Lemon Tea")} > Lemon Tea </button>
                <button onClick={() => addorderitem("Acqua Panna Spring Water")} > Acqua Panna Spring Water </button>
                <button onClick={() => addorderitem("San Pellegrino Sparkling Water")} > San Pellegrino Sparkling Water </button>
                <button onClick={() => addorderitem("REG Soft Drink")} > Regular Soft Drink </button>
                <button onClick={() => addorderitem("LG Soft Drink")} > Large Soft Drink </button>
              </p>
              </div>
            }
        </Popup>

        <Popup trigger=
            {<button > Kids </button>} 
            modal nested>
            {
                <div >
                    <h2> Kids Menu </h2>
                    <Popup trigger=
                    {<button > Kids Pasta  </button>}
                    position="bottom center" >
                    <div >
                    <button > Grilled Chicken </button>
                    <button > Crispy Chicken </button>
                    <button > Steak </button>

                    <button > Spaghetti </button>
                    <button > Penne </button>
                    <button > Add to Order </button>
                    </div>
                    </Popup>

                    <Popup trigger=
                    {<button > Kids Meatballs  </button>}
                    position="bottom center" >
                    <div >
                    <button > Spaghetti </button>
                    <button > Penne </button>
                    <button > Add to Order </button>
                    </div>
                    </Popup>
                    
                    <button onClick={() => addorderitem("Kids Chicken Fingers")} > Chicken Fingers </button>

                    <br /><br />
                    <h3> Drinks: </h3>
                    <button onClick={() => addorderitem("Kids Low-Fat Milk")} > Low-Fat Milk </button>
                    <button onClick={() => addorderitem("Kids Chocolate Milk")} > Chocolate Milk </button>
                    <button onClick={() => addorderitem("Kids Apple Juice")} > Apple Juice </button>
                </div>
            }
        </Popup>
      </div>
      </h3>
      </div>
    </div>
  );
}

export default CustomerGUI;
