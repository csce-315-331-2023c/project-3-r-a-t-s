import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { useNavigate } from "react-router-dom";
import 'reactjs-popup/dist/index.css';
import './Customer.css';
import './Cashier.css';
import './BYO_Images.css';
import axios, {AxiosError} from 'axios';
import './App.css';
import TextSizeAdjuster from "./Components/TextAdjuster";
import { Offcanvas } from 'react-bootstrap';
import { FaHome } from 'react-icons/fa';
import { BsAlignCenter, BsFillTrashFill } from 'react-icons/bs';

interface CustomerProps {
    startListening: () => void;
    stopListening: () => void;
    recognizedText: string;
}

const CustomerGUI : React.FC<CustomerProps> = ( {startListening, stopListening, recognizedText}) => {
    const navigate = useNavigate();
    //Speech API Starts Here

    const [creatingBYO, setCreatingBYO] = useState(false);
    const handleVoiceCommand = () => {
        console.log(recognizedText)
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
        if (recognizedText.toLowerCase().includes('add') && !recognizedText.toLowerCase().includes("build your own") && !recognizedText.toLowerCase().includes("sauce") && !recognizedText.toLowerCase().includes("toppings") && !recognizedText.toLowerCase().includes("protein")) {
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
            else if (recognizedText.toLowerCase().includes('meatballs') && !recognizedText.toLowerCase().includes("kid")){
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
        }

        let kids: string = ""
        let kids_protein: string = ""
        let kids_type: string = ""
        if (recognizedText.toLowerCase().includes('kids') && recognizedText.toLowerCase().includes('add')) {
            if (recognizedText.toLowerCase().includes('pasta')) {
                kids = "Kids Pasta"

                if (recognizedText.toLowerCase().includes('chicken')) {
                    if(recognizedText.toLowerCase().includes('grilled')) {
                        kids_protein = "Grilled Chicken"
                    }
                    else {
                        kids_protein = "Crispy Chicken"
                    }
                }
                else {
                    kids_protein = "Steak"
                }

                if(recognizedText.toLowerCase().includes('penne')) {
                    kids_type ="Penne"
                }
                else {
                    kids_type ="Spaghetti"
                }

                let order = kids + " " + kids_type;
                setOrder(prevOrder => [...prevOrder, order + ", " + kids_protein]);
                updatePrice(order);
                console.log("Added new order item: ", order);
            }
            else if (recognizedText.toLowerCase().includes('meatballs')) {
                kids = "Kids Meatballs"

                if(recognizedText.toLowerCase().includes('penne')) {
                    kids_type ="Penne"
                }
                else {
                    kids_type ="Spaghetti"
                }

                let order = kids + " " + kids_type;
                setOrder(prevOrder => [...prevOrder, order]);
                updatePrice(order);
                console.log("Added new order item: ", order);
            }
            else if (recognizedText.toLowerCase().includes('chicken fingers')) {
                addorderitem("Kids Chicken Fingers")
            }

            if (recognizedText.toLowerCase().includes('milk')) {
                if (recognizedText.toLowerCase().includes('chocolate')) {
                    addorderitem("Kids Chocolate Milk")
                }
                else {
                    addorderitem("Kids Low-Fat Milk")
                }
            }
            if (recognizedText.toLowerCase().includes('juice')) {
                addorderitem("Kids Apple Juice")
            }
        }

    if (recognizedText.toLowerCase().includes('delete') || recognizedText.toLowerCase().includes('remove')) {
        if (recognizedText.toLowerCase().includes('all')) {
            removeAll();
        }
    }

    if (recognizedText.toLowerCase().includes('pay') || recognizedText.toLowerCase().includes('complete') || recognizedText.toLowerCase().includes('finished')) {
        addorder();
    }


    if (recognizedText.toLowerCase().includes("create") && (recognizedText.toLowerCase().includes("build your own"))) {
        setCreatingBYO(true)
        if (recognizedText.toLowerCase().includes("pasta")) {
            setBYO("Custom Pasta")
            if (recognizedText.toLowerCase().includes("small")) {
                setCustomSize("SM")
            }
            else {
                setCustomSize("REG")
            }
            if (recognizedText.toLowerCase().includes("penne")) {
                setCustomType("Penne")
            }
            else {
                setCustomType("Spaghetti")
            }
        }
        if (recognizedText.toLowerCase().includes("piada")) {
            setBYO("Custom Piada")
        }
        if (recognizedText.toLowerCase().includes("salad")) {
            setBYO("Custom Salad")
            if (recognizedText.toLowerCase().includes("small")) {
                setCustomSize("SM")
            }
            else {
                setCustomSize("REG")
            }
        }
    }

    if (recognizedText.toLowerCase().includes("protein") && recognizedText.toLowerCase().includes("add")) {
        if (recognizedText.toLowerCase().includes("sausage")) {
            setProtein("Italian Sausage")
        }
        if (recognizedText.toLowerCase().includes("chicken")) {
            if (recognizedText.toLowerCase().includes("grilled")) {
                setProtein("Grilled Chicken")
            }  
            else if (recognizedText.toLowerCase().includes("fried")) {
                setProtein("Hot Fried Chicken")
            }  
            else {
                setProtein("Crispy Chicken")
            }
        }
        if (recognizedText.toLowerCase().includes("meatballs")) {
            setProtein("Meatballs")
        }
        if (recognizedText.toLowerCase().includes("calamari")) {
            setProtein("Crispy Calamari")
        }
        if (recognizedText.toLowerCase().includes("salmon")) {
            setProtein("Grilled Salmon")
        }
    }

    if (recognizedText.toLowerCase().includes("sauce") && byo !== "Custom Salad"  && recognizedText.toLowerCase().includes("add")) {
        if (recognizedText.toLowerCase().includes("marinara")) {
            setSauce("Marinara Sauce")
        }
        if (recognizedText.toLowerCase().includes("alfredo")) {
            setSauce("Alfredo Sauce")
        }
        if (recognizedText.toLowerCase().includes("diavolo")) {
            setSauce("Diavolo Sauce")
        }
        if (recognizedText.toLowerCase().includes("pesto")) {
            setSauce("Basil Pesto Sauce")
        }
    }
    if (recognizedText.toLowerCase().includes("sauce") && byo === "Custom Salad"  && recognizedText.toLowerCase().includes("add")) {
        if (recognizedText.toLowerCase().includes("parmesan")) {
            setSauce("Creamy Parmesan Suace")
        }
        if (recognizedText.toLowerCase().includes("lemon")) {
            setSauce("Lemon Basil Sauce")
        }
        if (recognizedText.toLowerCase().includes("caesar")) {
            setSauce("Classic Caesar Dressing")
        }
        if (recognizedText.toLowerCase().includes("vinegar")) {
            setSauce("Oil & Vinegar Dressing")
        }
        if (recognizedText.toLowerCase().includes("ranch")) {
            setSauce("Spicy Ranch Dressing")
        }
        if (recognizedText.toLowerCase().includes("harissa")) {
            setSauce("Yogurt Harissa Dressing")
        }
    }

    if (recognizedText.toLowerCase().includes("topping")  && recognizedText.toLowerCase().includes("add")) {
        if (recognizedText.toLowerCase().includes("cucumber")) {
            handleIngredientSelection("Cucumbers")
        }
        if (recognizedText.toLowerCase().includes("tomatoes")) {
            handleIngredientSelection("Bruschetta Tomatoes")
        }
        if (recognizedText.toLowerCase().includes("onions")) {
            handleIngredientSelection("Pickled Red Onions")
        }
        if (recognizedText.toLowerCase().includes("arugula")) {
            handleIngredientSelection("Arugula")
        }
        if (recognizedText.toLowerCase().includes("spinach")) {
            handleIngredientSelection("Spinach")
        }
        if (recognizedText.toLowerCase().includes("greens")) {
            handleIngredientSelection("Chopped Greens")
        }
        if (recognizedText.toLowerCase().includes("potatoe")) {
            handleIngredientSelection("Sweet Potatoes")
        }
        if (recognizedText.toLowerCase().includes("hummus")) {
            handleIngredientSelection("Hummus")
        }
        if (recognizedText.toLowerCase().includes("feta")) {
            handleIngredientSelection("Feta")
        }
        if (recognizedText.toLowerCase().includes("mozzarella")) {
            handleIngredientSelection("Mozzarella")
        }
        if (recognizedText.toLowerCase().includes("parmesan")) {
            handleIngredientSelection("Parmesan")
        }
        if (recognizedText.toLowerCase().includes("peppers")) {
            handleIngredientSelection("Sweet & Spicy Peppers")
        }
        if (recognizedText.toLowerCase().includes("strawberries")) {
            handleIngredientSelection("Strawberries")
        }
        if (recognizedText.toLowerCase().includes("bacon") || recognizedText.toLowerCase().includes("pancetta")) {
            handleIngredientSelection("Bacon")
        }
        if (recognizedText.toLowerCase().includes("broccoli")) {
            handleIngredientSelection("Broccoli")
        }
        if (recognizedText.toLowerCase().includes("corn") ||recognizedText.toLowerCase().includes("tomato") ) {
            handleIngredientSelection("Sweet Corn & Tomato")
        }
        if (recognizedText.toLowerCase().includes("avocado")) {
            handleIngredientSelection("Avocado")
        }
    }

    if (recognizedText.toLowerCase().includes("clear") && recognizedText.toLowerCase().includes("build your own")) {
        clearBYOSelections();
    }

    if (recognizedText.toLowerCase().includes("add") && recognizedText.toLowerCase().includes("build your own")) {
        if (byo.length !== 0 && protein.length !== 0 && sauce.length !== 0 && selectedIngredients.length !== 0) {
            addBYOToOrder(); 
        }
    }
    };

    useEffect(() => {
        handleVoiceCommand();
    }, [recognizedText]);

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

    /**
     * Effect hook to update custom item details based on user selections.
     */
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

    // let curr_item = "";
    // let curr_size = "";
    // let curr_type = "";
    const [curr_item, setItem] = useState('');
    const [curr_size, setSize] = useState('');
    const [curr_type, setType] = useState('');

    const [order, setOrder] = useState<string[]>([]);
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

    /**
     * Function to clear selections for Build Your Own (BYO) items.
     */
    const clearBYOSelections = () => {
        setSelectedIngredients([]);
        setBYO("");
        setCustomSize("");
        setProtein("");
        setSauce("");
        setCustomType("");
        setCustomName("");
    }

    /**
     * Function to add completed Build Your Own (BYO) items to the order.
     */    
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

    useEffect(() => {
        console.log(byo)
        console.log(protein)
        console.log(sauce)
        console.log(selectedIngredients)
        console.log(customType)
        console.log(customSize)

        if (byo.length !== 0 && protein.length !== 0 && sauce.length !== 0 && selectedIngredients.length !== 0 && creatingBYO) {
            // addBYOToOrder(); 
            setCreatingBYO(false);
        }
    }, [byo, protein, sauce, selectedIngredients, creatingBYO])

    /**
     * Effect hook to update custom item details for Kids BYO based on user selections.
     */
    useEffect(() => {    
        if (kidsBYO === 'Kids Pasta') {
            setCustomName(kidsBYO + " " + kidsType);
        } else if (kidsBYO === 'Kids Meatballs'){
            setCustomName(kidsBYO + " " + kidsType);
        }
    }, [kidsBYO, kidsType])
    
    /**
     * Function to add Kids BYO items to the order.
     */
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

    /**
     * Function to handle the selection of ingredients for BYO items.
     * @param {string} ingredient - The selected ingredient.
     */
    const handleIngredientSelection = (ingredient : string) => {
        setSelectedIngredients([...selectedIngredients, ingredient]);
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
            username : '0005',
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
        clearBYOSelections();

        Set_BYO_Panel([
        <div style={{border: "5px solid black", padding: "2vh 0vw 2vh 0vw"}}>
            <h2 style={{textAlign: 'center'}}> <u>Build Your Own </u></h2>
            <div className='BYOpanel-container'>
                <button className='BYOpanel-buttons' title='A person cooking pasta in a pan on the stove'onClick={pasta_panel}>
                    <img src='https://images.mypiada.com/piada-one/product/444/185779.jpg' alt='A person cooking pasta in a pan on the stove'/><span>Pasta</span></button>
                <button className='BYOpanel-buttons' title='A chef preparing a tortilla' onClick={piada_panel}>
                    <img src='https://images.mypiada.com/piada-one/product/447/196613.jpg' alt='A chef preparing a tortilla'/><span>Piada</span></button>
                <button className='BYOpanel-buttons' title='A chef washing lettuce' onClick={salad_panel}>
                    <img src='https://images.mypiada.com/piada-one/product/450/197050.jpg' alt='A chef washing lettuce'/> <span>Salad</span></button> 
                <br /><br />
            </div>
        </div>
        ]);
    }

    /**
     * Effect hook to display the main BYO panel when the component mounts.
     */
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

    /**
     * Function to display the BYO Pasta customization panel.
     */
    const BYO_pasta = () => {
        Set_BYO_Panel([
            <div style={{ overflowY: "auto", maxHeight: "800px" }}>
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
                        <button onClick={() => setCustomSize("SM")} className='custom-select-buttons'> Small </button>
                        <button onClick={() => setCustomSize("REG")} className='custom-select-buttons'> Regular </button> 
                        &nbsp;&nbsp; 
                    Pasta: &nbsp;
                        <button onClick={() => setCustomType("Spaghetti")} className='BYOpanel-buttons'> 
                            <img src='https://images.mypiada.com/piada-one/option/305/spaghetti-230_2x.jpg' alt='Spaghetti'/> <span>Spaghetti</span></button> 
                        <button onClick={() => setCustomType("Penne")} className='BYOpanel-buttons'> 
                            <img src='https://images.mypiada.com/piada-one/option/363/penne-230_2x.jpg' alt='Penne'/> <span>Penne</span> </button>
                </h3>
                </div>
                 
                <h3> Protein: 
                    <p>
                    <button onClick={() => setProtein('Italian Sausage')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/369/sausage-230_2x.jpg' alt='Italian Sausage' title='Italian Sausage'/> <span>Italian Sausage</span></button>
                    <button onClick={() => setProtein('Grilled Chicken')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/366/chicken-230_2x.jpg' alt='Grilled Chicken' title='Grilled Chicken'/> <span>Grilled Chicken</span> </button>
                    <button onClick={() => setProtein('Crispy Chicken')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/365/chicken-fritte-230_2x.jpg' alt='Crispy Chicken Fritte' title='Crispy Chicken Fritte'/> <span>Crispy Chicken</span> </button>
                    <button onClick={() => setProtein('Hot Friend Chicken')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/368/hot-fried-chicken-230_2x.jpg' alt='Hot Fried Chicken' title='Hot Fried Chicken'/> <span>Hot Fried Chicken</span> </button>
                    <button onClick={() => setProtein('Grilled Steak')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/367/steak-230_2x.jpg' alt='Grilled Steak' title='Grilled Steak'/> <span>Grilled Steak</span> </button>
                    <button onClick={() => setProtein('Meatballs')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/370/grass-fed-meatballs-230_2x.jpg' alt='Meatballs' title='Meatballs'/> <span>Grass-Fed Meatballs</span> </button>
                    <button onClick={() => setProtein('Crispy Calamari')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/364/calamari-230_2x.jpg' alt='Crispy Calamari' title='Crispy Calamari'/> <span>Crispy Calamari</span></button>
                    <button onClick={() => setProtein('Grilled Salmon')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/371/salmon-230_2x.jpg' alt='Grilled Salmon' title='Grilled Salmon'/> <span>Grilled Salmon</span> </button>
                    </p>
                </h3>
                <h3>
                    Pasta Sauces:
                    <p>
                        <button onClick={() => setSauce('Tomato Sauce')} className='BYOpanel-buttons'> 
                            <img src='https://images.mypiada.com/piada-one/option/394/pomodoro-230_2x.jpg' alt='Marinara Sauce' title='Marinara Sauce'/> <span>Marinara(Hot)</span> </button>
                        <button onClick={() => setSauce('Alfredo Sauce')} className='BYOpanel-buttons'> 
                            <img src='https://images.mypiada.com/piada-one/option/393/parmesan-alfredo-230_2x.jpg' alt='Parmesan Sauce' title='Parmesan Sauce'/> <span>Alfredo(Hot)</span> </button>
                        <button onClick={() => setSauce('Spicy Diavolo Sauce')} className='BYOpanel-buttons'> 
                            <img src='https://images.mypiada.com/piada-one/option/392/diavolo-230_2x.jpg' alt='Diavolo Sauce' title='Diavolo Sauce'/> <span>Diavolo(Hot)</span> </button>
                        <button onClick={() => setSauce('Basil Pesto Sauce')} className='BYOpanel-buttons'> 
                            <img src='https://images.mypiada.com/piada-one/option/375/fresh-basil-pesto-230_2x.jpg' alt='Basil Pesto Sauce' title='Basil Pesto Sauce'/> <span>Basil Pesto(Cold)</span> </button>
                    </p>
                </h3>
                <h3> 
                    Toppings:
                    <p>
                    <button onClick={() => handleIngredientSelection('Cucumbers')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/384/cucumber-230_2x.jpg' alt='Cucumbers' title='Cucumbers'/> <span>Cucumbers</span> </button>
                    <button onClick={() => handleIngredientSelection('Bruschetta Tomatoes')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/409/bruschetta-tomatoes-230_2x.jpg' alt='Tomatoes' title='Tomatoes'/> <span>Bruschetta Tomatoes</span> </button>
                    <button onClick={() => handleIngredientSelection('Pickled Red Onions')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/399/option_web_list.jpg' alt='Pickled Red Onion' title='Pickled Red Onion'/> <span>Pickled Red Onions</span> </button>
                    <button onClick={() => handleIngredientSelection('Arugula')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/379/arugula-230_2x.jpg' alt='Arugula' title='Arugula'/> <span>Arugula</span> </button>
                    <button onClick={() => handleIngredientSelection('Spinach')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/406/spinach-230_2x.jpg' alt='Spinach' title='Spinach'/> <span>Spinach</span> </button>
                    <button onClick={() => handleIngredientSelection('Chopped Greens')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/387/mixed-greens-230_2x.jpg' alt='Chopped Greens' title='Chopped Greens'/> <span>Chopped Greens</span> </button>
                    <button onClick={() => handleIngredientSelection('Sweet Potatoes')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/377/roasted-sweet-potatoes-230_2x.jpg' alt='Roasted Sweet Potatoes' title='Roasted Sweet Potatoes'/> <span>Roasted Sweet Potato</span> </button>
                    <button onClick={() => handleIngredientSelection('Hummus')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/350/hummus-230_2x.jpg' alt='Spread of Hummus' title='Spread of Hummus'/> <span>Hummus</span> </button>
                    <button onClick={() => handleIngredientSelection('Feta')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/385/feta-230_2x.jpg' alt='Feta' title='Feta'/> <span>Feta</span> </button>
                    <button onClick={() => handleIngredientSelection('Mozzarella')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/388/mozzarella-230_2x.jpg' alt='Mozzarella' title='Mozzarella'/> <span>Mozzarella</span> </button>
                    <button onClick={() => handleIngredientSelection('Parmesan')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/397/parmesan-reggiano-230_2x.jpg' alt='Parmesan' title='Parmesan'/> <span>Parmesan</span> </button>
                    <button onClick={() => handleIngredientSelection('Sweet & Spicy Peppers')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/608/sweet-and-spicy-peppers-230_2x.jpg' alt='Sweet and Spicy Peppers' title='Sweet and Spicy Peppers'/> <span>Sweet & Spicy Peppers</span></button>
                    <button onClick={() => handleIngredientSelection('Strawberries')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/407/strawberries-230_2x.jpg' alt='Strawberries' title='Strawberries'/><span>Strawberries</span> </button>
                    <button onClick={() => handleIngredientSelection('Bacon')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/362/pancetta-230_2x.jpg' alt='Bacon' title='Bacon'/> <span>Pancetta(Bacon)</span></button>
                    <button onClick={() => handleIngredientSelection('Broccoli')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/402/roasted-broccoli-230_2x.jpg' alt='Roasted Broccoli' title='Roasted Broccoli'/> <span>Roasted Broccoli</span> </button>
                    <button onClick={() => handleIngredientSelection('Sweet Corn & Tomato')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/408/sweet-corn-and-tomato-230_2x.jpg' alt='Sweet Corn and Tomatoe' title='Sweet Corn and Tomatoe'/> <span>Sweet Corn & Tomato</span></button>
                    <button onClick={() => handleIngredientSelection('Avocado')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/381/avocado-230_2x.jpg' alt='Sliced Avocado' title='Sliced Avocado'/><span>Avocado</span> </button>
                    </p>
                </h3>
                <br />
                <button onClick={() => addBYOToOrder()}> Add to order </button>
                <br />
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
            <div style={{ overflowY: "auto", maxHeight: "800px" }}>
                <button onClick={main_panel} style={{
                    justifyContent: "flex-end", display: "flex", marginLeft: "10px", marginTop: "10px",
                    }}> 
                Back </button> 
                <h2> <u> Custom Piada </u></h2>
                <h3> 
                    Protein: 
                    <p >
                    <button onClick={() => setProtein('Italian Sausage')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/369/sausage-230_2x.jpg' alt='Italian Sausage' title='Italian Sausage'/> <span>Italian Sausage</span></button>
                    <button onClick={() => setProtein('Grilled Chicken')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/366/chicken-230_2x.jpg' alt='Grilled Chicken' title='Grilled Chicken'/> <span>Grilled Chicken</span> </button>
                    <button onClick={() => setProtein('Crispy Chicken')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/365/chicken-fritte-230_2x.jpg' alt='Crispy Chicken Fritte' title='Crispy Chicken Fritte'/> <span>Crispy Chicken</span> </button>
                    <button onClick={() => setProtein('Hot Friend Chicken')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/368/hot-fried-chicken-230_2x.jpg' alt='Hot Fried Chicken' title='Hot Fried Chicken'/> <span>Hot Fried Chicken</span> </button>
                    <button onClick={() => setProtein('Grilled Steak')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/367/steak-230_2x.jpg' alt='Grilled Steak' title='Grilled Steak'/> <span>Grilled Steak</span> </button>
                    <button onClick={() => setProtein('Meatballs')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/370/grass-fed-meatballs-230_2x.jpg' alt='Meatballs' title='Meatballs'/> <span>Grass-Fed Meatballs</span> </button>
                    <button onClick={() => setProtein('Crispy Calamari')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/364/calamari-230_2x.jpg' alt='Crispy Calamari' title='Crispy Calamari'/> <span>Crispy Calamari</span></button>
                    <button onClick={() => setProtein('Grilled Salmon')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/371/salmon-230_2x.jpg' alt='Grilled Salmon' title='Grilled Salmon'/> <span>Grilled Salmon</span> </button>
                    </p>
                </h3>
                <h3>
                    Pasta Sauces:
                    <p>
                        <button onClick={() => setSauce('Tomato Sauce')} className='BYOpanel-buttons'> 
                            <img src='https://images.mypiada.com/piada-one/option/394/pomodoro-230_2x.jpg' alt='Marinara Sauce' title='Marinara Sauce'/> <span>Marinara(Hot)</span> </button>
                        <button onClick={() => setSauce('Alfredo Sauce')} className='BYOpanel-buttons'> 
                            <img src='https://images.mypiada.com/piada-one/option/393/parmesan-alfredo-230_2x.jpg' alt='Parmesan Sauce' title='Parmesan Sauce'/> <span>Alfredo(Hot)</span> </button>
                        <button onClick={() => setSauce('Spicy Diavolo Sauce')} className='BYOpanel-buttons'> 
                            <img src='https://images.mypiada.com/piada-one/option/392/diavolo-230_2x.jpg' alt='Diavolo Sauce' title='Diavolo Sauce'/> <span>Diavolo(Hot)</span> </button>
                        <button onClick={() => setSauce('Basil Pesto Sauce')} className='BYOpanel-buttons'> 
                            <img src='https://images.mypiada.com/piada-one/option/375/fresh-basil-pesto-230_2x.jpg' alt='Basil Pesto Sauce' title='Basil Pesto Sauce'/> <span>Basil Pesto(Cold)</span> </button>
                    </p>
                </h3>
                <h3> 
                    Toppings:
                    <p>
                    <button onClick={() => handleIngredientSelection('Cucumbers')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/384/cucumber-230_2x.jpg' alt='Cucumbers' title='Cucumbers'/> <span>Cucumbers</span> </button>
                    <button onClick={() => handleIngredientSelection('Bruschetta Tomatoes')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/409/bruschetta-tomatoes-230_2x.jpg' alt='Tomatoes' title='Tomatoes'/> <span>Bruschetta Tomatoes</span> </button>
                    <button onClick={() => handleIngredientSelection('Pickled Red Onions')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/399/option_web_list.jpg' alt='Pickled Red Onion' title='Pickled Red Onion'/> <span>Pickled Red Onions</span> </button>
                    <button onClick={() => handleIngredientSelection('Arugula')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/379/arugula-230_2x.jpg' alt='Arugula' title='Arugula'/> <span>Arugula</span> </button>
                    <button onClick={() => handleIngredientSelection('Spinach')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/406/spinach-230_2x.jpg' alt='Spinach' title='Spinach'/> <span>Spinach</span> </button>
                    <button onClick={() => handleIngredientSelection('Chopped Greens')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/387/mixed-greens-230_2x.jpg' alt='Chopped Greens' title='Chopped Greens'/> <span>Chopped Greens</span> </button>
                    <button onClick={() => handleIngredientSelection('Sweet Potatoes')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/377/roasted-sweet-potatoes-230_2x.jpg' alt='Roasted Sweet Potatoes' title='Roasted Sweet Potatoes'/> <span>Roasted Sweet Potato</span> </button>
                    <button onClick={() => handleIngredientSelection('Hummus')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/350/hummus-230_2x.jpg' alt='Spread of Hummus' title='Spread of Hummus'/> <span>Hummus</span> </button>
                    <button onClick={() => handleIngredientSelection('Feta')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/385/feta-230_2x.jpg' alt='Feta' title='Feta'/> <span>Feta</span> </button>
                    <button onClick={() => handleIngredientSelection('Mozzarella')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/388/mozzarella-230_2x.jpg' alt='Mozzarella' title='Mozzarella'/> <span>Mozzarella</span> </button>
                    <button onClick={() => handleIngredientSelection('Parmesan')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/397/parmesan-reggiano-230_2x.jpg' alt='Parmesan' title='Parmesan'/> <span>Parmesan</span> </button>
                    <button onClick={() => handleIngredientSelection('Sweet & Spicy Peppers')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/608/sweet-and-spicy-peppers-230_2x.jpg' alt='Sweet and Spicy Peppers' title='Sweet and Spicy Peppers'/> <span>Sweet & Spicy Peppers</span></button>
                    <button onClick={() => handleIngredientSelection('Strawberries')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/407/strawberries-230_2x.jpg' alt='Strawberries' title='Strawberries'/><span>Strawberries</span> </button>
                    <button onClick={() => handleIngredientSelection('Bacon')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/362/pancetta-230_2x.jpg' alt='Bacon' title='Bacon'/> <span>Pancetta(Bacon)</span></button>
                    <button onClick={() => handleIngredientSelection('Broccoli')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/402/roasted-broccoli-230_2x.jpg' alt='Roasted Broccoli' title='Roasted Broccoli'/> <span>Roasted Broccoli</span> </button>
                    <button onClick={() => handleIngredientSelection('Sweet Corn & Tomato')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/408/sweet-corn-and-tomato-230_2x.jpg' alt='Sweet Corn and Tomatoe' title='Sweet Corn and Tomatoe'/> <span>Sweet Corn & Tomato</span></button>
                    <button onClick={() => handleIngredientSelection('Avocado')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/381/avocado-230_2x.jpg' alt='Sliced Avocado' title='Sliced Avocado'/><span>Avocado</span> </button>
                    </p>
                </h3>
                <button onClick={() => addBYOToOrder()} >
                    Add to order
                </button>
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
        <div style={{ overflowY: "auto", maxHeight: "800px" }}>
            <button onClick={main_panel} style={{
                    justifyContent: "flex-end", display: "flex", marginLeft: "10px", marginTop: "10px",
                    }}> Back </button>
            <h2> <u>Custom Salad</u> </h2>
            <h3>
                Size:
                <p>
                    <button onClick={() => setCustomSize("SM")} className='custom-select-buttons'> Small </button>
                    <button onClick={() => setCustomSize("REG")} className='custom-select-buttons'> Regular </button> 
                </p>
            </h3>
            <h3> Protein: 
                <p>
                    <button onClick={() => setProtein('Italian Sausage')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/369/sausage-230_2x.jpg' alt='Italian Sausage' title='Italian Sausage'/> <span>Italian Sausage</span></button>
                    <button onClick={() => setProtein('Grilled Chicken')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/366/chicken-230_2x.jpg' alt='Grilled Chicken' title='Grilled Chicken'/> <span>Grilled Chicken</span> </button>
                    <button onClick={() => setProtein('Crispy Chicken')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/365/chicken-fritte-230_2x.jpg' alt='Crispy Chicken Fritte' title='Crispy Chicken Fritte'/> <span>Crispy Chicken</span> </button>
                    <button onClick={() => setProtein('Hot Friend Chicken')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/368/hot-fried-chicken-230_2x.jpg' alt='Hot Fried Chicken' title='Hot Fried Chicken'/> <span>Hot Fried Chicken</span> </button>
                    <button onClick={() => setProtein('Grilled Steak')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/367/steak-230_2x.jpg' alt='Grilled Steak' title='Grilled Steak'/> <span>Grilled Steak</span> </button>
                    <button onClick={() => setProtein('Meatballs')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/370/grass-fed-meatballs-230_2x.jpg' alt='Meatballs' title='Meatballs'/> <span>Grass-Fed Meatballs</span> </button>
                    <button onClick={() => setProtein('Crispy Calamari')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/364/calamari-230_2x.jpg' alt='Crispy Calamari' title='Crispy Calamari'/> <span>Crispy Calamari</span></button>
                    <button onClick={() => setProtein('Grilled Salmon')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/371/salmon-230_2x.jpg' alt='Grilled Salmon' title='Grilled Salmon'/> <span>Grilled Salmon</span> </button>
                </p>
            </h3>
            <h3>
                Salad Dressings:
                <p> 
                    <button onClick={() => setSauce('Basil Pesto Sauce')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/375/fresh-basil-pesto-230_2x.jpg' alt='Basil Pesto Sauce' title='Basil Pesto Sauce'/> <span>Basil Pesto(Cold)</span> </button>
                    <button onClick={() => setSauce('Creamy Parmesan Sauce')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/343/creamy-parmesan-230_2x.jpg' alt='Creamy Parmesan' title='Creamy Parmesan'/> <span>Creamy Parmesan(Cold)</span> </button>
                    <button onClick={() => setSauce('Lemon Basil Dressing')} className='BYOpanel-buttons'>
                        <img src='https://images.mypiada.com/piada-one/option/346/lemon-basil-dressing-230_2x.jpg' alt='Lemon Basil Dressing' title='Lemon Basil Dressing'/> <span>Lemon Basil Dressing(Cold)</span> </button>
                    <button onClick={() => setSauce('Classic Caesar Dressing')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/342/caesar-dressing-230_2x.jpg' alt='Caesar Dressing' title='Caesar Dressing'/> <span>Caesar Dressing</span> </button>
                    <button onClick={() => setSauce('Oil & Vinegar Dressing')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/347/oil-and-vinegar-230_2x.jpg' alt='Oil and Vinegar' title='Oil and Vinegar'/><span>Oil & Vinegar(Cold)</span> </button>
                    <button onClick={() => setSauce('Spicy Ranch Dressing')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/348/spicy-ranch-230_2x.jpg' alt='Spicy Ranch' title='Spicy Ranch'/> <span>Spicy Ranch</span> </button>
                    <button onClick={() => setSauce('Yogurt Harissa Dressing')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/345/harissa-and-greek-yogurt-230_2x.jpg' alt='Harissa and Greek Yogurt' title='Harissa and Greek Yogurt'/> <span>Yogurt Harissa</span> </button>
                </p>
            </h3>
            <h3> 
                Toppings:
                <p>
                    <button onClick={() => handleIngredientSelection('Cucumbers')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/384/cucumber-230_2x.jpg' alt='Cucumbers' title='Cucumbers'/> <span>Cucumbers</span> </button>
                    <button onClick={() => handleIngredientSelection('Bruschetta Tomatoes')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/409/bruschetta-tomatoes-230_2x.jpg' alt='Tomatoes' title='Tomatoes'/> <span>Bruschetta Tomatoes</span> </button>
                    <button onClick={() => handleIngredientSelection('Pickled Red Onions')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/399/option_web_list.jpg' alt='Pickled Red Onion' title='Pickled Red Onion'/> <span>Pickled Red Onions</span> </button>
                    <button onClick={() => handleIngredientSelection('Arugula')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/379/arugula-230_2x.jpg' alt='Arugula' title='Arugula'/> <span>Arugula</span> </button>
                    <button onClick={() => handleIngredientSelection('Spinach')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/406/spinach-230_2x.jpg' alt='Spinach' title='Spinach'/> <span>Spinach</span> </button>
                    <button onClick={() => handleIngredientSelection('Chopped Greens')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/387/mixed-greens-230_2x.jpg' alt='Chopped Greens' title='Chopped Greens'/> <span>Chopped Greens</span> </button>
                    <button onClick={() => handleIngredientSelection('Sweet Potatoes')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/377/roasted-sweet-potatoes-230_2x.jpg' alt='Roasted Sweet Potatoes' title='Roasted Sweet Potatoes'/> <span>Roasted Sweet Potato</span> </button>
                    <button onClick={() => handleIngredientSelection('Hummus')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/350/hummus-230_2x.jpg' alt='Spread of Hummus' title='Spread of Hummus'/> <span>Hummus</span> </button>
                    <button onClick={() => handleIngredientSelection('Feta')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/385/feta-230_2x.jpg' alt='Feta' title='Feta'/> <span>Feta</span> </button>
                    <button onClick={() => handleIngredientSelection('Mozzarella')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/388/mozzarella-230_2x.jpg' alt='Mozzarella' title='Mozzarella'/> <span>Mozzarella</span> </button>
                    <button onClick={() => handleIngredientSelection('Parmesan')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/397/parmesan-reggiano-230_2x.jpg' alt='Parmesan' title='Parmesan'/> <span>Parmesan</span> </button>
                    <button onClick={() => handleIngredientSelection('Sweet & Spicy Peppers')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/608/sweet-and-spicy-peppers-230_2x.jpg' alt='Sweet and Spicy Peppers' title='Sweet and Spicy Peppers'/> <span>Sweet & Spicy Peppers</span></button>
                    <button onClick={() => handleIngredientSelection('Strawberries')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/407/strawberries-230_2x.jpg' alt='Strawberries' title='Strawberries'/><span>Strawberries</span> </button>
                    <button onClick={() => handleIngredientSelection('Bacon')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/362/pancetta-230_2x.jpg' alt='Bacon' title='Bacon'/> <span>Pancetta(Bacon)</span></button>
                    <button onClick={() => handleIngredientSelection('Broccoli')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/402/roasted-broccoli-230_2x.jpg' alt='Roasted Broccoli' title='Roasted Broccoli'/> <span>Roasted Broccoli</span> </button>
                    <button onClick={() => handleIngredientSelection('Sweet Corn & Tomato')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/408/sweet-corn-and-tomato-230_2x.jpg' alt='Sweet Corn and Tomatoe' title='Sweet Corn and Tomatoe'/> <span>Sweet Corn & Tomato</span></button>
                    <button onClick={() => handleIngredientSelection('Avocado')} className='BYOpanel-buttons'> 
                        <img src='https://images.mypiada.com/piada-one/option/381/avocado-230_2x.jpg' alt='Sliced Avocado' title='Sliced Avocado'/><span>Avocado</span> </button>
                </p>
            </h3>
            <button onClick={() => addBYOToOrder()} >
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
    
    const salad_panel = () => {
        clearBYOSelections();
        setBYO("Custom Salad");
        BYO_salad();
    }

    return (
    <div className='Customer'>
        <div className='CustomerHeader'>
            <h1 style={{fontSize: "5vh"}}> 
                <img src="piada-icon.jpg" alt="Piada Icon of a Motor bike." className='icon' onClick={() => navigate('/')}/> &nbsp;
                <b><u>PIADA</u></b>  ~ Customer Self-Service ~ 
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
                <button onClick={() => navigate(-1)} className='navigate-buttons'> <FaHome /> &nbsp; Home </button>
                {/* <button onClick={() => navigate(-1)} className='navigate-buttons'> &nbsp; Home </button> */}
            </h1>
        </div>


         
                 
        
        
        <div>    
        <h3> <p className='CategoryText'>Pasta</p>
        <div>
        <div className='float-container'>
            <div className='float-child'>
                <p>Carbonara</p>
                <Popup trigger=
                {<button className='MenuItemButton'>
                    <img src='https://images.mypiada.com/piada-one/product/423/197051.jpg' alt='Carbonara' title='Carbonara Pasta Bowl'
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
                        <img src='https://images.mypiada.com/piada-one/product/459/123678.jpg' alt='Diavolo' title='Diavolo Pasta Bowl'
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
                        <img src='https://images.mypiada.com/piada-one/product/322/197053.jpg' alt='Basil Pesto' title='Basil Pesto Pasta Bowl'
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
                        <img src='https://images.mypiada.com/piada-one/product/565/325680.jpg' alt='Marinara' title='Marinara Pasta Bowl'
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
        </div>
        </h3>

        <h3 > <p className='CategoryText'>Piadas</p>  
            <p>
            <div className='float-container'>
            <div className='float-child'>
            <p>Avocado Piada <br/><br/></p>
            <button onClick={() => addorderitem("Avocado Piada")} className='MenuItemButton'>
                <img src='https://images.mypiada.com/piada-one/product/315/196632.jpg' alt='Avocado Piada' title='Avocado Piada on Plate'
                style={{width: "13.5vw"}}/>
            </button>
            <p className='PriceText'>$9.89</p>
            <p className='IngredientText'>Italian-style street wrap with pancetta (bacon), arugula, 
            mozzarella, fresh avocado, sweet corn & tomato, basil aioli</p>
            </div>
            <div className='float-child'>
            <p>BLT Piada <br/><br/></p>
            <button onClick={() => addorderitem("BLT Piada")} className='MenuItemButton'>
                <img src='https://images.mypiada.com/piada-one/product/453/185657.jpg' alt='BLT Piada' title='BLT Piada'
                style={{width: "13.5vw"}}/>
            </button>
            <p className='PriceText'>$9.29</p>
            <p className='IngredientText'>Italian-style street wrap with pancetta (bacon), romaine, 
            bruschetta tomatoes, creamy parmesan, basil aioli</p>
            </div>
            <div className='float-child'>
            <p>Chef's Favorite Piada</p>
            <button onClick={() => addorderitem("Chefs Favorite Piada")} className='MenuItemButton'>
                <img src='https://images.mypiada.com/piada-one/product/279/196634.jpg' alt="Chef's Favorite Piada" title="Chef's Favorite Piada on Plate"
                style={{width: "13.5vw"}}/>
            </button>
            <p className='PriceText'>$9.29</p>
            <p className='IngredientText'>Italian-style street wrap with spicy diavolo sauce, romaine, 
            mozzarella, sweet peppers, spicy ranch</p>
            </div>
            <div className='float-child'>
            <p>Mediterranean Piada</p>
            <button onClick={() => addorderitem("Mediterranean Piada")} className='MenuItemButton'>
                <img src='https://images.mypiada.com/piada-one/product/548/386780.jpg' alt='Mediterranean Piada' title='Mediterranean Piada on Plate'
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
        <div>
        <div className='float-container'>
          <div className='float-child'>
          <p>Deluxe Ceaser</p>
          <Popup trigger=
            {<button className='MenuItemButton'>
                <img src='https://images.mypiada.com/piada-one/product/456/196981.jpg' alt='Deluxe Caeser Salad' title='Deluxe Caeser Salad'
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
                <img src='https://images.mypiada.com/piada-one/product/467/product_web_category.png' alt="Farmer's Market" title="Farmer's Market Salad"
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
                <img src='https://images.mypiada.com/piada-one/product/782/product_web_category.png' alt= 'Avocado Chop' title= 'Avocado Chop Salad'
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
                <img src='https://images.mypiada.com/piada-one/product/562/324991.jpg' alt='Power Bowl' title='Power Bowl'
                style={{width: "13.5vw"}}/>
            </button>
            <p className='PriceText'>$11.79</p>
            <p className='IngredientText'>Harissa grain blend, hummus, roasted sweet potatoes, sweet corn & tomato, 
            roasted broccoli, cucumber salad, pickled red onions, yogurt harissa</p>
            </div>
        </div>
        </div>
        </h3>
      

        <h3 > <p className='CategoryText'>Other</p>
        <div className='float-container'>

            <div className='float-child' >
            <p>Build Your Own</p>
            <Popup contentStyle={{width: "1200px"}} trigger=
                {<button className='MenuItemButton'> 
                    <img src='https://mypiada.com/assets/bg-garlic-9bb944d7d28a24a67d8bb7afb75474d1724934912f9713f6bff791a8ed8abdc8.jpg' alt='Person Crushing Garlic with Knife' title='Person Crushing Garlic with Knife' 
                    style={{width: "98%", height: "98%"}}/> 
                </button>} 
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
                    <img src='https://images.mypiada.com/piada-one/category/607/category_web_list.png' alt='Tomatoes and Corn in Bowl' title= 'Tomatoes and Corn in Bowl'
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
                    <img src='https://images.mypiada.com/piada-one/category/858/category_web_list.jpg' alt='Yellow Drink in Piada Cup' title='Yellow Drink in Piada Cup'
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
                    <img src='https://images.mypiada.com/piada-one/category/600/category_web_list.jpg' alt='Kids eating Spaghetti' title='Kids Eating Spaghetti'
                    style={{width: "13.5vw"}}/>
                </button>} 
                modal nested>
                {
                    <div style={{ overflowY: "auto", maxHeight: "800px" }}>
                        <h2> Kids Menu </h2>

                        <Popup trigger={<button className='BYOpanel-buttons' title='Kids Eating pasta'> <img src='https://images.mypiada.com/piada-one/product/627/185781.jpg' alt='Kids eating pasta' title='Kids eating pasta'/> <span>Kids Pasta</span>  </button>} position="bottom center" onOpen={() => setKidsBYO('Kids Pasta')}>
                        <div >
                            <button className='BYOpanel-buttons' title='Grilled Chicken' onClick={() => setKidsProtein("Grilled Chicken")} disabled={kidsProtein === 'Grilled Chicken' ? true : false}> 
                                <img src='https://images.mypiada.com/piada-one/option/366/chicken-230_2x.jpg' alt='Grilled Chicken' title='Grilled Chicken'/> <span>Grilled Chicken</span> </button>
                            <button className='BYOpanel-buttons' onClick={() => setKidsProtein("Crispy Chicken")} disabled={kidsProtein === 'Crispy Chicken' ? true : false}> 
                                <img src='https://images.mypiada.com/piada-one/option/365/chicken-fritte-230_2x.jpg' alt='Crispy Chicken Fritte' title='Crispy Chicken Fritte'/><span>Crispy Chicken</span>  </button>
                            <button className='BYOpanel-buttons'onClick={() => setKidsProtein("Steak")} disabled={kidsProtein === 'Steak' ? true : false}> 
                                <img src='https://images.mypiada.com/piada-one/option/367/steak-230_2x.jpg' alt='Grilled Steak' title='Grilled Steak'/><span>Grilled Steak</span> </button>
                            <br />
                            <button className='BYOpanel-buttons' onClick={() => setKidsType("Spaghetti")} disabled={kidsType === 'Spaghetti' ? true : false}>
                                <img src='https://images.mypiada.com/piada-one/option/305/spaghetti-230_2x.jpg' alt='Spaghetti' title='Spaghetti'/> <span>Spaghetti</span></button>
                            <button className='BYOpanel-buttons' onClick={() => setKidsType("Penne")} disabled={kidsType === 'Penne' ? true : false}> 
                                <img src='https://images.mypiada.com/piada-one/option/363/penne-230_2x.jpg' alt='Penne' title='Penne Pasta'/> <span>Penne</span> </button>
                            <button onClick={() => addKidsBYOToOrder()} className='add-to-order'> Add to Order </button>
                        </div>
                        </Popup>

                        <Popup trigger={<button className='BYOpanel-buttons' title='Meatballs and Spaghetti Bowl'> <img src='https://images.mypiada.com/piada-one/product/630/185780.jpg' alt='Meatballs and Spaghetti' title='Meatballs and Spaghetti'/> <span>Kids Meatballs</span>  </button>} position="bottom center"  onOpen={() => setKidsBYO('Kids Meatballs')}>
                        <div >
                            <button className='BYOpanel-buttons' onClick={() => setKidsType("Spaghetti")} disabled={kidsType === 'Spaghetti' ? true : false}> 
                            <img src='https://images.mypiada.com/piada-one/option/305/spaghetti-230_2x.jpg' alt='Spaghetti' title='Spaghetti'/> <span>Spaghetti</span> </button>
                            <button className='BYOpanel-buttons' onClick={() => setKidsType("Penne")} disabled={kidsType === 'Penne' ? true : false}> 
                            <img src='https://images.mypiada.com/piada-one/option/363/penne-230_2x.jpg' alt='Penne Pasta' title='Penne Pasta'/> <span>Penne</span> </button>
                            <button onClick={() => addKidsBYOToOrder()} className='add-to-order'> Add to Order </button>
                        </div>
                        </Popup>
                        
                        <button className='BYOpanel-buttons' title='Chicken Fingers next to a Heinz Ketchup' onClick={() => addorderitem("Kids Chicken Fingers")} > 
                            <img src='https://images.mypiada.com/piada-one/product/530/131615.jpg' alt='Chicken Fingers next to a Heinx Ketchup' title='Chicken Fingers next to a Heinx Ketchup'/> <span>Chicken Fingers</span> </button>

                        <br /><br />
                        <h3> Drinks: </h3>
                        <button className='BYOpanel-buttons' title='Horizon LowFat Milk' onClick={() => addorderitem("Kids Low-Fat Milk")} > 
                            <img src='https://images.mypiada.com/piada-one/option/698/white-milk-230_2x.jpg' alt='Horizon LowFat Milk' title='Horizon LowFat Milk'/> <span>Low-Fat Milk</span> </button>
                        <button className='BYOpanel-buttons' title='Horizon Chocolate Milk' onClick={() => addorderitem("Kids Chocolate Milk")} >
                            <img src='https://images.mypiada.com/piada-one/option/699/chocolate-milk-230_2x.jpg' alt='Horizon Chocolate Milk' title='Horizon Chocolate Milk'/> <span>Chocolate Milk</span> </button>
                        <button className='BYOpanel-buttons' title='Motts Apple Juice' onClick={() => addorderitem("Kids Apple Juice")} > 
                            <img src='https://images.mypiada.com/piada-one/option/700/apple-juice-230_2x.jpg' alt='Motts Apple Juice' title='Motts Apple Juice'/> <span>Apple Juice</span> </button>
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
