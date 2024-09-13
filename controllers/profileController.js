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

// const createProfile = async (req, res) => {
//   const { title, body } = req.body;
//   if (!body) {
// };

module.exports = {
  getProfile,
};
