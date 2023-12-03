import React, { useState, useEffect } from 'react';
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Popup from 'reactjs-popup';
import { useNavigate } from "react-router-dom";
import 'reactjs-popup/dist/index.css';
import './Cashier.css';
import axios, {AxiosError} from 'axios';

import { BsFillTrashFill, BsFillPencilFill} from 'react-icons/bs';
import { CiLogout } from "react-icons/ci";


const CashierGUI = () => {

    useEffect(() => {
        getNewMenuItems();
    }, [])
   
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [item, setItem] = useState<string>("");
    const [size, setSize] = useState<string>("");
    const [type, setType] = useState<string>("");

    const [order, setOrder] = useState<string[]>([]);
    const [prices, setPrices] = useState<number[]>([]);

    const makeorderitem = (temp : number, i : string) => {
        if (temp === 0) {
            console.log("Choosing current item: ", i);
            setItem(i);
            setSize("");
            setType("");
        }
        else if (temp === 1) {
            console.log("Choosing a size: ", i);
            setSize(i);
        }
        else if (temp === 2) {
            console.log("Choosing a type: ", i);
            setType(i);
        }
        else if (temp === 3) {
            console.log("Choosing a protein: ", i);
            setProtein(i);
        }
    }

    //Add Order Item Selected to Order Array
    const addorderitem = (i : string) => {
        setLoading(true);
        if (i === "") {
            let temp = "";
            if (type === "") {
                temp = size + " " + item;
            }
            else {
                temp = size + " " + item + " " + type;
            }
            setOrder(order.concat(temp)); 
            updatePrice(temp);
            console.log("Added new order item: ", temp);
        }
        else {
            setOrder(order.concat(i)); 
            updatePrice(i);
            console.log("Added new order item:", i);
        }
    }

    const [showSuccessPanel, setShowSuccessPanel] = useState(false);

    useEffect(() => {
        setTimeout(() => {
          setShowSuccessPanel(false);
        }, 3000);
      }, []); 

    // Add Order Array to Database
    const addorder = () => {
        if (order.length === 0) {
            return;
        }
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
        axios
            // .post('http://127.0.0.1:5000/api/cashier/place_order', orderData, config)
            .post(`https://pos-backend-3c6o.onrender.com/api/cashier/place_order`, orderData, config)
            .then((response) => {
                // Handle the response from the Flask API
                if (response.data.message === "Order placed successfully (From Backend)") {
                    alert("Successfuly placed order!");
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
    const updatePrice = (i : string) => {
        console.log(i)
;        setLoading(true);
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'cashier'
            },
        };
        axios
        //   .post('http://127.0.0.1:5000/api/cashier/get_price', i, config)
          .post(`https://pos-backend-3c6o.onrender.com/api/cashier/get_price`, i, config)
          .then((response) => {
            console.log("Update Price Response:", response.data);
            setPrices([...prices,parseFloat(response.data.price)]);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
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

    const handleDeleteClick = (index : number) => {
        const temp = [...order]; 
        temp.splice(index, 1);
        setOrder(temp);
        const temp2 = [...prices];
        temp2.splice(index, 1);
        setPrices(temp2);
    }

    const goback = () => {
        navigate(-1);
    }

    const [newItems, setNewitems] = useState<string[]>([]);

    const getNewMenuItems = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'cashier'
            },
        };
        axios
        //   .post('http://127.0.0.1:5000/api/cashier/get_new_menu_items', i, config)
          .post(`https://pos-backend-3c6o.onrender.com/api/cashier/get_new_menu_items`, config)
          .then((response) => {
            console.log(response.data.data);
            setNewitems(response.data.data);
          })
          .catch((error) => {
            console.error('Failed to get any new menu items: ', error);
          });
      };    

    /*
        CUSTOMIZATIONS CODE BELOW
    */
    const [BYO_Panel, Set_BYO_Panel] = useState([<div> </div>]);    // used to set what displays in BYO panel

    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);   // stores selected toppings
    const [byo, setBYO] = useState(""); // stores if Custom Salad, Piada or Pasta
    const [customSize, setCustomSize] = useState("");   // stores size
    const [customType, setCustomType] = useState("");   // stores type of pasta
    const [protein, setProtein] = useState(""); // stores selected protein, can only have one per custom order
    const [sauce, setSauce] = useState(""); // stores selected sauce, can only have one
    const [customName, setCustomName] = useState<string>(""); //store the custom menu item name (For backend)
    const [kidsBYO, setKidsBYO] = useState("");
    const [kidsProtein, setKidsProtein] = useState<string>("");
    const [kidsType, setKidsType] = useState<string>("");

    useEffect(() => {
        if (byo === "Custom Pasta") {
            BYO_pasta();
            setCustomName(customSize + " " + byo + " " + customType);
        }
        else if (byo === "Custom Piada") {
            BYO_piada();
            setCustomName(byo);
        }
        else if (byo === "Custom Salad") {
            BYO_salad();
            setCustomName(customSize + " " + byo);
        }
    }, [byo, customSize, protein, sauce, customType, selectedIngredients])

    const clearBYOSelections = () => {
        setSelectedIngredients([]);
        setBYO("");
        setCustomSize("");
        setProtein("");
        setSauce("");
        setCustomType("");
        setCustomName("");
    }

    useEffect(() => {    
        if (kidsBYO === 'Kids Pasta') {
            setCustomName(kidsBYO + " " + kidsType);
            if (kidsType === 'Penne') {
                setSelectedIngredients(['Penne']); 
            } else {
                setSelectedIngredients(['Spaghetti']); 
            }
        } else if (kidsBYO === 'Kids Meatballs'){
            setCustomName(kidsBYO + " " + kidsType);
        }
    }, [kidsBYO, kidsType])

    const addKidsBYOToOrder = () => {
        if (kidsBYO === 'Kids Pasta') {
            const newOrderItem = `${customName}, ${kidsProtein}`; //Dont Change (I cant add \n\tProtein: to database)
            setOrder(prevOrder => [...prevOrder, newOrderItem]);
        } else if (kidsBYO === 'Kids Meatballs') {
            const newOrderItem = `${customName}`; 
            setOrder(prevOrder => [...prevOrder, newOrderItem]);
        }
        updatePrice(customName);
        console.log("Added new order item: ", customName);
        setCustomName(""); //Clear the selected custom item name
        setKidsProtein("");
        setKidsType("");
    }

    // Adds Completed Custom item to Order
    const addBYOToOrder = () => {
        const newOrderItem = `${customName}, ${protein}, ${sauce}, ${selectedIngredients.join(", ")}`;
        setOrder(prevOrder => [...prevOrder, newOrderItem]);

        updatePrice(customName);
        console.log("Added new order item: ", customName);

        setCustomName(""); //Clear the selected custom item name
        setKidsProtein("");
        setKidsType("");
        setSelectedIngredients([]); // Clear selected ingredients
        main_panel();   // exits to main BYO panel after adding BYO item to order
    }

    const handleIngredientSelection = (ingredient : string) => {
        setSelectedIngredients([...selectedIngredients, ingredient]);
    }

    const deleteIngredient = (i : number) => {
        const temp = [...selectedIngredients]; 
        temp.splice(i, 1);
        setSelectedIngredients(temp);
    }

    const main_panel = () => {
        clearBYOSelections();

        const temp = [<div></div>];
        if (newItems.length !== 0) {    // new items exist 
            
        }

        Set_BYO_Panel([
        <div style={{border: "5px solid black", padding: "2vh 0vw 2vh 0vw"}}>
            <h2> <u>Build Your Own </u></h2>
            <button className='other-buttons' onClick={pasta_panel}> Pasta </button>
            <button className='other-buttons' onClick={piada_panel}> Piada </button>
            <button className='other-buttons' onClick={salad_panel}> Salad </button> 
            <br /><br />
            <div>
            <h2> <u>Seasonal Items </u></h2>
                {newItems.map((item, index) => (
                    <button className='other-buttons' onClick={() => addorderitem(item)} disabled={loading}> {item} </button>
                ))}
            </div>
            
        </div>
        ]);
    }

    useEffect(() => {
        main_panel();
    }, [])

    const BYO_pasta = () => {
        Set_BYO_Panel([
            <div style={{border: "5px solid black", }}>
                <div style={{}}>
                <button onClick={main_panel}  className='custom-select-buttons' style={{float:"left", width: "5vw"}}> 
                Back </button> 
                <h2 style={{textAlign:"left", marginLeft:"30vw"}}> 
                    <u >Custom Pasta</u>
                </h2>
                </div>
                
                <div style={{display:"table", margin: "1vh 1vw 1vh 1vw"}}>
                <div style={{display:"table-cell", border: "3px solid black"}}>
                <h3>
                    Size: &nbsp;
                        <button onClick={() => setCustomSize("SM")} className='custom-select-buttons'> Small </button>
                        <button onClick={() => setCustomSize("REG")} className='custom-select-buttons'> Regular </button> 
                        &nbsp;&nbsp; 
                    Pasta: &nbsp;
                        <button onClick={() => setCustomType("Spaghetti")} className='custom-select-buttons'> Spaghetti </button> 
                        <button onClick={() => setCustomType("Penne")} className='custom-select-buttons'> Penne </button>
                </h3>
                <h3> Protein: 
                    <p>
                        <button onClick={() => setProtein('Italian Sausage')} className='custom-select-buttons'> Italian Sausage </button>
                        <button onClick={() => setProtein('Grilled Chicken')} className='custom-select-buttons'> Grilled Chicken </button>
                        <button onClick={() => setProtein('Crispy Chicken')} className='custom-select-buttons'> Crispy Chicken </button>
                        <button onClick={() => setProtein('Hot Friend Chicken')} className='custom-select-buttons'> Hot Fried Chicken </button>
                        <button onClick={() => setProtein('Grilled Chicken')} className='custom-select-buttons'> Grilled Chicken </button>
                        <button onClick={() => setProtein('Meatballs')} className='custom-select-buttons'> Grass-Fed Meatballs </button>
                        <button onClick={() => setProtein('Calamari & Hot Peppers')} className='custom-select-buttons'> Calamari & Hot Peppers</button>
                        <button onClick={() => setProtein('Grilled Salmon')} className='custom-select-buttons'> Grilled Salmon </button>
                    </p>
                </h3>
                <h3>
                    Pasta Sauces:
                    <p>
                        <button onClick={() => setSauce('Tomato Sauce')} className='custom-select-buttons'> Marinara </button>
                        <button onClick={() => setSauce('Alfredo Sauce')} className='custom-select-buttons'> Alfredo </button>
                        <button onClick={() => setSauce('Spicy Diavolo Sauce')} className='custom-select-buttons'> Diavolo </button>
                        <button onClick={() => setSauce('Basil Pesto Sauce')} className='custom-select-buttons'> Basil Pesto </button>
                    </p>
                </h3>
                <h3> 
                    Toppings:
                    <p>
                        <button onClick={() => handleIngredientSelection('Cucumbers')} className='custom-select-buttons'> Cucumbers </button>
                        <button onClick={() => handleIngredientSelection('Cucumber Salad')} className='custom-select-buttons'> Cucumber Salad </button>
                        <button onClick={() => handleIngredientSelection('Bruschetta Tomatoes')} className='custom-select-buttons'> Bruschetta Tomatoes </button>
                        <button onClick={() => handleIngredientSelection('Pickled Red Onions')} className='custom-select-buttons'> Pickled Red Onions </button>
                        <button onClick={() => handleIngredientSelection('Romaine')} className='custom-select-buttons'> Romaine </button>
                        <button onClick={() => handleIngredientSelection('Arugula')} className='custom-select-buttons'> Arugula </button>
                        <button onClick={() => handleIngredientSelection('Spinach')} className='custom-select-buttons'> Spinach </button>
                        <button onClick={() => handleIngredientSelection('Chopped Greens')} className='custom-select-buttons'> Chopped Greens </button>
                        <button onClick={() => handleIngredientSelection('Sweet Potatoes')} className='custom-select-buttons'> Roasted Sweet Potato </button>
                        <button onClick={() => handleIngredientSelection('Hummus')} className='custom-select-buttons'> Hummus </button>
                        <button onClick={() => handleIngredientSelection('Feta')} className='custom-select-buttons'> Feta </button>
                        <button onClick={() => handleIngredientSelection('Mozzarella')}> Mozzarella </button>
                        <button onClick={() => handleIngredientSelection('Parmesan')} className='custom-select-buttons'> Parmesan </button>
                        <button onClick={() => handleIngredientSelection('Sweet & Spicy Peppers')} className='custom-select-buttons'> Sweet & Spicy Peppers</button>
                        <button onClick={() => handleIngredientSelection('Strawberries')} className='custom-select-buttons'> Strawberries </button>
                        <button onClick={() => handleIngredientSelection('Glazed Pecans')} className='custom-select-buttons'> Glazed Pecans </button>
                        <button onClick={() => handleIngredientSelection('Bacon')} className='custom-select-buttons'> Pancetta(Bacon)</button>
                        <button onClick={() => handleIngredientSelection('Broccoli')} className='custom-select-buttons'> Roasted Broccoli </button>
                        <button onClick={() => handleIngredientSelection('Sweet Corn & Tomato')} className='custom-select-buttons'> Sweet Corn & Tomato</button>
                        <button onClick={() => handleIngredientSelection('Avocado')} className='custom-select-buttons'  > Avocado </button>
                    </p>
                </h3>
                </div>

                <div style={{display:"table-cell", width: "25vw", border: "3px solid black", }}>
                    <div style={{height: "75vh",}}>
                        <b style={{fontSize: "2vh", height: "6vh"}}> 
                        <u>{customSize}&nbsp;{customType}</u> <br /> {protein} &nbsp; {sauce}</b>
                        <br /><br />
                    <div style={{border: "3px solid black", height: "70vh"}}>
                    <table className="table table-dark" style={{overflow: "scroll", }}>
                    <thead>
                        <tr>
                            <th> # </th>
                            <th> Name </th>
                            <th><BsFillTrashFill onClick={() => setSelectedIngredients([])}/></th>
                        </tr>
                        </thead>
                        <tbody>
                        {selectedIngredients.map((ingredient, index) => (
                            <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{ingredient}</td>
                            <td>
                            <BsFillTrashFill onClick={() => deleteIngredient(index)}/>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                    </div>
                <button onClick={() => addBYOToOrder()} className='add-to-order' style={{marginTop: "3.5vh"}}> Add to order </button>
                </div>
                </div>
            </div>
        ]);
    }

    const pasta_panel = () => {
        clearBYOSelections();
        setBYO("Custom Pasta");
        BYO_pasta();
    }

    const BYO_piada = () => {
        Set_BYO_Panel([
            <div style={{border: "5px solid black", }}>
                <div style={{}}>
                <button onClick={main_panel}  className='custom-select-buttons' style={{float:"left", width: "5vw"}}> 
                Back </button> 
                <h2 style={{textAlign:"left", marginLeft:"30vw"}}> 
                    <u >Custom Piada</u>
                </h2>
                </div>
                
                <div style={{display:"table", margin: "1vh 1vw 1vh 1vw"}}>
                <div style={{display:"table-cell", border: "3px solid black"}}> <br />
                <h3> Protein: 
                    <p>
                        <button onClick={() => setProtein('Italian Sausage')} className='custom-select-buttons'> Italian Sausage </button>
                        <button onClick={() => setProtein('Grilled Chicken')} className='custom-select-buttons'> Grilled Chicken </button>
                        <button onClick={() => setProtein('Crispy Chicken')} className='custom-select-buttons'> Crispy Chicken </button>
                        <button onClick={() => setProtein('Hot Friend Chicken')} className='custom-select-buttons'> Hot Fried Chicken </button>
                        <button onClick={() => setProtein('Grilled Chicken')} className='custom-select-buttons'> Grilled Chicken </button>
                        <button onClick={() => setProtein('Meatballs')} className='custom-select-buttons'> Grass-Fed Meatballs </button>
                        <button onClick={() => setProtein('Calamari & Hot Peppers')} className='custom-select-buttons'> Calamari & Hot Peppers</button>
                        <button onClick={() => setProtein('Grilled Salmon')} className='custom-select-buttons'> Grilled Salmon </button>
                    </p>
                </h3>
                <h3>
                    Pasta Sauces:
                    <p>
                        <button onClick={() => setSauce('Tomato Sauce')} className='custom-select-buttons'> Marinara </button>
                        <button onClick={() => setSauce('Alfredo Sauce')} className='custom-select-buttons'> Alfredo </button>
                        <button onClick={() => setSauce('Spicy Diavolo Sauce')} className='custom-select-buttons'> Diavolo </button>
                        <button onClick={() => setSauce('Basil Pesto Sauce')} className='custom-select-buttons'> Basil Pesto </button>
                    </p>
                </h3>
                <h3> 
                    Toppings:
                    <p>
                        <button onClick={() => handleIngredientSelection('Cucumbers')} className='custom-select-buttons'> Cucumbers </button>
                        <button onClick={() => handleIngredientSelection('Cucumber Salad')} className='custom-select-buttons'> Cucumber Salad </button>
                        <button onClick={() => handleIngredientSelection('Bruschetta Tomatoes')} className='custom-select-buttons'> Bruschetta Tomatoes </button>
                        <button onClick={() => handleIngredientSelection('Pickled Red Onions')} className='custom-select-buttons'> Pickled Red Onions </button>
                        <button onClick={() => handleIngredientSelection('Romaine')} className='custom-select-buttons'> Romaine </button>
                        <button onClick={() => handleIngredientSelection('Arugula')} className='custom-select-buttons'> Arugula </button>
                        <button onClick={() => handleIngredientSelection('Spinach')} className='custom-select-buttons'> Spinach </button>
                        <button onClick={() => handleIngredientSelection('Chopped Greens')} className='custom-select-buttons'> Chopped Greens </button>
                        <button onClick={() => handleIngredientSelection('Sweet Potatoes')} className='custom-select-buttons'> Roasted Sweet Potato </button>
                        <button onClick={() => handleIngredientSelection('Hummus')} className='custom-select-buttons'> Hummus </button>
                        <button onClick={() => handleIngredientSelection('Feta')} className='custom-select-buttons'> Feta </button>
                        <button onClick={() => handleIngredientSelection('Mozzarella')}> Mozzarella </button>
                        <button onClick={() => handleIngredientSelection('Parmesan')} className='custom-select-buttons'> Parmesan </button>
                        <button onClick={() => handleIngredientSelection('Sweet & Spicy Peppers')} className='custom-select-buttons'> Sweet & Spicy Peppers</button>
                        <button onClick={() => handleIngredientSelection('Strawberries')} className='custom-select-buttons'> Strawberries </button>
                        <button onClick={() => handleIngredientSelection('Glazed Pecans')} className='custom-select-buttons'> Glazed Pecans </button>
                        <button onClick={() => handleIngredientSelection('Bacon')} className='custom-select-buttons'> Pancetta(Bacon)</button>
                        <button onClick={() => handleIngredientSelection('Broccoli')} className='custom-select-buttons'> Roasted Broccoli </button>
                        <button onClick={() => handleIngredientSelection('Sweet Corn & Tomato')} className='custom-select-buttons'> Sweet Corn & Tomato</button>
                        <button onClick={() => handleIngredientSelection('Avocado')} className='custom-select-buttons'  > Avocado </button>
                    </p>
                </h3>
                </div>

                <div style={{display:"table-cell", width: "25vw", border: "3px solid black", }}>
                    <div style={{height: "75vh",}}>
                        <b style={{fontSize: "2vh", height: "6vh"}}> 
                         <br /> {protein} &nbsp; {sauce}</b>
                        <br /><br />
                    <div style={{border: "3px solid black", height: "70vh"}}>
                    <table className="table table-dark" style={{overflow: "scroll", }}>
                    <thead>
                        <tr>
                            <th> # </th>
                            <th> Name </th>
                            <th><BsFillTrashFill onClick={() => setSelectedIngredients([])}/></th>
                        </tr>
                        </thead>
                        <tbody>
                        {selectedIngredients.map((ingredient, index) => (
                            <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{ingredient}</td>
                            <td>
                            <BsFillTrashFill onClick={() => deleteIngredient(index)}/>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                    </div>
                <button onClick={() => addBYOToOrder()} className='add-to-order' style={{marginTop: "3.5vh"}}> Add to order </button>
                </div>
                </div>
            </div>
        ]);
    }

    const piada_panel = () => {
        clearBYOSelections();
        setBYO("Custom Piada");
        BYO_piada();
    }

    const BYO_salad = () => {
        Set_BYO_Panel([
            <div style={{border: "5px solid black", }}>
                <div style={{}}>
                <button onClick={main_panel}  className='custom-select-buttons' style={{float:"left", width: "5vw"}}> 
                Back </button> 
                <h2 style={{textAlign:"left", marginLeft:"30vw"}}> 
                    <u >Custom Pasta</u>
                </h2>
                </div>
                
                <div style={{display:"table", margin: "1vh 1vw 1vh 1vw"}}>
                <div style={{display:"table-cell", border: "3px solid black"}}>
                <h3>
                    Size: &nbsp;
                        <button onClick={() => setCustomSize("SM")} className='custom-select-buttons'> Small </button>
                        <button onClick={() => setCustomSize("REG")} className='custom-select-buttons'> Regular </button> 
                        &nbsp;&nbsp; 
                </h3>
                <h3> Protein: 
                    <p>
                        <button onClick={() => setProtein('Italian Sausage')} className='custom-select-buttons'> Italian Sausage </button>
                        <button onClick={() => setProtein('Grilled Chicken')} className='custom-select-buttons'> Grilled Chicken </button>
                        <button onClick={() => setProtein('Crispy Chicken')} className='custom-select-buttons'> Crispy Chicken </button>
                        <button onClick={() => setProtein('Hot Friend Chicken')} className='custom-select-buttons'> Hot Fried Chicken </button>
                        <button onClick={() => setProtein('Grilled Chicken')} className='custom-select-buttons'> Grilled Chicken </button>
                        <button onClick={() => setProtein('Meatballs')} className='custom-select-buttons'> Grass-Fed Meatballs </button>
                        <button onClick={() => setProtein('Calamari & Hot Peppers')} className='custom-select-buttons'> Calamari & Hot Peppers</button>
                        <button onClick={() => setProtein('Grilled Salmon')} className='custom-select-buttons'> Grilled Salmon </button>
                    </p>
                </h3>
                <h3>
                    Salad Dressings:
                    <p>
                        <button onClick={() => setSauce('Creamy Parmesan Sauce')} className='custom-select-buttons'> Creamy Parmesan </button>
                        <button onClick={() => setSauce('Lemon Basil Dressing')} className='custom-select-buttons'> Lemon Basil </button>
                        <button onClick={() => setSauce('Classic Caesar Dressing')} className='custom-select-buttons'> Classic Caesar </button>
                        <button onClick={() => setSauce('Basil Parmesan Dressing')} className='custom-select-buttons'> Creamy Basil Parmesan </button>
                        <button onClick={() => setSauce('Oil & Vinegar Dressing')} className='custom-select-buttons'> Oil & Vinegar </button>
                        <button onClick={() => setSauce('Spicy Ranch Dressing')} className='custom-select-buttons'> Spicy Ranch </button>
                        <button onClick={() => setSauce('Yogurt Harissa Dressing')} className='custom-select-buttons'> Yogurt Harissa </button>
                    </p>
                </h3>
                <h3> 
                    Toppings:
                    <p>
                        <button onClick={() => handleIngredientSelection('Cucumbers')} className='custom-select-buttons'> Cucumbers </button>
                        <button onClick={() => handleIngredientSelection('Cucumber Salad')} className='custom-select-buttons'> Cucumber Salad </button>
                        <button onClick={() => handleIngredientSelection('Bruschetta Tomatoes')} className='custom-select-buttons'> Bruschetta Tomatoes </button>
                        <button onClick={() => handleIngredientSelection('Pickled Red Onions')} className='custom-select-buttons'> Pickled Red Onions </button>
                        <button onClick={() => handleIngredientSelection('Romaine')} className='custom-select-buttons'> Romaine </button>
                        <button onClick={() => handleIngredientSelection('Arugula')} className='custom-select-buttons'> Arugula </button>
                        <button onClick={() => handleIngredientSelection('Spinach')} className='custom-select-buttons'> Spinach </button>
                        <button onClick={() => handleIngredientSelection('Chopped Greens')} className='custom-select-buttons'> Chopped Greens </button>
                        <button onClick={() => handleIngredientSelection('Sweet Potatoes')} className='custom-select-buttons'> Roasted Sweet Potato </button>
                        <button onClick={() => handleIngredientSelection('Hummus')} className='custom-select-buttons'> Hummus </button>
                        <button onClick={() => handleIngredientSelection('Feta')} className='custom-select-buttons'> Feta </button>
                        <button onClick={() => handleIngredientSelection('Mozzarella')}> Mozzarella </button>
                        <button onClick={() => handleIngredientSelection('Parmesan')} className='custom-select-buttons'> Parmesan </button>
                        <button onClick={() => handleIngredientSelection('Sweet & Spicy Peppers')} className='custom-select-buttons'> Sweet & Spicy Peppers</button>
                        <button onClick={() => handleIngredientSelection('Strawberries')} className='custom-select-buttons'> Strawberries </button>
                        <button onClick={() => handleIngredientSelection('Glazed Pecans')} className='custom-select-buttons'> Glazed Pecans </button>
                        <button onClick={() => handleIngredientSelection('Bacon')} className='custom-select-buttons'> Pancetta(Bacon)</button>
                        <button onClick={() => handleIngredientSelection('Broccoli')} className='custom-select-buttons'> Roasted Broccoli </button>
                        <button onClick={() => handleIngredientSelection('Sweet Corn & Tomato')} className='custom-select-buttons'> Sweet Corn & Tomato</button>
                        <button onClick={() => handleIngredientSelection('Avocado')} className='custom-select-buttons'  > Avocado </button>
                    </p>
                </h3>
                </div>

                <div style={{display:"table-cell", width: "25vw", border: "3px solid black", }}>
                    <div style={{height: "75vh",}}>
                        <b style={{fontSize: "2vh", height: "6vh"}}> 
                        <u>{customSize}&nbsp;{customType}</u> <br /> {protein} &nbsp; {sauce}</b>
                        <br /><br />
                    <div style={{border: "3px solid black", height: "70vh"}}>
                    <table className="table table-dark" style={{overflow: "scroll", }}>
                    <thead>
                        <tr>
                            <th> # </th>
                            <th> Name </th>
                            <th><BsFillTrashFill onClick={() => setSelectedIngredients([])}/></th>
                        </tr>
                        </thead>
                        <tbody>
                        {selectedIngredients.map((ingredient, index) => (
                            <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{ingredient}</td>
                            <td>
                            <BsFillTrashFill onClick={() => deleteIngredient(index)}/>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                    </div>
                <button onClick={() => addBYOToOrder()} className='add-to-order' style={{marginTop: "3.5vh"}}> Add to order </button>
                </div>
                </div>
            </div>               
            ]);
    }

    const salad_panel = () => {
        clearBYOSelections();
        setBYO("Custom Salad");
        BYO_salad();
    }

    return (
    <div className="Cashier">
        <header className='header'>
            <h1 className='piada'>
            <button onClick={goback} style={{
                verticalAlign: 'middle', 
                textAlign: 'center',
                border: "0.5vh solid black",
                borderRadius: "25px",
                boxShadow: "3px 3px white",
                margin: "-1vh 10vw auto 2vw",
                width: "12vw",
                height: "6vh",
                fontSize: "3vh"
            }}> <CiLogout size={"5vh"}/> Logout </button>
            PIADA 
            </h1>
            <p className='street-food'> &nbsp; Italian Street Food</p>
        </header>

        <div style={{display: "table"}}>    
        <div className='main-panel'>
        <div style={{display: "table"}}>
        <h3 className='column'> Pasta:
        <p> 
        <Popup trigger=
            {<button className='main-buttons' disabled={loading}> Carbonara </button>} 
            position="right center" onOpen={() => makeorderitem(0, "Carbonara")}>
            <p className='basic-pop-up'>
            <button className='basic-option-buttons' onClick={() => makeorderitem(1, "SM")} disabled={size === 'SM' ? true : false}> Small </button>
            <button className='basic-option-buttons'onClick={() => makeorderitem(1, "REG")} disabled={size === 'REG' ? true : false}> Regular </button>
            <br />
            <button className='basic-option-buttons' onClick={() => makeorderitem(2, "Penne")} disabled={type === 'Penne' ? true : false}> Penne </button>
            <button className='basic-option-buttons' onClick={() => makeorderitem(2, "Spaghetti")} disabled={type === 'Spaghetti' ? true : false}> Spaghetti </button>
            <br /> 
            <button onClick={() => addorderitem("")} className='add-to-order'> Add to order </button>
         </p>
        </Popup>

        <Popup trigger=
            {<button className='main-buttons' disabled={loading}> Diavolo </button>}
            position="right center" onOpen={() => makeorderitem(0, "Diavolo")}>
            <p className='basic-pop-up'>
            <button className='basic-option-buttons' onClick={() => makeorderitem(1, "SM")} disabled={size === 'SM' ? true : false}> Small </button>
            <button className='basic-option-buttons'onClick={() => makeorderitem(1, "REG")} disabled={size === 'REG' ? true : false}> Regular </button>
            <br />
            <button className='basic-option-buttons' onClick={() => makeorderitem(2, "Penne")} disabled={type === 'Penne' ? true : false}> Penne </button>
            <button className='basic-option-buttons' onClick={() => makeorderitem(2, "Spaghetti")} disabled={type === 'Spaghetti' ? true : false}> Spaghetti </button>
            <br /> 
            <button onClick={() => addorderitem("")} className='add-to-order'> Add to order </button>
            </p>
        </Popup>

        <Popup trigger=
            {<button className='main-buttons' disabled={loading}> Basil Pesto </button>}
            position="right center" onOpen={() => makeorderitem(0, "Basil Pesto")}>
            <p className='basic-pop-up'>
            <button className='basic-option-buttons' onClick={() => makeorderitem(1, "SM")} disabled={size === 'SM' ? true : false}> Small </button>
            <button className='basic-option-buttons'onClick={() => makeorderitem(1, "REG")} disabled={size === 'REG' ? true : false}> Regular </button>
            <br />
            <button className='basic-option-buttons' onClick={() => makeorderitem(2, "Penne")} disabled={type === 'Penne' ? true : false}> Penne </button>
            <button className='basic-option-buttons' onClick={() => makeorderitem(2, "Spaghetti")} disabled={type === 'Spaghetti' ? true : false}> Spaghetti </button>
            <br /> 
            <button onClick={() => addorderitem("")} className='add-to-order'> Add to order </button>
            </p>
        </Popup>

        <Popup trigger=
            {<button className='main-buttons' disabled={loading}> Marinara </button>}
            position="right center" onOpen={() => makeorderitem(0, "Marinara")}>
            <p className='basic-pop-up'>
            <button className='basic-option-buttons' onClick={() => makeorderitem(1, "SM")} disabled={size === 'SM' ? true : false}> Small </button>
            <button className='basic-option-buttons'onClick={() => makeorderitem(1, "REG")} disabled={size === 'REG' ? true : false}> Regular </button>
            <br />
            <button className='basic-option-buttons' onClick={() => makeorderitem(2, "Penne")} disabled={type === 'Penne' ? true : false}> Penne </button>
            <button className='basic-option-buttons' onClick={() => makeorderitem(2, "Spaghetti")} disabled={type === 'Spaghetti' ? true : false}> Spaghetti </button>
            <br /> 
            <button onClick={() => addorderitem("")} className='add-to-order'> Add to order </button>
            </p>
        </Popup>
        </p>
        </h3>

        <h3 className='column'>Piadas: 
            <p>
            <button className='main-buttons' onClick={() => addorderitem("Avocado Piada")} disabled={loading}> Avocado </button>
            <button className='main-buttons' onClick={() => addorderitem("BLT Piada")} disabled={loading}> BLT </button>
            <button className='main-buttons' onClick={() => addorderitem("Chefs Favorite Piada")} disabled={loading}> Chef's Favorite </button>
            <button className='main-buttons' onClick={() => addorderitem("Mediterranean Piada")} disabled={loading}> Mediterranean </button>
            </p>
        </h3>

        <h3 className='column'> Salad: 
        <p> 
          <Popup trigger=
              {<button className='main-buttons' disabled={loading}> Classic Caesar </button>}
            position="right center" onOpen={() => makeorderitem(0, "Classic Caesar Salad")}>
            <p className='basic-pop-up'>
            <button onClick={() => makeorderitem(1, "SM")} className='basic-option-buttons' disabled={size === 'SM' ? true : false}> Small </button>
            <button onClick={() => makeorderitem(1, "REG")} className='basic-option-buttons' disabled={size === 'REG' ? true : false}> Regular </button>
            <br /> 
            <button onClick={() => addorderitem("")} className='add-to-order'> Add to order </button>
            </p>
          </Popup>

          <Popup trigger=
            {<button className='main-buttons' disabled={loading}> Farmer's Market </button>}
            position="right center" onOpen={() => makeorderitem(0, "Farmers Market Salad")}>
            <p className='basic-pop-up'>
            <button onClick={() => makeorderitem(1, "SM")} className='basic-option-buttons' disabled={size === 'SM' ? true : false}> Small </button>
            <button onClick={() => makeorderitem(1, "REG")} className='basic-option-buttons' disabled={size === 'REG' ? true : false}> Regular </button>
            <br /> 
            <button onClick={() => addorderitem("")} className='add-to-order'> Add to order </button>
            </p>
          </Popup>

          <Popup trigger=
            {<button className='main-buttons' disabled={loading}> Avocado Chop </button>}
            position="right center" onOpen={() => makeorderitem(0, "Avocado Chop Salad")}>
            <p className='basic-pop-up'>
            <button onClick={() => makeorderitem(1, "SM")} className='basic-option-buttons' disabled={size === 'SM' ? true : false}> Small </button>
            <button onClick={() => makeorderitem(1, "REG")} className='basic-option-buttons' disabled={size === 'REG' ? true : false}> Regular </button>
            <br />  
            <button onClick={() => addorderitem("")} className='add-to-order'> Add to order </button>
            </p>
          </Popup>

          <button className='main-buttons' onClick={() => addorderitem("Power Bowl")} disabled={loading}> Power Bowl </button>
      </p>
      </h3>
      

      <h3 className='column'> Other:
      <div>
        <Popup contentStyle={{width: "fit-content"}} trigger=
            {<button className='main-buttons' disabled={loading}> BYO/Seasonal </button>} 
            modal nested onClose={main_panel}>
            {
                <div className='basic-pop-up'>
                <p>{BYO_Panel}</p>
                </div>
            }
        </Popup>

        <Popup trigger=
            {<button className='main-buttons' disabled={loading}> Sides </button>} 
            modal nested >
            {
              <div>
                <h2 className='basic-pop-up'> Street Sides
                <p>
                <button onClick={() => addorderitem("Sweet Corn Salad")} className='other-buttons' disabled={loading}> Sweet Corn Salad </button>
                <button onClick={() => addorderitem("Garlic Dough")} className='other-buttons'  disabled={loading}> Garlic Dough </button>
                <button onClick={() => addorderitem("Meatballs")} className='other-buttons' disabled={loading}> Meatballs </button>
                <button onClick={() => addorderitem("Pepperoni Piada Stick")} className='other-buttons' disabled={loading}> Pepperoni Piada Stick </button>
                <button onClick={() => addorderitem("Cup of Lobster Bisque")} className='other-buttons' disabled={loading}> Lobster Bisque </button>
                <button onClick={() => addorderitem("Chocolate Brownie")} className='other-buttons' disabled={loading}> Sweet Street Chocolate Brownie </button>
                <button onClick={() => addorderitem("Chocolate Chunk Cookie")} className='other-buttons' disabled={loading}> Chocolate Chunk Cookie </button>
                <button onClick={() => addorderitem("Salted Caramel Cookie")} className='other-buttons' disabled={loading}> Salted Caramel Cookie </button>
              </p>
              </h2>
              </div>  
            }
        </Popup>

        <Popup trigger=
            {<button className='main-buttons' disabled={loading}> Drinks </button>} 
            modal nested>
            {
                <div className='basic-pop-up'>
                <h2> Drinks </h2>
                <p>
                <button onClick={() => addorderitem("Blackberry Hibiscus Lemonade")} className='other-buttons' disabled={loading}> Blackberry Hibiscus Lemonade </button>
                <button onClick={() => addorderitem("Orange Soda")} className='other-buttons' disabled={loading}> Orange Soda </button>
                <button onClick={() => addorderitem("Berry Soda")} className='other-buttons' disabled={loading}> Berry Soda </button>
                <button onClick={() => addorderitem("Peach Tea")} className='other-buttons' disabled={loading}> Peach Tea </button>
                <button onClick={() => addorderitem("Lemon Tea")} className='other-buttons' disabled={loading}> Lemon Tea </button>
                <button onClick={() => addorderitem("Acqua Panna Spring Water")} className='other-buttons' disabled={loading}> Acqua Panna Spring Water </button>
                <button onClick={() => addorderitem("San Pellegrino Sparkling Water")} className='other-buttons' disabled={loading}> San Pellegrino Sparkling Water </button>
                <button onClick={() => addorderitem("REG Soft Drink")} className='other-buttons' disabled={loading}> Regular Soft Drink </button>
                <button onClick={() => addorderitem("LG Soft Drink")} className='other-buttons' disabled={loading}> Large Soft Drink </button>
              </p>
              </div>
            }
        </Popup>

        <Popup trigger=
            {<button className='main-buttons' disabled={loading}> Kids </button>} 
            modal nested>
            {
                <div className='basic-pop-up'>
                    <h2> Kids Menu </h2>
                    <Popup trigger=
                    {<button className='other-buttons' disabled={loading}> Kids Pasta  </button>}
                    position="bottom center" onOpen={() => setKidsBYO('Kids Pasta')}>
                    <div className='basic-pop-up'>
                    <button className='basic-option-buttons' onClick={() => setKidsProtein("Grilled Chicken")} disabled={kidsProtein === 'Grilled Chicken' ? true : false}> Grilled Chicken </button>
                    <button className='basic-option-buttons' onClick={() => setKidsProtein("Crispy Chicken")} disabled={kidsProtein === 'Crispy Chicken' ? true : false}> Crispy Chicken </button>
                    <button className='basic-option-buttons'onClick={() => setKidsProtein("Steak")} disabled={kidsProtein === 'Steak' ? true : false}> Steak </button>
                    <br />
                    <button className='basic-option-buttons' onClick={() => setKidsType("Spaghetti")} disabled={kidsType === 'Spaghetti' ? true : false}> Spaghetti </button>
                    <button className='basic-option-buttons' onClick={() => setKidsType("Penne")} disabled={kidsType === 'Penne' ? true : false}> Penne </button>
                    <button onClick={() => addKidsBYOToOrder()} className='add-to-order'> Add to Order </button>
                    </div>
                    </Popup>

                    <Popup trigger=
                    {<button className='other-buttons' disabled={loading}> Kids Meatballs  </button>}
                    position="bottom center" onOpen={() => setKidsBYO('Kids Meatballs')}>
                    <div className='basic-pop-up'>
                    <button className='basic-option-buttons' onClick={() => setKidsType("Spaghetti")} disabled={kidsType === 'Spaghetti' ? true : false}> Spaghetti </button>
                    <button className='basic-option-buttons' onClick={() => setKidsType("Penne")} disabled={kidsType === 'Penne' ? true : false}> Penne </button>
                    <button onClick={() => addKidsBYOToOrder()} className='add-to-order'> Add to Order </button>
                    </div>
                    </Popup>
                    
                    <button onClick={() => addorderitem("Kids Chicken Fingers")} className='other-buttons' disabled={loading}> Chicken Fingers </button>

                    <br /><br />
                    <h3> Drinks: </h3>
                    <button onClick={() => addorderitem("Kids Low-Fat Milk")} className='other-buttons' disabled={loading}> Low-Fat Milk </button>
                    <button onClick={() => addorderitem("Kids Chocolate Milk")} className='other-buttons' disabled={loading}> Chocolate Milk </button>
                    <button onClick={() => addorderitem("Kids Apple Juice")} className='other-buttons' disabled={loading}> Apple Juice </button>
                </div>
            }
        </Popup>
      </div>
      </h3>
      </div>
      </div>

      <h2 className='order-panel'>
        <div className="display-order">
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
            <button className='pay-button' onClick={addorder} disabled={loading}> <u>Pay</u>: 
            ${prices.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toFixed(2)}</button>
            {showSuccessPanel && 
                <div className='payment-confirmation'>
                    <h3>Successfuly Placed Order!</h3>
                </div>
            }
        </h2> 

      </div>
    </div>
  );
}

export default CashierGUI;