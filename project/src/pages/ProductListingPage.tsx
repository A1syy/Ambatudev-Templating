import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import { ChevronDown, Filter, Search } from 'lucide-react';
import ProductGrid from '../components/products/ProductGrid';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { getAllProducts, getProductsByCategory, searchProducts, getCategories } from '../services/productService';
import { Product } from '../utils/types';

const ProductListingPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');
  const searchParam = queryParams.get('search');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || '');
  const [searchQuery, setSearchQuery] = useState<string>(searchParam || '');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [priceRange, setPriceRange] = useState<{min: number, max: number}>({min: 0, max: 1000});
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  // Initialize data
  useEffect(() => {
    const allProducts = getAllProducts();
    setProducts(allProducts);
    setCategories(getCategories());
    
    // Set price range based on actual product prices
    const prices = allProducts.map(p => p.price);
    const minPrice = Math.floor(Math.min(...prices));
    const maxPrice = Math.ceil(Math.max(...prices));
    setPriceRange({min: minPrice, max: maxPrice});
  }, []);
  
  // Handle filtering and sorting changes
  useEffect(() => {
    let result = [...products];
    
    // Filter by category if selected
    if (selectedCategory) {
      result = getProductsByCategory(selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      result = searchProducts(searchQuery);
    }
    
    // Sort products
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Default sorting (featured)
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    
    setFilteredProducts(result);
  }, [products, selectedCategory, searchQuery, sortBy]);
  
  // Update URL with filters
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    if (searchQuery) params.set('search', searchQuery);
    
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, '', newUrl);
  }, [selectedCategory, searchQuery]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled via the searchQuery state and useEffect
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Mobile Filters Toggle */}
        <div className="md:hidden w-full">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="w-full py-2 px-4 bg-gray-100 rounded-lg flex items-center justify-between"
          >
            <span className="flex items-center">
              {/*<Filter size={18} className="mr-2" />*/}
              Filters
            </span>
            {/*<ChevronDown*/}
            {/*  size={18}*/}
            {/*  className={`transition-transform ${filtersOpen ? 'rotate-180' : ''}`}*/}
            {/*/>*/}
          </button>
        </div>
        
        {/* Sidebar Filters */}
        <div className={`
          md:w-64 flex-shrink-0
          ${filtersOpen ? 'block' : 'hidden md:block'}
        `}>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            
            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Categories</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="all-categories"
                    name="category"
                    checked={selectedCategory === ''}
                    onChange={() => setSelectedCategory('')}
                    className="mr-2"
                  />
                  <label htmlFor="all-categories">All Categories</label>
                </div>
                {categories.map(category => (
                  <div key={category} className="flex items-center">
                    <input
                      type="radio"
                      id={`category-${category}`}
                      name="category"
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                      className="mr-2"
                    />
                    <label htmlFor={`category-${category}`} className="capitalize">{category}</label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Price Range (simplified for this demo) */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Price Range</h3>
              <div className="flex items-center space-x-2">
                <span>${priceRange.min}</span>
                <input
                  type="range"
                  min={priceRange.min}
                  max={priceRange.max}
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({...priceRange, max: Number(e.target.value)})}
                  className="w-full"
                />
                <span>${priceRange.max}</span>
              </div>
            </div>
            
            {/* Clear Filters */}
            <Button 
              onClick={clearFilters}
              variant="outline"
              fullWidth
            >
              Clear Filters
            </Button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-grow">
          <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              {selectedCategory ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products` : 'All Products'}
            </h1>
            
            <div className="flex items-center gap-4 w-full sm:w-auto">
              {/* Search */}
              <form onSubmit={handleSearch} className="relative grow sm:grow-0">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-full w-full sm:w-64"
                />
                {/*<Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />*/}
              </form>
              
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name</option>
                  <option value="rating">Rating</option>
                </select>
                {/*<ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-gray-500 pointer-events-none" />*/}
              </div>
            </div>
          </div>
          
          {/* Results Count */}
          <p className="mb-6 text-gray-600">
            Showing {filteredProducts.length} products
          </p>
          
          {/* Product Grid */}
          <ProductGrid 
            products={filteredProducts} 
            emptyMessage={
              searchQuery 
                ? `No products found matching "${searchQuery}"` 
                : "No products found in this category."
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;