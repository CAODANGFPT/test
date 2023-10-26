import News from "../models/news";
import { newsSchema } from "../schemas/news";

export const list = async (req, res) => {
  try {
    const news = await News.getAllNews();
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const show = async (req, res) => {
  try {
    const newsItem = await News.getNewsById(req.params.id);
    if (!newsItem) {
      res.status(404).json({ error: "NewsItem not found" });
    } else {
      res.json(newsItem);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const create = async (req, res) => {
  try {
    const { name, image, description } = req.body;
    const { error } = newsSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const newsId = await News.createNews(name, image, description);
    res.json({ id: newsId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const { name, image, description } = req.body;
    const { error } = newsSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    await News.updateNews(req.params.id, name, image, description);
    res.json({ message: "News updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const destroy = async (req, res) => {
  try {
    await News.deleteNews(req.params.id);
    res.json({ message: "News deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
