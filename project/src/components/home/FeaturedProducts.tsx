import React, { useEffect, useState } from 'react';
// import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../../utils/types';
import { getFeaturedProducts } from '../../services/productService';
import ProductGrid from '../products/ProductGrid';

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch featured products
    const fetchProducts = () => {
      try {
        const featuredProducts = getFeaturedProducts();
        setProducts(featuredProducts);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-gray-200 rounded-lg h-80"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
        <Link 
          to="/products" 
          className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-medium transition"
        >
          {/*View all <ArrowRight size={16} />*/}
        </Link>
      </div>
      
      <ProductGrid products={products} />
    </section>
  );
};

export default FeaturedProducts;