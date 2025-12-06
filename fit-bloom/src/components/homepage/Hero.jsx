import React from 'react';
import { ArrowRight, Heart, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  
  const navigate = useNavigate();

  return (
    <section className="bg-linear-to-br from-emerald-100 via-pink-50 to-pink-50 px-6 py-20 min-h-screen">
      <div className="max-w-7xl mx-auto mb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-300/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Activity className="w-4 h-4 text-emerald-500" />
              <span className="text-emerald-600 font-medium text-sm">
                Your Wellness Journey Starts Here
              </span>
            </div>

            {/* Heading */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Nourish Your Body,
              </h1>
              <h1 className="text-4xl lg:text-5xl font-bold text-emerald-500 leading-tight">
                Transform Your Life
              </h1>
            </div>

            {/* Description */}
            <p className="text-md text-gray-600 leading-relaxed max-w-xl">
              Personalized nutrition guidance from certified dieticians. Set goals, track progress, and achieve lasting wellness with FitBloom.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button onClick={() => navigate("/login")} className="bg-emerald-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-emerald-600 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl">
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </button>
              <button onClick={() => navigate("/signup")}  className="bg-emerald-100 text-gray-700 px-8 py-4 rounded-full font-semibold hover:bg-emerald-500 hover:text-white transition-all border border-gray-200">
                Learn More
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-3">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-pink-400 to-pink-600 border-2 border-white"></div>
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-400 to-blue-600 border-2 border-white"></div>
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-purple-400 to-purple-600 border-2 border-white"></div>
              </div>
              <div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-orange-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 font-medium">500+ happy members</p>
              </div>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="relative">
            {/* Main Image Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1572357280636-1a2c2c26acdc?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Healthy food and wellness"
                className="w-full h-120 object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-br from-emerald-500/20 to-transparent"></div>
            </div>

            {/* Floating Wellness Score Card */}
            <div className="absolute top-12 -right-6 bg-white rounded-2xl shadow-xl p-4 animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <p className="text-gray-900 font-bold text-sm">Wellness Score</p>
                  <p className="text-emerald-500 text-xs font-semibold">+12% this week</p>
                </div>
              </div>
            </div>

            {/* Floating Daily Goal Card */}
            <div className="absolute bottom-8 -left-6 bg-white rounded-2xl shadow-xl p-4 animate-bounce" style={{ animationDuration: '3s', animationDelay: '0.5s' }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <p className="text-gray-900 font-bold text-sm">Daily Goal</p>
                  <p className="text-gray-500 text-xs font-semibold">85% completed</p>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-emerald-200 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-teal-200 rounded-full blur-3xl opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  );
}