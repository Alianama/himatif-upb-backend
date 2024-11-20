const express = require("express");
const router = express.Router();
const departementController = require("../controllers/departementController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", departementController.getDepartement);
router.post("/", authMiddleware, departementController.createDepartement);
router.put("/:id", authMiddleware, departementController.updateDepartement);
router.get(
  "/:name",
  departementController.searchDepartementByName
);

module.exports = router;
