import React, { useState } from "react";
import axios from "axios";

interface Item {
  ingredient_id: number;
  name: string;
  quantity: number;
  unit: string;
}

const get_inventory = () => {
  console.log("Paying for Order");
  // console.table(order);
  // setOrder([]);
  // // Create an object with order data to send to the Flask API
  // const orderData = {
  //     items : order,
  // };

  // Set the Content-Type header to application/json
  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-Client-Type": "manager",
    },
  };
  // Send a POST request to the Flask API
  // Run locally with .post('http://127.0.0.1:5000/place_order', orderData)
  axios.post("http://127.0.0.1:5000/api/manager/get_order_history");
  //.post(`https://pos-backend-3c6o.onrender.com/api/cashier/place_order`, orderData, config)
  // .then((response) => {
  //     // Handle the response from the Flask API
  //     console.log(response.data);
  //     if (response.data.message === "Order placed successfully (From Backend)") {
  //         // Order placed successfully
  //         // console.log("Order placed :)");
  //         order_total = response.data.order_total;
  //         // TODO : Display confirmation message to user
  //     } else {
  //         // Handle Errors
  //         console.error("Unexpected response:", response.data);
  //     }
  // })
  // .catch((error : AxiosError) => {
  //     console.error(error); // Handle errors, e.g., show an error message to the user.
  // });
};

const InventoryComponent = () => {
  const starterInventory: Item[] = [
    { ingredient_id: 1, name: "Item A", quantity: 10, unit: "kg" },
    { ingredient_id: 2, name: "Item B", quantity: 5, unit: "pieces" },
  ];
  const [inventoryData, setInventoryData] = useState<Item[]>(() => []);
  const [isLoading, setIsLoading] = useState(false);

  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-Client-Type": "manager",
    },
  };

  const fetchInventory = async () => {
    setIsLoading(true);
    try {
      const response = await axios
        .get("http://127.0.0.1:5000/api/manager/get_inventory", config)
        .then((response) => {
          // Handle the response from the Flask API
          console.log(response.data);
          setInventoryData(response.data.items);
        }) 
    } catch (error) {
      console.error("Failed to fetch inventory:", error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <button onClick={fetchInventory} disabled={isLoading}>
        {isLoading ? "Loading..." : "View current inventory"}
        {/* {inventoryData ? "Our Current Inventory:" : "View current inventory"} */}
      </button>
      {inventoryData && (
        <table className="table table-striped w-100">
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData.map((item) => (
              <tr key={item.ingredient_id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InventoryComponent;
