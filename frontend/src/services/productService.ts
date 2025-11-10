import { API_URL } from '../utils/config';
import type { Product } from '../utils/types';

/**
 * Get all products
 * @returns Promise of array of all products
 */
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_URL}/product`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

/**
 * Get featured products for the homepage
 * @returns Promise of array of featured products
 */
export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const products = await getAllProducts();
    return products.filter((product) => product.featured);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
};

/**
 * Get products by category
 * @param category The category to filter by
 * @returns Promise of array of products in the specified category
 */
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const products = await getAllProducts();
    return products.filter((product) => product.category === category);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
};

/**
 * Search products by name or description
 * @param query The search query
 * @returns Promise of array of products matching the search query
 */
export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    const products = await getAllProducts();
    const lowerCaseQuery = query.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerCaseQuery) ||
        product.description.toLowerCase().includes(lowerCaseQuery)
    );
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
};

/**
 * Get a product by ID
 * @param id The product ID
 * @returns Promise of the product or undefined if not found
 */
export const getProductById = async (id: string): Promise<Product | undefined> => {
  try {
    const response = await fetch(`${API_URL}/product/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return undefined;
  }
};

/**
 * Get all categories
 * @returns Promise of array of unique categories
 */
export const getCategories = async (): Promise<string[]> => {
  try {
    const products = await getAllProducts();
    const categories = products.map((product: Product) => product.category);
    return Array.from(new Set(categories));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};
