// controllers/publicArticleController.js
import Article from "../models/Article.js";

export const getAllPublicArticles = async (req, res) => {
  try {
    const articles = await Article.find({ isPublished: true })
      .populate('doctor', 'name title image')
      .sort({ createdAt: -1 })
      .limit(100); // Reasonable limit for public page

    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
