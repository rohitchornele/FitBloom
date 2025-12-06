import React from 'react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Create Your Profile',
      description: 'Sign up and tell us about your health goals and preferences.'
    },
    {
      number: '02',
      title: 'Book a Consultation',
      description: 'Schedule a session with our expert dietician.'
    },
    {
      number: '03',
      title: 'Get Your Plan',
      description: 'Receive a personalized nutrition plan tailored just for you.'
    },
    {
      number: '04',
      title: 'Track & Thrive',
      description: 'Log your progress and watch your health transform.'
    }
  ];

  return (
    <section className="px-6 py-28 pb-36 bg-linear-to-br from-emerald-100/50 via-pink-50 to-pink-100/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your path to better health is just four simple steps away.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 ">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-all hover:-mt-1.5 hover:mb-1.5 duration-150 ease-in"
            >
              {/* Number Badge */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">{step.number}</span>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}