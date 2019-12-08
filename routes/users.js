const express = require("express");
const Auth = require("../auth/auth");
const reservation = require("../user/user");
const { verifyToken, classCapacity } = require("../middleware/auth");

const { createUser, login } = Auth;
const { postReservation } = reservation;

const router = express.Router();

router.post("/register", createUser);
router.post("/login", login);
router.post("/reservation/:id", verifyToken, classCapacity, postReservation);

module.exports = router;
