import React from 'react';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      rating: 5,
      text: '"FitBloom completely changed my relationship with food. The personalized approach made all the difference!"',
      name: 'Amanda K.',
      achievement: 'Lost 25 lbs in 4 months',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80'
    },
    {
      rating: 5,
      text: '"I never knew nutrition could have such an impact on my daily energy. Dr. Chen is amazing!"',
      name: 'Michael R.',
      achievement: 'Improved energy levels',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80'
    },
    {
      rating: 5,
      text: '"The goal tracking feature keeps me accountable. I\'ve never felt more in control of my health."',
      name: 'Sarah L.',
      achievement: 'Managing diabetes naturally',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80'
    }
  ];

  return (
    <section className="px-6 py-28 pb-36 bg-linear-to-br from-emerald-100/50 via-pink-50 to-pink-100/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What Our Members Say
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Real stories from real people who transformed their health with FitBloom.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 leading-relaxed mb-8 text-lg">
                {testimonial.text}
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.achievement}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}