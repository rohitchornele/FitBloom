import React, { useState, useEffect } from 'react';
import { Clock, Plus, Edit3, Trash2, ArrowRight } from 'lucide-react';
import { useDoctorAuth } from '../context/DoctorAuthContext';
import api from '../api/doctorClient.js';
import CreateArticle from '../components/CreateArticle.jsx';
import axios from 'axios';

const Articles = () => {

    const BASE_URL = import.meta.env.VITE_API_URL ||  "http://localhost:4000/api"
    const [activeCategory, setActiveCategory] = useState('All');
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newArticle, setNewArticle] = useState({
        title: '',
        link: '',
        image: '',
        preview: ''
    });
    const { doctor } = useDoctorAuth(); // ✅ Check if doctor logged in

    const categories = ['All', 'Nutrition', 'Recipes', 'Lifestyle', 'Wellness', 'Fitness'];

    const handleOpenCreateModal = () => setShowCreateModal(true);
    const handleCloseCreateModal = () => setShowCreateModal(false);

    // ✅ DOCTOR: Fetch MY articles | USER: Fetch ALL public articles
    const fetchArticles = async () => {
        try {
            setLoading(true);
            setError('');

            let response;
            if (doctor) {
                response = await api.get('/doctor/articles');
                const data = response.data.articles || [];
                mapArticles(data);
            } else {
                response = await fetch(`${BASE_URL}/public/articles`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const data = await response.json();
                mapArticles(data);
            }
        } catch (err) {
            console.error('Failed:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const mapArticles = (data) => {
        const mappedArticles = data.map(article => ({
            id: article._id,
            image: article.image || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80',
            category: article.category || 'Wellness',
            categoryColor: getCategoryColor(article.category || 'Wellness'),
            readTime: calculateReadTime(article.preview || article.title),
            title: article.title,
            description: article.preview || `${article.title} - Expert insights`,
            author: article.doctor?.name || doctor?.name || 'Health Expert',
            authorImage: article.doctor?.image || doctor?.image || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
            link: article.link,
            createdAt: article.createdAt,
            isOwn: doctor && article.doctor?._id === doctor._id // ✅ Is this MY article?
        }));
        setArticles(mappedArticles);
    };

    // ✅ DOCTOR ONLY: Add new article
    const handleAddArticle = async (e) => {
        e.preventDefault();
        try {
            await api.post('/articles', newArticle);
            setNewArticle({ title: '', link: '', image: '', preview: '' });
            setShowAddForm(false);
            fetchArticles(); // Refresh list
        } catch (err) {
            setError('Failed to add article: ' + err.response?.data?.message);
        }
    };

    // ✅ DOCTOR ONLY: Delete article
    const handleDeleteArticle = async (articleId) => {
        if (!confirm('Delete this article?')) return;
        try {
            await api.delete(`/articles/${articleId}`);
            fetchArticles(); // Refresh list
        } catch (err) {
            setError('Failed to delete article');
        }
    };

    const getCategoryColor = (category) => {
        const colors = {
            'Nutrition': 'bg-emerald-100 text-emerald-600',
            'Recipes': 'bg-orange-100 text-orange-600',
            'Lifestyle': 'bg-purple-100 text-purple-600',
            'Wellness': 'bg-blue-100 text-blue-600',
            'Fitness': 'bg-pink-100 text-pink-600'
        };
        return colors[category] || 'bg-gray-100 text-gray-600';
    };

    const calculateReadTime = (text) => {
        const words = text.split(' ').length;
        const minutes = Math.ceil(words / 200);
        return `${minutes} min read`;
    };

    useEffect(() => {
        fetchArticles();
    }, [doctor]);

    const filteredArticles = activeCategory === 'All'
        ? articles
        : articles.filter(article => article.category === activeCategory);

    if (loading) {
        return (
            <section className="bg-white px-6 py-16">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                    <p className="text-gray-500">{doctor ? 'Loading your articles...' : 'Loading articles...'}</p>
                </div>
            </section>
        );
    }

    return (
        <>
            <section className="bg-linear-to-br from-green-50 via-emerald-50 to-teal-50 px-6 py-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        {doctor ? 'Your Articles' : 'Health & Wellness Articles'}
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        {doctor
                            ? 'Manage your published health articles'
                            : 'Expert insights, practical tips, and delicious recipes to support your wellness journey.'
                        }
                    </p>
                </div>
            </section>

            <section className="bg-white px-6 py-16">
                <div className="max-w-7xl mx-auto">
                    {error && (
                        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl text-center">
                            <p className="text-red-700">{error}</p>
                            <button
                                onClick={fetchArticles}
                                className="mt-3 px-6 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600"
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                    {/* ✅ DOCTOR ONLY: Add Article Button */}
                    {doctor && (
                        <div className="mb-8 flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-900">Your Articles ({articles.length})</h2>
                            <button
                                onClick={handleOpenCreateModal}
                                className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-emerald-600"
                            >
                                <Plus className="w-5 h-5" />
                                Add Article
                            </button>
                            {
                                showCreateModal && (
                                    <CreateArticle
                                        isOpen={showCreateModal}
                                        onClose={handleCloseCreateModal}
                                        onSuccess={fetchArticles} // Refresh list after create
                                    />
                                )
                            }
                        </div>
                    )}


                    {/* Category Filter Pills */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-6 py-2.5 rounded-full font-medium transition-all ${activeCategory === category
                                    ? 'bg-emerald-500 text-white shadow-md'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Articles Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredArticles.map((article) => (
                            <div key={article.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                                {/* Image */}
                                <div className="relative overflow-hidden h-64">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        onError={(e) => {
                                            e.target.src = 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80';
                                        }}
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    {/* Meta */}
                                    <div className="flex items-center justify-between mb-4">
                                        <span className={`${article.categoryColor} px-3 py-1 rounded-full text-xs font-semibold`}>
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

                                    {/* Author & Actions */}
                                    <div className="flex items-center justify-between">
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={article.authorImage}
                                                alt={article.author}
                                                className="w-10 h-10 rounded-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80';
                                                }}
                                            />
                                            <div>
                                                <span className="text-sm font-medium text-gray-700 block">
                                                    {article.author}
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    {new Date(article.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>

                                        {/* ✅ DOCTOR ONLY: Action buttons for OWN articles */}
                                        {doctor && article.isOwn && (
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                                <button
                                                    onClick={() => {/* Edit modal */ }}
                                                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg hover:scale-110 transition-all"
                                                    title="Edit"
                                                >
                                                    <Edit3 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteArticle(article.id)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg hover:scale-110 transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <div className='pt-4 flex items-center' >
                                        <a href={article.link} target='_blank'>
                                        <button className="bg-emerald-500 text-white px-4 py-2 rounded-md flex gap-2 font-semibold hover:bg-emerald-700 hover:scale-105 transition-all ease-in-out">Read More...</button>
                                        </a>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredArticles.length === 0 && !loading && (
                        <div className="text-center py-16">
                            {doctor ? (
                                <>
                                    <div className="w-24 h-24 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                        <Clock className="w-12 h-12 text-emerald-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">No articles yet</h3>
                                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                                        Add your first article using the "Add Article" button above.
                                    </p>
                                </>
                            ) : (
                                <p className="text-gray-500 text-lg">No articles found in this category.</p>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default Articles;
