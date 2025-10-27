import productsData from '../data/products.json';
import type { Product } from '../utils/types';

/**
 * Get all products
 * @returns Array of all products
 */
export const getAllProducts = (): Product[] => {
  return productsData.products;
};

/**
 * Get featured products for the homepage
 * @returns Array of featured products
 */
export const getFeaturedProducts = (): Product[] => {
  return productsData.products.filter((product) => product.featured);
};

/**
 * Get products by category
 * @param category The category to filter by
 * @returns Array of products in the specified category
 */
export const getProductsByCategory = (category: string): Product[] => {
  return productsData.products.filter(
    (product) => product.category === category
  );
};

/**
 * Search products by name or description
 * @param query The search query
 * @returns Array of products matching the search query
 */
export const searchProducts = (query: string): Product[] => {
  const lowerCaseQuery = query.toLowerCase();
  return productsData.products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerCaseQuery) ||
      product.description.toLowerCase().includes(lowerCaseQuery)
  );
};

/**
 * Get a product by ID
 * @param id The product ID
 * @returns The product or undefined if not found
 */
export const getProductById = (id: number): Product | undefined => {
  return productsData.products.find((product) => product.id === id);
};

/**
 * Get unique product categories
 * @returns Array of unique categories
 */
export const getCategories = (): string[] => {
  const categories = productsData.products.map((product) => product.category);
  return [...new Set(categories)];
};
