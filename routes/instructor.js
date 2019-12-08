const express = require("express");
const Instructor = require("../instructor/instructor");

const {
  verifyToken,
  verifyAdminToken,
  canDelete
} = require("../middleware/auth");

const { addClass, editClass, deleteClass, getClass, findClass } = Instructor;

const router = express.Router();

router.post("/class", verifyAdminToken, addClass);
router
  .route("/class")
  .all(verifyToken)
  .get(getClass);

router.get("/class/:id", verifyToken, findClass);
router
  .route("/class/:id")
  .all(verifyAdminToken, canDelete)
  .put(editClass)
  .delete(deleteClass);

module.exports = router;
