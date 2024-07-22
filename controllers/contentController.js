const { Content } = require("../models");

// Get all contents
const getAllContents = async (req, res) => {
  try {
    const contents = await Content.findAll();
    res.json(contents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get content by ID
const getContentById = async (req, res) => {
  const { id } = req.params;
  try {
    const content = await Content.findByPk(id);
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create content
const createContent = async (req, res) => {
  const { title, body } = req.body;
  try {
    const content = await Content.create({ title, body, userId: req.user.id });
    res.status(201).json(content);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update content
const updateContent = async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;
  try {
    const content = await Content.findOne({
      where: { id, userId: req.user.id },
    });
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    content.title = title;
    content.body = body;
    await content.save();
    res.json(content);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete content
const deleteContent = async (req, res) => {
  const { id } = req.params;
  try {
    const content = await Content.findOne({
      where: { id, userId: req.user.id },
    });
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    await content.destroy();
    res.json({ message: "Content deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getAllContents,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
};
