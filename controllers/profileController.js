const { Profile } = require("../models");

const getProfile = async (req, res) => {
  const { title } = req.params;

  try {
    const profile = await Profile.findOne({ where: { title } });
    if (!profile) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createProfile = async (req, res) => {
  const { title, body } = req.body;
  const userId = req.user.id; // Ambil userId dari user yang sedang login

  if (!title || !body) {
    return res
      .status(400)
      .json({ message: "Title, body, and userId are required" });
  }

  try {
    const existingProfile = await Profile.findOne({ where: { title } });
    if (existingProfile) {
      existingProfile.body = body;
      existingProfile.userId = userId;
      await existingProfile.save();
      return res.status(200).json(existingProfile);
    }

    const newProfile = await Profile.create({ title, body, userId });
    res.status(201).json(newProfile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getProfile,
  createProfile,
};
