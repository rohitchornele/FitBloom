


import React, { useEffect, useState } from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const getCategoryColor = (category) => {
  const colors = {
    Nutrition: 'bg-emerald-100 text-emerald-600',
    Recipes: 'bg-orange-100 text-orange-600',
    Lifestyle: 'bg-purple-100 text-purple-600',
    Wellness: 'bg-blue-100 text-blue-600',
    Fitness: 'bg-pink-100 text-pink-600',
  };
  return colors[category] || 'bg-gray-100 text-gray-600';
};

const calculateReadTime = (text) => {
  const words = text?.split(' ').length || 0;
  const minutes = Math.ceil(words / 200) || 1;
  return `${minutes} min read`;
};

export default function Blogs() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHomepageArticles = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await fetch(`${BASE_URL}/public/articles`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        // Take only first 3–4
        const sliced = data.slice(0, 4);

        const mapped = sliced.map((article) => ({
          image:
            article.image ||
            'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80',
          category: article.category || 'Wellness',
          categoryColor: getCategoryColor(article.category || 'Wellness'),
          readTime: calculateReadTime(article.preview || article.title),
          title: article.title,
          description:
            article.preview ||
            `${article.title} - Expert insights to support your wellness journey.`,
          author: article.doctor?.name || 'Health Expert',
          authorImage:
            article.doctor?.image ||
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
          link: article.link || '/articles',
        }));

        setArticles(mapped);
      } catch (err) {
        console.error('Homepage articles error:', err);
        setError('Failed to load blog articles.');
      } finally {
        setLoading(false);
      }
    };

    fetchHomepageArticles();
  }, []);

  if (loading) {
    return (
      <section className="bg-gray-50 px-6 py-28 pb-36">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading latest articles...</p>
        </div>
      </section>
    );
  }

  if (error || articles.length === 0) {
    return (
      <section className="bg-gray-50 px-6 py-28 pb-36">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Latest from Our Blog
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Expert insights, tips, and recipes to support your wellness journey.
          </p>
          <p className="text-gray-500 mb-6">
            {error || 'No articles available right now.'}
          </p>
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-gray-700 font-semibold hover:text-emerald-500 transition-colors border border-gray-300 px-6 py-3 rounded-full hover:border-emerald-500"
          >
            View All Articles
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 px-6 py-28 pb-36">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-center items-end mb-20">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Latest from Our Blog
            </h2>
            <p className="text-lg text-gray-600">
              Expert insights, tips, and recipes to support your wellness journey.
            </p>
          </div>
        </div>

        {/* Blog Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {articles.map((article, index) => (
            <a
              key={index}
              href={article.link}
              target={article.link?.startsWith('http') ? '_blank' : '_self'}
              rel="noreferrer"
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-64">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src =
                      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80';
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`${article.categoryColor} px-3 py-1 rounded-full text-xs font-semibold`}
                  >
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-500 transition-colors line-clamp-2">
                  {article.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                  {article.description}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <img
                    src={article.authorImage}
                    alt={article.author}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80';
                    }}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {article.author}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* View All */}
        <div className="flex justify-center items-center py-10">
          <Link
            to="/articles"
            className="hidden md:flex items-center gap-2 text-gray-700 font-semibold hover:text-emerald-500 transition-colors border border-gray-300 px-6 py-3 rounded-full hover:border-emerald-500"
          >
            View All Articles
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Mobile View All Button */}
        <div className="flex md:hidden justify-center mt-8">
          <Link
            to="/articles"
            className="flex items-center gap-2 text-gray-700 font-semibold hover:text-emerald-500 transition-colors border border-gray-300 px-6 py-3 rounded-full hover:border-emerald-500"
          >
            View All Articles
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
