import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Blogs() {
    const articles = [
        {
            image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80',
            category: 'Nutrition',
            categoryColor: 'bg-emerald-100 text-emerald-600',
            readTime: '5 min read',
            title: '10 Superfoods to Boost Your Energy Naturally',
            description: 'Discover the power of nutrient-dense foods that can help you feel more energized throughout the day...',
            author: 'Dr. Emily Chen',
            authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
            link: '#'
        },
        {
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80',
            category: 'Nutrition',
            categoryColor: 'bg-emerald-100 text-emerald-600',
            readTime: '8 min read',
            title: 'The Mediterranean Diet: A Complete Guide',
            description: 'Learn about one of the world\'s healthiest eating patterns and how to incorporate it into your lifestyle.',
            author: 'Dr. Emily Chen',
            authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
            link: '#'
        },
        {
            image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=600&q=80',
            category: 'Wellness',
            categoryColor: 'bg-blue-100 text-blue-600',
            readTime: '6 min read',
            title: 'Understanding Mindful Eating',
            description: 'Transform your relationship with food by practicing mindful eating techniques that promote better...',
            author: 'Dr. Emily Chen',
            authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
            link: '#'
        },
        {
            image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=600&q=80',
            category: 'Wellness',
            categoryColor: 'bg-blue-100 text-blue-600',
            readTime: '6 min read',
            title: 'Understanding Mindful Eating',
            description: 'Transform your relationship with food by practicing mindful eating techniques that promote better...',
            author: 'Dr. Emily Chen',
            authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
            link: '#'
        }
    ];

    return (
        <section className="bg-gray-50 px-6 py-28 pb-36">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-center items-end mb-20">
                    <div className='text-center'>
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
                            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="relative overflow-hidden h-64">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                {/* Meta */}
                                <div className="flex items-center gap-3 mb-4">
                                    <span className={`${article.categoryColor} px-3 py-1 rounded-full text-xs font-semibold`}>
                                        {article.category}
                                    </span>
                                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                                        <Clock className="w-4 h-4" />
                                        <span>{article.readTime}</span>
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-500 transition-colors">
                                    {article.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    {article.description}
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                                    <img
                                        src={article.authorImage}
                                        alt={article.author}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <span className="text-sm font-medium text-gray-700">
                                        {article.author}
                                    </span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                <div className="flex justify-center items-center py-10">
                    <Link to={'/articles'} className="hidden md:flex items-center gap-2 text-gray-700 font-semibold hover:text-emerald-500 transition-colors border border-gray-300 px-6 py-3 rounded-full hover:border-emerald-500">
                        View All Articles
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>

                {/* Mobile View All Button */}
                <div className="flex md:hidden justify-center mt-8">
                    <a
                        href="#"
                        className="flex items-center gap-2 text-gray-700 font-semibold hover:text-emerald-500 transition-colors border border-gray-300 px-6 py-3 rounded-full hover:border-emerald-500"
                    >
                        View All Articles
                        <ArrowRight className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </section>
    );
}