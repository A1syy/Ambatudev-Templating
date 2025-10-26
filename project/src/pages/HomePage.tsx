import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CategorySection from '../components/home/CategorySection';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <CategorySection />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default HomePage;