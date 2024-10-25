const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const History = sequelize.define("History", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
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

  return History;
};
