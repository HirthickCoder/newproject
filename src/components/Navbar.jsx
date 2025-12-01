// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-amber-600">
              FoodieHub
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link to="/menu" className="text-gray-700 hover:text-amber-600 px-3 py-2 text-sm font-medium">
                Menu
              </Link>
              {user && (
                <Link to="/orders" className="text-gray-700 hover:text-amber-600 px-3 py-2 text-sm font-medium">
                  My Orders
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-amber-600">
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">Hi, {user.name}</span>
                <button
                  onClick={logout}
                  className="p-2 text-gray-700 hover:text-amber-600"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-amber-600 hover:bg-amber-50 rounded-md"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}