const { Visimisi } = require("../models");

const getVisi = async (req, res) => {
  const { label } = req.params;
  try {
    const visimisi = await Visimisi.findOne({ where: { label } });
    if (!visimisi) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.json(visimisi);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createVisimisi = async (req, res) => {
  const { title, body, label } = req.body;
  if (label !== "visi" && label !== "misi") {
    return res
      .status(400)
      .json({ error: "Label must be either 'visi' or 'misi'" });
  }
  try {
    const existingVisimisi = await Visimisi.findOne({ where: { label } });
    if (existingVisimisi) {
      return res.status(400).json({ error: "Data Sudah Ada" });
    }
    const visimisi = await Visimisi.create({
      title,
      body,
      label,
      userId: req.user.id,
    });
    res.status(201).json(visimisi);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateVisimisi = async (req, res) => {
  const { label } = req.params;
  const { title, body } = req.body;
  if (label !== "visi" && label !== "misi") {
    return res.status(400).json({ error: "Label harus 'visi' atau 'misi'" });
  }
  try {
    const visimisi = await Visimisi.findOne({ where: { label } });
    if (!visimisi) {
      return res.status(404).json({ message: "Visimisi tidak ditemukan" });
    }
    visimisi.title = title;
    visimisi.body = body;
    await visimisi.save();
    res.json(visimisi);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getVisi,
  createVisimisi,
  updateVisimisi,
};
