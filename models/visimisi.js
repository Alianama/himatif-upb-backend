const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Visimisi = sequelize.define("Visimisi", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Visimisi;
};
