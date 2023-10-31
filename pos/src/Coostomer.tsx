import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import { useNavigate } from "react-router-dom";
import "reactjs-popup/dist/index.css";
import "./App.css";

const Coostomer: React.FC = () => {
    const [message, setMessage] = useState<string>(""); // Added state for message

    useEffect(() => {
        fetch("/api")
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Failed to fetch");
            })
            .then(data => {
                setMessage(data.message); // Update the state with the fetched message
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            {message} 
        </div>
    );
}

export default Coostomer;


// const Coostomer: React.FC = () => {
//   const navigate = useNavigate();

//   const [order, setOrder] = useState<string[]>([]);
//   const [current_order, setCurrentOrder] = useState<string[]>([]);
//   const [curr_item, setCurrItem] = useState<string>("");
//   const [curr_size, setCurrSize] = useState<string>("");
//   const [curr_type, setCurrType] = useState<string>("");

//   const makeorderitem = (temp: number, item: string): void => {
//     if (temp === 0) {
//       console.log("Choosing current item: ", item);
//       setCurrItem(item);
//     } else if (temp === 1) {
//       console.log("Choosing a size: ", item);
//       setCurrSize(item);
//     } else if (temp === 2) {
//       console.log("Choosing a type: ", item);
//       setCurrType(item);
//     }
//   };

//   const addorderitem = (item: string): void => {
//     if (item === "") {
//       const newItem = `${curr_size} ${curr_item} ${curr_type}`;
//       setOrder((prev) => [...prev, newItem]);
//       setCurrentOrder((prev) => [...prev, newItem]);

//       console.log("Added new order item:", newItem);
//       console.log("Current order:", current_order);

//       setCurrSize("");
//       setCurrItem("");
//       setCurrType("");
//     } else {
//       setOrder((prev) => [...prev, item]);
//       console.log("Added new order item:", item);
//     }
//   };

//   // const addorder = (): void => {
//   //     console.log("Paying for Order");
//   //     // Add back-end to update database
//   // }
//   const addorder = async (): Promise<void> => {
//     console.log("Paying for Order, testing backend");

//     // const response = await fetch("https://rats-backend-0866dbee4f15.herokuapp.com/submit_order", {
//     //   method: "POST",
//     //   headers: {
//     //     "Content-Type": "application/json",
//     //   },
//     //   body: JSON.stringify({
//     //     order: current_order,
//     //   }),
//     // });

//     const response = await fetch(
//       "https://rats-backend-0866dbee4f15.herokuapp.com/submit_order",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           order: current_order,
//         }),
//       }
//     );

//     const data = await response.json();
//     console.log(data.message);

//     // I will later clear the order or navigate to another page or show a success message.
//   };

//   const goback = (): void => {
//     navigate(-1);
//   };

//   return (
//     <div className="App">
//       <button onClick={goback}> Back </button>

//       <header>
//         <h1> Piada Italian Street Food </h1>
//         <p>
//           {" "}
//           Select items by pressing the buttons or hover them to see ingredients{" "}
//         </p>
//       </header>

//       <h3>
//         {" "}
//         Pasta:
//         <p>
//           <Popup
//             trigger={
//               <button title="Pasta, parmesan alfredo, bruschetta tomatoes, pancetta (bacon), spinach, grated parmesan">
//                 Carbonara
//               </button>
//             }
//             position="bottom center"
//             onOpen={() => makeorderitem(0, "Carbonara")}
//           >
//             <button onClick={() => makeorderitem(1, "SM")}> Small </button>
//             <button onClick={() => makeorderitem(1, "REG")}> Regular </button>
//             <br />
//             <button onClick={() => makeorderitem(2, "Penne")}> Penne </button>
//             <button onClick={() => makeorderitem(2, "Spaghetti")}>
//               {" "}
//               Spaghetti{" "}
//             </button>
//             <br /> <br />
//             <button onClick={() => addorderitem("")}> Add to order </button>
//           </Popup>

//           <Popup
//             trigger={
//               <button title="Pasta, spicy diavolo sauce, bruschetta tomatoes, chopped green onions, grated parmesan">
//                 Diavolo
//               </button>
//             }
//             position="bottom center"
//             onOpen={() => makeorderitem(0, "Diavolo")}
//           >
//             <button onClick={() => makeorderitem(1, "SM")}> Small </button>
//             <button onClick={() => makeorderitem(1, "REG")}> Regular </button>
//             <br />
//             <button onClick={() => makeorderitem(2, "Penne")}> Penne </button>
//             <button onClick={() => makeorderitem(2, "Spaghetti")}>
//               {" "}
//               Spaghetti{" "}
//             </button>
//             <br /> <br />
//             <button onClick={() => addorderitem("")}> Add to order </button>
//           </Popup>

//           <Popup
//             trigger={
//               <button title="Pasta, parmesan alfredo, basil pesto, bruschetta tomatoes, grated parmesan">
//                 Basil Pesto
//               </button>
//             }
//             position="bottom center"
//             onOpen={() => makeorderitem(0, "Basil Pesto")}
//           >
//             <button onClick={() => makeorderitem(1, "SM")}> Small </button>
//             <button onClick={() => makeorderitem(1, "REG")}> Regular </button>
//             <br />
//             <button onClick={() => makeorderitem(2, "Penne")}> Penne </button>
//             <button onClick={() => makeorderitem(2, "Spaghetti")}>
//               {" "}
//               Spaghetti{" "}
//             </button>
//             <br /> <br />
//             <button onClick={() => addorderitem("")}> Add to order </button>
//           </Popup>

//           <Popup
//             trigger={
//               <button title="Pasta, housemade tomato sauce, grated parmesan">
//                 Mariana
//               </button>
//             }
//             position="bottom center"
//             onOpen={() => makeorderitem(0, "Mariana")}
//           >
//             <button onClick={() => makeorderitem(1, "SM")}> Small </button>
//             <button onClick={() => makeorderitem(1, "REG")}> Regular </button>
//             <br />
//             <button onClick={() => makeorderitem(2, "Penne")}> Penne </button>
//             <button onClick={() => makeorderitem(2, "Spaghetti")}>
//               {" "}
//               Spaghetti{" "}
//             </button>
//             <br /> <br />
//             <button onClick={() => addorderitem("")}> Add to order </button>
//           </Popup>
//         </p>
//       </h3>

//       <h3>
//         {" "}
//         Piadas:
//         <p>
//           <Popup
//             // trigger={
//             //     <button title="Pasta, parmesan alfredo, bruschetta tomatoes, pancetta (bacon), spinach, grated parmesan">
//             //         Carbonara
//             //     </button>
//             // }

//             position="bottom center"
//             onOpen={() => makeorderitem(0, "Carbonara")}
//           >
//             <button onClick={() => makeorderitem(1, "SM")}> Small </button>
//             <button onClick={() => makeorderitem(1, "REG")}> Regular </button>
//             <br />
//             <button onClick={() => makeorderitem(2, "Penne")}> Penne </button>
//             <button onClick={() => makeorderitem(2, "Spaghetti")}>
//               {" "}
//               Spaghetti{" "}
//             </button>
//             <br /> <br />
//             <button onClick={() => addorderitem("")}> Add to order </button>
//           </Popup>
//         </p>
//       </h3>

//       <h3>
//         {" "}
//         Current Order:
//         <ul>
//           {current_order.map((item, idx) => (
//             <li key={idx}>{item}</li>
//           ))}
//         </ul>
//         <button onClick={addorder}> Pay </button>
//       </h3>
//     </div>
//   );
//   // return (
//   //     <div>
//   //         <h3> Pasta:
//   //             <p>
//   //                 <Popup trigger={<button title="Pasta, parmesan alfredo, bruschetta tomatoes, pancetta (bacon), spinach, grated parmesan"
//   //                     onClick={() => makeorderitem(0, "Carbonara")}>Carbonara</button>}
//   //                     position="bottom center" onOpen={() => makeorderitem(0, "Carbonara")}>
//   //                     <div>
//   //                         <button onClick={() => makeorderitem(1, "SM")}> Small </button>
//   //                         <button onClick={() => makeorderitem(1, "REG")}> Regular </button>
//   //                         <br />
//   //                         <button onClick={() => makeorderitem(2, "Penne")}> Penne </button>
//   //                         <button onClick={() => makeorderitem(2, "Spaghetti")}> Spaghetti </button>
//   //                         <br /><br />
//   //                         <button onClick={() => addorderitem("Carbonara")}> Add to order </button>
//   //                     </div>
//   //                 </Popup>
//   //                 {/* ... Repeat the same pattern for other menu items ... */}
//   //             </p>
//   //         </h3>
//   //         <h3>Piadas:
//   //             <p>
//   //                 <button title="Italian-style street wrap with pancetta (bacon), arugula, mozzarella, fresh avocado, sweet corn & tomato, basil aioli"
//   //                         onClick={() => addorderitem("Avocado Piada")}> Avocado </button>
//   //                 {/* ... Repeat the same pattern for other menu items ... */}
//   //             </p>
//   //         </h3>
//   //         <h3> Salad:
//   //             <p>
//   //                 <Popup trigger={<button title="Romaine, cabbage & kale blend, parmesan crisps, pancetta (bacon), bruschetta tomatoes, grated parmesan, Caesar dressing"
//   //                     onClick={() => makeorderitem(0, "Deluxe Ceasar")}>Deluxe Ceasar</button>}
//   //                     position="bottom center" onOpen={() => makeorderitem(0, "Deluxe Ceasar")}>
//   //                     <div>
//   //                         <button onClick={() => makeorderitem(1, "SM")}> Small </button>
//   //                         <button onClick={() => makeorderitem(1, "REG")}> Regular </button>
//   //                         <br /><br />
//   //                         <button onClick={() => addorderitem("Deluxe Ceasar")}> Add to order </button>
//   //                     </div>
//   //                 </Popup>
//   //                 {/* ... Repeat the same pattern for other menu items ... */}
//   //             </p>
//   //         </h3>
//   //     </div>
//   // );
// };

// export default Coostomer;
