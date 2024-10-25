const { History } = require("../models");

const getHistory = async (req, res) => {
  try {
    const histories = await History.findAll({
      attributes: ["title", "content"],
    });
    if (histories.length === 0) {
      return res.status(404).json({ message: "Tidak ada riwayat" });
    }
    res.json(histories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createHistory = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id; // Ambil userId dari user yang sedang login

  if (!title || !content) {
    return res
      .status(400)
      .json({ message: "Judul, konten, dan userId harus diisi" });
  }

  try {
    const existingHistory = await History.findOne({ where: { title } });
    if (existingHistory) {
      existingHistory.content = content;
      existingHistory.userId = userId;
      await existingHistory.save();
      return res.status(200).json(existingHistory);
    } else {
      const newHistory = await History.create({ title, content, userId });
      return res.status(201).json(newHistory);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getHistory,
  createHistory,
};
