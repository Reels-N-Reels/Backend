const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const BlogPost = require("./blogPost");
const JobPost = require("./jobPost");
const Admin = require("./admin");

const db = {
  BlogPost,
  JobPost,
  Admin,
};

Object.values(db).forEach((model) => {
  if (model.associate) {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
