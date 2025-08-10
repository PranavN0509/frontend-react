import { useEffect, useState } from "react";
import { api } from "../api";

export default function ProductList({refreshProducts}) {
  const [products, setProducts] = useState([]);
  console.log(refreshProducts)

  useEffect(() => {
    api.get('/products/').then(res => setProducts(res.data));
  }, [refreshProducts]);

  return (
    <>
      {
        products.length > 0 &&
        (<div className="px-[3rem] w-full min-h-90 flex flex-col items-center justify-center dark:bg-gray-900 bg-white">
          <h1 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
            Product List
          </h1>

          <div className="w-full h-full overflow-x-auto border border-gray-200 dark:border-gray-700 shadow-sm">
            <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900 text-sm">
              <thead className="w-full bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    SKU
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Unit
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-950 transition-colors">
                    <td className="px-6 py-4 text-center text-gray-700 dark:text-gray-200">{p.id}</td>
                    <td className="px-6 py-4 text-center text-gray-700 dark:text-gray-200">{p.name}</td>
                    <td className="px-6 py-4 text-center text-gray-700 dark:text-gray-200">{p.sku}</td>
                    <td className="px-6 py-4 text-center text-gray-700 dark:text-gray-200">{p.unit}</td>
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
