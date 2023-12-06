import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdCancel } from "react-icons/md";
import { FiSave } from "react-icons/fi";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

import Select, { MultiValue } from 'react-select'

/**
 * Represents the structure of a menu item.
 */
interface MenuItem {
  menu_item_id: number;
  name: string;
  price: number;
  ingredients: string[]; // New field for ingredients
}

/**
 * Represents the properties for the Popup component.
 */
interface PopupProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Represents a popup for confirming actions.
 * @param {PopupProps} props - The properties for the Popup component.
 * @returns {JSX.Element} React component.
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
 * Represents the MenuComponent.
 * @returns {JSX.Element} Returns Rendered Menu Items component.
 */
const MenuComponent = () => {

  useEffect(() => {
    fetchMenuItems();
    fetchInventory();
  }, []);

  // useEffect to load menu items from local storage on component mount
  useEffect(() => {
    const storedMenuData = localStorage.getItem('menuData');
    if (storedMenuData) {
      setMenuData(JSON.parse(storedMenuData));
    }
  }, []);

  const [query, setQuery] = useState('');


  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Variables for changing data for menu items
  const [addMenuItemName, setAddMenuItemName] = useState("");
  const [addMenuItemPrice, setAddMenuItemPrice] = useState("");
  const [selectedIngredient, setSelectedIngredients] = useState<string[]>([]);

  const [deleteMenuItemID, setDeleteMenuItemID] = useState(0);

  const [showPopup, setShowPopup] = useState(false);

  const [editingMenuID, setEditingMenuID] = useState<number | null>(null); 
  const [editedData, setEditedData] = useState({name: '', price: '', ingredients: ['']});

  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-Client-Type": "manager",
    },
  };

  /**
   * Handles the click event for deleting a menu item.
   * @param {number} id - The ID of the menu item to be deleted.
   */
  const handleDeleteClick = (id : number) => {
    setDeleteMenuItemID(id);
    fetchMenuItems();
    setShowPopup(true);
  }

  /**
   * Handles the delete action for a menu item.
   */
  const handleDelete = () => {
    deleteMenuItem();
    setShowPopup(false);
  }

  
  /**
   * Handles the cancel action for a menu item deletion.
   */
  const handleCancel = () => {
    setShowPopup(false);
  }

  /**
   * Fetches the menu items from the server.
   */  
  const fetchMenuItems = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://pos-backend-3c6o.onrender.com/api/manager/get_menu_items",
        config
      );
      // const response = await axios.get("https://pos-backend-3c6o.onrender.com/api/manager/get_menu_items", config);
      setMenuData(response.data);

      // Save the menu data to local storage
      localStorage.setItem('menuData', JSON.stringify(response.data));
      
      console.log("Successfully fetched Menu Items");
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch menu items:", error);
      setIsLoading(false);
    }
  };

const handleEdit = (id: number) => {
    setEditingMenuID(id);
    const menuToEdit = menuData.find((item) => item.menu_item_id === id);
    if (menuToEdit) {
      setEditedData({
        name: menuToEdit.name,
        price: menuToEdit.price.toString(),
        ingredients: menuToEdit.ingredients
      })
    }
};

const handleCancelEdit = async () => {
  try {
      await fetchMenuItems();
      setEditingMenuID(null);
  } catch (error) {
      console.error('Error with Canceling Edit Menu:', error);
  }
};

  const handleSaveEdit = async (id: number, editedData: { name: string; price: string; ingredients: string[] }) => {
    try {
        await changeMenuItem();
        await fetchMenuItems();
        setEditingMenuID(null);
    } catch (error) {
        console.error('Error with Updating Menu:', error);
    }
};

const [ingredients, setIngredients] = useState([{value: '', label: '' }])

/**
 * Fetches the inventory (ingredients) from the database.
 */
const fetchInventory = async () => {
  try {
    const response = await axios.post(
      // "http://127.0.0.1:5000/api/manager/get_ingredients",
      "https://pos-backend-3c6o.onrender.com/api/manager/get_ingredients",
      config
    );
    // console.log(response.data);
    console.log("Fetched Ingredients list")
    setIngredients(response.data);
    // console.log(ingredients);
  } catch (error) {
    console.error("Failed to Fetch Ingredients list:", error);
  }
};

  /**
   * Adds a new menu item.
   */
  const addMenuItem = async () => {
    try {
      const response = await axios.post(
        //"http://127.0.0.1:5000/api/manager/add_menu_item",
        "https://pos-backend-3c6o.onrender.com/api/manager/add_menu_item",
        {
          name: addMenuItemName,
          price: addMenuItemPrice,
          ingredients: selectedIngredient
        },
        config
      );
      // console.log(response.data);
      // Optionally, fetch menu items again to update the list
      setAddMenuItemName("")
      setAddMenuItemPrice("")
      setSelectedIngredients([])
      fetchMenuItems();
    } catch (error) {
      console.error("Failed to add menu item:", error);
    }
  };

   /**
   * Deletes a menu item.
   */
  const deleteMenuItem = async () => {
    try {
      const response = await axios.post(
        // "http://127.0.0.1:5000/api/manager/delete_menu_item",
        "https://pos-backend-3c6o.onrender.com/api/manager/delete_menu_item",
        {
          id: deleteMenuItemID,
        },
        config
      );
      console.log(response.data);
      // Optionally, fetch menu items again to update the list
      fetchMenuItems();
    } catch (error) {
      console.error("Failed to delete menu item:", error);
    }
    setShowPopup(false);
  };

  /**
   * Updates a menu item.
   */
  const changeMenuItem = async () => {
    try {
      const response = await axios.post(
        // "http://127.0.0.1:5000/api/manager/change_menu_item",
        "https://pos-backend-3c6o.onrender.com/api/manager/change_menu_item",
        {
          id: editingMenuID,
          name: editedData.name,
          price: editedData.price,
          ingredients: editedData.ingredients
        },
        config
      );
      console.log(response.data);
      // Optionally, fetch menu items again to update the list
      fetchMenuItems();
    } catch (error) {
      console.error("Failed to change menu item:", error);
    }
  };

  /**
   * Handles the change event for the Select component.
   * @param {any[] | MultiValue<{ value: string; label: string; }>} e - The selected ingredients.
   */
  const handleChange = async(e: any[] | MultiValue<{ value: string; label: string; }>) => {
    setSelectedIngredients(e.map((x: { value: any; }) => x.value));
  }

  return (
    <div>
      <div>
        <div className='Search-Container'>
          <form> <input className='searchForm' type="search" value={query} onChange={(e) => setQuery(e.target.value)} 
            placeholder='Search by Menu Item Name...'/> </form>
        </div>
        <br />
        <input
          type="text"
          placeholder="New Item Name"
          className="input-forms"
          value={addMenuItemName}
          style={{width: "15vw"}}
          onChange={(e) => setAddMenuItemName(e.target.value)}
        />
        <input
          type="price"
          placeholder="Price"
          className="input-forms"
          value={addMenuItemPrice}
          onChange={(e) => setAddMenuItemPrice(e.target.value)}
        />

        <div style={{width: "50vw", margin: "1vh auto 2vh auto"}}>
        <Select
            isMulti
            isClearable
            value={ingredients.filter(obj => selectedIngredient.includes(obj.value))}
            options={ingredients}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <button onClick={addMenuItem} className="btn btn-success" style={{marginTop: "-1vh"}}>Add New Menu Item</button>

      <br /><br />
      <div style={{overflow: "scroll", height: "55vh", width:"95vw", margin: "0px auto 0px auto", border: "3px solid black"}}>
        {menuData.length > 0 && (
          <div>
            <table className="table table-striped w-100">
              <thead>
                <tr>
                  <th>Menu Item</th>
                  <th>Price</th>
                  <th>Ingredients</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {menuData.filter((item) => { 
                    return query.toLowerCase() === '' ? item: item.name.toLowerCase().includes(query.toLowerCase())
                  }).map((item, index) => (
                  <tr key={index}>
                    <td>{editingMenuID === item.menu_item_id ? <input type="text" value={editedData.name} onChange={(e) => setEditedData({ ...editedData, name: e.target.value })} required className='input-forms'/> : item.name}</td>
                    <td>{editingMenuID === item.menu_item_id ? <input type="text" value={editedData.price} onChange={(e) => setEditedData({ ...editedData, price: e.target.value })} required className='input-forms'/> : item.price}</td>
                    <td style={{maxWidth: "45vw"}}> 
                      {editingMenuID === item.menu_item_id ? 
                      <Select 
                      isMulti
                      isClearable
                      value={editedData.ingredients.map(x => {
                        return {value: x, label: x}
                      }).filter(obj => editedData.ingredients.includes(obj.value))}
                      options={ingredients}
                      onChange={(e) => setEditedData({...editedData, ingredients: e.map((x: { value: any; }) => x.value)})}
                      /> 
                      
                      : item.ingredients.join(", ")}
                    </td>
                    <td>
                            {editingMenuID === item.menu_item_id ? (
                                <span>
                                    <MdCancel className="cancel-icon" onClick={() => handleCancelEdit()}/>
                                    <FiSave className="save-icon" onClick={() => handleSaveEdit(item.menu_item_id, editedData)} />
                                </span>
                            ) : (
                                <span>
                                    <BsFillTrashFill className="delete-btn"
                                        onClick={() => handleDeleteClick(item.menu_item_id)}
                                    />
                                    <BsFillPencilFill className="edit-btn"
                                        onClick={() => handleEdit(item.menu_item_id)}
                                    />
                                </span>
                            )}
                    </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      </div>

      {showPopup && (
          <Popup
          message="Delete Menu Item?"
          onConfirm={handleDelete}
          onCancel={handleCancel}
          />
      )}
    </div>
  );
};

export default MenuComponent;
