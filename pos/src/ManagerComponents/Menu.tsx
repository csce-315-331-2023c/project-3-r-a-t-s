import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdCancel } from "react-icons/md";
import { FiSave } from "react-icons/fi";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import Select from 'react-select'

interface MenuItem {
  menu_item_id: number;
  name: string;
  price: number;
  ingredients: string[]; // New field for ingredients
}

interface PopupProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

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

const MenuComponent = () => {

  useEffect(() => {
    fetchMenuItems();
    fetchInventory();
  }, []);

  const [query, setQuery] = useState('');


  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Variables for changing data for menu items
  const [addMenuItemName, setAddMenuItemName] = useState("");
  const [addMenuItemPrice, setAddMenuItemPrice] = useState("");

  const [deleteMenuItemID, setDeleteMenuItemID] = useState(0);

  const [changeMenuItemName, setChangeMenuItemName] = useState("");
  const [changeMenuItemPrice, setChangeMenuItemPrice] = useState("");

  const [showPopup, setShowPopup] = useState(false);

  const [editingMenuID, setEditingMenuID] = useState<number | null>(null); 
  const [editedData, setEditedData] = useState({name: '', price: ''});


  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-Client-Type": "manager",
    },
  };

  const handleDeleteClick = (id : number) => {
    setDeleteMenuItemID(id);
    setShowPopup(true);
  }

  const handleDelete = () => {
    deleteMenuItem();
    setShowPopup(false);
  }

  const handleCancel = () => {
    setShowPopup(false);
  }

  //https://pos-backend-3c6o.onrender.com/api/
  const fetchMenuItems = async () => {
    setIsLoading(true);
    try {
      // const response = await axios.get(
      //   "http://127.0.0.1:5000/api/manager/get_menu_items",
      //   config
      // );
      const response = await axios.get("https://pos-backend-3c6o.onrender.com/api/manager/get_menu_items", config);
      setMenuData(response.data);
      // console.log(response.data);
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
        price: menuToEdit.price.toString()
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

  const handleSaveEdit = async (id: number, editedData: { name: string; price: string; }) => {
    try {
        // await update_employee(employeeId);
        await fetchMenuItems();
        setEditingMenuID(null);
    } catch (error) {
        console.error('Error with Updating Menu:', error);
    }
};

const fetchInventory = async () => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/api/manager/get_ingredients",
      // "https://pos-backend-3c6o.onrender.com/api/manager/get_ingredients",
      config
    );
    // console.log(response.data);
    console.log("Fetched Ingredients list")
    // setIngredients(response.data);
  } catch (error) {
    console.error("Failed to add menu item:", error);
  }
};

  const addMenuItem = async () => {
    try {
      const response = await axios.post(
        //"http://127.0.0.1:5000/api/manager/add_menu_item",
        "https://pos-backend-3c6o.onrender.com/api/manager/add_menu_item",
        {
          name: addMenuItemName,
          price: addMenuItemPrice,
        },
        config
      );
      // console.log(response.data);
      // Optionally, fetch menu items again to update the list
      fetchMenuItems();
    } catch (error) {
      console.error("Failed to add menu item:", error);
    }
  };

  const deleteMenuItem = async () => {
    try {
      const response = await axios.post(
        //"http://127.0.0.1:5000/api/manager/delete_menu_item",
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

  const changeMenuItem = async () => {
    try {
      const response = await axios.post(
        //"http://127.0.0.1:5000/api/manager/change_menu_item",
        "https://pos-backend-3c6o.onrender.com/api/manager/change_menu_item",
        {
          name: changeMenuItemName,
          price: changeMenuItemPrice,
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
          style={{width: "15vw"}}
          onChange={(e) => setAddMenuItemName(e.target.value)}
        />
        <input
          type="price"
          placeholder="Price"
          className="input-forms"
          onChange={(e) => setAddMenuItemPrice(e.target.value)}
        />

        <button onClick={addMenuItem} className="btn btn-success" style={{marginTop: "-1vh"}}>Add New Menu Item</button>


      <br /><br />
      <div style={{overflow: "scroll", height: "60vh", width:"95vw", margin: "0px auto 0px auto", border: "3px solid black"}}>
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
                    <td>{editingMenuID === item.menu_item_id ? <input type="text" value={editedData.name} onChange={(e) => setEditedData({ ...editedData, name: e.target.value })} required/> : item.name}</td>
                    <td>{editingMenuID === item.menu_item_id ? <input type="text" value={editedData.price} onChange={(e) => setEditedData({ ...editedData, price: e.target.value })} required/> : item.price}</td>
                    <td style={{maxWidth: "45vw"}}>{item.ingredients.join(", ")}</td>
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
