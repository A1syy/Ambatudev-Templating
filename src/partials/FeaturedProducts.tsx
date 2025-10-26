import { GradientText, Section } from 'astro-boilerplate-components';

import type { Product } from '@/data/products';
import { getFeaturedProducts } from '@/data/products';

const FeaturedProduct = ({ product }: { product: Product }) => (
  <div className="group relative overflow-hidden rounded-lg bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
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
      <div className="mb-1 text-xs uppercase tracking-wide text-gray-500">
        {product.category}
      </div>

      <h3 className="mb-1 text-lg font-medium leading-tight text-gray-900">
        <a
          href={`/product/${product.id}`}
          className="transition-colors hover:text-indigo-600"
        >
          {product.name}
        </a>
      </h3>

      <div className="mt-2 flex items-center justify-between">
        <span className="font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </span>
      </div>
    </div>
  </div>
);

const FeaturedProducts = () => {
  const products = getFeaturedProducts().slice(0, 4);

  return (
    <Section
      title={
        <>
          Featured <GradientText>Products</GradientText>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <FeaturedProduct key={product.id} product={product} />
        ))}
      </div>
    </Section>
  );
};

export { FeaturedProducts };
