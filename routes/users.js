const express = require("express");
const Auth = require("../auth/auth");

const { createUser, login } = Auth;
const router = express.Router();

router.post("/register", createUser);
router.post("/login", login);

module.exports = router;
