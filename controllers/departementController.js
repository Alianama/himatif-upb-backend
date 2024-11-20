const { Departement } = require("../models");

const getDepartement = async (req, res) => {
  try {
    const dep = await Departement.findAll({
      attributes: ["id", "name", "description", "proker", "updateDate"],
    });
    if (dep.length === 0) {
      return res.status(404).json({ Message: "Data Kosong" });
    }
    res.json(dep);
  } catch (err) {
    res.status(500).json({ Message: err.message });
  }
};

const createDepartement = async (req, res) => {
  const { name, description, proker } = req.body;
  const userId = req.user.id;

  if (!name || !description || !proker) {
    return res
      .status(400)
      .json({ message: " name and description and proker are required" });
  }

  try {
    const existingDepartement = await Departement.findOne({ where: { name } });
    if (existingDepartement) {
      existingDepartement.description = description;
      existingDepartement.proker = proker;
      existingDepartement.userId = userId;

      await existingDepartement.save();
      return res.status(200).json(existingDepartement);
    } else {
      const newDepartement = await Departement.create({
        name,
        description,
        proker,
        userId,
      });
      return res.status(201).json(newDepartement);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateDepartement = async (req, res) => {
  const { id } = req.params;
  const { name, description, proker } = req.body;
  const userId = req.user.id;

  if (!id) {
    return res.status(400).json({ message: " id is required" });
  }
  if (!name) {
    return res.status(400).json({ message: " name is required" });
  }
  if (!description) {
    return res.status(400).json({ message: " description is required" });
  }
  if (!proker) {
    return res.status(400).json({ message: " proker is required" });
  }

  try {
    const departement = await Departement.findOne({ where: { id, userId } });
    if (!departement) {
      return res.status(404).json({ message: "Departement tidak ditemukan" });
    }

    departement.name = name;
    departement.description = description;
    departement.proker = proker;

    await departement.save();
    res.status(200).json(departement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const searchDepartementByName = async (req, res) => {
  const { name } = req.params;
  if (!name) {
    return res.status(400).json({ message: "name is required" });
  }

  try {
    const departement = await Departement.findOne({ where: { name } });
    if (!departement) {
      return res.status(404).json({ message: "Departement tidak ditemukan" });
    }
    res.status(200).json(departement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getDepartement,
  createDepartement,
  updateDepartement,
  searchDepartementByName,
};
