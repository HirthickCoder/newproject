// src/pages/Orders.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

// Mock orders data - in a real app, this would come from an API
const mockOrders = [
  {
    id: 'ORD-12345',
    date: '2023-11-28',
    status: 'delivered',
    items: [
      { id: 1, name: 'Margherita Pizza', quantity: 1, price: 299 },
      { id: 3, name: 'Pasta Carbonara', quantity: 2, price: 249 },
    ],
    total: 797,
    deliveryAddress: '123 Foodie St, Cuisine City, 10001',
  },
  {
    id: 'ORD-12344',
    date: '2023-11-25',
    status: 'preparing',
    items: [
      { id: 2, name: 'Caesar Salad', quantity: 1, price: 199 },
      { id: 4, name: 'Chocolate Lava Cake', quantity: 1, price: 149 },
    ],
    total: 348,
    deliveryAddress: '123 Foodie St, Cuisine City, 10001',
  },
];

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch orders from your API
    const fetchOrders = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setOrders(mockOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'preparing':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
      
      {orders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <p className="text-gray-600">You haven't placed any orders yet.</p>
          <a
            href="/menu"
            className="mt-4 inline-block bg-amber-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors"
          >
            Browse Menu
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Order #{order.id}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0 flex items-center">
                    {getStatusIcon(order.status)}
                    <span className="ml-2 text-sm font-medium">
                      {getStatusText(order.status)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h4 className="font-medium mb-3">Items</h4>
                <ul className="space-y-3">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex justify-between">
                      <span>
                        {item.quantity} × {item.name}
                      </span>
                      <span>₹{item.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>₹{order.total}</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-medium mb-2">Delivery Address</h4>
                  <p className="text-gray-600">{order.deliveryAddress}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}