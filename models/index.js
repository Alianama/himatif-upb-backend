require("dotenv").config(); // Tambahkan ini untuk memuat variabel lingkungan

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    define: {
      freezeTableName: true,
    },
  }
);

const User = require("./user")(sequelize);
const Content = require("./content")(sequelize);
const Visimisi = require("./visimisi")(sequelize);
const News = require("./news")(sequelize);
const Profile = require("./profile")(sequelize);
const History = require("./history")(sequelize);
const Banner = require("./banner")(sequelize);

User.hasMany(Content, { foreignKey: "userId" });
Content.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Visimisi, { foreignKey: "userId" });
Visimisi.belongsTo(User, { foreignKey: "userId" });

User.hasMany(News, { foreignKey: "userId" });
News.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Profile, { foreignKey: "userId" });
Profile.belongsTo(User, { foreignKey: "userId" });

User.hasMany(History, { foreignKey: "userId" });
History.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Banner, { foreignKey: "userId" });
History.belongsTo(User, { foreignKey: "userId" });

sequelize.sync({ alter: true });

module.exports = {
  sequelize,
  User,
  Content,
  Visimisi,
  News,
  Profile,
  History,
  Banner,
};
