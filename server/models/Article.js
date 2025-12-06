// models/Article.js
import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  link: { type: String, required: true },
  image: { type: String },
  preview: { type: String, maxlength: 500 },
  doctor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Doctor', 
    required: true,
    index: true 
  },
  category: { type: String, enum: ['Nutrition', 'Recipes', 'Lifestyle', 'Wellness', 'Fitness'] },
  isPublished: { type: Boolean, default: true },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Indexes for performance
articleSchema.index({ doctor: 1, isPublished: 1 });
articleSchema.index({ createdAt: -1 });

export default mongoose.model('Article', articleSchema);
