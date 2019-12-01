const express = require("express");
const Auth = require("../auth/auth");
const Instructor = require("../instructor/instructor");
const { verifyToken, canDelete } = require("../middleware/auth");

const { createUser, login } = Auth;
const { addClass, editClass, deleteClass } = Instructor;
const router = express.Router();

router.post("/register", createUser);
router.post("/login", login);
router.post("/class", verifyToken, addClass);
router.put("/class/:id", verifyToken, editClass);
router.delete("/remove/:id", verifyToken, canDelete, deleteClass);

module.exports = router;
