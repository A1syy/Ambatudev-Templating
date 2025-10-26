import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../services/productService';

const CategorySection: React.FC = () => {
  const categories = getCategories();

  // Map category names to images and descriptions
  const categoryDetails = {
    electronics: {
      image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Innovative technology for modern living',
    },
    fashion: {
      image: 'https://images.pexels.com/photos/934673/pexels-photo-934673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Timeless styles for every occasion',
    },
    home: {
      image: 'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Beautiful décor for your living space',
    },
    health: {
      image: 'https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Products for your wellness journey',
    },
    travel: {
      image: 'https://images.pexels.com/photos/872831/pexels-photo-872831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Essential gear for your adventures',
    },
    kitchen: {
      image: 'https://images.pexels.com/photos/4252137/pexels-photo-4252137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Tools for culinary excellence',
    }
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-3 text-gray-900">Shop by Category</h2>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          Browse our collections and find the perfect products for your needs.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/products?category=${category}`}
              className="group relative h-72 overflow-hidden rounded-lg shadow-md transition-transform hover:scale-[1.01]"
            >
              <img
                src={categoryDetails[category as keyof typeof categoryDetails]?.image}
                alt={category}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-bold mb-1 capitalize">
                  {category}
                </h3>
                <p className="text-gray-200 text-sm">
                  {categoryDetails[category as keyof typeof categoryDetails]?.description}
                </p>
                <span className="mt-3 text-indigo-300 text-sm font-medium flex items-center">
                  Explore
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;