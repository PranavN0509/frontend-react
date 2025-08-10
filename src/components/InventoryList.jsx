// InventoryList.jsx
import React, { useEffect, useState } from 'react';
import { api } from "../api";

function InventoryList({refreshInventory}) {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    api.get('/inventory/').then(res => setInventory(res.data));
  }, [refreshInventory]);

  return (
    <>
      {inventory.length > 0 &&
        (<div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 transition-all">
          <h2 className="text-2xl text-center font-semibold mb-6 text-gray-800 dark:text-gray-100">
            Inventory
          </h2>

          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <table className="min-w-full text-sm divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">
                    SKU
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">
                    Unit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">
                    Stock
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {inventory.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-200">{item.name}</td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-200">{item.sku}</td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-200">{item.unit}</td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-200">{item.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>)
      }
    </>
  );
}

export default InventoryList;