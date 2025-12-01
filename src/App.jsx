// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import PaymentSuccess from './pages/PaymentSuccess';
import DuplicatePayment from './pages/DuplicatePayment';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './index.css';

import { useEffect } from 'react';

function App() {
  useEffect(() => {
    console.log('App component mounted');
    return () => console.log('App component unmounted');
  }, []);

  console.log('App rendering...');

  return (
    <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <div className="bg-blue-50 p-4 mb-4 rounded-lg">
              {/* <p className="text-blue-800"></p> */}
            </div>
            <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/menu" element={<Menu />} />
             <Route path="/cart" element={<Cart />} />
             <Route path="/checkout" element={<Checkout />} />
             <Route path="/payment-success" element={<PaymentSuccess />} />
             <Route path="/duplicate-payment" element={<DuplicatePayment />} />
             <Route path="/orders" element={<Orders />} />
             <Route path="/login" element={<Login />} />
             <Route path="/signup" element={<Signup />} />
             <Route path="*" element={<Home />} />
           </Routes>
          </main>
        </div>
      </CartProvider>
  );
}

export default App;