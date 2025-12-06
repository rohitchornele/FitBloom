import React from 'react';
import { Target, Calendar, TrendingUp } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Target,
      title: 'Personalized Goals',
      description: 'Set and track custom health goals tailored to your unique needs and lifestyle.',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-500'
    },
    {
      icon: Calendar,
      title: 'Expert Consultations',
      description: 'Book one-on-one sessions with certified dieticians for personalized guidance.',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-500'
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Monitor your journey with intuitive charts and milestone celebrations.',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-500'
    }
  ];

  return (
    <section className="bg-gray-50 px-6 py-28 pb-36">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Choose FitBloom?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We combine expert guidance with smart technology to make healthy living simple and sustainable.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-all hover:-mt-1.5 hover:mb-1.5 duration-150 ease-in text-center"
            >
              {/* Icon */}
              <div className={`w-full rounded-2xl flex items-center justify-center mb-6`}>
                <feature.icon className={`w-20 h-16 ${feature.iconColor} ${feature.bgColor} hover:bg-emerald-500 hover:text-white px-4 py-1 rounded-3xl`} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}