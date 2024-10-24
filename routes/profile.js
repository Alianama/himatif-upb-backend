const express = require("express");
const router = express.Router();

const {
  getProfile,
  createProfile,
} = require("../controllers/profileController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/:title", getProfile);

router.post("/", authMiddleware, createProfile);

module.exports = router;
