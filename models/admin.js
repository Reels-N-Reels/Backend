const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Admin = db.define(
  "Admin",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "admin",
    timestamps: false,
  }
);


module.exports = Admin;
