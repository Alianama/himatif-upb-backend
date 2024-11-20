const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Departement = sequelize.define("Departement", {
    name: {
      type: DataTypes.STRING,
      allovNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allovNull: false,
    },
    proker: {
      type: DataTypes.STRING,
      allovNull: false,
    },
    updateDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Departement;
};
