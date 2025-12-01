// src/pages/Checkout.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { XCircle } from 'lucide-react';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'your_publishable_key_here'
);

const CheckoutForm = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardComplete, setCardComplete] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  // Calculate tax and total
  const tax = cartTotal * 0.18; // 18% tax
  const total = cartTotal + tax;

  useEffect(() => {
    const simulatePaymentIntent = () => {
      try {
        setTimeout(() => {
          setClientSecret(
            'simulated_client_secret_' +
              Math.random().toString(36).substr(2, 9)
          );
        }, 800);
      } catch (err) {
        console.error('Error creating payment intent:', err);
        setError('Failed to initialize payment. Please try again.');
      }
    };

    if (cartItems.length > 0) {
      simulatePaymentIntent();
    } else {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const handleCardChange = (event) => {
    setCardComplete(event.complete);
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      // Simulate payment delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate success
      const paymentId = 'pi_' + Math.random().toString(36).substr(2, 14);

      clearCart();
      navigate('/payment-success', {
        state: {
          paymentId,
          amount: total,
          items: cartItems,
          paymentMethod: 'Visa ending in 1234',
          createdAt: new Date().toISOString(),
        },
      });
    } catch (err) {
      console.error('Payment error:', err);
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">
            Please add items to your cart before checking out.
          </p>
          <button
            onClick={() => navigate('/menu')}
            className="bg-amber-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white shadow-sm sm:rounded-xl overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h1 className="text-2xl font-semibold text-gray-900">Checkout</h1>
            <p className="mt-1 text-sm text-gray-500">
              Enter your payment details to complete your order.
            </p>
          </div>

          <div className="px-6 py-6 sm:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LEFT: Payment Details */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Payment Details
              </h2>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-3 mb-4 rounded">
                  <div className="flex">
                    <XCircle className="h-5 w-5 text-red-400 mt-0.5" />
                    <p className="ml-2 text-sm text-red-700">{error}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Payment method (just one for now) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Method
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`flex-1 border rounded-md px-3 py-2 text-sm font-medium ${
                        paymentMethod === 'card'
                          ? 'border-amber-600 bg-amber-50 text-amber-700'
                          : 'border-gray-300 bg-white text-gray-700'
                      }`}
                    >
                      Card
                    </button>
                  </div>
                </div>

                {/* Card number (Stripe CardElement) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card number
                  </label>
                  <div className="mt-1 rounded-md border border-gray-300 px-3 py-2 bg-white shadow-sm">
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: '15px',
                            color: '#111827',
                            '::placeholder': {
                              color: '#9CA3AF',
                            },
                          },
                          invalid: {
                            color: '#DC2626',
                          },
                        },
                      }}
                      onChange={handleCardChange}
                    />
                  </div>
                </div>

                {/* Expiry + CVC (visual only) */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm
                                 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVC
                    </label>
                    <input
                      type="text"
                      placeholder="CVC"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm
                                 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Pay button */}
                <button
                  type="submit"
                  disabled={!stripe || loading || !cardComplete || !clientSecret}
                  className={`w-full inline-flex justify-center items-center px-4 py-3 rounded-md text-sm font-semibold text-white shadow-sm
                    ${
                      !stripe || loading || !cardComplete || !clientSecret
                        ? 'bg-amber-400 cursor-not-allowed'
                        : 'bg-amber-600 hover:bg-amber-700'
                    }
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500`}
                >
                  {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                </button>
              </form>
            </div>

            {/* RIGHT: Order Summary */}
            <div className="bg-gray-50 rounded-xl p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h3>

              <div className="space-y-3 text-sm">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className="text-gray-800">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 border-t border-gray-200 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (18%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold mt-2 pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <p className="mt-4 text-xs text-gray-500">
                By placing your order, you agree to our Terms &amp; Conditions
                and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;