const { Admin } = require("../models");
const { generateAuthToken } = require("../utils/authUtils");
const { comparePasswords } = require("../utils/passwordUtils");

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return res.status(401).json({ message: "Email not found" });
    }

    if (admin.password !== password) {
      console.log("Password comparison failed:", password, admin.password);
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = generateAuthToken(admin.id);
    res.json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.sendStatus(500);
  }
};

const logoutAdmin = (req, res) => {
  try {
    res.clearCookie("adminToken");
    res.json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error logging out:", error.response);
    res.sendStatus(500);
  }
};

module.exports = {
  loginAdmin,
  logoutAdmin,
};
