import React from 'react';

import type { Product } from '../../utils/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  title?: string;
  emptyMessage?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  title,
  emptyMessage = 'No products found.',
}) => {
  return (
    <div className="w-full">
      {title && (
        <h2 className="mb-6 text-2xl font-bold text-gray-800">{title}</h2>
      )}

      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-10 text-center">
          <p className="text-lg text-gray-500">{emptyMessage}</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
