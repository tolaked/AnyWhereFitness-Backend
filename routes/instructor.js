const express = require("express");
const Instructor = require("../instructor/instructor");
const { verifyToken, canDelete } = require("../middleware/auth");

const { addClass, editClass, deleteClass } = Instructor;
const router = express.Router();

router.post("/class", verifyToken, addClass);

router
  .route("/class/:id")
  .all(verifyToken)
  .put(editClass)
  .delete(canDelete, deleteClass);

// router.post("/class", verifyToken, addClass);
// router.put("/class/:id", verifyToken, editClass);
// router.delete("/remove/:id", verifyToken, canDelete, deleteClass);

module.exports = router;
