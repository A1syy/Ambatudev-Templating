import { useState, useEffect } from 'react';
import { GradientText } from 'astro-boilerplate-components';
import { getFeaturedProducts } from '../services/productService';
import type { Product } from '../utils/types';

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const result = await getFeaturedProducts();
        const productsWithImages = result.map(product => ({
          ...product,
          imageMain: product.imageMain || 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        }));
        setProducts(productsWithImages.slice(0, 4));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Featured <GradientText>Products</GradientText>
        </h2>
        <a
          href="/products"
          className="flex items-center gap-1 font-medium text-indigo-600 transition hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          View all
          <svg
            className="ml-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </a>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading ? (
          Array(4).fill(null).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700"
              style={{ height: '400px' }}
            />
          ))
        ) : products.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
            No featured products available
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="group relative overflow-hidden rounded-lg bg-white shadow-sm transition-shadow duration-300 hover:shadow-md dark:bg-gray-800"
            >
              <a
                href={`/product/${product.id}`}
                className="relative block h-64 overflow-hidden"
              >
                <img
                  src={product.imageMain}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </a>

              <div className="p-4">
                <div className="mb-1 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  {product.category}
                </div>

                <h3 className="mb-1 text-lg font-medium leading-tight text-gray-900 dark:text-gray-100">
                  <a
                    href={`/product/${product.id}`}
                    className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    {product.name}
                  </a>
                </h3>

                <div className="mt-2 flex items-center justify-between">
                  <span className="font-bold text-gray-900 dark:text-gray-100">
                    ${product.price.toFixed(2)}
                  </span>
                  <button className="rounded-md border border-gray-300 px-4 py-2 text-sm opacity-0 transition-opacity hover:bg-gray-50 group-hover:opacity-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export { FeaturedProducts };
