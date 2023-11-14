import React, { useState, useEffect } from "react";
import axios from "axios";

interface MenuItem {
  menu_item_id: number;
  name: string;
  price: number;
}

const MenuComponent = () => {
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Variables for changing data for menu items
  const [addMenuItemName, setAddMenuItemName] = useState("");
  const [addMenuItemPrice, setAddMenuItemPrice] = useState("");
  const [deleteMenuItemName, setDeleteMenuItemName] = useState("");
  const [changeMenuItemName, setChangeMenuItemName] = useState("");
  const [changeMenuItemPrice, setChangeMenuItemPrice] = useState("");

  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-Client-Type": "manager",
    },
  };

  //https://pos-backend-3c6o.onrender.com/api/
  const fetchMenuItems = async () => {
    setIsLoading(true);
    try {
      //const response = await axios.get("http://127.0.0.1:5000/api/manager/get_menu_items", config);
      const response = await axios.get("https://pos-backend-3c6o.onrender.com/api/manager/get_menu_items", config);
      setMenuData(response.data);
      console.log(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch menu items:", error);
      setIsLoading(false);
    }
  }; 

  const addMenuItem = async () => {
    try {
      const response = await axios.post(
        //"http://127.0.0.1:5000/api/manager/add_menu_item",
        'https://pos-backend-3c6o.onrender.com/api/manager/add_menu_item',
        {
          name: addMenuItemName,
          price: addMenuItemPrice,
        },
        config
      );
      console.log(response.data);
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
        'https://pos-backend-3c6o.onrender.com/api/manager/delete_menu_item',
        {
          name: deleteMenuItemName,
        },
        config
      );
      console.log(response.data);
      // Optionally, fetch menu items again to update the list
      fetchMenuItems();
    } catch (error) {
      console.error("Failed to delete menu item:", error);
    }
  };

  const changeMenuItem = async () => {
    try {
      const response = await axios.post(
        //"http://127.0.0.1:5000/api/manager/change_menu_item",
        'https://pos-backend-3c6o.onrender.com/api/manager/change_menu_item',
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

  // useEffect(() => {
  //     fetchMenuItems();
  // }, []);

  return (
    <div>
      <br />
      <p>Add menu item</p>
      <input
        type="text"
        placeholder="Enter item name"
        onChange={(e) => setAddMenuItemName(e.target.value)}
      />
      <input
        type="price"
        placeholder="Enter price"
        onChange={(e) => setAddMenuItemPrice(e.target.value)}
      />
      <button onClick={addMenuItem}>Add</button>

      <br />
      <br />
      <p>Remove menu item</p>
      <input
        type="text"
        placeholder="Enter item name"
        onChange={(e) => setDeleteMenuItemName(e.target.value)}
      />
      <button onClick={deleteMenuItem}>Remove</button>

      <br />
      <br />
      <p>Change menu item price</p>
      <input
        type="text"
        placeholder="Enter item name"
        onChange={(e) => setChangeMenuItemName(e.target.value)}
      />
      <input
        type="price"
        placeholder="Enter price"
        onChange={(e) => setChangeMenuItemPrice(e.target.value)}
      />
      <button onClick={changeMenuItem}>Change</button>
      <br /> <br />
      <button
        onClick={fetchMenuItems}
        disabled={isLoading}
        className="btn btn-secondary"
      >
        {isLoading ? "Loading..." : "View Menu"}
      </button>
      {menuData.length > 0 && (
        <div>
          <br />
          <table className="table table-striped w-100">
            <thead>
              <tr>
                <th>Menu Item</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {menuData.map((item) => (
                <tr key={item.menu_item_id}>
                  <td>{item.name}</td>
                  <td>{item.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MenuComponent;
