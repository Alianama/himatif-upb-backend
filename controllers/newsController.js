const { News } = require("../models");
const path = require("path");

// Function to check if the uploaded file is an image
const isImage = (file) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);
  return extname && mimetype;
};

// Get all news
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.findAll();
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a specific news by id
exports.getNewsById = async (req, res) => {
  const { id } = req.params;
  try {
    const news = await News.findByPk(id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new news
exports.createNews = async (req, res) => {
  const { title, body, uploader } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  if (req.file && !isImage(req.file)) {
    return res.status(400).json({ error: "Only image files are allowed!" });
  }

  try {
    const news = await News.create({
      title,
      body,
      uploader,
      imageUrl,
      userId: req.user.id,
    });
    res.status(201).json(news);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a news by id
exports.updateNews = async (req, res) => {
  const { id } = req.params;
  const { title, body, uploader } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  if (req.file && !isImage(req.file)) {
    return res.status(400).json({ error: "Only image files are allowed!" });
  }

  try {
    const news = await News.findOne({ where: { id, userId: req.user.id } });
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    news.title = title;
    news.body = body;
    news.uploader = uploader;
    if (imageUrl) {
      news.imageUrl = imageUrl;
    }
    await news.save();
    res.json(news);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a news by id
exports.deleteNews = async (req, res) => {
  const { id } = req.params;
  try {
    const news = await News.findOne({ where: { id, userId: req.user.id } });
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    await news.destroy();
    res.json({ message: "News deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
