import React from 'react';
import pkg from 'react-router-dom';
const { Link } = pkg;
import Button from '@/components/ui/Button';

const Hero2: React.FC = () => {
  return (
    <section className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/1549200/pexels-photo-1549200.jpeg?auto=compress&cs=tinysrgb&w=1920" 
          alt="Modern home interior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/70 to-transparent"></div>
      </div>
      
      {/* Hero2 Content */}
      <div className="container mx-auto px-4 py-32 md:py-48 relative z-10">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Elevate Your <span className="text-indigo-400">Lifestyle</span> with Curated Products
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Discover a carefully selected collection of premium products designed to enhance your everyday experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              as={Link}
              to="/products" 
              size="lg"
              className="px-8 inline-block"
            >
              Shop Now
            </Button>
            <Button 
              as={Link}
              to="/about" 
              variant="outline" 
              size="lg"
              className="px-8 text-white border-white hover:bg-white/10 inline-block"
            >
              Our Story
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scrolling Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-gray-300 mb-2">Scroll to explore</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M12 5v14"></path>
          <path d="m19 12-7 7-7-7"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero2;