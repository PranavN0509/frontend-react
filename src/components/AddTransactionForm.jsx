import React, { useState, useEffect, useMemo } from 'react';
import { api } from "../api";

function AddTransactionForm({ onInventoryUpdate }) {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [type, setType] = useState('IN');
    const [item, setItem] = useState({ productId: '', productName: '', quantity: '' });
    const [itemsList, setItemsList] = useState([]);
    // const [items, setItems] = useState([{ product: '', quantity: '' }]);
    const [products, setProducts] = useState([]);

    const productMap = useMemo(() => {
        const map = new Map();
        products.forEach(p => map.set(p.id.toString(), p.name));
        return map;
    }, [products]);

    useEffect(() => {
        api.get('/products/').then(res => setProducts(res.data));
    }, []);


    const addRow = (e) => {
        e.preventDefault();
        if (!item.productId || !item.quantity) {
            setError("Please select a product and enter appropriate quantity.");
            setItem({ productId: '', productName: '', quantity: '' });
            return;
        }

        // Validate quantity is a positive number
        if (isNaN(item.quantity) || parseInt(item.quantity) <= 0) {
            setError("Quantity must be a positive number.");
            setItem({ productId: '', productName: '', quantity: '' });
            return;
        }
        setItemsList([...itemsList, { productId: item.productId, productName: item.productName, quantity: item.quantity }]);
        setItem({ productId: '', productName: '', quantity: '' });
    };

    const submit = async (e) => {
        e.preventDefault();
        if (!type) {
            setError("Transaction type is required.");
            setItem({ productId: '', productName: '', quantity: '' });
            setItemsList([]);
            return;
        }

        if (itemsList.length === 0) {
            setError("You must add at least one item.");
            setItem({ productId: '', productName: '', quantity: '' });
            setItemsList([]);
            return;
        }

        for (const i of itemsList) {
            if (!i.productId || !i.quantity) {
                setError("Each item must have a product and quantity.");
                setItem({ productId: '', productName: '', quantity: '' });
                setItemsList([])
                return;
            }

            if (isNaN(i.quantity) || parseInt(i.quantity) <= 0) {
                setItem({ productId: '', productName: '', quantity: '' });
                setItemsList([]);
                setError("Quantity must be a positive number.");
                return;
            }
        }
        try {
            const payload = {
                transaction_type: type,
                reference: 'manual',
                details: itemsList.map(i => ({
                    product: i.productId,
                    quantity: parseInt(i.quantity),
                }))
            };

            const response = await api.post('/transactions/', payload);
            if (response.status === 201) {
                setSuccess(true);
                setItem({ productId: '', productName: '', quantity: '' });
                setItemsList([]);
                onInventoryUpdate();
            }
        } catch (error) {
            setItem({ productId: '', productName: '', quantity: '' });
            setItemsList([]);
            setError("Failed to add transaction")
            console.error("Submission error:", error);
        }
    };

    return (
        <div className="min-h-90 bg-gray-50 dark:bg-gray-950 p-6 transition-all">
            <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Add Transaction</h2>

                {/* Type Selector */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Transaction Type
                    </label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="IN">IN</option>
                        <option value="OUT">OUT</option>
                    </select>
                </div>

                <h3 className="text-center text-sm text-gray-600 dark:text-gray-300 mb-4">
                    All Items for Entry: <span className="font-semibold">{type}</span>
                </h3>

                {/* Add Item Form */}
                <form className="flex flex-wrap gap-4 items-end mb-6">
                    <div className="flex-1 min-w-[150px]">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Select Product
                        </label>
                        <select
                            value={item.productId}
                            onChange={(e) => {
                                const pName = productMap.get(e.target.value);
                                setItem({ ...item, productId: e.target.value, productName: pName });
                            }}
                            className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Product</option>
                            {products.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="min-w-[100px]">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Quantity
                        </label>
                        <input
                            type="number"
                            placeholder="Qty"
                            value={item.quantity}
                            onChange={(e) => setItem({ ...item, quantity: e.target.value })}
                            required
                            className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={addRow}
                        className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 px-4 py-2 rounded-md transition"
                    >
                        + Add Item
                    </button>
                </form>

                {/* Items List */}
                <div className="mb-6">
                    <h4 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-2">Items to Submit</h4>
                    {itemsList.length === 0 ? (
                        <p className="text-sm text-gray-600 dark:text-gray-400">No items added yet.</p>
                    ) : (
                        <div className="space-y-2">
                            {itemsList.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex gap-4 text-sm text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-md"
                                >
                                    <div className="flex-1">{item.productName}</div>
                                    <div>{item.quantity}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="my-6">
                    {error && <p className="text-md text-red-500">{error}</p>}
                    {success && <p className="text-md text-green-500">💾 Transaction has been added to the inventory.</p>}
                </div>

                {/* Submit Button */}
                <div className="w-full">
                    <button
                        onClick={submit}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-md transition"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>

    );
}

export default AddTransactionForm;