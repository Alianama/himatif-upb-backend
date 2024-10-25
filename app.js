var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const authRoutes = require("./routes/auth");
const contentRoutes = require("./routes/content");
const visimisiRoutes = require("./routes/visimisi");
const newsRoutes = require("./routes/news");
const profileRoutes = require("./routes/profile");
const historyRoutes = require("./routes/history");
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/auth", authRoutes);
app.use("/content", contentRoutes);
app.use("/home", visimisiRoutes);
app.use("/news", newsRoutes);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/profile", profileRoutes);
app.use("/history", historyRoutes);

module.exports = app;
