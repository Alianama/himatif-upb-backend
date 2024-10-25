const { Profile } = require("../models");

const getProfile = async (req, res) => {
  const { title } = req.params;

  try {
    const profile = await Profile.findOne({ where: { title } });
    if (!profile) {
      return res.status(404).json({ message: "Profil tidak ditemukan" });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createProfile = async (req, res) => {
  const { title, body } = req.body;
  const userId = req.user.id;

  if (!title || !body) {
    return res
      .status(400)
      .json({ message: "Judul, isi, dan userId harus diisi" });
  }

  try {
    const existingProfile = await Profile.findOne({ where: { title } });
    if (existingProfile) {
      return res.status(400).json({ message: "Judul profil sudah ada" });
    }

    const existingContent = await Profile.findOne({ where: { body } });
    if (existingContent) {
      return res.status(400).json({ message: "Isi profil sudah ada" });
    }

    const newProfile = await Profile.create({ title, body, userId });
    return res.status(201).json(newProfile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const seedProfiles = async () => {
  try {
    const profiles = [
      {
        title: "profile",
        body: "HIMATIF (Himpunan Mahasiswa Teknik Informatika) Universitas Pelita Bangsa adalah organisasi mahasiswa yang berada di bawah naungan Program Studi Teknik Informatika. Sebagai wadah komunikasi, informasi, dan kolaborasi, HIMATIF hadir untuk membantu mahasiswa tidak hanya dalam memperdalam ilmu Teknik Informatika, tetapi juga dalam mengembangkan soft skills yang penting di era digital. <br/> <br/>  Dengan beragam kegiatan mulai dari seminar teknologi terbaru, workshop coding, hingga kompetisi IT, HIMATIF menciptakan lingkungan yang mendorong inovasi dan kolaborasi antar mahasiswa. Bergabung dengan HIMATIF berarti membuka pintu menuju pengalaman praktis, jaringan profesional, dan kesempatan untuk berkarya di dunia Teknologi Informasi yang terus berkembang.",
        userId: 1,
      },
    ];

    for (const profile of profiles) {
      const existingProfile = await Profile.findOne({
        where: { title: profile.title },
      });
      if (!existingProfile) {
        await Profile.create(profile);
      }
    }

    console.log("Profil berhasil di-seed");
  } catch (error) {
    console.error("Gagal melakukan seed profil:", error);
  }
};

seedProfiles();

module.exports = {
  getProfile,
  createProfile,
  seedProfiles,
};
