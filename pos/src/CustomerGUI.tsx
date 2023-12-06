import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { useNavigate } from "react-router-dom";
import 'reactjs-popup/dist/index.css';
import './Customer.css';
import './Cashier.css';
import axios, {AxiosError} from 'axios';
import './App.css';
import TextSizeAdjuster from "./Components/TextAdjuster";
import { BsFillTrashFill } from 'react-icons/bs';
import { Offcanvas } from 'react-bootstrap';

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

    // let curr_item = "";
    // let curr_size = "";
    // let curr_type = "";
    const [curr_item, setItem] = useState('');
    const [curr_size, setSize] = useState('');
    const [curr_type, setType] = useState('');

    const [order, setOrder] = useState<string[]>([]);
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
    const [prices, setPrices] = useState<number[]>([]);

    const makeorderitem = (temp : number, item : string) => {
        if (temp === 0) {
            console.log("Choosing current item: ", item);
            setItem(item);
        }
        else if (temp === 1) {
            console.log("Choosing a size: ", item);
            setSize(item);
        }
        else if (temp === 2) {
            console.log("Choosing a type: ", item);
            setType(item);
        }
    }

    //Add Order Item Selected to Order Array
    const addorderitem = (item : string) => {
        if (item === "") {
            console.log("Current size: ", curr_size);
            console.log("Current item: ", curr_item);
            console.log("Current type: ", curr_type);
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
        setItem('');
        setSize('');
        setType('');
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
        // const [selectedSize, setSelectedSize] = useState(null);
        // const [selectedPastaType, setSelectedPastaType] = useState(null);
        // const [selectedProtein, setSelectedProtein] = useState(null);
        // const [selectedSauce, setSelectedSauce] = useState(null);
        // const [selectedToppings, setSelectedToppings] = useState([]);

        // const handleSizeSelection = (size) => {
        //     setSelectedSize(size);
        // };

        // const handlePastaTypeSelection = (pastaType) => {
        //     setSelectedPastaType(pastaType);
        // };

        // const handleProteinSelection = (protein) => {
        //     setSelectedProtein(protein);
        // };

        // const handleSauceSelection = (sauce) => {
        //     setSelectedSauce(sauce);
        // };

        // const handleToppingSelection = (topping) => {
        //     // Toggle the topping in the selectedToppings array
        //     setSelectedToppings((prevToppings) => {
        //     const index = prevToppings.indexOf(topping);
        //     if (index !== -1) {
        //         return prevToppings.filter((item) => item !== topping);
        //     } else {
        //         return [...prevToppings, topping];
        //     }
        //     });
        // };

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
                        <button onClick={() => makeorderitem(1, "SM Custom Pasta")}> Small </button>
                        {/* className={selectedSize === 'Small' ? 'selectedButton' : 'normalButton'}> Small </button> &nbsp; */}
                        <button onClick={() => makeorderitem(1, "REG Custom Pasta")}> Regular </button>
                        {/* className={selectedSize === 'Regular' ? 'selectedButton' : 'normalButton'}> Regular </button>  */}
                        &nbsp;&nbsp; 
                    Pasta: &nbsp;
                        <button onClick={() => makeorderitem(2, "Spaghetti")}> Spaghetti </button> &nbsp;
                        {/* className={selectedSize === 'Spaghetti' ? 'selectedButton' : 'normalButton'}> Spaghetti </button> &nbsp; */}
                        <button onClick={() => makeorderitem(2, "Penne")}> Penne </button>
                        {/* className={selectedSize === 'Penne' ? 'selectedButton' : 'normalButton'}> Penne </button> */}
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
    
    // For the shopping cart
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // For the option buttons
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedPasta, setSelectedPasta] = useState('');

    return (
    <div className='Customer'>
        <div className='CustomerHeader'>
            <h1 style={{fontSize: "5vh"}}> 
                <img src="piada-icon.jpg" alt="Piada Icon of a Motor bike." className='icon' onClick={() => navigate('/')}/> &nbsp;
                <b><u>PIADA</u></b>  ~ Customer Self-Service ~ 
                {/* <Popup trigger=
                    {<button className='navigate-buttons'> Cart </button>}
                    position="right center"
                    modal nested >
                    {
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
                    }
                </Popup> */}
                <button className='navigate-buttons' onClick={handleShow}> Cart </button>
                <Offcanvas show={show} onHide={handleClose} placement='end' backdrop={false} scroll={true}
                style={{ width: '55%', backgroundColor: '#736a60' }}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title></Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                    <h2 style={{width: "50vw"}}>
                        <div>
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
                    </Offcanvas.Body>
                </Offcanvas>
                {/* <button onClick={() => navigate(-1)} className='navigate-buttons'> <FaHome /> &nbsp; Home </button> */}
                <button onClick={() => navigate(-1)} className='navigate-buttons'> &nbsp; Home </button>
            </h1>
        </div>


         
                 
        
        
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
                        <button className={selectedSize === 'SM' ? 'selectedButton' : 'normalButton'}
                            onClick={() =>  {setSelectedSize('SM');
                                            makeorderitem(1, "SM"); }}>
                            Small
                        </button>
                        <button className={selectedSize === 'REG' ? 'selectedButton' : 'normalButton'}
                            onClick={() =>  {setSelectedSize('REG');
                                            makeorderitem(1, "REG"); }}>
                            Regular
                        </button>
                        <br />
                        <button className={selectedPasta === 'Penne' ? 'selectedButton' : 'normalButton'}
                            onClick={() =>  {setSelectedPasta('Penne');
                                            makeorderitem(2, "Penne"); }}>
                            Penne
                        </button>
                        <button className={selectedPasta === 'Spaghetti' ? 'selectedButton' : 'normalButton'}
                            onClick={() =>  {setSelectedPasta('Spaghetti');
                                            makeorderitem(2, "Spaghetti"); }}>
                            Spaghetti
                        </button>
                        <br /> 
                        <button className='addToOrderButton'
                            onClick={() => addorderitem("")}> Add to order </button>
                    </p>
                </Popup>
                <p className='PriceText'>SM $8.29  Reg $10.19</p>
                <p className='IngredientText'>Pasta, parmesan alfredo, bruschetta tomatoes, pancetta (bacon), spinach, grated parmesan</p>
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
                        <button className={selectedSize === 'SM' ? 'selectedButton' : 'normalButton'}
                            onClick={() =>  {makeorderitem(1, "SM");
                                            setSelectedSize('SM'); }}>
                            Small
                        </button>
                        <button className={selectedSize === 'REG' ? 'selectedButton' : 'normalButton'}
                            onClick={() =>  {makeorderitem(1, "REG");
                                            setSelectedSize('REG'); }}>
                            Regular
                        </button>
                        <br />
                        <button className={selectedPasta === 'Penne' ? 'selectedButton' : 'normalButton'}
                            onClick={() =>  {makeorderitem(2, "Penne");
                                            setSelectedPasta('Penne'); }}>
                            Penne
                        </button>
                        <button className={selectedPasta === 'Spaghetti' ? 'selectedButton' : 'normalButton'}
                            onClick={() =>  {makeorderitem(2, "Spaghetti");
                                            setSelectedPasta('Spaghetti'); }}>
                            Spaghetti
                        </button>
                        <br /> 
                        <button className='addToOrderButton'
                            onClick={() => {addorderitem(""); setSelectedPasta(''); setSelectedSize('')}}> Add to order </button>
                    </p>
                </Popup>
                <p className='PriceText'>SM $8.29  Reg $10.19</p>
                <p className='IngredientText'>Pasta, spicy diavolo sauce, bruschetta tomatoes, chopped green onions, grated parmesan</p>
            </div>
        
            <div className='float-child'>
                <p>Basil Pesto</p>
                <Popup trigger=
                    {<button className='MenuItemButton'>
                        <img src='https://images.mypiada.com/piada-one/product/322/197053.jpg' alt='Basil Pesto'
                        style={{width: "13.5vw"}}/>
                    </button>}
                    position="left center" onOpen={() => makeorderitem(0, "Basil Pesto")}>
                    <p >
                        <button className={selectedSize === 'SM' ? 'selectedButton' : 'normalButton'}
                            onClick={() =>  {makeorderitem(1, "SM");
                                            setSelectedSize('SM'); }}>
                            Small
                        </button>
                        <button className={selectedSize === 'REG' ? 'selectedButton' : 'normalButton'}
                            onClick={() =>  {makeorderitem(1, "REG");
                                            setSelectedSize('REG'); }}>
                            Regular
                        </button>
                        <br />
                        <button className={selectedPasta === 'Penne' ? 'selectedButton' : 'normalButton'}
                            onClick={() =>  {makeorderitem(2, "Penne");
                                            setSelectedPasta('Penne'); }}>
                            Penne
                        </button>
                        <button className={selectedPasta === 'Spaghetti' ? 'selectedButton' : 'normalButton'}
                            onClick={() =>  {makeorderitem(2, "Spaghetti");
                                            setSelectedPasta('Spaghetti'); }}>
                            Spaghetti
                        </button>
                        <br /> 
                        <button className='addToOrderButton'
                            onClick={() => {addorderitem(""); setSelectedPasta(''); setSelectedSize('')}}> Add to order </button>
                    </p>
                </Popup>
                <p className='PriceText'>SM $8.29  Reg $10.19</p>
                <p className='IngredientText'>Pasta, parmesan alfredo, basil pesto, bruschetta tomatoes, grated parmesan</p>
            </div>
            
            <div className='float-child'>
                <p>Marinara</p>
                <Popup trigger=
                    {<button className='MenuItemButton'>
                        <img src='https://images.mypiada.com/piada-one/product/565/325680.jpg' alt='Marinara'
                        style={{width: "13.5vw"}}/>
                    </button>}
                    position="left center" onOpen={() => makeorderitem(0, "Marinara")}>
                    <p >
                        <button className={selectedSize === 'SM' ? 'selectedButton' : 'normalButton'}
                            onClick={() =>  {makeorderitem(1, "SM");
                                            setSelectedSize('SM'); }}>
                            Small
                        </button>
                        <button className={selectedSize === 'REG' ? 'selectedButton' : 'normalButton'}
                            onClick={() =>  {makeorderitem(1, "REG");
                                            setSelectedSize('REG'); }}>
                            Regular
                        </button>
                        <br />
                        <button className={selectedPasta === 'Penne' ? 'selectedButton' : 'normalButton'}
                            onClick={() =>  {makeorderitem(2, "Penne");
                                            setSelectedPasta('Penne'); }}>
                            Penne
                        </button>
                        <button className={selectedPasta === 'Spaghetti' ? 'selectedButton' : 'normalButton'}
                            onClick={() =>  {makeorderitem(2, "Spaghetti");
                                            setSelectedPasta('Spaghetti'); }}>
                            Spaghetti
                        </button>
                        <br /> 
                        <button className='addToOrderButton'
                            onClick={() => {addorderitem(""); setSelectedPasta(''); setSelectedSize('')}}> Add to order </button>
                    </p>
                </Popup>
                <p className='PriceText'>SM $8.29  Reg $10.19</p>
                <p className='IngredientText'>Pasta, housemade tomato sauce, grated parmesan</p>
            </div>
        </div>
        </p>
        </h3>

        <h3 > <p className='CategoryText'>Piadas</p>  
            <p>
            <div className='float-container'>
            <div className='float-child'>
            <p>Avocado Piada <br/><br/></p>
            <button onClick={() => addorderitem("Avocado Piada")} className='MenuItemButton'>
                <img src='https://images.mypiada.com/piada-one/product/315/196632.jpg' alt='Avocado'
                style={{width: "13.5vw"}}/>
            </button>
            <p className='PriceText'>$9.89</p>
            <p className='IngredientText'>Italian-style street wrap with pancetta (bacon), arugula, 
            mozzarella, fresh avocado, sweet corn & tomato, basil aioli</p>
            </div>
            <div className='float-child'>
            <p>BLT Piada <br/><br/></p>
            <button onClick={() => addorderitem("BLT Piada")} className='MenuItemButton'>
                <img src='https://images.mypiada.com/piada-one/product/453/185657.jpg' alt='BLT'
                style={{width: "13.5vw"}}/>
            </button>
            <p className='PriceText'>$9.29</p>
            <p className='IngredientText'>Italian-style street wrap with pancetta (bacon), romaine, 
            bruschetta tomatoes, creamy parmesan, basil aioli</p>
            </div>
            <div className='float-child'>
            <p>Chef's Favorite Piada</p>
            <button onClick={() => addorderitem("Chefs Favorite Piada")} className='MenuItemButton'>
                <img src='https://images.mypiada.com/piada-one/product/279/196634.jpg' alt="Chef's Favorite"
                style={{width: "13.5vw"}}/>
            </button>
            <p className='PriceText'>$9.29</p>
            <p className='IngredientText'>Italian-style street wrap with spicy diavolo sauce, romaine, 
            mozzarella, sweet peppers, spicy ranch</p>
            </div>
            <div className='float-child'>
            <p>Mediterranean Piada</p>
            <button onClick={() => addorderitem("Mediterranean Piada")} className='MenuItemButton'>
                <img src='https://images.mypiada.com/piada-one/product/548/386780.jpg' alt='Mediterranean'
                style={{width: "13.5vw"}}/>
            </button>
            <p className='PriceText'>$10.19</p>
            <p className='IngredientText'>Italian-style street wrap with harissa grain blend, arugula, hummus, 
            cucumber salad, pickled red onions, bruschetta tomatoes, feta, basil aioli</p>
            </div>
            </div>
            </p>
        </h3>

        <h3 > <p className='CategoryText'>Salad</p> 
        <p>
        <div className='float-container'>
          <div className='float-child'>
          <p>Deluxe Ceaser</p>
          <Popup trigger=
            {<button className='MenuItemButton'>
                <img src='https://images.mypiada.com/piada-one/product/456/196981.jpg' alt='Deluxe Caeser'
                style={{width: "13.5vw"}}/>
            </button>}
            position="right center" onOpen={() => makeorderitem(0, "Deluxe Ceasar Salad")}>
            <p >
                <button className={selectedSize === 'SM' ? 'selectedButton' : 'normalButton'}
                    onClick={() =>  {makeorderitem(1, "SM");
                                    setSelectedSize('SM'); }}>
                    Small
                </button>
                <button className={selectedSize === 'REG' ? 'selectedButton' : 'normalButton'}
                    onClick={() =>  {makeorderitem(1, "REG");
                                    setSelectedSize('REG'); }}>
                    Regular
                </button>
                <br />
                <button className='addToOrderButton' onClick={() => {addorderitem(""); setSelectedSize('')}}> Add to order </button>
            </p>
          </Popup>
          <p className='PriceText'>SM $7.69  Reg $9.99</p>
          <p className='IngredientText'>Romaine, cabbage & kale blend, parmesan crisps, pancetta (bacon), 
          bruschetta tomatoes, grated parmesan, Caesar dressing</p>
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
                <button className={selectedSize === 'SM' ? 'selectedButton' : 'normalButton'}
                    onClick={() =>  {makeorderitem(1, "SM");
                                    setSelectedSize('SM'); }}>
                    Small
                </button>
                <button className={selectedSize === 'REG' ? 'selectedButton' : 'normalButton'}
                    onClick={() =>  {makeorderitem(1, "REG");
                                    setSelectedSize('REG'); }}>
                    Regular
                </button>
                <br />
                <button className='addToOrderButton' onClick={() => {addorderitem(""); setSelectedSize('')}}> Add to order </button>
            </p>
          </Popup>
          <p className='PriceText'>SM $8.59  Reg $10.79</p>
          <p className='IngredientText'>Chopped greens, cabbage & kale blend, strawberries, feta, sweet corn & tomato, 
          fresh avocado, glazed pecans, lemon-basil dressing</p>
          </div>
          
          <div className='float-child'>
          <p>Avocado Chop</p>
          <Popup trigger=
            {<button className='MenuItemButton'>
                <img src='https://images.mypiada.com/piada-one/product/782/product_web_category.png' alt= 'Avocado Chop'
                style={{width: "13.5vw"}}/>
            </button>}
            position="left center" onOpen={() => makeorderitem(0, "Avocado Chop Salad")}>
            <p >
                <button className={selectedSize === 'SM' ? 'selectedButton' : 'normalButton'}
                    onClick={() =>  {makeorderitem(1, "SM");
                                    setSelectedSize('SM'); }}>
                    Small
                </button>
                <button className={selectedSize === 'REG' ? 'selectedButton' : 'normalButton'}
                    onClick={() =>  {makeorderitem(1, "REG");
                                    setSelectedSize('REG'); }}>
                    Regular
                </button>
                <br />
                <button className='addToOrderButton' onClick={() => {addorderitem(""); setSelectedSize('')}}> Add to order </button>
            </p>
          </Popup>
          <p className='PriceText'>SM $8.49  Reg $10.89</p>
          <p className='IngredientText'>Chopped greens, cabbage & kale blend, sweet corn & tomato, fresh avocado, 
          pickled red onions, shredded parmesan, spiced almonds, balsamic glaze, creamy basil parmesan dressing</p>
          </div>

            <div className='float-child'>
            <p>Power Bowl</p>
            <button onClick={() => addorderitem("Power Bowl")} className='MenuItemButton'>
                <img src='https://images.mypiada.com/piada-one/product/562/324991.jpg' alt='Power Bowl'
                style={{width: "13.5vw"}}/>
            </button>
            <p className='PriceText'>$11.79</p>
            <p className='IngredientText'>Harissa grain blend, hummus, roasted sweet potatoes, sweet corn & tomato, 
            roasted broccoli, cucumber salad, pickled red onions, yogurt harissa</p>
            </div>
        </div>
        </p>
        </h3>
      

        <h3 > <p className='CategoryText'>Other</p>
        <div className='float-container'>
            <div className='float-child'>
            <Popup contentStyle={{width: "1200px"}} trigger=
                {<button className='MenuItemButton'> Build Your Own </button>} 
                modal nested onClose={main_panel}>
                {
                    <div >
                    <p>{BYO_Panel}</p>
                    </div>
                }
            </Popup>
            </div>
            
            <div className='float-child'>
            <p>Street Sides</p>
            <Popup trigger=
                {<button className='MenuItemButton'> 
                    <img src='https://images.mypiada.com/piada-one/category/607/category_web_list.png' alt='Sides'
                    style={{width: "13.5vw"}}/>
                </button>}
                modal nested >
                {
                <div className='popupMenu'>
                    <h2 className='popupHeader'> Street Sides </h2>
                    <p>
                    <div className='float-child2'>
                    <p>Sweet Corn Salad</p>
                    <button onClick={() => addorderitem("Sweet Corn Salad")} >
                        <img src='https://images.mypiada.com/piada-one/product/588/185794.jpg' alt='Sweet Corn Salad'
                        style={{width: "13.5vh"}}/>
                    </button>
                    </div>
                    <div className='float-child2'>
                    <p>Garlic Dough</p>
                    <button onClick={() => addorderitem("Garlic Dough")} >
                        <img src='https://images.mypiada.com/piada-one/product/490/114209.jpg' alt='Garlic Dough'
                        style={{width: "13.5vh"}}/>
                    </button>
                    </div>
                    <div className='float-child2'>
                    <p>Meatballs</p>
                    <button onClick={() => addorderitem("Meatballs")} >
                        <img src='https://images.mypiada.com/piada-one/product/685/139924.jpg' alt='Meatballs'
                        style={{width: "13.5vh"}}/>
                    </button>
                    </div>
                    <div className='float-child2'>
                    <p>Pepperoni Piada Stick</p>
                    <button onClick={() => addorderitem("Pepperoni Piada Stick")} >
                        <img src='https://images.mypiada.com/piada-one/product/556/119363.jpg' alt='Pepperoni Piada Stick'
                        style={{width: "13.5vh"}}/>
                    </button>
                    </div>
                    </p>
                    <p>
                    <div className='float-child2'>
                    <p>Lobster Bisque</p>
                    <button onClick={() => addorderitem("Cup of Lobster Bisque")} >
                        <img src='https://images.mypiada.com/piada-one/product/353/118718.jpg' alt='Lobster Bisque'
                        style={{width: "13.5vh"}}/>
                    </button>
                    </div>
                    <div className='float-child2'>
                    <p>Chocolate Brownie</p>
                    <button onClick={() => addorderitem("Chocolate Brownie")} >
                        <img src='https://images.mypiada.com/piada-one/product/428/242255.jpg' alt='Chocolate Brownie'
                        style={{width: "13.5vh"}}/>
                    </button>
                    </div>
                    <div className='float-child2'>
                    <p>Chocoalte Chunk Cookie</p>
                    <button onClick={() => addorderitem("Chocolate Chunk Cookie")} >
                        <img src='https://images.mypiada.com/piada-one/product/431/185796.jpg' alt='Chocolate Chunk Cookie'
                        style={{width: "13.5vh"}}/>
                    </button>
                    </div>
                    <div className='float-child2'>
                    <p>Salted Caramel Cookie</p>
                    <button onClick={() => addorderitem("Salted Caramel Cookie")} >
                        <img src='https://images.mypiada.com/piada-one/product/570/185797.jpg' alt='Salted Caramel Cookie'
                        style={{width: "13.5vh"}}/>
                    </button>
                    </div>
                    </p>
                </div>  
                }
            </Popup>
            </div>

            <div className='float-child'>
            <p>Drinks</p>
            <Popup trigger=
                {<button className='MenuItemButton'> 
                    <img src='https://images.mypiada.com/piada-one/category/858/category_web_list.jpg' alt='Drinks'
                    style={{width: "13.5vw"}}/>
                </button>} 
                modal nested>
                {
                <div >
                    <h2> Drinks </h2>
                    <p>
                    <div className='float-child2'>
                    <p>Blackberry Hibiscus Lemonade</p>
                    <button onClick={() => addorderitem("Blackberry Hibiscus Lemonade")} >
                        <img src='https://images.mypiada.com/piada-one/product/325/street-trio-blackberry-lemonade.png' alt='Blackberry Hibiscus Lemonade'
                        style={{width: "13.5vh"}}/>
                    </button>
                    </div>
                    <div className='float-child2'>
                    <p>Orange Soda</p>
                    <button onClick={() => addorderitem("Orange Soda")} >
                        <img src='https://images.mypiada.com/piada-one/option/709/orange-italian-soda-230_2x.jpg' alt='Orange Soda'
                        style={{width: "13.5vh"}}/>
                    </button>
                    </div>
                    <div className='float-child2'>
                    <p>Berry Soda</p>
                    <button onClick={() => addorderitem("Berry Soda")} >
                        <img src='https://images.mypiada.com/piada-one/option/704/raspberry-italian-soda-230_2x.jpg' alt='Berry Soda'
                        style={{width: "13.5vh"}}/>
                    </button>
                    </div>
                    <div className='float-child2'>
                    <p>Peach Tea</p>
                    <button onClick={() => addorderitem("Peach Tea")} >
                        <img src='https://images.mypiada.com/piada-one/option/711/peach-italian-tea-230_2x.jpg' alt='Peach Tea'
                        style={{width: "13.5vh"}}/>
                    </button>
                    </div>
                    <div className='float-child2'>
                    <p>Lemon Tea</p>
                    <button onClick={() => addorderitem("Lemon Tea")} >
                        <img src='https://images.mypiada.com/piada-one/option/710/lemon-italian-tea-230_2x.jpg' alt='Lemon Tea'
                        style={{width: "13.5vh"}}/>
                    </button>
                    </div>
                    </p>
                    <p>
                    <div className='float-child2'>
                    <p>Acqua Panna Spring Water</p>
                    <button onClick={() => addorderitem("Acqua Panna Spring Water")} >
                        <img src='https://images.mypiada.com/piada-one/product/309/product_web_category.jpg' alt='Spring Water'
                        style={{width: "13.5vh"}}/>
                    </button>
                    </div>
                    <div className='float-child2'>
                    <p>San Pellegrino Sparkling Water</p>
                    <button onClick={() => addorderitem("San Pellegrino Sparkling Water")} >
                        <img src='https://images.mypiada.com/piada-one/product/695/116261.jpg' alt='Sparkling Water'
                        style={{width: "13.5vh"}}/>
                    </button>
                    </div>
                    <div className='float-child2'>
                    <p>Regular Soft Drink</p>
                    <button onClick={() => addorderitem("REG Soft Drink")} >
                        <img src='https://images.mypiada.com/piada-one/product/464/120950.jpg' alt='REG Soft Drink'
                        style={{width: "13.5vh"}}/>
                    </button>
                    </div>
                    <div className='float-child2'>
                    <p>Large Soft Drink</p>
                    <button onClick={() => addorderitem("LG Soft Drink")} >
                        <img src='https://images.mypiada.com/piada-one/product/464/120950.jpg' alt='LG Soft Drink'
                        style={{width: "13.5vh"}}/>
                    </button>
                    </div>
                    </p>
                </div>
                }
            </Popup>
            </div>

            <div className='float-child'>
            <p>Kids</p>
            <Popup trigger=
                {<button className='MenuItemButton'> 
                    <img src='https://images.mypiada.com/piada-one/category/600/category_web_list.jpg' alt='Kids'
                    style={{width: "13.5vw"}}/>
                </button>} 
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
        </div>
        </h3>
        </div>
    </div>
  );
}

export default CustomerGUI;