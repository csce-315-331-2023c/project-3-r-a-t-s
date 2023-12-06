import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdCancel } from "react-icons/md";
import { FiSave, FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";

/**
 * Represents the structure of an inventory item.
 * @typedef {Object} Item
 * @property {number} ingredient_id - The ID of the ingredient.
 * @property {string} name - The name of the item.
 * @property {number} quantity - The quantity of the item.
 * @property {number} price - The price of the item.
 * @property {string} unit - The unit of measurement for the item.
 */
interface Item {
  ingredient_id: number;
  name: string;
  quantity: number;
  price: number;
  unit: string;
}

/**
 * Represents the properties for the Popup component.
 * @typedef {Object} PopupProps
 * @property {string} message - The message to display in the popup.
 * @property {() => void} onConfirm - The callback function when confirming an action.
 * @property {() => void} onCancel - The callback function when canceling an action.
 */
interface PopupProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Popup component for confirming actions.
 * @param {PopupProps} props - The properties for the Popup component.
 * @returns {JSX.Element} The rendered Popup component.
 */
const Popup: React.FC<PopupProps> = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="EmployeeDeletePopup">
                <div>{message}</div>
                <div className="ConfirmEmployee-btn">
                    <button className="delete" onClick={onConfirm}>Delete</button>
                </div>
                <div className="ConfirmEmployee-btn">
                    <button className="cancel" onClick={onCancel}>Cancel</button>
                </div>
        </div>
    );
};

/**
 * InventoryComponent responsible for managing the inventory.
 * @returns {JSX.Element} The rendered InventoryComponent.
 */
const InventoryComponent = () => {
  // useEffect to fetch inventory data on component mount
  useEffect(() => {
    fetchInventory();
  }, []);

  // useEffect to load inventory data from local storage on component mount
  useEffect(() => {
    const storedInventory = localStorage.getItem('inventoryData');
    if (storedInventory) {
      setInventoryData(JSON.parse(storedInventory));
    }
  }, []);

  // State variables for managing component state
  const [showPopup, setShowPopup] = useState(false);
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

  const [deleteID, setDeleteID] = useState(-1);

  /**
   * Function to handle form changes.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event triggered by form changes.
   */  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  /**
   * Function to submit form data for adding a new item to the inventory.
   */  
  const submitForm = async () => {
    try {
      // const response = await axios.post(
      //   "http://127.0.0.1:5000/api/manager/add_inventory",
      //   formData
      // );
      const response = await axios.post("https://pos-backend-3c6o.onrender.com/api/manager/add_inventory", formData);
      // console.log(response.data);
      // Optionally, fetch inventory again to update the list
      formData.name = "";
      formData.price = "";
      formData.quantity = "";
      formData.threshold = "";
      formData.unit = "";
      fetchInventory();
    } catch (error) {
      console.error("Failed to add to inventory:", error);
    }
  };

   /**
   * Function to handle form changes for removing an item.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event triggered by form changes.
   */
  const handleRemoveFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setRemoveFormData({ name: value });
  };

  /**
   * Function to submit form data for removing an item from the inventory.
   */
  const submitRemoveForm = async () => {
    try {
      // const response = await axios.post(
      //   "http://127.0.0.1:5000/api/manager/remove_inventory",
      //   removeFormData,
      //   config
      // );
      const response = await axios.post("https://pos-backend-3c6o.onrender.com/api/manager/remove_inventory", removeFormData, config);
      // console.log(response.data);
      fetchInventory();
    } catch (error) {
      console.error("Failed to remove from inventory:", error);
    }
    setShowRemoveForm(false); // Hide the form after submission
  };

  /**
   * Function to handle form changes for editing an item.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event triggered by form changes.
   */
  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prevEditFormData) => ({
      ...prevEditFormData,
      [name]: value,
    }));
  };

  /**
   * Function to submit form data for editing an item in the inventory.
   */
  const submitEditForm = async () => {
    try {
      // const response = await axios.post(
      //   "http://127.0.0.1:5000/api/manager/edit_inventory",
      //   editFormData,
      //   config
      // );
      const response = await axios.post("https://pos-backend-3c6o.onrender.com/api/manager/edit_inventory", editFormData, config);
      // console.log(response.data);
      fetchInventory();
    } catch (error) {
      console.error("Failed to edit inventory:", error);
    }
    setShowEditForm(false);
  };

  /**
   * Function to fetch inventory data from the backend.
   */
  const fetchInventory = async () => {
    setIsLoading(true);
    try {
      const response = await axios
        // .get("http://127.0.0.1:5000/api/manager/get_inventory", config)
        .get("https://pos-backend-3c6o.onrender.com/api/manager/get_inventory", config)
        .then((response) => {
          // Handle the response from the Flask API
          // console.log(response.data);
          setInventoryData(response.data.items);
          console.log("Successfuly fetched Inventory");
          
          // Save the inventory data to local storage
          localStorage.setItem('inventoryData', JSON.stringify(response.data.items));
        });
    } catch (error) {
      console.error("Failed to fetch inventory:", error);
    }
    setIsLoading(false);
  };

  /**
   * Asynchronously updates the inventory item data.
   * @param {Object} editedItemData - The edited item data to be updated.
   * @param {number} editedItemData.id - The ID of the item to be updated.
   * @param {string} editedItemData.name - The name of the item.
   * @param {number} editedItemData.quantity - The quantity of the item.
   * @param {string} editedItemData.unit - The unit of measurement for the item.
   * @param {number} editedItemData.price - The price of the item.
   * @param {string} editedItemData.threshold - The threshold for the item.
   * @returns {Promise<void>} A Promise representing the completion of the update.
   */
  const update_inventory = async (editedItemData: any) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        //"http://127.0.0.1:5000/api/manager/update_inventory_item",
        "https://pos-backend-3c6o.onrender.com/api/manager/update_inventory_item",
        editedItemData,
        config
      );
      console.log(response.data.message);
      // Additional logic after successful update (e.g., refreshing the data)
    } catch (error) {
      console.error("Error updating inventory item:", error);
    }
  };

  /**
   * Cancels the edit operation and reverts to the original data.
    */
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

  /**
   * Saves the edited data for an item and refreshes the inventory list.
   * @param {number} itemId - The ID of the item being edited.
   */
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
  
  /**
   * Initiates the editing of an inventory item.
   * @param {number} ingredientId - The ID of the ingredient to be edited.
   */
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

  /**
   * Handles the click event for deleting an inventory item.
   * @param {number} i - The ID of the item to be deleted.
   */
  const handleDeleteClick = (i: number) => {
    setDeleteID(i);
    setShowPopup(true);
  };

  /**
   * Cancels the deletion operation.
   */
  const handleCancelDelete = () => {
    setShowPopup(false);
  };

  /**
   * Deletes an inventory item and refreshes the inventory list.
   */
  const handleDelete = async () => {
    setShowPopup(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const removeFormData = {
      ingredient_id: deleteID,
    };

    try {
      // const response = await axios.post(
      //   "http://127.0.0.1:5000/api/manager/remove_inventory",
      //   removeFormData,
      //   config
      // );
      const response = await axios.post("https://pos-backend-3c6o.onrender.com/api/manager/remove_inventory", removeFormData, config);
      // console.log(response.data);
      fetchInventory();
    } catch (error) {
      console.error("Failed to remove from inventory:", error);
    }
  setShowPopup(false);

  };

  /**
   * Renders the InventoryComponent.
   * @returns {JSX.Element} The rendered InventoryComponent.
   */
  return (
    <div>
      <div>
        <div className="Search-Container">
          {" "}
          <form>
            {" "}
            <input
              className="searchForm"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder= " Search by Item Name..."
            />  {" "}
          </form>
        </div>
        {/* <button
          onClick={() => setShowAddForm(!showAddForm)}
          disabled={isLoading}
          className="btn btn-success"
        >
          {"Add a New Inventory Item"}
        </button> */}
      </div>

     
     
      {/* {showRemoveForm && (
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
      )} */}


        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitForm();
          }}
        >
          <input
            name="name"
            placeholder="Name"
            className="input-forms"
            style={{width: "15vw"}}
            value={formData.name}
            onChange={handleFormChange}
            required
          />
          <input
            name="quantity"
            placeholder="Quantity"
            className="input-forms"
            type="number"
            value={formData.quantity}
            onChange={handleFormChange}
            required
          />
          <input
            name="unit"
            placeholder="Unit"
            className="input-forms"
            value={formData.unit}
            onChange={handleFormChange}
            required
          />
          <input
            name="price"
            placeholder="Price"
            className="input-forms"
            type="number"
            value={formData.price}
            onChange={handleFormChange}
            required
          />
          <input
            name="threshold"
            placeholder="Restock Amount"
            type="number"
            className="input-forms"
            value={formData.threshold}
            onChange={handleFormChange}
            required
          />
          <button type="submit" className="btn btn-success" style={{marginTop: "-1vh"}}>Add new Inventory Item</button>
        </form>
      {/* {showEditForm && (
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
       */}
       <br />
      <div style={{overflow: "scroll", height: "65vh", width:"95vw", margin: "0px auto 0px auto", border: "3px solid black"}}>
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
            {inventoryData.filter((item) => { 
              return query.toLowerCase() === '' ? item: item.name.toLowerCase().includes(query.toLowerCase())
            })
            .map((item) => (
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
                      className='input-forms'
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
                      className='input-forms'
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
                      className='input-forms'
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
                      className='input-forms'
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
                        onClick={() => handleDeleteClick(item.ingredient_id)}
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

      {showPopup && (
          <Popup
          message="Delete from Inventory?"
          onConfirm={handleDelete}
          onCancel={handleCancelDelete}
          />
      )}
    </div>
  );
};

export default InventoryComponent;