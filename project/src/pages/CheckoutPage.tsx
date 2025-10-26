import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { ChevronLeft, CreditCard, Truck, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { authState } = useAuth();
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  
  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: authState.user?.name?.split(' ')[0] || '',
    lastName: authState.user?.name?.split(' ')[1] || '',
    email: authState.user?.email || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: ''
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardName: '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvv: ''
  });
  
  // Shipping and tax calculations
  const shippingFee = cartItems.length > 0 ? 10 : 0;
  const tax = getCartTotal() * 0.1;
  const totalWithTax = getCartTotal() + shippingFee + tax;
  
  // Handle shipping form submission
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
    window.scrollTo(0, 0);
  };
  
  // Handle payment form submission
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('confirmation');
    window.scrollTo(0, 0);
  };
  
  // Handle completing order
  const handleCompleteOrder = () => {
    // In a real app, we would process the order here
    clearCart();
    navigate('/order-success');
  };
  
  // Update shipping info
  const updateShippingInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };
  
  // Update payment info
  const updatePaymentInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({ ...prev, [name]: value }));
  };

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">You need to add products to your cart before checkout.</p>
          <Link to="/products">
            <Button>Shop Now</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-24">
      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div className="flex-1 relative">
            <div className={`h-1 bg-${step === 'shipping' || step === 'payment' || step === 'confirmation' ? 'indigo-600' : 'gray-300'}`}></div>
            {/*<div className={`absolute top-0 left-0 w-6 h-6 -mt-2.5 rounded-full flex items-center justify-center ${step === 'shipping' || step === 'payment' || step === 'confirmation' ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-500'}`}>*/}
            {/*  {step === 'shipping' ? '1' : <Check size={14} />}*/}
            {/*</div>*/}
          </div>
          <div className="flex-1 relative">
            <div className={`h-1 bg-${step === 'payment' || step === 'confirmation' ? 'indigo-600' : 'gray-300'}`}></div>
            <div className={`absolute top-0 left-1/2 w-6 h-6 -mt-2.5 -ml-3 rounded-full flex items-center justify-center ${step === 'payment' || step === 'confirmation' ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-500'}`}>
              {/*{step === 'payment' ? '2' : step === 'confirmation' ? <Check size={14} /> : '2'}*/}
            </div>
          </div>
          <div className="flex-1 relative">
            <div className={`h-1 bg-${step === 'confirmation' ? 'indigo-600' : 'gray-300'}`}></div>
            <div className={`absolute top-0 right-0 w-6 h-6 -mt-2.5 rounded-full flex items-center justify-center ${step === 'confirmation' ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-500'}`}>
              3
            </div>
          </div>
        </div>
        <div className="flex justify-between text-xs mt-2">
          <div className={`${step === 'shipping' ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>Shipping</div>
          <div className={`${step === 'payment' ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>Payment</div>
          <div className={`${step === 'confirmation' ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>Confirmation</div>
        </div>
      </div>
      
      {/* Checkout Content */}
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          {step === 'shipping' ? (
            <Link to="/cart" className="text-gray-600 hover:text-indigo-600 flex items-center text-sm">
              {/*<ChevronLeft size={16} />*/}
              <span>Back to Cart</span>
            </Link>
          ) : (
            <button
              onClick={() => setStep(step === 'payment' ? 'shipping' : 'payment')}
              className="text-gray-600 hover:text-indigo-600 flex items-center text-sm"
            >
              {/*<ChevronLeft size={16} />*/}
              <span>Back to {step === 'payment' ? 'Shipping' : 'Payment'}</span>
            </button>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Checkout Form */}
          <div className="md:w-2/3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              {/* Shipping Information */}
              {step === 'shipping' && (
                <>
                  <div className="flex items-center mb-6">
                    {/*<Truck className="w-5 h-5 text-indigo-600 mr-2" />*/}
                    <h2 className="text-lg font-semibold">Shipping Information</h2>
                  </div>
                  
                  <form onSubmit={handleShippingSubmit}>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Input
                        label="First Name"
                        name="firstName"
                        value={shippingInfo.firstName}
                        onChange={updateShippingInfo}
                        required
                      />
                      <Input
                        label="Last Name"
                        name="lastName"
                        value={shippingInfo.lastName}
                        onChange={updateShippingInfo}
                        required
                      />
                      <Input
                        label="Email"
                        name="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={updateShippingInfo}
                        required
                        className="sm:col-span-2"
                      />
                      <Input
                        label="Address"
                        name="address"
                        value={shippingInfo.address}
                        onChange={updateShippingInfo}
                        required
                        className="sm:col-span-2"
                      />
                      <Input
                        label="City"
                        name="city"
                        value={shippingInfo.city}
                        onChange={updateShippingInfo}
                        required
                      />
                      <Input
                        label="State/Province"
                        name="state"
                        value={shippingInfo.state}
                        onChange={updateShippingInfo}
                        required
                      />
                      <Input
                        label="Zip/Postal Code"
                        name="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={updateShippingInfo}
                        required
                      />
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <select
                          name="country"
                          value={shippingInfo.country}
                          onChange={(e) => setShippingInfo(prev => ({ ...prev, country: e.target.value }))}
                          className="px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                          required
                        >
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Australia">Australia</option>
                        </select>
                      </div>
                      <Input
                        label="Phone"
                        name="phone"
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={updateShippingInfo}
                        required
                      />
                    </div>
                    
                    <div className="mt-6">
                      <Button type="submit" fullWidth>
                        Continue to Payment
                      </Button>
                    </div>
                  </form>
                </>
              )}

              {/* Payment Information */}
              {step === 'payment' && (
                <>
                  <div className="flex items-center mb-6">
                    {/*<CreditCard className="w-5 h-5 text-indigo-600 mr-2" />*/}
                    <h2 className="text-lg font-semibold">Payment Information</h2>
                  </div>
                  
                  <form onSubmit={handlePaymentSubmit}>
                    <div className="space-y-4">
                      <Input
                        label="Name on Card"
                        name="cardName"
                        value={paymentInfo.cardName}
                        onChange={updatePaymentInfo}
                        required
                      />
                      <Input
                        label="Card Number"
                        name="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={updatePaymentInfo}
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Exp Month
                          </label>
                          <select
                            name="expMonth"
                            value={paymentInfo.expMonth}
                            onChange={(e) => setPaymentInfo(prev => ({ ...prev, expMonth: e.target.value }))}
                            className="px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                            required
                          >
                            <option value="">Month</option>
                            {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                              <option key={month} value={month.toString().padStart(2, '0')}>
                                {month.toString().padStart(2, '0')}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-span-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Exp Year
                          </label>
                          <select
                            name="expYear"
                            value={paymentInfo.expYear}
                            onChange={(e) => setPaymentInfo(prev => ({ ...prev, expYear: e.target.value }))}
                            className="px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                            required
                          >
                            <option value="">Year</option>
                            {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                              <option key={year} value={year.toString()}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </div>
                        <Input
                          label="CVV"
                          name="cvv"
                          value={paymentInfo.cvv}
                          onChange={updatePaymentInfo}
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button type="submit" fullWidth>
                        Review Order
                      </Button>
                    </div>
                  </form>
                </>
              )}

              {/* Order Confirmation */}
              {step === 'confirmation' && (
                <>
                  <h2 className="text-lg font-semibold mb-6">Review Your Order</h2>
                  
                  <div className="border-b border-gray-200 pb-6 mb-6">
                    <h3 className="font-medium mb-2">Shipping Information</h3>
                    <p className="text-gray-600">
                      {shippingInfo.firstName} {shippingInfo.lastName}<br />
                      {shippingInfo.address}<br />
                      {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}<br />
                      {shippingInfo.country}<br />
                      {shippingInfo.phone}
                    </p>
                  </div>
                  
                  <div className="border-b border-gray-200 pb-6 mb-6">
                    <h3 className="font-medium mb-2">Payment Method</h3>
                    <p className="text-gray-600 flex items-center">
                      {/*<CreditCard size={16} className="mr-2" />*/}
                      Credit Card ending in {paymentInfo.cardNumber.slice(-4)}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Order Items</h3>
                    <ul className="divide-y divide-gray-200">
                      {cartItems.map(item => (
                        <li key={item.id} className="py-3 flex justify-between">
                          <div className="flex items-center">
                            <img
                              src={item.imageMain}
                              alt={item.name}
                              className="h-16 w-16 object-cover rounded"
                            />
                            <div className="ml-3">
                              <p className="text-sm font-medium">{item.name}</p>
                              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-6">
                    <Button onClick={handleCompleteOrder} fullWidth>
                      Place Order (${totalWithTax.toFixed(2)})
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="md:w-1/3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                  <span className="text-gray-900 font-medium">${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900 font-medium">${shippingFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900 font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="text-gray-900 font-bold">Total</span>
                  <span className="text-indigo-600 font-bold">${totalWithTax.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-medium mb-2 text-sm">Order Items</h3>
                <ul className="space-y-2">
                  {cartItems.map(item => (
                    <li key={item.id} className="flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <span>{item.name} x {item.quantity}</span>
                      </div>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;