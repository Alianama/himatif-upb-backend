const express = require("express");
const {
  sendEmail,
  sendKritikSaran,
} = require("../controllers/emailController");

const router = express.Router();

router.post("/send-email", sendEmail);
router.post("/kritik-saran", sendKritikSaran);

module.exports = router;
