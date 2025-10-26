import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// import { Star, Truck, ShieldCheck, ArrowLeft, Heart, MinusCircle, PlusCircle, Share2 } from 'lucide-react';
import Button from '../components/ui/Button';
import { getProductById, getProductsByCategory } from '../services/productService';
import { Product } from '../utils/types';
import { useCart } from '../contexts/CartContext';
import ProductGrid from '../components/products/ProductGrid';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState('');
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');
  
  useEffect(() => {
    if (id) {
      const productId = parseInt(id, 10);
      const fetchedProduct = getProductById(productId);
      
      if (fetchedProduct) {
        setProduct(fetchedProduct);
        setActiveImage(fetchedProduct.imageMain);
        
        // Get related products from the same category
        const related = getProductsByCategory(fetchedProduct.category)
          .filter(p => p.id !== productId)
          .slice(0, 4);
        setRelatedProducts(related);
      }
      
      setLoading(false);
    }
  }, [id]);
  
  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      
      // Show a toast or some feedback
      alert(`Added ${quantity} x ${product.name} to your cart!`);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2 bg-gray-200 rounded-lg aspect-square"></div>
            <div className="md:w-1/2">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-20 bg-gray-200 rounded w-full mb-6"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3 mb-6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products" className="text-indigo-600 hover:text-indigo-800">
          {/*<ArrowLeft className="inline mr-2" size={16} />*/}
          Back to Products
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-24">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Link to="/products" className="text-gray-500 hover:text-indigo-600 flex items-center">
          {/*<ArrowLeft size={16} className="mr-1" />*/}
          Back to Products
        </Link>
      </div>
      
      {/* Product Details */}
      <div className="flex flex-col md:flex-row gap-8 mb-16">
        {/* Product Images */}
        <div className="md:w-1/2">
          <div className="mb-4 aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img 
              src={activeImage} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.imageGallery.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(image)}
                className={`aspect-square overflow-hidden rounded-md ${
                  activeImage === image ? 'ring-2 ring-indigo-500' : ''
                }`}
              >
                <img 
                  src={image} 
                  alt={`${product.name} - view ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="md:w-1/2">
          <div className="mb-2 text-sm uppercase tracking-wider text-gray-500">
            {product.category}
          </div>
          <h1 className="text-3xl font-bold mb-2 text-gray-900">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex">
              {/*{[...Array(5)].map((_, i) => (*/}
              {/*  <Star*/}
              {/*    key={i}*/}
              {/*    size={18}*/}
              {/*    className={`${*/}
              {/*      i < Math.round(product.rating)*/}
              {/*        ? 'text-yellow-400 fill-yellow-400'*/}
              {/*        : 'text-gray-300'*/}
              {/*    }`}*/}
              {/*  />*/}
              {/*))}*/}
            </div>
            <span className="ml-2 text-gray-600">{product.rating} out of 5</span>
          </div>
          
          {/* Price */}
          <div className="text-2xl font-bold text-gray-900 mb-6">
            ${product.price.toFixed(2)}
          </div>
          
          {/* Description */}
          <p className="text-gray-700 mb-6">
            {product.description}
          </p>
          
          {/* Availability */}
          <div className="mb-6">
            <span className="font-medium">Availability:</span>
            {product.stock > 0 ? (
              <span className="text-green-600 ml-2">In Stock ({product.stock} available)</span>
            ) : (
              <span className="text-red-600 ml-2">Out of Stock</span>
            )}
          </div>
          
          {/* Quantity Selector */}
          <div className="flex items-center mb-6">
            <span className="font-medium mr-4">Quantity:</span>
            <div className="flex items-center">
              <button 
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="text-gray-500 hover:text-indigo-600 disabled:opacity-50"
              >
                {/*<MinusCircle size={24} />*/}
              </button>
              <span className="mx-4 text-center w-8">{quantity}</span>
              <button 
                onClick={incrementQuantity}
                disabled={product.stock <= quantity}
                className="text-gray-500 hover:text-indigo-600 disabled:opacity-50"
              >
                {/*<PlusCircle size={24} />*/}
              </button>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Button onClick={handleAddToCart} size="lg" className="flex-grow" disabled={product.stock === 0}>
              Add to Cart
            </Button>
            <Button variant="outline" className="flex items-center justify-center">
              {/*<Heart size={18} className="mr-2" />*/}
              Wishlist
            </Button>
            <Button variant="outline" className="flex items-center justify-center">
              {/*<Share2 size={18} />*/}
              asd Share
            </Button>
          </div>
          
          {/* Shipping & Returns */}
          <div className="border-t border-b border-gray-200 py-4 mb-6">
            <div className="flex items-center mb-3">
              {/*<Truck size={18} className="text-gray-500 mr-2" />*/}
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center">
              {/*<ShieldCheck size={18} className="text-gray-500 mr-2" />*/}
              <span>30 day easy returns</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Tabs */}
      <div className="mb-16">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('description')}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'description'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('specifications')}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'specifications'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'reviews'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Reviews
            </button>
          </nav>
        </div>
        
        <div className="py-6">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p className="mb-4">{product.description}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. 
                Curabitur feugiat tortor id nisi scelerisque, ac tincidunt velit posuere. 
                Nulla facilisi. Integer vitae orci ut nisi aliquet efficitur.
              </p>
            </div>
          )}
          
          {activeTab === 'specifications' && (
            <div className="overflow-hidden bg-white border border-gray-200 rounded-md">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <tr key={key}>
                      <td className="py-3 px-6 text-sm font-medium text-gray-900 bg-gray-50 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </td>
                      <td className="py-3 px-6 text-sm text-gray-700">
                        {value.toString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
                <p className="text-gray-600">This product has an average rating of {product.rating} out of 5 stars.</p>
              </div>
              
              {/* Sample Reviews (for demo purposes) */}
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-6">
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {/*{[...Array(5)].map((_, i) => (*/}
                      {/*  <Star*/}
                      {/*    key={i}*/}
                      {/*    size={16}*/}
                      {/*    className={`${i < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}*/}
                      {/*  />*/}
                      {/*))}*/}
                    </div>
                    <span className="font-medium">Amazing Product!</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    This product exceeded my expectations. The quality is outstanding, and it arrived quickly.
                  </p>
                  <div className="text-xs text-gray-500">
                    <span className="font-medium">John D.</span> - 2 weeks ago
                  </div>
                </div>
                
                <div className="border-b border-gray-200 pb-6">
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {/*{[...Array(5)].map((_, i) => (*/}
                      {/*  <Star*/}
                      {/*    key={i}*/}
                      {/*    size={16}*/}
                      {/*    className={`${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}*/}
                      {/*  />*/}
                      {/*))}*/}
                    </div>
                    <span className="font-medium">Very Good</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    I'm very happy with this purchase. It works as described and looks great.
                  </p>
                  <div className="text-xs text-gray-500">
                    <span className="font-medium">Sarah M.</span> - 1 month ago
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;