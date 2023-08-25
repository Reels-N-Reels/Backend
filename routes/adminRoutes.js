const express = require("express");
const adminController = require("../controllers/adminController");
const { verifyAuthToken } = require("../utils/authUtils");

const router = express.Router();

router.post("/login", adminController.loginAdmin);
router.post("/logout", adminController.logoutAdmin);

module.exports = router;
