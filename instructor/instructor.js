const moment = require("moment");

const Users = require("../models/dbModel");

module.exports = {
  addClass(req, res) {
    req.body.instructorId = req.user.id;
    const classDetails = { ...req.body };

    Users.addClass(classDetails)
      .then(saved => {
        res.status(201).json({
          status: 201,
          message: "class created successfully",
          saved
        });
      })
      .catch(error => {
        res.status(500).json({
          status: 500,
          message: error
        });
      });
  },
  editClass(req, res) {
    const id = parseInt(req.params.id);
    const changes = req.body;

    Users.editClass(id, changes)
      .then(updatedClass => {
        res.status(201).json({
          status: 200,
          message: "class updated successfully",
          updatedClass
        });
      })
      .catch(error => {
        res.status(500).json({
          status: 500,
          message: error
        });
      });
  }
};
