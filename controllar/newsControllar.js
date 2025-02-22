import News from "../models/newsModel.js";

// Get all news by category
export const getNewsByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const news = await News.find({ category });
        if (!news.length) {
            return res.status(404).json({ message: "No news found for this category" });
        }
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add news item
export const addNews = async (req, res) => {
    try {
        const { category, title, description, date } = req.body;
        const newsItem = new News({ category, title, description, date });
        await newsItem.save();
        res.status(201).json({ message: "News added successfully", newsItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all news
export const getAllNews = async (req, res) => {
    try {
        const news = await News.find();
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
