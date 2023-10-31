import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import { useNavigate } from "react-router-dom";
import 'reactjs-popup/dist/index.css';
import './App.css';

const Coostomer: React.FC = () => {
    const navigate = useNavigate();
    
    const [order, setOrder] = useState<string[]>([]);
    const [current_order, setCurrentOrder] = useState<string[]>([]);
    const [curr_item, setCurrItem] = useState<string>("");
    const [curr_size, setCurrSize] = useState<string>("");
    const [curr_type, setCurrType] = useState<string>("");

    const makeorderitem = (temp: number, item: string): void => {
        if (temp === 0) {
            console.log("Choosing current item: ", item);
            setCurrItem(item);
        } else if (temp === 1) {
            console.log("Choosing a size: ", item);
            setCurrSize(item);
        } else if (temp === 2) {
            console.log("Choosing a type: ", item);
            setCurrType(item);
        }
    }

    const addorderitem = (item: string): void => {
        if (item === "") {
            const newItem = `${curr_size} ${curr_item} ${curr_type}`;
            setOrder(prev => [...prev, newItem]);
            setCurrentOrder(prev => [...prev, newItem]);
            
            console.log("Added new order item:", newItem);
            console.log("Current order:", current_order);

            setCurrSize("");
            setCurrItem("");
            setCurrType("");
        } else {
            setOrder(prev => [...prev, item]);
            console.log("Added new order item:", item);
        }
    }

    const addorder = (): void => {
        console.log("Paying for Order");
        // Add back-end to update database
    }

    const goback = (): void => {
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
                <Popup 
                    trigger={
                        <button title="Pasta, parmesan alfredo, bruschetta tomatoes, pancetta (bacon), spinach, grated parmesan">
                            Carbonara
                        </button>
                    }
                    position="bottom center"
                    onOpen={() => makeorderitem(0, "Carbonara")}
                >
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
            
            <h3>  Current Order:
                <ul>
                    {current_order.map((item, idx) => <li key={idx}>{item}</li>)}
                </ul>
                <button onClick={addorder}> Pay </button>
            </h3>
        </div>
    );
}

export default Coostomer;
