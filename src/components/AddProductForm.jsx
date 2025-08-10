import { useState } from "react";
import { api } from "../api";


export default function AddProductForm({onProductAdded}) {
  const [form, setForm] = useState({ name: '', sku: '', unit: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.sku || !form.unit) {
      setError("Please fill out all fields.");
      return;
    }
    try {
      const res = await api.post('/products/', form);
      if (res.status === 201) {
        setSuccess(true);
        setForm({ name: '', sku: '', unit: '' });
        onProductAdded();
      }
    } catch (err) {
      setError(err.response?.data?.sku || "Failed to add product.");
    }
  };

  return (
    <form
      className="w-full p-12 border border-gray-200 dark:border-gray-700 shadow-sm dark:bg-gray-900 bg-white transition-all duration-300"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl text-center font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Add New Product
      </h2>

      <div className="space-y-4">
        <input
          name="name"
          required
          minLength={3}
          placeholder="Product Name"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="sku"
          required
          minLength={2}
          placeholder="SKU"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.sku}
          onChange={handleChange}
        />

        <input
          name="unit"
          placeholder="Unit (e.g. pcs)"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.unit}
          onChange={handleChange}
        />
      </div>

      {/* Error / Success Messages */}
      <div className="mt-4">
        {error && <p className="text-md text-red-500">{error}</p>}
        {success && <p className="text-md text-green-500">✅ Product added successfully!</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200"
      >
        Add Product
      </button>
    </form>
  );
}
