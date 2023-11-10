import React, { useState } from 'react';
import axios from 'axios';

interface Item {
  ingredient_id: number;
  name: string;
  quantity: number;
  unit: string;
}

const InventoryComponent = () => {
  const starterInventory: Item[] = [
    { ingredient_id: 1, name: 'Item A', quantity: 10, unit: 'kg' },
    { ingredient_id: 2, name: 'Item B', quantity: 5, unit: 'pieces' }
  ];
  const [inventoryData, setInventoryData] = useState<Item[]>(starterInventory);
  const [isLoading, setIsLoading] = useState(false);

  const fetchInventory = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/path-to-your-inventory-endpoint');
      setInventoryData(response.data);
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
