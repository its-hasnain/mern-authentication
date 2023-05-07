const express = require('express');
const router = express.Router();
const {
  registerUser,
  logoutUser,
  loginUser,
} = require("../controller/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);

module.exports = router;
