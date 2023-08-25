const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateAuthToken = (userId) => {
  return jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: "1h" });
};


module.exports = {
  generateAuthToken,
};
