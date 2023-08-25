const { Sequelize } = require("sequelize");
require("dotenv").config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

console.log("PGHOST:", PGHOST);
console.log("PGDATABASE:", PGDATABASE);
console.log("PGUSER:", PGUSER);

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = sequelize;
