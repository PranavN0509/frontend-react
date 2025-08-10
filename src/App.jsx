import { useState, useEffect } from 'react'
import AddProductForm from './components/AddProductForm';
import ProductList from './components/ProductList';
import AddTransactionForm from './components/AddTransactionForm';
import InventoryList from './components/InventoryList';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/navbar';

function App() {
  const [refreshProducts, setRefreshProducts] = useState(false);
  const handleProductAdded = () => {
    setRefreshProducts(prev => !prev); // toggles state to trigger useEffect in ProductList
  };
  const [refreshInventory, setRefreshInventory] = useState(false);
  const handleInventoryAdded = () => {
    setRefreshInventory(prev => !prev); // toggles state to trigger useEffect in ProductList
  };
  return (
    <Router>

      {/* <> */}
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <AddProductForm onProductAdded={handleProductAdded}/>
            <ProductList refreshProducts={refreshProducts} />
          </>
        }
        />
        <Route path="/inventory" element={
          <>
            <Navbar />
            <AddTransactionForm onInventoryUpdate={handleInventoryAdded}/>
            <InventoryList refreshInventory={refreshInventory}/>
          </>
        }
        />
      </Routes>
      {/* </> */}
    </Router>
  );
}

export default App;
