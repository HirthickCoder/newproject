import { CheckCircle2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  // If user comes directly to this page without payment data, redirect to home
  useEffect(() => {
    if (!state?.paymentId) {
      navigate('/');
    }
  }, [navigate, state]);

  if (!state?.paymentId) {
    return null; // Or a loading spinner
  }

  const { paymentId, amount, items = [] } = state;
  const orderNumber = paymentId.substring(paymentId.length - 8).toUpperCase();

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1; // 10% tax rate
  };

  const calculateDeliveryFee = () => {
    return 30; // Fixed delivery fee of ₹30
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateDeliveryFee();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-green-50 px-6 py-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
            <p className="text-gray-600">Thank you for your order</p>
            <p className="text-sm text-gray-500 mt-2">Order #{orderNumber}</p>
            <p className="text-sm text-gray-500">{currentDate}</p>
          </div>

          {/* Order Summary */}
          <div className="px-6 py-8 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900">
                      {item.quantity} x {item.name}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Order Total */}
          <div className="px-6 py-6 bg-gray-50">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Subtotal</span>
                <span className="text-sm font-medium text-gray-900">₹{calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Tax (10%)</span>
                <span className="text-sm font-medium text-gray-900">₹{calculateTax().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Delivery Fee</span>
                <span className="text-sm font-medium text-gray-900">₹{calculateDeliveryFee().toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between">
                <span className="text-base font-medium text-gray-900">Total</span>
                <span className="text-base font-bold text-gray-900">₹{calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Back to Home
            </button>
            <button
              onClick={() => navigate('/orders')}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              View Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}