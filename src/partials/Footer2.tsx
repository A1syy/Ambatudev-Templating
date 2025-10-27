import React from 'react';
// import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer2: React.FC = () => {
  return (
    <footer className="bg-white pb-8 pt-12 text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto px-4">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="mb-4 text-xl font-bold transition-colors duration-300 dark:text-white">
              Elegance
            </h3>
            <p className="mb-4 text-gray-600 transition-colors duration-300 dark:text-gray-400">
              Curated products for the modern lifestyle. Quality, design, and
              functionality in every item.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-500 transition-colors duration-300 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                {/* <Facebook size={20} /> */}
              </a>
              <a
                href="#"
                className="text-gray-500 transition-colors duration-300 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                {/* <Twitter size={20} /> */}
              </a>
              <a
                href="#"
                className="text-gray-500 transition-colors duration-300 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                {/* <Instagram size={20} /> */}
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold transition-colors duration-300 dark:text-white">
              Shop
            </h3>
            <ul className="space-y-2">
              {/* Update each link with transition classes */}
              <li>
                <a
                  href="/products?category=electronics"
                  className="text-gray-600 transition-colors duration-300 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Electronics
                </a>
              </li>
              <li>
                <a
                  href="/products?category=fashion"
                  className="text-gray-600 transition-colors duration-300 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Fashion
                </a>
              </li>
              <li>
                <a
                  href="/products?category=home"
                  className="text-gray-400 transition hover:text-white"
                >
                  Home & Decor
                </a>
              </li>
              <li>
                <a
                  href="/products?category=health"
                  className="text-gray-400 transition hover:text-white"
                >
                  Health & Wellness
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="text-gray-400 transition hover:text-white"
                >
                  All Products
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Company</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/about"
                  className="text-gray-400 transition hover:text-white"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-400 transition hover:text-white"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/careers"
                  className="text-gray-400 transition hover:text-white"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="text-gray-400 transition hover:text-white"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-gray-400 transition hover:text-white"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-gray-400 transition hover:text-white"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                {/* <MapPin size={20} className="text-gray-400 mr-2 mt-1 flex-shrink-0" /> */}
                <span className="text-gray-400">
                  123 Commerce St, Suite 100
                  <br />
                  San Francisco, CA 94103
                </span>
              </li>
              <li className="flex items-center">
                {/* <Phone size={20} className="text-gray-400 mr-2 flex-shrink-0" /> */}
                <a
                  href="tel:+1-800-123-4567"
                  className="text-gray-400 transition hover:text-white"
                >
                  +1 (800) 123-4567
                </a>
              </li>
              <li className="flex items-center">
                {/* <Mail size={20} className="text-gray-400 mr-2 flex-shrink-0" /> */}
                <a
                  href="mailto:support@elegance.com"
                  className="text-gray-400 transition hover:text-white"
                >
                  support@elegance.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter section */}
        <div className="border-t border-gray-200 pb-4 pt-8 transition-colors duration-300 dark:border-gray-800">
          <div className="mx-auto max-w-xl text-center">
            <h3 className="mb-2 text-lg font-semibold transition-colors duration-300 dark:text-white">
              Subscribe to our newsletter
            </h3>
            <p className="mb-4 text-gray-600 transition-colors duration-300 dark:text-gray-400">
              Get the latest updates, exclusive offers, and product news.
            </p>
            <form className="flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                placeholder="Your email address"
                className="grow rounded-md bg-gray-100 px-4 py-2 text-gray-900 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                required
              />
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-600 transition-colors duration-300 dark:border-gray-800 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Elegance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer2;
