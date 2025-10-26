import React, { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real app, this would connect to an API
      console.log('Subscribing email:', email);
      setSubscribed(true);
      setEmail('');
      
      // Reset the subscribed message after 5 seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }
  };
  
  return (
    <section className="py-20 bg-indigo-700 relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Stay in Touch</h2>
          <p className="text-indigo-200 mb-8">
            Subscribe to our newsletter and be the first to know about new products, exclusive offers, and helpful tips.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/90 py-3"
              fullWidth
            />
            <Button type="submit" variant="secondary" size="lg">
              Subscribe
            </Button>
          </form>
          
          {subscribed && (
            <div className="mt-4 text-white bg-emerald-500 rounded py-2 px-4 inline-block transition-opacity">
              Thank you for subscribing!
            </div>
          )}
          
          <p className="text-indigo-200 text-sm mt-4">
            We respect your privacy and will never share your information.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;