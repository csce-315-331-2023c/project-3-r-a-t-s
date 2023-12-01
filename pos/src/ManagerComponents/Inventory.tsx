import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdCancel } from "react-icons/md";
import { FiSave, FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

interface Item {
  ingredient_id: number;
  name: string;
  quantity: number;
  price: number;
  unit: string;
}

const InventoryComponent = () => {
  useEffect(() => {
    fetchInventory();
  }, []);

  const [query, setQuery] = useState("");

  const starterInventory: Item[] = [
    { ingredient_id: 1, name: "Item A", price: 10, quantity: 10, unit: "kg" },
    {
      ingredient_id: 2,
      name: "Item B",
      price: 11,
      quantity: 5,
      unit: "pieces",
    },
  ];
  const [inventoryData, setInventoryData] = useState<Item[]>(() => []);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    unit: "",
    price: "",
    threshold: "",
  });
  const [showRemoveForm, setShowRemoveForm] = useState(false);
  const [removeFormData, setRemoveFormData] = useState({ name: "" });
  // remove feature is now implemented
  const [showEditForm, setShowEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    newQuantity: "",
  });

  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editedItemData, setEditedItemData] = useState({
    name: "",
    quantity: 0,
    unit: "",
    price: 0,
    threshold: "",
  });

  const [originalItemData, setOriginalItemData] = useState<Item | null>(null);

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
      const response = await axios.post(
        "http://127.0.0.1:5000/api/manager/add_inventory",
        formData
      );
      // const response = await axios.post("https://pos-backend-3c6o.onrender.com/api/manager/add_inventory", formData);
      // console.log(response.data);
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
      const response = await axios.post(
        "http://127.0.0.1:5000/api/manager/remove_inventory",
        removeFormData,
        config
      );
      // const response = await axios.post("https://pos-backend-3c6o.onrender.com/api/manager/remove_inventory", removeFormData, config);
      // console.log(response.data);
      fetchInventory();
    } catch (error) {
      console.error("Failed to remove from inventory:", error);
    }
    setShowRemoveForm(false); // Hide the form after submission
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prevEditFormData) => ({
      ...prevEditFormData,
      [name]: value,
    }));
  };

  const submitEditForm = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/manager/edit_inventory",
        editFormData,
        config
      );
      // const response = await axios.post("https://pos-backend-3c6o.onrender.com/api/manager/edit_inventory", editFormData, config);
      // console.log(response.data);
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
        .get("http://127.0.0.1:5000/api/manager/get_inventory", config)
        // .get("https://pos-backend-3c6o.onrender.com/api/manager/get_inventory", config)
        .then((response) => {
          // Handle the response from the Flask API
          // console.log(response.data);
          setInventoryData(response.data.items);
          console.log("Successfuly fetched Inventory");
        });
    } catch (error) {
      console.error("Failed to fetch inventory:", error);
    }
    setIsLoading(false);
  };

  // JavaScript function

  const update_inventory = async (editedItemData: any) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/manager/update_inventory_item",
        editedItemData,
        config
      );
      console.log(response.data.message);
      // Additional logic after successful update (e.g., refreshing the data)
    } catch (error) {
      console.error("Error updating inventory item:", error);
    }
  };

  // const handleCancelEdit = () => {
  //   // if (originalItemData) {
  //   //   setEditedItemData(originalItemData); // Revert to the original data
  //   //   setOriginalItemData(null); // Reset originalItemData
  //   // }
  //   window.location.reload();
  // };
  const handleCancelEdit = () => {
    // Check if there is original data stored
    if (originalItemData) {
      // Update the state of the item being edited back to its original data
      const updatedInventoryData = inventoryData.map((item) =>
        item.ingredient_id === originalItemData.ingredient_id
          ? originalItemData
          : item
      );

      setInventoryData(updatedInventoryData); // Update the inventory data with the reverted item
      setEditingItemId(null); // Exit editing mode
      setOriginalItemData(null); // Clear the original data
    }
  };

  const handleSaveEdit = async (itemId: number) => {
    try {
      await update_inventory({ id: itemId, ...editedItemData });
      // Refresh inventory list or any other post-update actions
      fetchInventory();

      setEditedItemData({
        name: "",
        quantity: 0,
        unit: "",
        price: 0,
        threshold: "",
      });
      setEditingItemId(null); // Exit edit mode
    } catch (error) {
      console.error("Error saving edits:", error);
    }
  };
  

  const handleEdit = (ingredientId: number) => {
    setEditingItemId(ingredientId);
    // Initialize editedItemData with item's current data
    const item = inventoryData.find(
      (item) => item.ingredient_id === ingredientId
    );
    if (item) {
      setEditedItemData({
        name: item.name,
        quantity: item.quantity,
        unit: item.unit,
        price: item.price,
        threshold: "0",
      });
      setOriginalItemData({ ...item });
    }
  };

  const handleDelete = async (ingredient_id: number) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const removeFormData = {
      ingredient_id: ingredient_id,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/manager/remove_inventory",
        removeFormData,
        config
      );
      // const response = await axios.post("https://pos-backend-3c6o.onrender.com/api/manager/remove_inventory", removeFormData, config);
      // console.log(response.data);
      fetchInventory();
    } catch (error) {
      console.error("Failed to remove from inventory:", error);
    }
  };

  return (
    <div>
      <br />
      <div>
      <button
          onClick={() => setShowAddForm(!showAddForm)}
          disabled={isLoading}
          className="btn btn-success"
        >
          {"Add to Inventory"}
        </button>
        <button
          onClick={() => setShowRemoveForm(!showRemoveForm)}
          disabled={isLoading}
          className="btn btn-danger"
        >
          {"Remove from Inventory"}
        </button>
        <button
          onClick={() => setShowEditForm(!showEditForm)}
          disabled={isLoading}
          className="btn btn-primary"
        >
          {"Edit Quantity"}
        </button>
        <br /> <br />
        <div className="Search-Container">
          Search:{" "}
          <form>
            {" "}
            <input
              className="searchForm"
              style={{ width: "370px" }}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Item Name..."
            />{" "}
          </form>
        </div>
      </div>
      <br /> {isLoading ? "Loading..." : ""}
      {showRemoveForm && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitRemoveForm();
          }}
        >
          <input
            name="name"
            placeholder="Name of item to remove"
            value={removeFormData.name}
            onChange={handleRemoveFormChange}
            required
          />
          <button type="submit">Remove</button>
        </form>
      )}
      {showAddForm && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitForm();
          }}
        >
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleFormChange}
            required
          />
          <input
            name="quantity"
            placeholder="Quantity"
            type="number"
            value={formData.quantity}
            onChange={handleFormChange}
            required
          />
          <input
            name="unit"
            placeholder="Unit"
            value={formData.unit}
            onChange={handleFormChange}
            required
          />
          <input
            name="price"
            placeholder="Price"
            type="number"
            value={formData.price}
            onChange={handleFormChange}
            required
          />
          <input
            name="threshold"
            placeholder="Threshold"
            type="number"
            value={formData.threshold}
            onChange={handleFormChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
      )}
      {showEditForm && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitEditForm();
          }}
        >
          <input
            name="name"
            placeholder="Name of item to edit"
            value={editFormData.name}
            onChange={handleEditFormChange}
            required
          />
          <input
            name="newQuantity"
            placeholder="New Quantity"
            type="number"
            value={editFormData.newQuantity}
            onChange={handleEditFormChange}
            required
          />
          <button type="submit">Edit</button>
        </form>
      )}
      {inventoryData && (
        <table className="table table-striped w-100">
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price ($)</th>
              <th>Unit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData.map((item) => (
              <tr key={item.ingredient_id}>
                <td>
                  {editingItemId === item.ingredient_id ? (
                    <input
                      type="text"
                      value={editedItemData.name}
                      onChange={(e) =>
                        setEditedItemData({
                          ...editedItemData,
                          name: e.target.value,
                        })
                      }
                      required
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td>
                  {editingItemId === item.ingredient_id ? (
                    <input
                      type="number"
                      value={editedItemData.quantity}
                      onChange={(e) =>
                        setEditedItemData({
                          ...editedItemData,
                          quantity: parseInt(e.target.value),
                        })
                      }
                      required
                    />
                  ) : (
                    item.quantity
                  )}
                </td>
                <td>
                  {editingItemId === item.ingredient_id ? (
                    <input
                      type="number"
                      value={editedItemData.price}
                      onChange={(e) =>
                        setEditedItemData({
                          ...editedItemData,
                          price: parseInt(e.target.value),
                        })
                      }
                      required
                    />
                  ) : (
                    item.price
                  )}
                </td>
                <td>
                  {editingItemId === item.ingredient_id ? (
                    <input
                      type="text"
                      value={editedItemData.unit}
                      onChange={(e) =>
                        setEditedItemData({
                          ...editedItemData,
                          unit: e.target.value,
                        })
                      }
                      required
                    />
                  ) : (
                    item.unit
                  )}
                </td>
                <td>
                  {/* Actions column */}
                  {/* Actions column */}
                  {editingItemId === item.ingredient_id ? (
                    <span>
                      <MdCancel className="cancel-icon" onClick={() => handleCancelEdit()}/>
                      <FiSave className="save-icon" onClick={() => handleSaveEdit(item.ingredient_id)} />
                    </span>
                  ) : (
                    <span>
                      <BsFillTrashFill
                        className="delete-btn"
                        onClick={() => handleDelete(item.ingredient_id)}
                      />
                      <BsFillPencilFill
                        className="edit-btn"
                        onClick={() => handleEdit(item.ingredient_id)}
                      />
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InventoryComponent;