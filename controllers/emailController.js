const transporter = require("../config/nodemailer");
const { encode } = require("html-entities");

const sendEmail = async (req, res) => {
  const { subject, name, phone, email, company, body } = req.body;

  if (!subject) {
    return res.status(400).json({ message: "Subject cannot be empty" });
  }
  if (!name) {
    return res.status(400).json({ message: "Name cannot be empty" });
  }
  if (!phone) {
    return res.status(400).json({ message: "Phone cannot be empty" });
  }
  if (!email) {
    return res.status(400).json({ message: "Email cannot be empty" });
  }
  if (!company) {
    return res.status(400).json({ message: "Company cannot be empty" });
  }
  if (!body) {
    return res.status(400).json({ message: "Body cannot be empty" });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_ADMIN,
    subject: encode(`Himatif Webiste Inquiry || ${subject}`),
    html: `
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
        }
        .container {
          max-width: 600px;
          margin: auto;
          padding: 20px;
          background-color: #fff;
          border: 1px solid #ddd;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
      </style>
      <div class="container">
        <h2>Informasi Pengirim</h2>
        <p>Nama: ${encode(name)}</p>
        <p>Phone: ${encode(phone)}</p>
        <p>Email: ${encode(email)}</p>
        <p>Company | University: ${encode(company)}</p>
        <h2>Pesan</h2>
        <p>${encode(body)}</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error sending email", error });
  }
};

const sendKritikSaran = async (req, res) => {
  const { kritik, saran } = req.body;

  if (!kritik) {
    return res.status(400).json({ message: "Kritik cannot be empty" });
  }
  if (!saran) {
    return res.status(400).json({ message: "Saran cannot be empty" });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_ADMIN,
    subject: encode(`kritik Dan Saran - Himatif Website`),
    html: `
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
        }
        .container {
          max-width: 600px;
          margin: auto;
          padding: 20px;
          background-color: #fff;
          border: 1px solid #ddd;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
      </style>
      <div class="container">
        <h2>Kritik dan Saran</h2>
        <p>Kritik: ${encode(kritik)}</p>
        <p>Saran: ${encode(saran)}</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Saran sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error sending email", error });
  }
};

module.exports = { sendEmail, sendKritikSaran };
