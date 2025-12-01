"use client"

import { useState, useContext, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#1f2937',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSize: '16px',
      '::placeholder': {
        color: '#9ca3af',
      },
    },
    invalid: {
      color: '#ef4444',
      iconColor: '#ef4444',
    },
  },
};

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { cartTotal, clearCart, cartItems: items } = useContext(CartContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [orderNumber, setOrderNumber] = useState('');

  // Generate a random order number when component mounts
  useEffect(() => {
    setOrderNumber(`ORD-${Math.floor(100000 + Math.random() * 900000)}`);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // In a real app, you would create a payment intent on your server
      // For demo purposes, we'll simulate a successful payment
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear cart and navigate to success page
      clearCart();
      navigate('/payment-success');
      
    } catch (err) {
      console.error('Payment error:', err);
      setError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-full max-w-md p-8 md:p-10">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 rounded-full p-4">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
            <p className="text-gray-600 mb-8">Thank you for your order. We've sent a confirmation to your email.</p>

            <div className="bg-gray-50 p-6 rounded-lg mb-8 text-left">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Order Number:</span>
                <span className="font-medium">{orderNumber}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Amount:</span>
                <span className="text-lg font-bold">₹{cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/')}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-md transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Your Order</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Information</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <CardElement 
                options={CARD_ELEMENT_OPTIONS}
                className="p-3 border border-gray-300 rounded-md bg-white"
              />
            </div>
            {error && (
              <div className="mt-3 p-3 bg-red-50 text-red-700 text-sm rounded-md">
                {error}
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-4">
              {items && items.length > 0 ? (items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))) : (
                <p className="text-gray-500 text-center py-4">Your cart is empty</p>
              )}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!stripe || isProcessing || items.length === 0}
            className={`w-full py-3 px-4 rounded-md text-white font-medium ${
              isProcessing 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            } transition-colors`}
          >
            {isProcessing ? 'Processing...' : `Pay Now (₹${cartTotal.toFixed(2)})`}
          </button>
        </form>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h4 className="font-medium text-amber-800 mb-3">Test Card for Demo</h4>
        <div className="grid grid-cols-2 gap-4 text-sm text-amber-700">
          <div className="bg-white p-3 rounded">
            <p className="font-medium">Card Number</p>
            <p className="font-mono">4242 4242 4242 4242</p>
          </div>
          <div className="bg-white p-3 rounded">
            <p className="font-medium">Expiry</p>
            <p>Any future date</p>
          </div>
          <div className="bg-white p-3 rounded">
            <p className="font-medium">CVC</p>
            <p>Any 3 digits</p>
          </div>
          <div className="bg-white p-3 rounded">
            <p className="font-medium">Postal Code</p>
            <p>Any 5 digits</p>
          </div>
        </div>
      </div>
    </div>
  );
}