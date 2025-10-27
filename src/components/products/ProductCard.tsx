import React from 'react';

import Button from '@/components/ui/Button';
import { useCart } from '@/contexts/CartContext';
import type { Product } from '@/utils/types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Supaya klik tombol tidak langsung membuka link
    addToCart(product, 1);
  };

  const formattedPrice = product.price.toFixed(2);

  // @ts-ignore
  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:bg-gray-900">
      {/* Product Image with Hover Effect */}
      <a
        href={`/product/${product.id}`}
        className="relative block h-64 overflow-hidden"
      >
        <img
          src={product.imageMain}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            onClick={handleAddToCart}
            className="flex translate-y-4 items-center gap-2 rounded-full bg-white px-4 py-2 text-gray-900 shadow-md transition-all duration-300 group-hover:translate-y-0 dark:bg-gray-800 dark:text-gray-100"
          >
            Quick Add
          </button>
        </div>
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

        <div className="mb-2 flex items-center">
          <span className="ml-1 text-xs text-gray-600 dark:text-gray-400">
            ({product.rating})
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span className="font-bold text-gray-900 dark:text-gray-100">
            ${formattedPrice}
          </span>
          <Button
            variant="outline"
            size="sm"
            // onClick={handleAddToCart}
            className="opacity-0 transition-opacity group-hover:opacity-100"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
