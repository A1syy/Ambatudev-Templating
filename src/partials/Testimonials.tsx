import React from 'react';
// import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Emma Thompson',
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=200',
    position: 'Marketing Director',
    rating: 5,
    testimonial: 'The quality of these products exceeded my expectations. The attention to detail is impressive, and the customer service is top-notch. I\'ll definitely be a returning customer!',
  },
  {
    id: 2,
    name: 'David Chen',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=200',
    position: 'Tech Enthusiast',
    rating: 5,
    testimonial: 'I\'ve purchased multiple tech products from Elegance and have never been disappointed. The products are cutting-edge and the shipping is always fast.',
  },
  {
    id: 3,
    name: 'Sarah Williams',
    avatar: 'https://images.pexels.com/photos/4420634/pexels-photo-4420634.jpeg?auto=compress&cs=tinysrgb&w=200',
    position: 'Interior Designer',
    rating: 4,
    testimonial: 'The home decor items I ordered perfectly complemented my design projects. My clients are always impressed with the unique pieces I source from this store.',
  }
];

const Testimonials: React.FC = () => {
  return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-3 text-gray-900">What Our Customers Say</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience shopping with us.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
                <div
                    key={testimonial.id}
                    className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Rating */}
                  {/*<div className="flex mb-4">*/}
                  {/*  {[...Array(5)].map((_, i) => (*/}
                  {/*    <Star*/}
                  {/*      key={i}*/}
                  {/*      size={18}*/}
                  {/*      className={`${*/}
                  {/*        i < testimonial.rating*/}
                  {/*          ? 'text-yellow-400 fill-yellow-400'*/}
                  {/*          : 'text-gray-300'*/}
                  {/*      }`}*/}
                  {/*    />*/}
                  {/*  ))}*/}
                  {/*</div>*/}

                  {/* Testimonial Text */}
                  <p className="text-gray-700 mb-6 italic">"{testimonial.testimonial}"</p>

                  {/* Customer Info */}
                  <div className="flex items-center">
                    <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-gray-500 text-sm">{testimonial.position}</p>
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