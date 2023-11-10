import React, { useState } from 'react';
import axios from 'axios';

const InventoryComponent = () => {
  const [inventoryData, setInventoryData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchInventory = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/path-to-your-inventory-endpoint');
      setInventoryData(response.data); // assuming the data is an array of inventory items
    } catch (error) {
      console.error('Failed to fetch inventory:', error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <button onClick={fetchInventory} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'View current inventory'}
      </button>
      {inventoryData && (
        <table>
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
