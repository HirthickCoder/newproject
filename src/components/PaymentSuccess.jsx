// src/pages/PaymentSuccess.jsx
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Data passed from Checkout.jsx
  const {
    amount,
    paymentId,
    paymentMethod = 'Visa ending in 1234',
    createdAt = new Date().toISOString(),
  } = location.state || {};

  const formattedDate = new Date(createdAt).toLocaleString('en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl max-w-md w-full p-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
            <CheckCircle className="w-9 h-9 text-emerald-500" />
          </div>

          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            Payment Successful
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Thank you for your payment. Your order is being processed.
          </p>
        </div>

        <div className="border-t border-gray-200 pt-4 mt-2 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Amount Paid:</span>
            <span className="font-medium text-gray-900">
              ${amount ? amount.toFixed(2) : '0.00'}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Payment Method:</span>
            <span className="font-medium text-gray-900 text-right">
              {paymentMethod}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Date &amp; Time:</span>
            <span className="font-medium text-gray-900 text-right">
              {formattedDate}
            </span>
          </div>

          {paymentId && (
            <div className="flex justify-between">
              <span className="text-gray-500">Payment ID:</span>
              <span className="font-medium text-gray-900 text-right">
                {paymentId}
              </span>
            </div>
          )}
        </div>

        <button
          onClick={() => navigate('/orders')}
          className="mt-6 w-full inline-flex justify-center items-center px-4 py-2.5
                     bg-gray-900 text-white text-sm font-medium rounded-md
                     hover:bg-gray-800 transition-colors"
        >
          View Order History
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;