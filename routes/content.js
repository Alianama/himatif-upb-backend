const express = require("express");
const router = express.Router();
const {
  getAllContents,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
} = require("../controllers/contentController");
const authMiddleware = require("../middleware/authMiddleware");

// Get all content without authentication
router.get("/", getAllContents);

// Get a specific content by id without authentication
router.get("/:id", getContentById);

// Create content with authentication
router.post("/", authMiddleware, createContent);

// Update content with authentication
router.put("/:id", authMiddleware, updateContent);

// Delete content with authentication
router.delete("/:id", authMiddleware, deleteContent);

module.exports = router;
