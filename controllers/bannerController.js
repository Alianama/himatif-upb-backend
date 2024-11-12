const { Banner } = require("../models");
const path = require("path");

// Function to check if the uploaded file is an image
const isImage = (file) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);
  return extname && mimetype;
};

// Get all banners
exports.getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.findAll();
    res.json(banners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a specific banner by id
exports.getBannerById = async (req, res) => {
  const { id } = req.params;
  try {
    const banner = await Banner.findByPk(id);
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }
    res.json(banner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new banner
exports.createBanner = async (req, res) => {
  const { title, uploadDate, priority } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  if (req.file && !isImage(req.file)) {
    return res.status(400).json({ error: "Only image files are allowed!" });
  }

  try {
    const banner = await Banner.create({
      title,
      uploadDate,
      priority,
      imageUrl,
      userId: req.user.id,
    });
    res.status(201).json(banner);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a banner by id
exports.updateBanner = async (req, res) => {
  const { id } = req.params;
  const { title, uploadDate, priority } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  if (req.file && !isImage(req.file)) {
    return res.status(400).json({ error: "Only image files are allowed!" });
  }

  try {
    const banner = await Banner.findOne({ where: { id, userId: req.user.id } });
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    banner.title = title;
    banner.uploadDate = uploadDate;
    banner.priority = priority;
    if (imageUrl) {
      banner.imageUrl = imageUrl;
    }
    await banner.save();
    res.json(banner);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a banner by id
exports.deleteBanner = async (req, res) => {
  const { id } = req.params;
  try {
    const banner = await Banner.findOne({ where: { id, userId: req.user.id } });
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }
    await banner.destroy();
    res.json({ message: "Banner deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
