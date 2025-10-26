import { getCategories } from 'project/src/services/productService';

const CategorySection = () => {
  const categories = getCategories();

  // Map category names to images and descriptions
  const categoryDetails = {
    electronics: {
      image:
        'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Innovative technology for modern living',
    },
    fashion: {
      image:
        'https://images.pexels.com/photos/934673/pexels-photo-934673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Timeless styles for every occasion',
    },
    home: {
      image:
        'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Beautiful décor for your living space',
    },
    health: {
      image:
        'https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Products for your wellness journey',
    },
    travel: {
      image:
        'https://images.pexels.com/photos/872831/pexels-photo-872831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Essential gear for your adventures',
    },
    kitchen: {
      image:
        'https://images.pexels.com/photos/4252137/pexels-photo-4252137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Tools for culinary excellence',
    },
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-3 text-center text-3xl font-bold text-gray-900">
          Shop by Category
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-gray-600">
          Browse our collections and find the perfect products for your needs.
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <a
              key={category}
              href={`/products?category=${category}`}
              className="group relative h-72 overflow-hidden rounded-lg shadow-md transition-transform hover:scale-[1.01]"
            >
              <img
                src={
                  categoryDetails[category as keyof typeof categoryDetails]
                    ?.image
                }
                alt={category}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/40 to-transparent p-6">
                <h3 className="mb-1 text-xl font-bold capitalize text-white">
                  {category}
                </h3>
                <p className="text-sm text-gray-200">
                  {
                    categoryDetails[category as keyof typeof categoryDetails]
                      ?.description
                  }
                </p>
                <span className="mt-3 flex items-center text-sm font-medium text-indigo-300">
                  Explore
                  <svg
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
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
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
