// controllers/articleController.js
import Article from '../models/Article.js';

// ✅ CREATE ARTICLE
export const createArticle = async (req, res) => {
  try {
    const { title, link, image, preview } = req.body;
    
    const article = new Article({
      title,
      link,
      image,
      preview,
      doctor: req.doctor.id,
      isPublished: true
    });

    await article.save();
    
    res.status(201).json({
      message: 'Article created successfully',
      article
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ GET DOCTOR'S ARTICLES
export const getDoctorArticles = async (req, res) => {
  try {
    const articles = await Article.find({ 
      doctor: req.doctor.id, 
      isPublished: true 
    })
    .sort({ createdAt: -1 })
    .select('-__v');

    res.json({
      articles,
      total: articles.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET SINGLE ARTICLE
export const getArticle = async (req, res) => {
  try {
    const article = await Article.findOne({
      _id: req.params.id,
      doctor: req.doctor.id
    });

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATE ARTICLE
export const updateArticle = async (req, res) => {
  try {
    const updates = req.body;
    const article = await Article.findOneAndUpdate(
      { _id: req.params.id, doctor: req.doctor.id },
      { ...updates, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json({
      message: 'Article updated successfully',
      article
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ DELETE ARTICLE
export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findOneAndDelete({
      _id: req.params.id,
      doctor: req.doctor.id
    });

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find({ isPublished: true })
      .populate('doctor', 'name title image') 
      .sort({ createdAt: -1 })
      .limit(30);

    res.json(articles); 
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllPublicArticles = async (req, res) => {
  try {    
    const articles = await Article.find({ isPublished: true })
      .populate('doctor', 'name title image')  // ✅ Doctor info for frontend
      .sort({ createdAt: -1 })
      .limit(50); // ✅ Performance limit

    
    res.json(articles); // ✅ Direct array for frontend
  } catch (error) {
    console.error('❌ Public articles error:', error);
    res.status(500).json({ message: error.message });
  }
};