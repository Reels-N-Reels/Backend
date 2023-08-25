const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const path = require("path");
const blogPostsRoutes = require("./routes/blogPosts");
const jobPostsRoutes = require("./routes/jobPosts");
const sequelize = require("./config/database");
const adminRoutes = require("./routes/adminRoutes");


app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/blogPosts", blogPostsRoutes);
app.use("/api/jobPosts", jobPostsRoutes);
app.use("/admin", adminRoutes);


sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

module.exports = app;
