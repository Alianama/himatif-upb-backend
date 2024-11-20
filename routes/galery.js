const express = require("express");
const router = express.Router();
const galeryController = require("../controllers/galeryController");
const authMiddleware = require("../middleware/authMiddleware");

const multer = require("multer");
const path = require("path");

// Konfigurasi Multer untuk upload file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Mendapatkan semua galeri tanpa autentikasi
router.get("/", galeryController.getAllGalery);

// Mendapatkan galeri spesifik berdasarkan departemen tanpa autentikasi
router.get("/:departement", galeryController.getGaleryByDepartement);

// Membuat galeri baru dengan autentikasi
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  galeryController.createGalery
);

// Memperbarui galeri berdasarkan id dengan autentikasi
router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  galeryController.updateGalery
);

// Menghapus galeri berdasarkan id dengan autentikasi
router.delete("/:id", authMiddleware, galeryController.deleteGalery);

module.exports = router;
