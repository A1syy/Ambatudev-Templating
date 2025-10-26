import React from 'react';
import { Link } from 'react-router-dom';
// import { CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';

const OrderSuccessPage: React.FC = () => {
  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-lg mx-auto text-center">
        <div className="flex justify-center mb-6">
          {/*<CheckCircle size={64} className="text-green-500" />*/}
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
        
        <p className="text-lg text-gray-600 mb-4">
          Your order has been received and is now being processed.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold mb-2">Order Details</h2>
          <p className="text-gray-700 mb-1">Order Number: <span className="font-medium">{orderNumber}</span></p>
          <p className="text-gray-700">A confirmation email has been sent to your email address.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button as={Link} to="/products">
            Continue Shopping
          </Button>
          <Button as={Link} to="/account" variant="outline">
            Track Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;