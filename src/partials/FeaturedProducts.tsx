import { GradientText } from 'astro-boilerplate-components';

import { getFeaturedProducts } from '@/data/products';

const FeaturedProducts = () => {
  const products = getFeaturedProducts().slice(0, 4);

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">
          Featured <GradientText>Products</GradientText>
        </h2>
        <a
          href="/products"
          className="flex items-center gap-1 font-medium text-indigo-600 transition hover:text-indigo-800"
        >
          View all
          <svg
            className="ml-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </a>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative overflow-hidden rounded-lg bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
          >
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
                <button className="rounded-md border border-gray-300 px-4 py-2 text-sm opacity-0 transition-opacity hover:bg-gray-50 group-hover:opacity-100">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export { FeaturedProducts };
