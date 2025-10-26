import React from 'react';
import { Product } from '../../utils/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  title?: string;
  emptyMessage?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  title, 
  emptyMessage = 'No products found.' 
}) => {
  return (
    <div className="w-full">
      {title && (
        <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>
      )}
      
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">{emptyMessage}</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;