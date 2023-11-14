import React, { useState } from "react";
import axios from "axios";

interface Item {
  ingredient_id: number;
  name: string;
  quantity: number;
  unit: string;
}

const InventoryComponent = () => {
  const starterInventory: Item[] = [
    { ingredient_id: 1, name: "Item A", quantity: 10, unit: "kg" },
    { ingredient_id: 2, name: "Item B", quantity: 5, unit: "pieces" },
  ];
  const [inventoryData, setInventoryData] = useState<Item[]>(() => []);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);  
  const [formData, setFormData] = useState({ name: "", quantity: "", unit: "", price: "", threshold: ""});
  const [showRemoveForm, setShowRemoveForm] = useState(false);
  const [removeFormData, setRemoveFormData] = useState({ name: "" }); 
  // remove feature is now implemented
  const [showEditForm, setShowEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState({ name: "", newQuantity: "" });

  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-Client-Type": "manager",
    },
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const submitForm = async () => {
    try {
      //const response = await axios.post("http://127.0.0.1:5000/api/manager/add_inventory", formData);
      const response = await axios.post("https://pos-backend-3c6o.onrender.com/api/manager/add_inventory", formData);
      console.log(response.data);
      // Optionally, fetch inventory again to update the list
      fetchInventory();
    } catch (error) {
      console.error("Failed to add to inventory:", error);
    }
  };

  const handleRemoveFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setRemoveFormData({ name: value });
  };
  
  const submitRemoveForm = async () => {
    try {
      //const response = await axios.post("http://127.0.0.1:5000/api/manager/remove_inventory", removeFormData, config);
      const response = await axios.post("https://pos-backend-3c6o.onrender.com/api/manager/remove_inventory", removeFormData, config);
      console.log(response.data);
      fetchInventory(); 
    } catch (error) {
      console.error("Failed to remove from inventory:", error);
    }
    setShowRemoveForm(false); // Hide the form after submission
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prevEditFormData) => ({ ...prevEditFormData, [name]: value }));
  };

  const submitEditForm = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/manager/edit_inventory", editFormData, config);
      console.log(response.data);
      fetchInventory();
    } catch (error) {
      console.error("Failed to edit inventory:", error);
    }
    setShowEditForm(false);
  };

  //hosted backend: https://pos-backend-3c6o.onrender.com/api/cashier/place_order
  const fetchInventory = async () => {
    setIsLoading(true);
    try {
      const response = await axios
        //.get("http://127.0.0.1:5000/api/manager/get_inventory", config)
        .get("https://pos-backend-3c6o.onrender.com/api/manager/get_inventory", config)
        .then((response) => {
          // Handle the response from the Flask API
          console.log(response.data);
          setInventoryData(response.data.items);
        });
    } catch (error) {
      console.error("Failed to fetch inventory:", error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <br />
      <div>
        <button onClick={() => setShowAddForm(!showAddForm)} disabled={isLoading} className="btn btn-success">
          {"Add to Inventory"}
        </button>
        <button onClick={fetchInventory} disabled={isLoading} className="btn btn-secondary">
          {isLoading ? "Loading..." : "View Inventory"}
          {/* {inventoryData ? "Our Current Inventory:" : "View current inventory"} */}
        </button>
        <button onClick={() => setShowRemoveForm(!showRemoveForm)} disabled={isLoading} className="btn btn-danger">
        {"Remove from Inventory"}
        </button>
        <button onClick={() => setShowEditForm(!showEditForm)} disabled={isLoading} className="btn btn-info">
          {"Edit Quantity"}
        </button>
      </div>
      <br />
      {showRemoveForm && (
      <form onSubmit={(e) => {
        e.preventDefault();
        submitRemoveForm();
      }}>
        <input name="name" placeholder="Name of item to remove" value={removeFormData.name} onChange={handleRemoveFormChange} required />
        <button type="submit">Remove</button>
      </form>
      )}
      {showAddForm && (
        <form onSubmit={(e) => {
          e.preventDefault();
          submitForm();
        }}>
          <input name="name" placeholder="Name" value={formData.name} onChange={handleFormChange} required />
          <input name="quantity" placeholder="Quantity" type="number" value={formData.quantity} onChange={handleFormChange} required />
          <input name="unit" placeholder="Unit" value={formData.unit} onChange={handleFormChange} required />
          <input name="price" placeholder="Price" type="number" value={formData.price} onChange={handleFormChange} required />
          <input name="threshold" placeholder="Threshold" type="number" value={formData.threshold} onChange={handleFormChange} required />
          <button type="submit">Submit</button>
        </form>
      )}
      {showEditForm && (
        <form onSubmit={(e) => {
          e.preventDefault();
          submitEditForm();
        }}>
          <input name="name" placeholder="Name of item to edit" value={editFormData.name} onChange={handleEditFormChange} required />
          <input name="newQuantity" placeholder="New Quantity" type="number" value={editFormData.newQuantity} onChange={handleEditFormChange} required />
          <button type="submit">Edit</button>
        </form>
      )}
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
