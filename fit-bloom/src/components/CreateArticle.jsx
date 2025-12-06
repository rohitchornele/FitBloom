import React, { useState } from 'react';
import { X, Save, Image as ImageIcon, Link2, FileText } from 'lucide-react';
import api from '../api/doctorClient.js';

const CreateArticle = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    link: '',
    image: '',
    preview: '',
    category: 'Wellness',
    isPublished: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = ['Nutrition', 'Recipes', 'Lifestyle', 'Wellness', 'Fitness'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUrlChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/doctor/articles', formData);
     
      // Reset form + close modal + refresh parent
      setFormData({
        title: '',
        link: '',
        image: '',
        preview: '',
        category: 'Wellness',
        isPublished: true
      });
      onClose();
      onSuccess(); // Refresh articles list
    } catch (err) {
      console.error('❌ Create error:', err.response?.data);
      setError(err.response?.data?.message || 'Failed to create article');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="p-8 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Add New Article</h2>
                <p className="text-gray-600">Share your expertise with patients</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-all"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl">
              <p className="text-sm text-rose-700">{error}</p>
            </div>
          )}

          {/* Title & Category */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Article Title *
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Managing Diabetes in 2025"
                className="w-full p-4 rounded-2xl border border-gray-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 outline-none text-lg font-semibold"
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-4 rounded-2xl border border-gray-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 outline-none"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Link & Image */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Link2 className="w-4 h-4" />
                Blog Link *
              </label>
              <div className="relative">
                <input
                  name="link"
                  type="url"
                  value={formData.link}
                  onChange={handleChange}
                  placeholder="https://yourblog.com/diabetes-guide"
                  className="w-full pl-12 p-4 rounded-2xl border border-gray-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 outline-none"
                  required
                />
                <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Featured Image (URL)
              </label>
              <div className="flex gap-3">
                <input
                  name="image"
                  type="url"
                  value={formData.image}
                  onChange={handleImageUrlChange}
                  placeholder="https://example.com/image.jpg"
                  className="flex-1 p-4 rounded-2xl border border-gray-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 outline-none"
                />
                <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden shrink-0">
                  {formData.image ? (
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Preview Text */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              Preview Text (160 chars max)
            </label>
            <textarea
              name="preview"
              value={formData.preview}
              onChange={handleChange}
              rows={4}
              maxLength={160}
              placeholder="Write a compelling preview that entices readers to click through to your full article..."
              className="w-full p-4 rounded-2xl border border-gray-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 outline-none resize-vertical"
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.preview.length}/160 characters
            </p>
          </div>

          {/* Publish Settings */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleChange}
                className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Publish immediately
              </span>
            </label>
            <span className="text-xs text-gray-500">
              Uncheck to save as draft
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-2xl shadow-lg hover:from-emerald-600 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              {loading ? 'Creating...' : 'Create Article'}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-8 py-4 text-gray-700 font-semibold rounded-2xl border border-gray-200 hover:bg-gray-50 transition-all disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateArticle;
