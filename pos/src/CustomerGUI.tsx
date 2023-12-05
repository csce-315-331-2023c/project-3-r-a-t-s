import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { useNavigate } from "react-router-dom";
import 'reactjs-popup/dist/index.css';
import './Customer.css';
import axios, {AxiosError} from 'axios';
import './App.css';
import TextSizeAdjuster from "./Components/TextAdjuster";
import { BsFillTrashFill } from 'react-icons/bs';

interface CustomerProps {
    startListening: () => void;
    stopListening: () => void;
    recognizedText: string;
}

const CustomerGUI : React.FC<CustomerProps> = ( {startListening, stopListening, recognizedText}) => {
    const navigate = useNavigate();
    //Speech API Starts Here
    const handleVoiceCommand = () => {
        if (recognizedText.toLowerCase().includes('home') || recognizedText.toLowerCase() === 'click home' ) {
            navigate('/');
        }

        if (recognizedText.toLowerCase().includes('menu')) {
            stopListening();
            navigate('/MenuBoardGUI');
        }

        if (recognizedText.toLowerCase().includes('scroll up') ) {
            window.scroll(0, window.scrollY - 400);
            startListening();
        }
        if (recognizedText.toLowerCase().includes('top') ) {
            window.scrollTo(0, 0);
            startListening();
        }

        if (recognizedText.toLowerCase().includes('scroll down') ) {
            window.scroll(0, window.scrollY + 400);
            startListening();
        }  

        if (recognizedText.toLowerCase().includes('bottom')) {
            window.scrollTo(0, document.body.scrollHeight);
            startListening();
        }  

        let size = "";
        let type = "";
        let item = "";
        if (recognizedText.toLowerCase().includes('add')) {
            if(recognizedText.toLowerCase().includes('small')) {
                size = "SM"
            }
            else if  (recognizedText.toLowerCase().includes('regular')){
                size = "REG"
            }

            if (recognizedText.toLowerCase().includes('spaghetti')) {
                type = "Spaghetti"
            }
            else if (recognizedText.toLowerCase().includes('penne')) {
                type = "Penne"
            }

            if (recognizedText.toLowerCase().includes('carbonara')) {
                addorderitem((size.length === 0 ? "REG" : size) + " Carbonara " + (type.length === 0 ? "Spaghetti" : type))
            }
            else if (recognizedText.toLowerCase().includes('diavolo')) {
                addorderitem((size.length === 0 ? "REG" : size) + " Diavolo " + (type.length === 0 ? "Spaghetti" : type))
            }
            else if (recognizedText.toLowerCase().includes('basil') || recognizedText.toLowerCase().includes('pesto')) {
                addorderitem((size.length === 0 ? "REG" : size) + " Basil Pesto " + (type.length === 0 ? "Spaghetti" : type))
            }
            else if (recognizedText.toLowerCase().includes('marinara')) {
                addorderitem((size.length === 0 ? "REG" : size) + " Marinara " + (type.length === 0 ? "Spaghetti" : type))
            }
            else if (recognizedText.toLowerCase().includes('avocado') && recognizedText.toLowerCase().includes('piada')) {
                addorderitem("Avocado Piada")
            }
            else if (recognizedText.toLowerCase().includes('blt')) {
                addorderitem("BLT Piada")
            }
            else if (recognizedText.toLowerCase().includes("chef's") || recognizedText.toLowerCase().includes("favorite")) {
                addorderitem("Chefs Favorite Piada")
            }
            else if (recognizedText.toLowerCase().includes('mediterranean')) {
                addorderitem("Mediterranean Piada")
            }
            else if (recognizedText.toLowerCase().includes('avocado') && (recognizedText.toLowerCase().includes('chop') || recognizedText.toLowerCase().includes('salad'))) {
                addorderitem((size.length === 0 ? "REG" : size) + " Avocado Chop Salad")
            }
            else if (recognizedText.toLowerCase().includes('farmers') || recognizedText.toLowerCase().includes('market')) {
                addorderitem((size.length === 0 ? "REG" : size) + " Farmers Market Salad")
            }
            else if (recognizedText.toLowerCase().includes("deluxe") || recognizedText.toLowerCase().includes("caesar")) {
                addorderitem((size.length === 0 ? "REG" : size) + " Deluxe Caesar Salad")
            }
            else if (recognizedText.toLowerCase().includes('power') || recognizedText.toLowerCase().includes('bowl')) {
                addorderitem("Power Bowl")
            }
        
            else if (recognizedText.toLowerCase().includes('sweet corn') || recognizedText.toLowerCase().includes('salad')) {
                addorderitem("Sweet Corn Salad")
            }
            else if (recognizedText.toLowerCase().includes('pepperoni piada stick')){
                addorderitem("Pepperoni Piada Stick")
            }
            else if (recognizedText.toLowerCase().includes('parmesan piada stick')){
                addorderitem("Parmesan Piada Stick")
            }
            else if (recognizedText.toLowerCase().includes('garlic dough')){
                addorderitem("Garlic Dough")
            }
            else if (recognizedText.toLowerCase().includes('lobster bisque')){
                addorderitem("Cup of Lobster Bisque")
            }
            else if (recognizedText.toLowerCase().includes('calamari') || recognizedText.toLowerCase().includes('hot') && recognizedText.toLowerCase().includes('peppers')){
                addorderitem("Calamari & Hot Peppers")
            }
            else if (recognizedText.toLowerCase().includes('meatballs')){
                addorderitem("Meatballs")
            }
            else if (recognizedText.toLowerCase().includes('cookie')){
                if (recognizedText.toLowerCase().includes('chocolate')) {
                    addorderitem("Chocolate Chunk Cookie")
                }
                else if (recognizedText.toLowerCase().includes('caramel')) {
                    addorderitem("Salted Caramel Cookie")
                }
                else {
                    addorderitem("Chocolate Chunk Cookie")
                }
            }
            else if (recognizedText.toLowerCase().includes('brownie')){
                addorderitem("Chocolate Brownie")
            }
            else if ((recognizedText.toLowerCase().includes('blackberry') || recognizedText.toLowerCase().includes('hibiscus')) && recognizedText.toLowerCase().includes('lemonade')){
                addorderitem("Blackberry Hibiscus Lemonade")
            }
            else if (recognizedText.toLowerCase().includes('soda')){
                if (recognizedText.toLowerCase().includes('orange')) {
                    addorderitem('Orange Soda');
                }
                else if (recognizedText.toLowerCase().includes('berry')){
                    addorderitem('Berry Soda');
                }
                else {
                    addorderitem('REG Soft Drink')
                }
            }
            else if (recognizedText.toLowerCase().includes('tea')){
                if (recognizedText.toLowerCase().includes('peach')) {
                    addorderitem('Peach Tea');
                }
                else {
                    addorderitem('Lemon Tea');
                }
            }
            else if (recognizedText.toLowerCase().includes('soft') || recognizedText.toLowerCase().includes('drink') || recognizedText.toLowerCase().includes('soda')){
                if (recognizedText.toLowerCase().includes('regular')) {
                    addorderitem('REG Soft Drink');
                }
                else {
                    addorderitem('LG Soft Drink');
                }
            }
            else if (recognizedText.toLowerCase().includes('water')){
                if (recognizedText.toLowerCase().includes('sparkling')) {
                    addorderitem('San Pellegrino Sparkling Water');
                }
                else {
                    addorderitem('Acqua Panna Spring Water');
                }
            }
            else if (recognizedText.toLowerCase().includes('')){
                addorderitem("")
            }
            else if (recognizedText.toLowerCase().includes('')){
                addorderitem("")
            }
            else if (recognizedText.toLowerCase().includes('')){
                addorderitem("")
            }
    }


    if (recognizedText.toLowerCase().includes('delete') || recognizedText.toLowerCase().includes('remove')) {
        if (recognizedText.toLowerCase().includes('all')) {
            removeAll();
        }
        else {
            // delete specific item in order
        }
    }

    if (recognizedText.toLowerCase().includes('pay') || recognizedText.toLowerCase().includes('complete') || recognizedText.toLowerCase().includes('finished')) {
        addorder();
    }
    };
    useEffect(() => {
        handleVoiceCommand();
    }, [recognizedText]);

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
            if (item.length===0) {
                return;
            }
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
    
    const [showSuccessPanel, setShowSuccessPanel] = useState(false);


    // Add Order Array to Database
    const addorder = () => {
        console.log("Paying for Order");
        if (order.length === 0) {
            return;
        }
        // console.table(order);
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
        //   .post('http://127.0.0.1:5000/api/cashier/get_price', item, config)
          .post(`https://pos-backend-3c6o.onrender.com/api/cashier/get_price`, item, config)
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

    const handleDeleteClick = (index : number) => {
        const temp = [...order]; 
        temp.splice(index, 1);
        setOrder(temp);
        const temp2 = [...prices];
        temp2.splice(index, 1);
        setPrices(temp2);
    }

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
    <div className='Customer'>
        <div className='CustomerHeader'>

            <h1 style={{fontSize: "5vh", width:"100vw"}}> 
                <img src="piada-icon.jpg" alt="Piada Icon of a Motor bike." className='icon' onClick={() => navigate('/')}/> &nbsp;
                   <b><u>PIADA</u></b>  ~ Customer Self-Service ~ 
            </h1>            
        </div> 

        <h2 style={{width: "50vw"}}>
        <div >
            <table className="table table-dark">
            <thead>
                  <tr>
                    <th> # </th>
                    <th> Name </th>
                    <th> Price($) </th>
                    <th><BsFillTrashFill onClick={removeAll}/></th>
                  </tr>
                </thead>
                <tbody>
                  {order.map((order, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{order}</td>
                      <td>{prices.at(index)}</td>
                      <td>
                      <BsFillTrashFill onClick={() => handleDeleteClick(index)}/>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            <button className='pay-button' onClick={addorder}> <u>Pay</u>: 
            ${prices.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toFixed(2)}</button>
            {showSuccessPanel && 
                <div className='payment-confirmation'>
                    <h3>Successfuly Placed Order!</h3>
                </div>
            }
        </h2> 
                 
        
        
        <div>    
        <h3> <p className='CategoryText'>Pasta</p>
        <p>
        <div className='float-container'>
            <div className='float-child'>
                <p>Carbonara</p>
                <Popup trigger=
                {<button className='MenuItemButton'>
                    <img src='https://images.mypiada.com/piada-one/product/423/197051.jpg' alt='Carbonara'
                    style={{width: "13.5vw"}}/>
                </button>}
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
                <p className='PriceText'>SM $5  Reg $10</p>
                <p className='IngredientText'>Ingredients blah blah blah blah blah blah blah will this wrap around if it gets too long</p>
            </div>
        

            <div className='float-child'>
            <p>Diavolo</p>
            <Popup trigger=
                {<button className='MenuItemButton'>
                    <img src='https://images.mypiada.com/piada-one/product/459/123678.jpg' alt='Diavolo'
                    style={{width: "13.5vw"}}/>
                </button>}
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
            <p className='PriceText'>SM $5  Reg $10</p>
            <p className='IngredientText'>Ingredients blah blah blah blah blah blah blah</p>
            </div>
        
            <div className='float-child'>
            <p>Basil Pesto</p>
            <Popup trigger=
                {<button className='MenuItemButton'>
                    <img src='https://images.mypiada.com/piada-one/product/322/197053.jpg' alt='Basil Pesto'
                    style={{width: "13.5vw"}}/>
                </button>}
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
            <p className='PriceText'>SM $5  Reg $10</p>
            <p className='IngredientText'>Ingredients blah blah blah blah blah blah blah</p>
            </div>
            
            <div className='float-child'>
            <p>Marinara</p>
            <Popup trigger=
                {<button className='MenuItemButton'>
                    <img src='https://images.mypiada.com/piada-one/product/565/325680.jpg' alt='Marinara'
                    style={{width: "13.5vw"}}/>
                </button>}
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
            <p className='PriceText'>SM $5  Reg $10</p>
            <p className='IngredientText'>Ingredients blah blah blah blah blah blah blah</p>
            </div>
        </div>
        </p>
        </h3>

        <h3 > <p className='CategoryText'>Piadas</p>  
            <p>
            <div className='float-container'>
            <div className='float-child'>
            <p>Avocado Piada</p>
            <button onClick={() => addorderitem("Avocado Piada")} className='MenuItemButton'>
                <img src='https://images.mypiada.com/piada-one/product/315/196632.jpg' alt='Avocado'
                style={{width: "13.5vw"}}/>
            </button>
            <p className='PriceText'>SM $5  Reg $10</p>
            <p className='IngredientText'>Ingredients blah blah blah blah blah blah blah</p>
            </div>
            <div className='float-child'>
            <p>BLT Piada</p>
            <button onClick={() => addorderitem("BLT Piada")} className='MenuItemButton'>
                <img src='https://images.mypiada.com/piada-one/product/453/185657.jpg' alt='BLT'
                style={{width: "13.5vw"}}/>
            </button>
            <p className='PriceText'>SM $5  Reg $10</p>
            <p className='IngredientText'>Ingredients blah blah blah blah blah blah blah</p>
            </div>
            <div className='float-child'>
            <p>Chef's Favorite Piada</p>
            <button onClick={() => addorderitem("Chefs Favorite Piada")} className='MenuItemButton'>
                <img src='https://images.mypiada.com/piada-one/product/279/196634.jpg' alt="Chef's Favorite"
                style={{width: "13.5vw"}}/>
            </button>
            <p className='PriceText'>SM $5  Reg $10</p>
            <p className='IngredientText'>Ingredients blah blah blah blah blah blah blah</p>
            </div>
            <div className='float-child'>
            <p>Mediterranean Piada</p>
            <button onClick={() => addorderitem("Mediterranean Piada")} className='MenuItemButton'>
                <img src='https://images.mypiada.com/piada-one/product/548/386780.jpg' alt='Mediterranean'
                style={{width: "13.5vw"}}/>
            </button>
            <p className='PriceText'>SM $5  Reg $10</p>
            <p className='IngredientText'>Ingredients blah blah blah blah blah blah blah</p>
            </div>
            </div>
            </p>
        </h3>

        <h3 > <p className='CategoryText'>Salad</p> 
        <p>
        <div className='float-container'>
          <div className='float-child'>
          <p>Deluxe Caeser</p>
          <Popup trigger=
            {<button className='MenuItemButton'>
                <img src='https://images.mypiada.com/piada-one/product/456/196981.jpg' alt='Deluxe Caeser'
                style={{width: "13.5vw"}}/>
            </button>}
            position="right center" onOpen={() => makeorderitem(0, "Deluxe Caesar Salad")}>
            <p >
            <button onClick={() => makeorderitem(1, "SM")} > Small </button>
            <button onClick={() => makeorderitem(1, "REG")} > Regular </button>
            <br /> 
            <button onClick={() => addorderitem("")} > Add to order </button>
            </p>
          </Popup>
          <p className='PriceText'>SM $5  Reg $10</p>
          <p className='IngredientText'>Ingredients blah blah blah blah blah blah blah</p>
          </div>

          <div className='float-child'>
          <p>Farmer's Market</p>
          <Popup trigger=
            {<button className='MenuItemButton'>
                <img src='https://images.mypiada.com/piada-one/product/467/product_web_category.png' alt="Farmer's Market"
                style={{width: "13.5vw"}}/>
            </button>}
            position="right center" onOpen={() => makeorderitem(0, "Farmers Market Salad")}>
            <p >
            <button onClick={() => makeorderitem(1, "SM")} > Small </button>
            <button onClick={() => makeorderitem(1, "REG")} > Regular </button>
            <br /> 
            <button onClick={() => addorderitem("")} > Add to order </button>
            </p>
          </Popup>
          <p className='PriceText'>SM $5  Reg $10</p>
          <p className='IngredientText'>Ingredients blah blah blah blah blah blah blah</p>
          </div>
          
          <div className='float-child'>
          <p>Avocado Chop</p>
          <Popup trigger=
            {<button className='MenuItemButton'>
                <img src='https://images.mypiada.com/piada-one/product/782/product_web_category.png' alt= 'Avocado Chop'
                style={{width: "13.5vw"}}/>
            </button>}
            position="right center" onOpen={() => makeorderitem(0, "Avocado Chop Salad")}>
            <p >
            <button onClick={() => makeorderitem(1, "SM")} > Small </button>
            <button onClick={() => makeorderitem(1, "REG")} > Regular </button>
            <br /> 
            <button onClick={() => addorderitem("")} > Add to order </button>
            </p>
          </Popup>
          <p className='PriceText'>SM $5  Reg $10</p>
          <p className='IngredientText'>Ingredients blah blah blah blah blah blah blah</p>
          </div>

            <div className='float-child'>
            <p>Power Bowl</p>
            <button onClick={() => addorderitem("Power Bowl")} className='MenuItemButton'>
                <img src='https://images.mypiada.com/piada-one/product/562/324991.jpg' alt='Power Bowl'
                style={{width: "13.5vw"}}/>
            </button>
            <p className='PriceText'>SM $5  Reg $10</p>
            <p className='IngredientText'>Ingredients blah blah blah blah blah blah blah</p>
            </div>
        </div>
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
