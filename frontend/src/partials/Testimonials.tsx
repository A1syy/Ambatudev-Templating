import React from 'react';
// import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Emma Thompson',
    avatar:
      'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=200',
    position: 'Marketing Director',
    rating: 5,
    testimonial:
      "The quality of these products exceeded my expectations. The attention to detail is impressive, and the customer service is top-notch. I'll definitely be a returning customer!",
  },
  {
    id: 2,
    name: 'David Chen',
    avatar:
      'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=200',
    position: 'Tech Enthusiast',
    rating: 5,
    testimonial:
      "I've purchased multiple tech products from Elegance and have never been disappointed. The products are cutting-edge and the shipping is always fast.",
  },
  {
    id: 3,
    name: 'Sarah Williams',
    avatar:
      'https://images.pexels.com/photos/4420634/pexels-photo-4420634.jpeg?auto=compress&cs=tinysrgb&w=200',
    position: 'Interior Designer',
    rating: 4,
    testimonial:
      'The home decor items I ordered perfectly complemented my design projects. My clients are always impressed with the unique pieces I source from this store.',
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="bg-white py-16 transition-colors duration-300 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="mb-3 text-center text-3xl font-bold text-gray-900 transition-colors duration-300 dark:text-white">
          What Our Customers Say
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600 transition-colors duration-300 dark:text-gray-400">
          Don't just take our word for it. Here's what our satisfied customers
          have to say about their experience shopping with us.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-lg bg-gray-50 p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:bg-gray-800 dark:shadow-gray-900"
            >
              {/* Rating */}
              {/* <div className="flex mb-4"> */}
              {/*  {[...Array(5)].map((_, i) => ( */}
              {/*    <Star */}
              {/*      key={i} */}
              {/*      size={18} */}
              {/*      className={`${ */}
              {/*        i < testimonial.rating */}
              {/*          ? 'text-yellow-400 fill-yellow-400' */}
              {/*          : 'text-gray-300' */}
              {/*      }`} */}
              {/*    /> */}
              {/*  ))} */}
              {/* </div> */}
              {/* Testimonial Text */}
              <p className="mb-6 italic text-gray-700 transition-colors duration-300 dark:text-gray-300">
                "{testimonial.testimonial}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="mr-4 h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 transition-colors duration-300 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500 transition-colors duration-300 dark:text-gray-400">
                    {testimonial.position}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// @ts-ignore
export default Testimonials;
