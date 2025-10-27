import React, { useEffect, useState } from 'react';

import ProductGrid from '@/components/products/ProductGrid';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import {
  getAllProducts,
  getCategories,
  getProductsByCategory,
  searchProducts,
} from '@/services/productService';
import type { Product } from '@/utils/types';

const ProductListingPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 1000,
  });
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Ambil query params di client (hindari SSR error)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const queryParams = new URLSearchParams(window.location.search);
      const categoryParam = queryParams.get('category');
      const searchParam = queryParams.get('search');
      if (categoryParam) setSelectedCategory(categoryParam);
      if (searchParam) setSearchQuery(searchParam);
    }
  }, []);

  // Initialize data
  useEffect(() => {
    const allProducts = getAllProducts();
    setProducts(allProducts);
    setCategories(getCategories());

    if (allProducts.length > 0) {
      const prices = allProducts.map((p) => p.price);
      const minPrice = Math.floor(Math.min(...prices));
      const maxPrice = Math.ceil(Math.max(...prices));
      setPriceRange({ min: minPrice, max: maxPrice });
    }
  }, []);

  // Handle filtering and sorting
  useEffect(() => {
    let result = [...products];
    if (selectedCategory) result = getProductsByCategory(selectedCategory);
    if (searchQuery) result = searchProducts(searchQuery);

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
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    setFilteredProducts(result);
  }, [products, selectedCategory, searchQuery, sortBy]);

  // Update URL query string tanpa reload
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams();
      if (selectedCategory) params.set('category', selectedCategory);
      if (searchQuery) params.set('search', searchQuery);
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState(null, '', newUrl);
    }
  }, [selectedCategory, searchQuery]);

  const handleSearch = (e: React.FormEvent) => e.preventDefault();
  const clearFilters = () => {
    setSelectedCategory('');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="container mx-auto px-4 text-gray-900 transition-colors duration-300 dark:text-gray-100">
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Mobile Filters Toggle */}
        <div className="w-full md:hidden">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex w-full items-center justify-between rounded-lg bg-gray-100 px-4 py-2 transition-colors dark:bg-gray-800"
          >
            <span className="flex items-center">Filters</span>
          </button>
        </div>

        {/* Sidebar Filters */}
        <div
          className={`shrink-0 md:w-64 ${
            filtersOpen ? 'block' : 'hidden md:block'
          }`}
        >
          <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
              Filters
            </h2>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="mb-2 font-medium text-gray-800 dark:text-gray-200">
                Categories
              </h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="all-categories"
                    name="category"
                    checked={selectedCategory === ''}
                    onChange={() => setSelectedCategory('')}
                    className="mr-2 accent-indigo-500"
                  />
                  <label
                    htmlFor="all-categories"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    All Categories
                  </label>
                </div>
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      type="radio"
                      id={`category-${category}`}
                      name="category"
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                      className="mr-2 accent-indigo-500"
                    />
                    <label
                      htmlFor={`category-${category}`}
                      className="capitalize text-gray-700 dark:text-gray-300"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="mb-2 font-medium text-gray-800 dark:text-gray-200">
                Price Range
              </h3>
              <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                <span>${priceRange.min}</span>
                <input
                  type="range"
                  min={priceRange.min}
                  max={priceRange.max}
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange({
                      ...priceRange,
                      max: Number(e.target.value),
                    })
                  }
                  className="w-full accent-indigo-500"
                />
                <span>${priceRange.max}</span>
              </div>
            </div>

            {/* Clear Filters */}
            <Button
              onClick={clearFilters}
              variant="outline"
              fullWidth
              className="dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grow">
          <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {selectedCategory
                ? `${
                    selectedCategory.charAt(0).toUpperCase() +
                    selectedCategory.slice(1)
                  } Products`
                : 'All Products'}
            </h1>

            <div className="flex w-full items-center gap-4 sm:w-auto">
              {/* Search */}
              <form onSubmit={handleSearch} className="relative grow sm:grow-0">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full bg-white py-2 pl-10 pr-4 text-gray-900 placeholder:text-gray-500 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400 sm:w-64"
                />
              </form>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none rounded-md border border-gray-300 bg-white py-2 pl-3 pr-8 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-400 dark:bg-gray-800 dark:text-gray-100"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            Showing {filteredProducts.length} products
          </p>

          {/* Product Grid */}
          <ProductGrid
            products={filteredProducts}
            emptyMessage={
              searchQuery
                ? `No products found matching "${searchQuery}"`
                : 'No products found in this category.'
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
