import React from 'react';
import { Link } from 'react-router-dom';
// import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import Button from '../components/ui/Button';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const shippingFee = cartItems.length > 0 ? 10 : 0; // Flat rate shipping
  const tax = getCartTotal() * 0.1; // 10% tax for example
  const totalWithTax = getCartTotal() + shippingFee + tax;
  
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="max-w-lg mx-auto">
          {/*<ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />*/}
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/products">
            <Button>
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  // @ts-ignore
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                          <img
                            src={item.imageMain}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <Link
                            to={`/product/${item.id}`}
                            className="text-sm font-medium text-gray-900 hover:text-indigo-600"
                          >
                            {item.name}
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-gray-500 hover:text-indigo-600 focus:outline-none"
                          disabled={item.quantity <= 1}
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M20 12H4"
                            ></path>
                          </svg>
                        </button>
                        <span className="mx-2 text-gray-700 w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-gray-500 hover:text-indigo-600 focus:outline-none"
                          disabled={item.quantity >= item.stock}
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 6v12m6-6H6"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 focus:outline-none"
                      >
                        {/*<Trash2 size={18} />*/}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Cart Actions */}
          <div className="mt-6 flex justify-between">
            <Button variant="outline" to="/products">
              Continue Shopping
            </Button>
            <Button variant="outline" onClick={clearCart} className="text-red-600 border-red-600 hover:bg-red-50">
              Clear Cart
            </Button>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
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
            
            {/* Discount Code */}
            <div className="mb-6">
              <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-1">
                Discount Code
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="discount"
                  className="flex-grow border-gray-300 rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border py-2 px-3"
                  placeholder="Enter code"
                />
                <button className="bg-gray-100 border border-gray-300 rounded-r-md px-4 hover:bg-gray-200">
                  Apply
                </button>
              </div>
            </div>
            
            {/* Checkout Button */}
            <Button 
              as={Link} 
              to="/checkout" 
              fullWidth 
              size="lg"
              className="flex items-center justify-center"
            >
              Proceed to Checkout
              {/*<ArrowRight size={16} className="ml-2" />*/}
            </Button>
            
            {/* Payment Methods */}
            <div className="mt-6 text-center text-xs text-gray-500">
              <p className="mb-2">We accept</p>
              <div className="flex justify-center space-x-2">
                {/* Payment Icons */}
                <div className="w-10 h-6 bg-gray-200 rounded"></div>
                <div className="w-10 h-6 bg-gray-200 rounded"></div>
                <div className="w-10 h-6 bg-gray-200 rounded"></div>
                <div className="w-10 h-6 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;