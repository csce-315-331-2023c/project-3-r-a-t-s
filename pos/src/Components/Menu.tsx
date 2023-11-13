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

  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-Client-Type": "manager",
    },
  };

  const fetchMenuItems = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/manager/get_menu_items", config);
      setMenuData(response.data);
      console.log(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch menu items:", error);
      setIsLoading(false);
    }
  };

    // useEffect(() => {
    //     fetchMenuItems();
    // }, []);

  return (
    <div>
      <button onClick={fetchMenuItems} disabled={isLoading} className="btn btn-secondary">
        {isLoading ? "Loading..." : "View Menu"}
      </button>
      {menuData.length > 0 && ( 
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
      )}
    </div>
  );
};

export default MenuComponent;
