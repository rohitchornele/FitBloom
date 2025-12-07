import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CTASection() {

  const navigate = useNavigate();

  return (
    <section className="bg-emerald-500 px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          Ready to Start Your Wellness Journey?
        </h2>

        {/* Description */}
        <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
          Join hundreds of members who have transformed their health with personalized nutrition guidance.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={() => navigate("/consultations")} className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-all flex items-center gap-2 shadow-lg">
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </button>
          <button onClick={() => navigate("/contact")}  className="bg-transparent text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all border-2 border-white">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}