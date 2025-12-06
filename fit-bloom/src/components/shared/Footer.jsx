import React from 'react';
import { Instagram, Twitter, Facebook, Mail, Leaf } from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    company: [
      { name: 'About', href: '/about' },
      { name: 'Articles', href: '/articles' },
      { name: 'Contact', href: '/contact' }
    ],
    services: [
      { name: 'Consultations', href: '/consultations' },
      { name: 'Goal Tracking', href: '/goals' },
      { name: 'Nutrition Plans', href: '/consultations' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '' },
      { name: 'Terms of Service', href: '' },
      { name: 'Cookie Policy', href: '' }
    ]
  };

  const socialLinks = [
    { icon: Instagram, href: '/contact', label: 'Instagram' },
    { icon: Twitter, href: '/contact', label: 'Twitter' },
    { icon: Facebook, href: '/contact', label: 'Facebook' },
    { icon: Mail, href: '/contact', label: 'Email' }
  ];

  return (
    <footer className="bg-gray-50 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center">
                <Leaf />
              </div>
              <span className="text-xl font-bold text-gray-800">FitBloom</span>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Your journey to wellness starts here. Personalized nutrition guidance and support for a healthier, happier you.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-emerald-500 hover:bg-emerald-50 transition-all border border-gray-200"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-emerald-500 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-emerald-500 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-emerald-500 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-200 flex gap-1 items-center justify-center text-center text-gray-600 text-sm">
          <p className="">© 2025</p>
          <span className='h-5 w-5 flex items-center text-gray-500'><Leaf /></span>
          <p className=''>FitBloom. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}