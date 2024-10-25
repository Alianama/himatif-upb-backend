const express = require("express");
const router = express.Router();

const {
  getHistory,
  createHistory,
} = require("../controllers/historyController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", getHistory);

router.post("/", authMiddleware, createHistory);

module.exports = router;
