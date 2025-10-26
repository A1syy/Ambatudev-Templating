import React from 'react';
import { Link } from 'react-router-dom';
// import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Elegance</h3>
            <p className="text-gray-400 mb-4">
              Curated products for the modern lifestyle. Quality, design, and functionality in every item.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                {/*<Facebook size={20} />*/}
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                {/*<Twitter size={20} />*/}
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                {/*<Instagram size={20} />*/}
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=electronics" className="text-gray-400 hover:text-white transition">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/products?category=fashion" className="text-gray-400 hover:text-white transition">
                  Fashion
                </Link>
              </li>
              <li>
                <Link to="/products?category=home" className="text-gray-400 hover:text-white transition">
                  Home & Decor
                </Link>
              </li>
              <li>
                <Link to="/products?category=health" className="text-gray-400 hover:text-white transition">
                  Health & Wellness
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-white transition">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                {/*<MapPin size={20} className="text-gray-400 mr-2 mt-1 flex-shrink-0" />*/}
                <span className="text-gray-400">
                  123 Commerce St, Suite 100<br />
                  San Francisco, CA 94103
                </span>
              </li>
              <li className="flex items-center">
                {/*<Phone size={20} className="text-gray-400 mr-2 flex-shrink-0" />*/}
                <a href="tel:+1-800-123-4567" className="text-gray-400 hover:text-white transition">
                  +1 (800) 123-4567
                </a>
              </li>
              <li className="flex items-center">
                {/*<Mail size={20} className="text-gray-400 mr-2 flex-shrink-0" />*/}
                <a href="mailto:support@elegance.com" className="text-gray-400 hover:text-white transition">
                  support@elegance.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 pt-8 pb-4">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-lg font-semibold mb-2">Subscribe to our newsletter</h3>
            <p className="text-gray-400 mb-4">
              Get the latest updates, exclusive offers, and product news.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 flex-grow rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-white"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Elegance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;