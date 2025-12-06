import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send, UserCheck, Loader2 } from 'lucide-react';
import api from '../api/client'; // Add your API client import

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch doctor data on mount
  useEffect(() => {
    let cancelled = false;
    
    async function fetchDoctor() {
      try {
        setError("");
        const res = await api.get("/doctor/public");
        if (!cancelled) {
          setDoctor(res.data);
        }
      } catch (err) {
        if (!cancelled) {
          setError("Failed to load doctor info");
          console.error("Doctor data fetch error:", err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchDoctor();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    alert('Message sent successfully!');
  };

  // Dynamic contact info from doctor data + fallbacks
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: doctor?.email || 'hello@fitbloom.com',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-500'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: doctor?.phone || '+91 9876543210',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-500'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: doctor?.location || 'New Delhi, India',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-500'
    },
    // {
    //   icon: Clock,
    //   label: 'Hours',
    //   value: doctor?.availability || 'Mon-Fri: 9am-5pm IST',
    //   bgColor: 'bg-emerald-50',
    //   iconColor: 'text-emerald-500'
    // }
  ];

  // Loading state
  if (loading) {
    return (
      <section className="bg-linear-to-br from-green-50 via-emerald-50 to-teal-50 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
              <p className="text-slate-500">Loading contact information...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-linear-to-br from-green-50 via-emerald-50 to-teal-50 px-6 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about our services? We'd love to hear from you.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Doctor Contact Information */}
          <div>
            {/* <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                {doctor?.image ? (
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                ) : (
                  <span className="text-xl font-semibold text-emerald-600">
                    {doctor?.name?.charAt(0)?.toUpperCase() || "Dr"}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  {doctor?.name || "Dr. [Name]"}
                </h2>
                <p className="text-emerald-600 font-semibold">
                  {doctor?.title || "Nutrition Specialist"}
                </p>
              </div>
            </div> */}

            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Contact Information
            </h3>
            <p className="text-gray-600 mb-8">
              Reach out through any of these channels and we'll respond as soon as possible.
            </p>

            {error ? (
              <div className="p-6 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm">
                {error}
              </div>
            ) : (
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center gap-4 pl-1 rounded">
                    <div className={`w-12 h-12 ${info.bgColor} rounded-xl flex items-center justify-center shrink-0`}>
                      <info.icon className={`w-6 h-6 ${info.iconColor}`} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 mb-1">{info.label}</p>
                      <p className="text-gray-600">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more..."
                  rows="6"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-emerald-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
