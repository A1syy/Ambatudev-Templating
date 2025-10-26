import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { getItemCount } = useCart();
  const { authState, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Change header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const userMenu = document.getElementById('user-menu');
      const userButton = document.getElementById('user-menu-button');

      if (userMenu && userButton && !userMenu.contains(event.target as Node) && !userButton.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-indigo-700">
            Elegance
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-800 hover:text-indigo-600 transition">Home</Link>
            <Link to="/products" className="text-gray-800 hover:text-indigo-600 transition">Products</Link>
            <Link to="/about" className="text-gray-800 hover:text-indigo-600 transition">About</Link>
            <Link to="/contact" className="text-gray-800 hover:text-indigo-600 transition">Contact</Link>
          </nav>

          {/* Search, Cart, and User Actions */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm w-40 lg:w-64 transition-all"
              />
              {/*<Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />*/}
            </form>

            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              {/*<ShoppingCart className="h-6 w-6 text-gray-800 hover:text-indigo-600 transition" />*/}
              {getItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </Link>

            {/* User Account */}
            {authState.isAuthenticated ? (
              <div className="relative">
                <button
                  id="user-menu-button"
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-1 text-gray-800 hover:text-indigo-600 transition"
                >
                  {/*<User className="h-6 w-6" />*/}
                </button>
                {isUserMenuOpen && (
                  <div
                    id="user-menu"
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                  >
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      {authState.user?.name}
                    </div>
                    <Link
                      to="/account"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      My Account
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-gray-800 hover:text-indigo-600 transition flex items-center">
                {/*<User className="h-6 w-6 mr-1" />*/}
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative">
              {/*<ShoppingCart className="h-6 w-6 text-gray-800" />*/}
              {getItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-800"
            >
              {/*{isMobileMenuOpen ? (*/}
              {/*  // <X className="h-6 w-6" />*/}
              {/*) : (*/}
              {/*  // <Menu className="h-6 w-6" />*/}
              {/*)}*/}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg mt-2 pt-4 pb-6 px-4 absolute w-full">
          <form onSubmit={handleSearch} className="relative mb-6">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-full bg-gray-100 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
            {/*<Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />*/}
          </form>

          <nav className="flex flex-col space-y-4">
            <Link
              to="/"
              className="text-gray-800 hover:text-indigo-600 transition py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-800 hover:text-indigo-600 transition py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/about"
              className="text-gray-800 hover:text-indigo-600 transition py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-800 hover:text-indigo-600 transition py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>

            {authState.isAuthenticated ? (
              <>
                <Link
                  to="/account"
                  className="text-gray-800 hover:text-indigo-600 transition py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Account
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left text-gray-800 hover:text-indigo-600 transition py-2"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-gray-800 hover:text-indigo-600 transition py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;