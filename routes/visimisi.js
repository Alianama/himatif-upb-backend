const express = require("express");
const router = express.Router();
const {
  getVisi,
  createVisimisi,
  updateVisimisi,
} = require("../controllers/visimisiController");
const authMiddleware = require("../middleware/authMiddleware");

// Get all content without authentication
router.get("/visimisi/:label", getVisi);

// // Get a specific content by id without authentication
// router.get("/:id", getContentById);

// Create content with authentication
router.post("/visimisi", authMiddleware, createVisimisi);

// Update content with authentication
router.put("/visimisi/:label", authMiddleware, updateVisimisi);

// // Delete content with authentication
// router.delete("/:id", authMiddleware, deleteContent);

module.exports = router;
