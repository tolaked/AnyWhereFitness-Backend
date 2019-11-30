const express = require("express");
const Auth = require("../auth/auth");
const Instructor = require("../instructor/instructor");

const { createUser, login } = Auth;
const { addClass } = Instructor;
const router = express.Router();

router.post("/register", createUser);
router.post("/login", login);
router.post("/class", addClass);

module.exports = router;
