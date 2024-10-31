const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // Sesuaikan dengan layanan email yang Anda gunakan
  auth: {
    user: process.env.EMAIL_USER, // Email pengirim
    pass: process.env.EMAIL_PASS, // Password email pengirim
  },
});

module.exports = transporter;
