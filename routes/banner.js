const express = require("express");
const router = express.Router();
const bannerController = require("../controllers/bannerController");
const authMiddleware = require("../middleware/authMiddleware");

const multer = require("multer");
const path = require("path");

// Setup Multer untuk upload file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Dapatkan semua banner tanpa autentikasi
router.get("/", bannerController.getAllBanners);

// Dapatkan banner spesifik berdasarkan id tanpa autentikasi
router.get("/:id", bannerController.getBannerById);

// Buat banner baru dengan autentikasi
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  bannerController.createBanner
);

// Update banner berdasarkan id dengan autentikasi
router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  bannerController.updateBanner
);

// Hapus banner berdasarkan id dengan autentikasi
router.delete("/:id", authMiddleware, bannerController.deleteBanner);

module.exports = router;
