const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");
const authMiddleware = require("../middleware/authMiddleware");

const multer = require("multer");
const path = require("path");

// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Get all news without authentication
router.get("/", newsController.getAllNews);

// Get a specific news by id without authentication
router.get("/:id", newsController.getNewsById);

// Create a new news with authentication
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  newsController.createNews
);

// Update a news by id with authentication
router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  newsController.updateNews
);

// Delete a news by id with authentication
router.delete("/:id", authMiddleware, newsController.deleteNews);

module.exports = router;
