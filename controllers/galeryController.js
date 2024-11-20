const { Galery } = require("../models");
const path = require("path");

// Function to check if the uploaded file is an image
const isImage = (file) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);
  return extname && mimetype;
};

// Get all banners
exports.getAllGalery = async (req, res) => {
  try {
    const galery = await Galery.findAll();
    res.json(galery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a specific banner by id
exports.getGaleryByDepartement = async (req, res) => {
  const { departement } = req.params;
  try {
    const banner = await Galery.findAll({ where: { departement } });
    if (!banner) {
      return res.status(404).json({ message: "Galery not found" });
    }
    res.json(banner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new banner
exports.createGalery = async (req, res) => {
  const { title, departement, description, uploadDate } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  if (req.file && !isImage(req.file)) {
    return res.status(400).json({ error: "Only image files are allowed!" });
  }

  try {
    const galery = await Galery.create({
      title,
      departement,
      description,
      uploadDate,
      imageUrl,
      userId: req.user.id,
    });
    res.status(201).json(galery);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a banner by id
exports.updateGalery = async (req, res) => {
  const { id } = req.params;
  const { title, departement, description, uploadDate } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  if (req.file && !isImage(req.file)) {
    return res.status(400).json({ error: "Only image files are allowed!" });
  }

  try {
    const galery = await Galery.findOne({ where: { id, userId: req.user.id } });
    if (!galery) {
      return res.status(404).json({ message: "Galery not found" });
    }

    galery.title = title;
    galery.departement = departement;
    galery.description = description;
    galery.uploadDate = uploadDate;
    if (imageUrl) {
      galery.imageUrl = imageUrl;
    }
    await galery.save();
    res.json(galery);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a banner by id
exports.deleteGalery = async (req, res) => {
  const { id } = req.params;
  try {
    const galery = await Galery.findOne({ where: { id, userId: req.user.id } });
    if (!galery) {
      return res.status(404).json({ message: "Galery not found" });
    }
    await galery.destroy();
    res.json({ message: "Galery deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
