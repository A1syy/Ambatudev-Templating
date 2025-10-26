import React from 'react';
import { Link } from 'react-router-dom';
// import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../../utils/types';
import { useCart } from '../../contexts/CartContext';
import Button from '../ui/Button';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation
    addToCart(product, 1);
  };

  // Format price to always show 2 decimal places
  const formattedPrice = product.price.toFixed(2);
  
  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Product Image with Hover Effect */}
      <Link to={`/product/${product.id}`} className="block relative h-64 overflow-hidden">
        <img
          src={product.imageMain}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Quick Add to Cart Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={handleAddToCart}
            className="bg-white text-gray-900 py-2 px-4 rounded-full shadow-md flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            {/*<ShoppingCart size={18} />*/}
            Quick Add
          </button>
        </div>
      </Link>
      
      {/* Product Details */}
      <div className="p-4">
        {/* Category */}
        <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
          {product.category}
        </div>
        
        {/* Title */}
        <h3 className="text-gray-900 font-medium text-lg leading-tight mb-1">
          <Link to={`/product/${product.id}`} className="hover:text-indigo-600 transition-colors">
            {product.name}
          </Link>
        </h3>
        
        {/* Rating */}
        <div className="flex items-center mb-2">
          {/*<div className="flex">*/}
          {/*  {[...Array(5)].map((_, i) => (*/}
          {/*    <Star*/}
          {/*      key={i}*/}
          {/*      size={14}*/}
          {/*      className={`${*/}
          {/*        i < Math.round(product.rating)*/}
          {/*          ? 'text-yellow-400 fill-yellow-400'*/}
          {/*          : 'text-gray-300'*/}
          {/*      }`}*/}
          {/*    />*/}
          {/*  ))}*/}
          {/*</div>*/}
          <span className="text-xs text-gray-600 ml-1">({product.rating})</span>
        </div>
        
        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-gray-900">${formattedPrice}</span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleAddToCart}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;